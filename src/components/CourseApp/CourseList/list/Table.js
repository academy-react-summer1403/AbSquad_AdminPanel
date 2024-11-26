// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Invoice List Sidebar
// import Sidebar from "./Sidebar";

// ** Table Columns
import { columns } from "./columns";

// ** Store & Actions

import { useDispatch } from "react-redux";

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
import { AllCourseAdmin } from "../../../../@core/services/API/AllCoursesAdmin/allCourse.api";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { DeleteCourse } from "../../../../@core/services/API/AllCoursesAdmin/GetCourseDetail/delete.course.api";
// ** Get Courses Api *************************************************************************************

// ** Table Header
const CustomHeader = ({
  store,
  toggleSidebar,
  handlePerPage,
  handleFilter,
  searchTerm,
  setSearchParams,
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Search
  const handleSearch = (val) => {
    setSearchParams((op) => {
      op.set("Query", val);
      return op;
    });
  };
  // Use Navigate
  const navigate = useNavigate();
  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">تعداد:</label>
            <Input
              className="mx-50"
              onChange={(e) => {
                setSearchParams((op) => {
                  op.set("RowsOfPage", e.target.value);
                  return op;
                });
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
                handleSearch(e.target.value);
              }}
            />
          </div>

          <div className="d-flex align-items-center table-header-actions">
            {/* <UncontrolledDropdown className="me-1">
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
            </UncontrolledDropdown> */}
            <Button
              className="add-new-user"
              color="primary"
              onClick={() => {
                navigate("/Course/AddNewCourse");
              }}
            >
              ساخت دوره
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const CourseList = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  // const store = useSelector((state) => state.users);

  // ** States
  const [sort, setSort] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("id");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "Select Role",
  });
  const [currentPlan, setCurrentPlan] = useState({
    value: "",
    label: "Select Plan",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "Select Status",
    number: 0,
  });

  // ** User filter options
  const roleOptions = [
    { value: "", label: "Select Role" },
    { value: "admin", label: "Admin" },
    { value: "author", label: "Author" },
    { value: "editor", label: "Editor" },
    { value: "maintainer", label: "Maintainer" },
    { value: "subscriber", label: "Subscriber" },
  ];

  const planOptions = [
    { value: "", label: "Select Plan" },
    { value: "basic", label: "Basic" },
    { value: "company", label: "Company" },
    { value: "enterprise", label: "Enterprise" },
    { value: "team", label: "Team" },
  ];

  const statusOptions = [
    { value: "", label: "Select Status", number: 0 },
    { value: "pending", label: "Pending", number: 1 },
    { value: "active", label: "Active", number: 2 },
    { value: "inactive", label: "Inactive", number: 3 },
  ];

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(allCourses.totalCount / rowsPerPage));

    const handlePagination = async (pageNum) => {
      setSearchParams((op) => {
        op.set("PageNumber", pageNum + 1);
        return op;
      });
    };
    const handleIncPage = () => {
      setCurrentPage(1);
    };

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage != 0 ? currentPage : 0}
        onPageChange={(page) => {
          handlePagination(page.selected);
          handleIncPage();
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

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      role: currentRole.value,
      currentPlan: currentPlan.value,
      status: currentStatus.value,
      q: searchTerm,
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0;
    });

    if (store.data.length > 0) {
      return store.data;
    } else if (store.data.length === 0 && isFiltered) {
      return [];
    } else {
      return store.allData.slice(0, rowsPerPage);
    }
  };
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [allCourses, setAllCourses] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const handleGetAllCourse = async (loc) => {
    const res = await AllCourseAdmin(loc);
    setAllCourses(res);
  };

  const handleDeleteCourse = async (courseId) => {
    await DeleteCourse({
      data: { active: true, id: courseId },
    });
  };
  useEffect(() => {
    if (location) {
      handleGetAllCourse(location.search);
    }
  }, [searchParams, refresh]);

  return (
    <Fragment>
      {/* <Card>
        <CardHeader>
          <CardTitle tag="h4">Filters</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="role-select">Role</Label>
              <Select
                isClearable={false}
                options={roleOptions}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
              />
            </Col>
            <Col className="my-md-0 my-1" md="4">
              <Label for="plan-select">Plan</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={planOptions}
              />
            </Col>
            <Col md="4">
              <Label for="status-select">Status</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
              />
            </Col>
          </Row>
        </CardBody>
      </Card> */}

      <Card className="overflow-hidden">
        <div className="react-dataTable">
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            selectableRows
            paginationServer
            columns={columns}
            onSort={() => {}}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={
              allCourses.courseDtos != undefined
                ? allCourses.courseDtos.map((it) => {
                    return {
                      ...it,
                      handleDeleteCourse: handleDeleteCourse,
                      setRefresh: setRefresh,
                      refresh: refresh,
                    };
                  })
                : []
            }
            subHeaderComponent={
              <CustomHeader
                // store={store}
                searchTerm={searchTerm}
                setSearchParams={setSearchParams}
                handleFilter={() => {}}
                handlePerRow={() => {}}
              />
            }
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default CourseList;
