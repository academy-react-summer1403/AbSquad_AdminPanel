// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";
import { GetCourseDetailApi } from "../../../../@core/services/API/AllCoursesAdmin/GetCourseDetail/get.course.detail.api";

// ** Icons Imports
import {
  Slack,
  Settings,
  Edit2,
  MoreVertical,
  FileText,
  Archive,
} from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useEffect, useState } from "react";
import { EditAssistant } from "../EditAssistant";
import { DetailAssistant } from "../DetailAssistant";
import { GetTeacherDetailApi } from "../../../../@core/services/API/AllCoursesTeacher/get.teacher.detail.api";
// Scroll Modal

// ** Renders Client Columns
const renderClient = (row, courseDetail) => {
  if (row) {
    return (
      <Avatar
        className="me-1"
        img={
          courseDetail.imageAddress ? courseDetail.imageAddress : "/ErrImg.jpg"
        }
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
        content={row.fullName || "John Doe"}
      />
    );
  }
};

// ** Renders Role Columns

const statusObj = {
  false: "light-success",
  true: "light-danger",
};

export const columns = [
  {
    name: "نام دوره",
    sortable: true,
    minWidth: "178px",
    sortField: "fullName",
    selector: (row) => row.courseName,
    cell: (row) => {
      const [courseDetail, setCourseDetail] = useState({});
      useEffect(() => {
        const handleGetCourseDetail = async (id) => {
          const res = await GetCourseDetailApi(id);
          setCourseDetail(res);
        };
        if (row.courseId) handleGetCourseDetail(row.courseId);
      }, [row.courseId]);
      return (
        <div className="d-flex justify-content-left align-items-center">
          {renderClient(row, courseDetail)}
          <div className="d-flex flex-column">
            <Link className="user_name text-truncate text-body">
              <span className="fw-bolder">{row.courseName}</span>
            </Link>
          </div>
        </div>
      );
    },
  },
  {
    name: "نام دستیار",
    sortable: true,
    minWidth: "178px",
    sortField: "fullName",
    selector: (row) => row.assistanceName,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <div className="d-flex flex-column">
            <Link className="user_name text-truncate text-body">
              <span className="fw-bolder">{row.assistanceName}</span>
            </Link>
          </div>
        </div>
      );
    },
  },
  {
    name: "نام استاد",
    sortable: true,
    minWidth: "178px",
    sortField: "fullName",
    selector: (row) => row.assistanceName,
    cell: (row) => {
      const [teacherDetail, setTeacherDetail] = useState({});
      useEffect(() => {
        const handleGetCourseDetail = async (id) => {
          const res = await GetTeacherDetailApi({ TeacherId: id });
          setTeacherDetail(res);
        };
        if (row.teacherId) handleGetCourseDetail(row.teacherId);
      }, [row.teacherId]);
      return (
        <div className="d-flex justify-content-left align-items-center">
          <div className="d-flex flex-column">
            <Link className="user_name text-truncate text-body">
              <span className="fw-bolder">
                {teacherDetail ? teacherDetail.fullName : ""}
              </span>
            </Link>
          </div>
        </div>
      );
    },
  },
  {
    name: "Actions",
    minWidth: "100px",
    cell: (row) => {
      const [showEdit, setShowEdit] = useState(false);
      const [showDetail, setShowDetail] = useState(false);
      const [teacherDetail, setTeacherDetail] = useState({});
      useEffect(() => {
        const handleGetCourseDetail = async (id) => {
          const res = await GetTeacherDetailApi({ TeacherId: id });
          setTeacherDetail(res);
        };
        if (row.teacherId) handleGetCourseDetail(row.teacherId);
      }, [row.teacherId]);
      return (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem className="w-100">
                <FileText size={14} className="me-50" />
                <span
                  className="align-middle"
                  onClick={() => {
                    setShowDetail(true);
                    row.setRefresh(!row.refresh);
                  }}
                >
                  جزئیات
                </span>
              </DropdownItem>
              <DropdownItem className="w-100">
                <Archive size={14} className="me-50" />
                <span
                  className="align-middle"
                  onClick={() => {
                    setShowEdit(true);
                  }}
                >
                  ویرایش
                </span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          {teacherDetail && (
            <EditAssistant
              show={showEdit}
              setShow={setShowEdit}
              id={row.id}
              courseId={row.courseId}
              userId={row.userId}
              courses={row.courses}
              user={row.user}
            />
          )}
          {teacherDetail && (
            <DetailAssistant
              show={showDetail}
              setShow={setShowDetail}
              courseName={row.courseName}
              assistanceName={row.assistanceName}
              teacherName={teacherDetail.fullName}
            />
          )}
        </div>
      );
    },
  },
];
