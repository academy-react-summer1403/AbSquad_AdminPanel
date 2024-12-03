// ** React Imports
import { Link, NavLink } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions

// ** Icons Imports
import { MoreVertical, FileText, Trash2, Archive, Eye } from "react-feather";

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";

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
        content={row.title || "John Doe"}
      />
    );
  }
};

const statusObj = {
  True: "light-success",
  False: "light-danger",
};

export const CourseCol = [
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
    name: "اخرین به روزرسانی",
    sortable: true,
    minWidth: "250px",
    sortField: "role",
    selector: (row) => row.lastUpdate,
    cell: (row) => (
      <span className="fw-bolder text-capitalize">
        {new Date(row.lastUpdate).toLocaleDateString("fa-IR")}
      </span>
    ),
  },
  {
    name: "نمایش جزییات",
    sortable: true,
    minWidth: "250px",
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
];
