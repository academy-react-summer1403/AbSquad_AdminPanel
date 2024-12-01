// ** React Imports
import { Fragment, useState, useEffect } from "react";
import { GetUserManageList } from "../../../../@core/services/API/AllUsersAdmin/allUserAdmin";

// ** Invoice List Sidebar
import Sidebar from "./Sidebar";
// Add User
import AddUser from "./AddCard";

// ** Table Columns
import { columns } from "./columns";

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
import { AddRoleApi } from "../../../../@core/services/API/AllUsersAdmin/add.role.api";
import { param } from "jquery";
import { useNavigate } from "react-router-dom";
import { DeleteUserApi } from "../../../../@core/services/API/AllUsersAdmin/delete.user.api";

// ** Table Header
const CustomHeader = ({
  searchTerm,
  setSearchTerm,
  setParameters,
  parameters,
  rowsPerPage,
  setRowsPerPage,
  show,
  setShow,
}) => {
  // const [rowsPerPage, setRowsPerPage] = useState(10);

  // Search
  const handleSearch = (val) => {};
  // Use Navigate

  const navigate = useNavigate();
  useEffect(() => {
    setParameters({ ...parameters, RowsOfPage: rowsPerPage });
  }, [rowsPerPage]);
  useEffect(() => {
    setParameters({ ...parameters, Query: searchTerm });
  }, [searchTerm]);

  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">تعداد:</label>
            <Input
              className="mx-50"
              onChange={(e) => {
                setRowsPerPage(parseInt(e.target.value));
              }}
              type="select"
              id="rows-per-page"
              style={{ width: "5rem" }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
          </div>
        </Col>
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            <label className="mb-0" htmlFor="search-invoice">
              جستجو:
            </label>
            <Input
              id="search-invoice"
              className="ms-50 w-100"
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                handleSearch(searchTerm);
              }}
            />
          </div>

          <div className="d-flex align-items-center table-header-actions">
            <Button
              className="add-new-user"
              color="primary"
              onClick={() => {
                setShow(true);
              }}
            >
              ساخت کاربر
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};
// MIIIIIIIIIIIIIIIIIIIIIIIIIIIIIINnnnnnnnnnnnnneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
const UsersList = () => {
  const [show, setShow] = useState(false);
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
  const [currentPage, setCurrentPage] = useState(0);
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

  const [userRoles, setUserRoles] = useState("");
  // Handling UserRolesApi
  const handleUserRoleApi = (data) => {
    setParameters({ ...parameters, roleId: data.value });
  };

  //*********************************************************** */
  // User Status States

  const StatusOptions = [
    { value: "Active", label: "کاربران فعال" },
    { value: "DeActive", label: "کاربران غیرفعال" },
    { value: "Deleted", label: "کاربران حذف شده" },
  ];
  const handleStatusApi = (obj) => {
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
    if (obj === StatusOptions[2]) {
      delete parameters.IsActiveUser;
      setParameters({ ...parameters, IsDeletedUser: "True" });
    }
  };
  // *********************************************************

  // Deleting User Handle
  // *********************************************************
  const handleDeleteUser = async (obj) => {
    console.log(obj);
    await DeleteUserApi(obj);
  };
  // Handling Adding Role To User
  const handleAddRole = async (bool, data) => {
    await AddRoleApi(bool, data);
  };

  // ** Function in get data on search query change
  const handleFilter = (val) => {
    setSearchTerm(val);
  };
  useEffect(() => {
    setParameters({ ...parameters, PageNumber: currentPage + 1 });
  }, [currentPage]);
  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(userList.totalCount / rowsPerPage));
    const handlePagination = (pageNum) => {
      setCurrentPage(pageNum);
    };
    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage : 0}
        onPageChange={(page) => {
          handlePagination(page.selected);
        }}
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
                onChange={(e) => {
                  handleUserRoleApi(e);
                  setCurrentRole(e);
                }}
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
            paginationComponent={() => (
              <CustomPagination
                currentPage={currentPage}
                setParameters={setParameters}
                parameters={parameters}
              />
            )}
            data={
              userList.listUser != undefined
                ? userList.listUser.map((it) => {
                    return {
                      ...it,
                      handleAddRole: handleAddRole,
                      handleDeleteUser: handleDeleteUser,
                    };
                  })
                : []
            }
            subHeaderComponent={
              <CustomHeader
                show={show}
                setShow={setShow}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                setParameters={setParameters}
                parameters={parameters}
                setRowsPerPage={setRowsPerPage}
                rowsPerPage={rowsPerPage}
              />
            }
          />
        </div>
      </Card>
      <AddUser show={show} setShow={setShow} />
      <Sidebar open={sidebarOpen} toggleSidebar={() => {}} />
    </Fragment>
  );
};

export default UsersList;
