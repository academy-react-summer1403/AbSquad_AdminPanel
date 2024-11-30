// ** React Imports
import { Link } from "react-router-dom";

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
    sortField: "status",
    selector: (row) => row.title,
    cell: (row) => (
      <Badge className="text-capitalize" color={statusObj[row.title]} pill>
        {row.isActive}
      </Badge>
    ),
  },
  {
    name: "انجام عملیات",
    minWidth: "100px",
    cell: (row) => (
      <div className="column-action">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className="w-100"
              to={`/apps/user/view/${row.id}`}
            >
              <FileText size={14} className="me-50" />
              <span className="align-middle">Details</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => e.preventDefault()}
            >
              <Archive size={14} className="me-50" />
              <span className="align-middle">Edit</span>
            </DropdownItem>
            <DropdownItem tag="a" href="/" className="w-100" onClick={() => {}}>
              <Trash2 size={14} className="me-50" />
              <span className="align-middle">Delete</span>
            </DropdownItem>
          </DropdownMenu>
          <Button>hi</Button>
        </UncontrolledDropdown>
      </div>
    ),
  },
];
