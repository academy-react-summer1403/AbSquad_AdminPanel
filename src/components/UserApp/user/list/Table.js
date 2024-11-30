// ** React Imports
import { Fragment, useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { GetUserManageList } from "../../../../@core/services/API/AllUsersAdmin/allUserAdmin";

// ** Invoice List Sidebar
import Sidebar from "./Sidebar";

// ** Table Columns
import { columns } from "./columns";

// ** Store & Actions
import { getAllData, getData } from "../store";
import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import Select from "react-select";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import {
  ChevronDown,
  Share,
  Printer,
  FileText,
  File,
  Grid,
  Copy,
} from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

// ** Table Header
const CustomHeader = ({
  store,
  toggleSidebar,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm,
}) => {
  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">Show</label>
            <Input
              className="mx-50"
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: "5rem" }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
            <label htmlFor="rows-per-page">Entries</label>
          </div>
        </Col>
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            <label className="mb-0" htmlFor="search-invoice">
              Search:
            </label>
            <Input
              id="search-invoice"
              className="ms-50 w-100"
              type="text"
              value={searchTerm}
              onChange={(e) => handleFilter(e.target.value)}
            />
          </div>

          <div className="d-flex align-items-center table-header-actions">
            <UncontrolledDropdown className="me-1">
              <DropdownToggle color="secondary" caret outline>
                <Share className="font-small-4 me-50" />
                <span className="align-middle">Export</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className="w-100">
                  <Printer className="font-small-4 me-50" />
                  <span className="align-middle">Print</span>
                </DropdownItem>
                <DropdownItem
                  className="w-100"
                  onClick={() => downloadCSV(store.data)}
                >
                  <FileText className="font-small-4 me-50" />
                  <span className="align-middle">CSV</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <Grid className="font-small-4 me-50" />
                  <span className="align-middle">Excel</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <File className="font-small-4 me-50" />
                  <span className="align-middle">PDF</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <Copy className="font-small-4 me-50" />
                  <span className="align-middle">Copy</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <Button
              className="add-new-user"
              color="primary"
              onClick={toggleSidebar}
            >
              Add New User
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};
// MIIIIIIIIIIIIIIIIIIIIIIIIIIIIIINnnnnnnnnnnnnneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
const UsersList = () => {
  const [userList, setUserList] = useState([]);
  const [roles, setRoles] = useState([]);
  const [parameters, setParameters] = useState({
    PageNumber: 1,
    RowsOfPage: 10,
  });
  const UserListManage = async (params) => {
    const res = await GetUserManageList(params);
    setUserList(res);
  };
  useEffect(() => {
    UserListManage(parameters);
  }, [parameters]);

  // ** States
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "رول را انتخاب کنید",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "وضعیت کاربر راانتخاب کنید",
  });

  // ***********************************************************
  // ** User Roles options
  const StandardFormSelect = (data) => {
    const array = data.map((it) => {
      return { value: it.id, label: `${it.roleName}` };
    });
    return array;
  };
  const changeRoleName = (data) => {
    switch (data) {
      case "Administrator":
        return "مدیر";
      case "Teacher":
        return "استاد";
      case "Employee.Admin":
        return "زیرمدیر";
      case "Employee.Writer":
        return "نویسنده";
      case "Student":
        return "دانشجو";
      case "CourseAssistance":
        return "دستیار";
      case "TournamentAdmin":
        return "مدیر تورنمنت";
      case "Referee":
        return "داور";
      case "TournamentMentor":
        return "منتور تورنمنت";
      case "Support":
        return "پشتیبان";
    }
  };
  const handleGetRoles = async () => {
    const res = await GetUserManageList(parameters);
    setRoles(res.roles);
  };
  useEffect(() => {
    handleGetRoles(parameters);
  }, []);

  //*********************************************************** */
  // User Status States
  const [userStatus, setUserStatus] = useState([]);
  const StatusOptions = [
    { value: "True", label: "کاربران فعال" },
    { value: "False", label: "کاربران غیرفعال" },
    { value: "True", label: "کاربران حذف شده" },
  ];
  const handleStatusApi = (obj) => {
    console.log(obj.label);
    console.log(obj.value);
    if (obj === StatusOptions[0]) {
      delete parameters.IsDeletedUser;
      setParameters({ ...parameters, IsActiveUser: "True" });
    }
    if (obj === StatusOptions[1]) {
      {
        delete parameters.IsDeletedUser;
        setParameters({ ...parameters, IsActiveUser: "False" });
      }
    }
    if (obj === StatusOptions[2])
      setParameters({ ...parameters, IsDeletedUser: "True" });
  };
  // *********************************************************
  useEffect(() => {
    console.log(parameters);
  }, [parameters]);

  // ** Function in get data on page change
  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);

    setRowsPerPage(value);
  };

  // ** Function in get data on search query change
  const handleFilter = (val) => {
    setSearchTerm(val);
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage));

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pe-1"
        }
      />
    );
  };

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">دسته بندی</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="role-select">رول</Label>
              <Select
                isClearable={false}
                value={currentRole}
                options={StandardFormSelect(roles).map((it) => {
                  return { value: it.value, label: changeRoleName(it.label) };
                })}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                onChange={() => {}}
              />
            </Col>
            <Col className="my-md-0 my-1" md="4">
              <Label for="plan-select">وضعیت کاربر</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={StatusOptions}
                value={currentStatus}
                onChange={(e) => {
                  setCurrentStatus(e);
                  handleStatusApi(e);
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="overflow-hidden">
        <div className="react-dataTable">
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns}
            onSort={() => {}}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            // paginationComponent={() => {}}
            data={
              userList.listUser != undefined
                ? userList.listUser.map((it) => {
                    return { ...it };
                  })
                : []
            }
            // subHeaderComponent={
            //   <CustomHeader
            //     // store={store}
            //     searchTerm={searchTerm}
            //     rowsPerPage={rowsPerPage}
            //     handleFilter={() => {}}
            //     handlePerPage={() => {}}
            //     toggleSidebar={() => {}}
            //   />
            // }
          />
        </div>
      </Card>

      <Sidebar open={sidebarOpen} toggleSidebar={() => {}} />
    </Fragment>
  );
};

export default UsersList;
