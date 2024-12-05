// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Table Columns
import { columns } from "./columns";

// ** Third Party Components

import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";

// ** Reactstrap Imports
import { Row, Col, Card, Input, Button } from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

import { AddAssistant } from "../AddAssistant";
import { GetAssistantApi } from "../../../../@core/services/API/AllCoursesAdmin/Assistants/get.assistant.api";
import { AllCourseAdmin } from "../../../../@core/services/API/AllCoursesAdmin/allCourse.api";
import { GetUserManageList } from "../../../../@core/services/API/AllUsersAdmin/allUserAdmin";
// ** Get Semester Api *************************************************************************************

// ** Table Header
const CustomHeader = ({ searchTerm, setSearchTerm, setRowsPerPage }) => {
  // Search
  const handleSearch = (val) => {};
  const [show, setShow] = useState(false);
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
              ساخت لول
            </Button>
          </div>
        </Col>
        <AddAssistant show={show} setShow={setShow} />
      </Row>
    </div>
  );
};

const AssistantList = () => {
  // ** States
  const [searchTerm, setSearchTerm] = useState("");
  const [parameters, setParameters] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showAdd, setShowAdd] = useState(false);
  useEffect(() => {
    setParameters({ ...parameters, PageNumber: currentPage + 1 });
  }, [currentPage]);

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(10 / rowsPerPage));
    const handlePagination = (pageNum) => {
      setCurrentPage(pageNum);
    };
    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage != 0 ? currentPage : 0}
        onPageChange={(page) => handlePagination(page.selected)}
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

  const [assistants, setAssistants] = useState([]);
  const handleGetAssistants = async () => {
    const res = await GetAssistantApi();
    setAssistants(res);
  };
  useEffect(() => {
    handleGetAssistants();
  }, []);

  // Calling 530 courses
  const [courses, setCourses] = useState([]);
  const [courseParams, setCourseParams] = useState({});
  const handleGetAllCourses = async (params) => {
    const res = await AllCourseAdmin(params);
    setCourses(res);
  };
  useEffect(() => {
    handleGetAllCourses(courseParams);
  }, [courseParams]);
  useEffect(() => {
    if (courses.totalCount) {
      setCourseParams({ RowsOfPage: courses.totalCount, PageNumber: 1 });
    }
  }, [courses.totalCount]);

  // USERS*****************************************

  const [user, setUser] = useState([]);
  const [userParams, setUserParams] = useState({});
  const handleGetAllUser = async (params) => {
    const res = await GetUserManageList(params);
    setUser(res);
  };
  useEffect(() => {
    handleGetAllUser(userParams);
  }, [userParams]);
  useEffect(() => {
    if (user.totalCount) {
      setUserParams({ RowsOfPage: user.totalCount, PageNumber: 1 });
    }
  }, [user.totalCount]);
  return (
    <Fragment>
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
            paginationComponent={() => (
              <CustomPagination
                currentPage={currentPage}
                setParameters={setParameters}
                parameters={parameters}
              />
            )}
            data={
              assistants
                ? assistants.map((it) => {
                    return { ...it, courses: courses, user: user };
                  })
                : []
            }
            subHeaderComponent={
              <CustomHeader
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                setParameters={setParameters}
                parameters={parameters}
                setRowsPerPage={setRowsPerPage}
                setShowAdd={setShowAdd}
                showAdd={showAdd}
                rowsPerPage={rowsPerPage}
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

export default AssistantList;
