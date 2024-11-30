// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Invoice List Sidebar
// import Sidebar from "./Sidebar";

// ** Table Columns
import { columns } from "./columns";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";

// ** Reactstrap Imports
import { Row, Col, Card, Input } from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { AllTeacherCourse } from "../../../../@core/services/API/AllCoursesTeacher/get.teacher.course.api";
import { useSearchParams } from "react-router-dom";
import { DeleteCourse } from "../../../../@core/services/API/AllCoursesAdmin/GetCourseDetail/delete.course.api";

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
  // Use Navigate

  // Search
  const handleSearch = (val) => {};

  useEffect(() => {
    setParameters({ ...parameters, RowsOfPage: rowsPerPage });
  }, [rowsPerPage]);
  useEffect(() => {
    if (searchTerm != "") {
      setParameters({ ...parameters, Query: searchTerm });
    } else {
      const newData = { ...parameters }; // Create a shallow copy of the object
      delete newData["Query"]; // Delete the key from the copy
      setParameters(newData);
    }
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
        </Col>
      </Row>
    </div>
  );
};

const TeacherCourseList = () => {
  // ** States
  const [searchTerm, setSearchTerm] = useState("");
  const [parameters, setParameters] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setParameters({ ...parameters, PageNumber: currentPage + 1 });
  }, [currentPage]);

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(allCourses.totalCount / rowsPerPage));
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

  const [searchParams, setSearchParams] = useSearchParams();
  const [allCourses, setAllCourses] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const handleGetAllCourse = async (params) => {
    const res = await AllTeacherCourse(params);
    setAllCourses(res);
  };

  const handleDeleteCourse = async (deleteItem, courseId) => {
    await DeleteCourse({
      data: { active: deleteItem, id: courseId },
    });
    setRefresh(!refresh);
  };
  useEffect(() => {
    handleGetAllCourse(parameters);
  }, [parameters, refresh]);

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
              allCourses.teacherCourseDtos != undefined
                ? allCourses.teacherCourseDtos.map((it) => {
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
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                setParameters={setParameters}
                parameters={parameters}
                setRowsPerPage={setRowsPerPage}
                rowsPerPage={rowsPerPage}
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

export default TeacherCourseList;
