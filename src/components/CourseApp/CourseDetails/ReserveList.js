// ** Reactstrap Imports
import { Badge, Card, Button } from "reactstrap";

// ** Third Party Components
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";

// Api
import { GetCourseReserver } from "../../../@core/services/API/AllCoursesAdmin/GetCourseDetail/course.reservers.api";
import { GetCourseDetailApi } from "../../../@core/services/API/AllCoursesAdmin/GetCourseDetail/get.course.detail.api";

import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { getCourseGroup } from "../../../@core/services/API/AllCoursesAdmin/GetCourseDetail/get.coursegroup.api";
import { GetCourseGroupDetail } from "../../../@core/services/API/AllCoursesAdmin/GetCourseDetail/courseGroup.detail.api";
import { AcceptReserve } from "../../../@core/services/API/AllCoursesAdmin/GetCourseDetail/accept.reserve.api";

const statusColor = {
  true: "success",
  false: "danger",
};

export const columns = [
  {
    sortable: true,
    minWidth: "100px",
    name: "نام دوره",
    selector: (row) => row.courseName,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <div className="avatar-wrapper">
            <Avatar
              className="me-1"
              img={row.img ? row.img : "/ErrImg.jpg"}
              alt={row.title}
              imgWidth="32"
            />
          </div>
          <div className="d-flex flex-column">
            <span className="text-truncate fw-bolder">{row.courseName}</span>
          </div>
        </div>
      );
    },
  },
  {
    name: "نام رزروکننده",
    minWidth: "100px",
    selector: (row) => row.studentName,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center text-truncate">
          <div className="d-flex flex-column text-truncate">
            <span className="text-truncate fw-bolder">{row.studentName}</span>
          </div>
        </div>
      );
    },
  },
  {
    name: "زمان رزرو",
    minWidth: "100px",
    selector: (row) => new Date(row.reserverDate).toLocaleDateString("fa-IR"),
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center text-truncate">
          <div className="d-flex flex-column text-truncate">
            <span className="text-truncate fw-bolder">
              {new Date(row.reserverDate).toLocaleDateString("fa-IR")}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    name: "وضعیت رزرو",
    minWidth: "100px",
    selector: (row) => row.accept,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center text-truncate">
          <div className="d-flex flex-column text-truncate">
            <Badge className="text-capitalize" color={statusColor[row.accept]}>
              {row.accept == true ? "تایید شده" : "تایید نشده"}
            </Badge>
          </div>
        </div>
      );
    },
  },
  {
    name: "پذیرفتن رزرو",
    minWidth: "100px",
    selector: (row) => row.accept,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center text-truncate">
          <div className="d-flex flex-column text-truncate">
            <Button
              onClick={async () => {
                // getting TeacherId
                const res = await row.GetCourseDetailApi(row.courseId);
                row.setTeacherId(res.teacherId);

                // Getting StudentId
                row.setStudentId(row.studentId);
                console.log(res);
              }}
              color="success"
            >
              پذیرفتن رزرو
            </Button>
          </div>
        </div>
      );
    },
  },
];

const ReserveList = ({ courseDetail }) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [reserverDetail, setReserverDetail] = useState([]);
  const [teacherId, setTeacherId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [courseGroupId, setCourseGroupId] = useState("");
  const [ref, setRef] = useState(false);
  const handleCourseReserver = async (id) => {
    const res = await GetCourseReserver(id);
    setReserverDetail(res);
  };

  useEffect(() => {
    if (courseDetail.courseId != undefined) {
      handleCourseReserver(courseDetail.courseId);
    }
  }, [courseDetail.courseId]);
  // course Group Id Catching
  const handleGroupId = async (teacherId) => {
    const res = await getCourseGroup(teacherId, courseDetail.courseId);
    console.log(res);
    setGroupId(res[0].groupId);
  };
  const handleGroupDetail = async (groupId) => {
    const res = await GetCourseGroupDetail(groupId);
    console.log(res);
    setCourseGroupId(res.courseGroupDto.groupId);
  };
  const handleAcceptReserve = async (courseGroupId, courseId, studentId) => {
    const res = await AcceptReserve({
      courseId: courseId,
      courseGroupId: courseGroupId,
      studentId: studentId,
    });
    setRef(!ref);
  };
  // useEffect(() => {
  //   if (studentId) console.log(studentId);
  // }, [studentId]);

  // Catchong Course Group Detail
  useEffect(() => {
    if (courseGroupId) {
      handleAcceptReserve(courseGroupId, courseDetail.courseId, studentId);
    }
  }, [courseGroupId]);

  useEffect(() => {
    if (teacherId) {
      handleGroupId(teacherId);
    }
  }, [teacherId]);

  // Catching GroupId
  useEffect(() => {
    if (groupId) {
      handleGroupDetail(groupId);
    }
  }, [groupId]);
  // Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(reserverDetail.length / rowsPerPage));

    // Course Detail useState

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
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

  return (
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
          data={reserverDetail.map((it) => {
            return {
              ...it,
              GetCourseDetailApi: GetCourseDetailApi,
              setTeacherId: setTeacherId,
              teacherId: teacherId,
              setStudentId: setStudentId,
              studentId: it.studentId,
              getCourseGroup: getCourseGroup,
              setGroupId: setGroupId,
            };
          })}
        />
      </div>
    </Card>
  );
};

export default ReserveList;
