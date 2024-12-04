// ** React Imports
import { Link, NavLink } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions

// ** Icons Imports
import { MoreVertical, FileText, Trash2, Archive, Eye } from "react-feather";
// Reserve Apis
import { getCourseGroup } from "../../../@core/services/API/AllCoursesAdmin/GetCourseDetail/get.coursegroup.api";
import { GetCourseGroupDetail } from "../../../@core/services/API/AllCoursesAdmin/GetCourseDetail/courseGroup.detail.api";
import { AcceptReserve } from "../../../@core/services/API/AllCoursesAdmin/GetCourseDetail/accept.reserve.api";
// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import { useEffect, useState } from "react";

// ** Renders Client Columns
const renderClient = (row) => {
  if (row) {
    return (
      <Avatar
        className="me-1"
        img={row.tumbImageAddress ? row.tumbImageAddress : "/ErrImg.jpg"}
        width="32"
        height="32"
      />
    );
  } else {
    return (
      <Avatar
        initials
        className="me-1"
        color={"light-primary"}
        content={courseDetail.title || "John Doe"}
      />
    );
  }
};

const statusObj = {
  true: "light-success",
  false: "light-danger",
};

export const ReserveCol = [
  {
    name: "نام دوره",
    sortable: true,
    minWidth: "300px",
    sortField: "fullName",
    selector: (row) => row.title,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {renderClient(row)}
        <div className="d-flex flex-column">
          <Link
            to={`/Course/CourseList/CourseDetail/${row.courseId}`}
            className="user_name text-truncate text-body"
          >
            <span className="fw-bolder">{row.courseName}</span>
          </Link>
        </div>
      </div>
    ),
  },
  {
    name: "زمان رزرو",
    sortable: true,
    minWidth: "250px",
    sortField: "role",
    selector: (row) => row.reserverDate,
    cell: (row) => (
      <span className="fw-bolder text-capitalize">
        {new Date(row.reserverDate).toLocaleDateString("fa-IR")}
      </span>
    ),
  },
  {
    name: "وضعیت رزرو",
    minWidth: "100px",
    sortable: true,
    sortField: "status",
    selector: (row) => row.accept,
    cell: (row) => (
      <Badge className="text-capitalize" color={statusObj[row.accept]} pill>
        {row.accept == true ? "فعال" : "غیرفعال"}
      </Badge>
    ),
  },
  {
    name: "نمایش جزییات",
    sortable: true,
    minWidth: "100px",
    sortField: "role",
    selector: (row) => row.lastUpdate,
    cell: (row) => (
      <NavLink
        className="fw-bolder text-capitalize"
        to={`/Course/CourseList/CourseDetail/${row.courseId}`}
      >
        <Eye color="green" />
      </NavLink>
    ),
  },
  {
    name: "پذیرفتن رزرو",
    minWidth: "100px",
    selector: (row) => row.accept,
    cell: (row) => {
      // **********************************************************
      // Course Reserve Part
      const [reserverDetail, setReserverDetail] = useState([]);
      const [teacherId, setTeacherId] = useState("");
      const [studentId, setStudentId] = useState("");
      const [groupId, setGroupId] = useState("");
      const [courseGroupId, setCourseGroupId] = useState("");

      const handleGroupId = async (teacherId) => {
        const res = await getCourseGroup(teacherId, row.courseId);
        console.log(res);
        setGroupId(res[0].groupId);
      };
      const handleGroupDetail = async (groupId) => {
        const res = await GetCourseGroupDetail(groupId);
        setCourseGroupId(res.courseGroupDto.groupId);
      };
      const handleAcceptReserve = async (
        courseGroupId,
        courseId,
        studentId
      ) => {
        await AcceptReserve({
          courseId: courseId,
          courseGroupId: courseGroupId,
          studentId: studentId,
        });
      };

      useEffect(() => {
        if (courseGroupId) {
          handleAcceptReserve(courseGroupId, row.courseId, studentId);
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
      // End OF Reserve Part
      // ****************************************************8
      return (
        <div className="d-flex justify-content-left align-items-center text-truncate">
          <div className="d-flex flex-column text-truncate">
            <Button
              onClick={async () => {
                // getting TeacherId
                const res = await row.GetCourseDetailApi(row.courseId);
                setTeacherId(res.teacherId);
                handleGroupId(teacherId);
                // Getting StudentId
                setStudentId(row.studentId);
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
