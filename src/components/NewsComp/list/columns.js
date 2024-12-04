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
        // img={row.pictureAddress ? row.pictureAddress : "/ErrImg.jpg"}
        img={"/ErrImg.jpg"}
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
const handleToggleStatus = async (row) => {
  try {
    await toggleNewsStatusAPI(row.id, row.isActive);
    alert("انجام شد");
    row.isActive = !row.isActive;
  } catch (error) {
    console.error("Error toggling status:", error);
    alert("Failed to toggle status.");
  }
};

export const columns = [
  {
    name: "نام بلاگ",
    sortable: true,
    minWidth: "300px",
    sortField: "fullName",
    selector: (row) => row.title,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {/* {renderClient(row)} */}
        <div className="d-flex flex-column">
          <Link
            to={`/apps/user/view/${row.id}`}
            className="user_name text-truncate text-body"
            onClick={() => {}}
          >
            <span className="fw-bolder">{row.title}</span>
          </Link>
          <small className="text-truncate text-muted mb-0">{row.title}</small>
        </div>
      </div>
    ),
  },
  {
    name: "دسته بندی",
    sortable: true,
    minWidth: "172px",
    sortField: "role",
    selector: (row) => row.title,
    cell: (row) => (
      <span className="fw-bolder text-capitalize">{row.newsCatregoryName}</span>
    ),
  },
  {
    name: "اخرین اپدیت",
    minWidth: "138px",
    sortable: true,
    sortField: "currentPlan",
    selector: (row) => row.title,
    cell: (row) => <span className="text-capitalize">{row.updateDate}</span>,
  },
  {
    name: "تعداد بازدید",
    minWidth: "230px",
    sortable: true,
    sortField: "billing",
    selector: (row) => row.title,
    cell: (row) => <span className="text-capitalize">{row.currentView}</span>,
  },
  {
    name: "وضیعت",
    minWidth: "138px",
    sortable: true,
    sortField: "isActive",
    selector: (row) => row.isActive,
    cell: (row) => (
      <div
        style={{
          backgroundColor: row.isActive ? "green" : "red",
          color: "white",
          padding: "6px 12px 6px 12px",
          borderRadius: "16px",
        }}
      >
        {`${row.isActive}`}
      </div>
    ),
  },
  {
    name: "انجام عملیات",
    minWidth: "100px",
    cell: (row) => (
      <div className="column-action d-flex">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className="w-100"
              to={`/Artcle/NewsDetails/${row.id}`}
            >
              <FileText size={14} className="me-50" />
              <span className="align-middle">جزئیات</span>
            </DropdownItem>

            <DropdownItem
              tag={Link}
              to={`/Artcle/EditNews/${row.id}`}
              className="w-100"
            >
              <Archive size={14} className="me-50" />
              <span className="align-middle">ویرایش</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <div>
          <button
            onClick={() => handleToggleStatus(row)} // Pass row as argument
            style={{
              backgroundColor: row.isActive ? "red" : "green",
              color: "white",
              padding: "10px",
              border: "none",
              cursor: "pointer",
              borderRadius: "16px",
            }}
          >
            {row.isActive ? "غیرفعال کن" : "فعال کن"}{" "}
            {/* Dynamic button text */}
          </button>
        </div>
      </div>
    ),
  },
];
