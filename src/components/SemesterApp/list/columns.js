// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";
import { NavLink } from "react-router-dom";
// ** Icons Imports
import {
  Slack,
  User,
  Settings,
  Database,
  Edit2,
  MoreVertical,
  FileText,
  Trash2,
  Upload,
  Archive,
} from "react-feather";

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useState } from "react";
// Scroll Modal

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
        content={row.fullName || "John Doe"}
      />
    );
  }
};

// ** Renders Role Columns
const renderRole = (row) => {
  const [scrollModal, setScrollModal] = useState(false);
  const roleObj = {
    true: {
      class: "text-warning",
      icon: Settings,
    },
    "منقضی شده": {
      class: "text-danger",
      icon: Slack,
    },
  };

  const Icon = roleObj[row.expire] ? roleObj[row.expire].icon : Edit2;

  return (
    <span className="text-truncate text-capitalize align-middle">
      <Icon
        size={18}
        className={`${
          roleObj[row.expire] ? roleObj[row.expire].class : ""
        } me-50`}
      />
      {row.expire}
    </span>
  );
};

const statusObj = {
  false: "light-success",
  true: "light-danger",
};

export const columns = [
  {
    name: "نام ترم",
    sortable: true,
    minWidth: "178px",
    sortField: "fullName",
    selector: (row) => row.termName,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {renderClient(row)}
        <div className="d-flex flex-column">
          <Link
            to={`/Course/CourseList/CourseDetail/${row.courseId}`}
            className="user_name text-truncate text-body"
          >
            <span className="fw-bolder">{row.termName}</span>
          </Link>
        </div>
      </div>
    ),
  },
  {
    name: "نام ساختمان",
    sortable: true,
    minWidth: "172px",
    sortField: "role",
    selector: (row) => row.departmentName,
    cell: (row) => (
      <span className="fw-bolder text-capitalize">{row.departmentName}</span>
    ),
  },
  {
    name: "قیمت",
    minWidth: "138px",
    sortable: true,
    sortField: "currentPlan",
    selector: (row) => row.cost,
    cell: (row) => (
      <span className="text-capitalize">
        {parseInt(row.cost).toLocaleString()} تومان
      </span>
    ),
  },
  {
    name: " انقضا وضعیت",
    minWidth: "178px",
    sortable: true,
    sortField: "billing",
    selector: (row) => row.expire,
    cell: (row) => (
      <Badge className="text-capitalize" color={statusObj[row.expire]} pill>
        {row.expire ? "منقضی شده" : "جاری"}
      </Badge>
    ),
  },
  {
    name: "وضعیت حذف",
    minWidth: "138px",
    sortable: true,
    sortField: "status",
    selector: (row) => row.isdelete,
    cell: (row) => (
      <Badge className="text-capitalize" color={statusObj[row.isdelete]} pill>
        {row.isdelete ? "حذف شده" : "حذف نشده"}
      </Badge>
    ),
  },
  {
    name: "Actions",
    minWidth: "100px",
    cell: (row) => (
      <div className="column-action">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem className="w-100">
              <FileText size={14} className="me-50" />
              <NavLink
                to={`/MetaData/Semester/SemesterDetail/${row.departmentId}`}
                className="align-middle"
                onClick={() => {
                  row.setRefresh(!row.refresh);
                }}
              >
                جزئیات
              </NavLink>
            </DropdownItem>
            <DropdownItem className="w-100">
              <Archive size={14} className="me-50" />
              <NavLink
                to={`/Course/EditCourse/${row.courseId}`}
                className="align-middle"
                onClick={() => {
                  row.setRefresh(!row.refresh);
                }}
              >
                ویرایش
              </NavLink>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];