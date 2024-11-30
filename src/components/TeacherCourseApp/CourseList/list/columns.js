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
    subscriber: {
      class: "text-primary",
      icon: User,
    },
    "شروع ثبت نام": {
      class: "text-success",
      icon: Database,
    },
    editor: {
      class: "text-info",
      icon: Edit2,
    },
    author: {
      class: "text-warning",
      icon: Settings,
    },
    "منقضی شده": {
      class: "text-danger",
      icon: Slack,
    },
  };

  const Icon = roleObj[row.statusName] ? roleObj[row.statusName].icon : Edit2;

  return (
    <span className="text-truncate text-capitalize align-middle">
      <Icon
        size={18}
        className={`${
          roleObj[row.statusName] ? roleObj[row.statusName].class : ""
        } me-50`}
      />
      {row.statusName}
    </span>
  );
};

const statusObj = {
  false: "light-danger",
  true: "light-success",
  pending: "light-secondary",
};

export const columns = [
  {
    name: "نام دوره",
    sortable: true,
    minWidth: "178px",
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
            <span className="fw-bolder">{row.title}</span>
          </Link>
          <small className="text-truncate text-muted mb-0">
            {row.typeName}
          </small>
        </div>
      </div>
    ),
  },
  {
    name: "مدرس",
    sortable: true,
    minWidth: "172px",
    sortField: "role",
    selector: (row) => row.fullName,
    cell: (row) => (
      <span className="fw-bolder text-capitalize">{row.fullName}</span>
    ),
  },
  {
    name: "وضعیت برگذاری",
    sortable: true,
    minWidth: "172px",
    sortField: "role",
    selector: (row) => row.statusName,
    cell: (row) => renderRole(row),
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
    name: "وضعیت",
    minWidth: "178px",
    sortable: true,
    sortField: "billing",
    selector: (row) => row.isActive,
    cell: (row) => (
      <Badge className="text-capitalize" color={statusObj[row.isActive]} pill>
        {row.isActive ? "فعال" : "غیر فعال"}
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
                to={`/Course/CourseList/CourseDetail/${row.courseId}`}
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
            <DropdownItem
              onClick={() => {
                if (row.isdelete === false) {
                  row.handleDeleteCourse(true, row.courseId);
                } else {
                  row.handleDeleteCourse(false, row.courseId);
                }
              }}
              className="w-100"
            >
              {row.isdelete ? (
                <Upload size={14} className="me-50" />
              ) : (
                <Trash2 size={14} className="me-50" />
              )}
              <span className="align-middle">
                {row.isdelete ? "بارگذاری دوره" : "پاک کردن دوره"}
              </span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];
