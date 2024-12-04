// ** React Imports
import { Link, NavLink } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions

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
  Archive,
} from "react-feather";

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import { toggleNewsStatusAPI } from "../../../@core/services/API/AllNewsAdmin/AcitveAndDeactiveNews/toggleNewsStatusAPI";

// ** Renders Client Columns

const renderClient = (row) => {
  console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
  if (row) {
    return (
      <Avatar
        className="me-1"
        img={row.pictureAddress ? row.pictureAddress : "/ErrImg.jpg"}
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

// ** Renders Role Columns
const renderRole = (row) => {
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

  const Icon = roleObj[row.title] ? roleObj[row.title].icon : Edit2;

  return (
    <span className="text-truncate text-capitalize align-middle">
      <Icon
        size={18}
        className={`${
          roleObj[row.title] ? roleObj[row.title].class : ""
        } me-50`}
      />
      {row.title}
    </span>
  );
};

const statusObj = {
  pending: "light-warning",
  active: "light-success",
  inactive: "light-secondary",
};

export const columns = [
  {
    name: "تصویر",
    sortable: true,
    minWidth: "300px",
    sortField: "fullName",
    selector: (row) => row.title,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {renderClient(row)}
        <div className="d-flex flex-column">
          <span className="fw-bolder">{row.categoryName}</span>
          <small className="text-truncate text-muted mb-0">{row.title}</small>
        </div>
      </div>
    ),
  },
  {
    name: " نام دسته بندی",
    sortable: true,
    minWidth: "172px",
    sortField: "role",
    selector: (row) => row.title,
    cell: (row) => (
      <span className="fw-bolder text-capitalize">{row.categoryName}</span>
    ),
  },
  {
    name: "عدد دسته بندی",
    minWidth: "138px",
    sortable: true,
    sortField: "currentPlan",
    selector: (row) => row.title,
    cell: (row) => <span className="text-capitalize">{row.id}</span>,
  },
  {
    name: "اخرین اپدیت",
    minWidth: "138px",
    sortable: true,
    sortField: "currentPlan",
    selector: (row) => row.title,
    cell: (row) => <span className="text-capitalize">{row.insertDate}</span>,
  },
  {
    name: "انجام عملیات",
    minWidth: "100px",
    cell: (row) => (
      <div className="column-action d-flex">
        <div>
          <NavLink to="/Artcle/AddNewNewsCategory">
            <button
              style={{
                backgroundColor: "pink",
                color: "black",
                padding: "10px",
                border: "none",
                cursor: "pointer",
                borderRadius: "16px",
              }}
            >
              ویرایش
            </button>
          </NavLink>
        </div>
      </div>
    ),
  },
];
