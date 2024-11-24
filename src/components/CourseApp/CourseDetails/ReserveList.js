// ** Reactstrap Imports
import { Badge, Card, CardHeader, Progress, Button } from "reactstrap";

// ** Third Party Components
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Label Images
import xdLabel from "@src/assets/images/icons/brands/xd-label.png";
import vueLabel from "@src/assets/images/icons/brands/vue-label.png";
import htmlLabel from "@src/assets/images/icons/brands/html-label.png";
import reactLabel from "@src/assets/images/icons/brands/react-label.png";
import sketchLabel from "@src/assets/images/icons/brands/sketch-label.png";

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

const projectsArr = [
  {
    progress: 60,
    hours: "210:30h",
    progressColor: "info",
    totalTasks: "233/240",
    subtitle: "React Project",
    title: "BGC eCommerce App",
    img: reactLabel,
  },
  {
    hours: "89h",
    progress: 15,
    totalTasks: "9/50",
    progressColor: "danger",
    subtitle: "UI/UX Project",
    title: "Falcon Logo Design",
    img: xdLabel,
  },
  {
    progress: 90,
    hours: "129:45h",
    totalTasks: "100/190",
    progressColor: "success",
    subtitle: "Vuejs Project",
    title: "Dashboard Design",
    img: vueLabel,
  },
  {
    hours: "45h",
    progress: 49,
    totalTasks: "12/86",
    progressColor: "warning",
    subtitle: "iPhone Project",
    title: "Foodista mobile app",
    img: sketchLabel,
  },

  {
    progress: 73,
    hours: "67:10h",
    totalTasks: "234/378",
    progressColor: "info",
    subtitle: "React Project",
    title: "Dojo React Project",
    img: reactLabel,
  },
  {
    progress: 81,
    hours: "108:39h",
    totalTasks: "264/537",
    title: "HTML Project",
    progressColor: "success",
    subtitle: "Crypto Website",
    img: htmlLabel,
  },
  {
    progress: 78,
    hours: "88:19h",
    totalTasks: "214/627",
    progressColor: "success",
    subtitle: "Vuejs Project",
    title: "Vue Admin template",
    img: vueLabel,
  },
];

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
                console.log(row);
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
    setGroupId(res[0].groupId);
  };
  const handleGroupDetail = async (groupId) => {
    const res = await GetCourseGroupDetail(groupId);
    setCourseGroupId(res.courseUserListDto[0].courseGroupId);
  };
  const handleAcceptReserve = async (courseGroupId, courseId, studentId) => {
    await AcceptReserve({
      courseId: courseId,
      courseGroupId: courseGroupId,
      studentId: studentId,
    });
  };
  useEffect(() => {
    if (studentId) console.log(studentId);
  }, [studentId]);

  // Catchong Course Group Detail
  useEffect(() => {
    if (courseGroupId) {
      // handleAcceptReserve(courseGroupId, courseDetail.courseId, studentId);
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
              studentId: studentId,
              getCourseGroup: getCourseGroup,
              setGroupId: setGroupId,
            };
          })}
          // subHeaderComponent={
          //   <CustomHeader
          //     store={store}
          //     searchTerm={searchTerm}
          //     setSearchParams={setSearchParams}
          //     handleFilter={() => {}}
          //     handlePerRow={() => {}}
          //   />
          // }
        />
      </div>
    </Card>
  );
};

export default ReserveList;
