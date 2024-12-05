// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

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
import { EditCourseSocialGroup } from "../EditCourseSocialGroup";
import { DetailCourseSocialGroup } from "../DetailCourseSocialGroup";
import { GetCourseDetailApi } from "../../../@core/services/API/AllCoursesAdmin/GetCourseDetail/get.course.detail.api";

// Scroll Modal

// ** Renders Client Columns
const renderClient = (row) => {
  if (row) {
    return (
      <Avatar
        className="me-1"
        img={row.imageAddress ? row.imageAddress : "/ErrImg.jpg"}
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

const statusObj = {
  false: "light-success",
  true: "light-danger",
};

export const columns = [
  {
    name: "نام گروه",
    sortable: true,
    minWidth: "178px",
    sortField: "fullName",
    selector: (row) => row.groupName,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {renderClient(row)}
        <div className="d-flex flex-column">
          <Link className="user_name text-truncate text-body">
            <span className="fw-bolder">{row.groupName}</span>
          </Link>
        </div>
      </div>
    ),
  },
  {
    name: "لینک گروه",
    sortable: true,
    minWidth: "178px",
    sortField: "fullName",
    selector: (row) => row.groupLink,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <Link className="user_name text-truncate text-body">
            <span className="fw-bolder">{row.groupLink}</span>
          </Link>
        </div>
      </div>
    ),
  },
  {
    name: "نام دوره",
    sortable: true,
    minWidth: "178px",
    sortField: "fullName",
    selector: (row) => row.courseId,
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
          <div className="d-flex flex-column">
            <Link className="user_name text-truncate text-body">
              <span className="fw-bolder">
                {courseDetail ? courseDetail.title : ""}
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
      const [courseDetail, setCourseDetail] = useState({});
      useEffect(() => {
        const handleGetCourseDetail = async (id) => {
          const res = await GetCourseDetailApi(id);
          setCourseDetail(res);
        };
        if (row.courseId) handleGetCourseDetail(row.courseId);
      }, [row.courseId]);

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
          <EditCourseSocialGroup
            show={showEdit}
            setShow={setShowEdit}
            id={row.id}
            groupName={row.groupName}
            groupLink={row.groupLink}
            courseId={row.courseId}
          />
          <DetailCourseSocialGroup
            show={showDetail}
            setShow={setShowDetail}
            groupName={row.groupName}
            groupLink={row.groupLink}
            courseName={courseDetail.title}
          />
        </div>
      );
    },
  },
];
