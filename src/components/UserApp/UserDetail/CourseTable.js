﻿// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Invoice List Sidebar
// import Sidebar from "./Sidebar";

// ** Table Columns
import { CourseCol } from "./CourseCol";

// ** Third Party Components

import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import { Row, Col, Card, Input, Button } from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useNavigate } from "react-router-dom";

// ** Get Courses Api *************************************************************************************

// ** Table Header
const CustomHeader = ({
  searchTerm,
  setSearchTerm,
  setParameters,
  parameters,
  rowsPerPage,
  setRowsPerPage,
}) => {
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

const UserCourseTable = ({ user }) => {
  // ** States
  const [sort, setSort] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [parameters, setParameters] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [sortColumn, setSortColumn] = useState("id");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userCourses, setUserCourses] = useState([]);
  const [coursesCount, setCoursesCount] = useState([]);

  useEffect(() => {
    if (user.courses) {
      setCoursesCount(user.courses.length);
      setUserCourses(user.courses);
    }
  }, [user.courses]);

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(coursesCount.length / rowsPerPage));
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

  const [allCourses, setAllCourses] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // searchTerm ** copy this above after making a button for search
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
            columns={CourseCol}
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
              userCourses != undefined
                ? userCourses.map((it, index) => {
                    return {
                      ...it,
                    };
                  })
                : []
            }
            subHeaderComponent={
              <CustomHeader
                // store={store}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                setParameters={setParameters}
                parameters={parameters}
                setRowsPerPage={setRowsPerPage}
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

export default UserCourseTable;