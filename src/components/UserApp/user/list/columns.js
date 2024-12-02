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
        content={row.fname || "John Doe"}
      />
    );
  }
};

const statusObj = {
  True: "light-success",
  False: "light-danger",
};

export const columns = [
  {
    name: "نام",
    sortable: true,
    minWidth: "200px",
    sortField: "fullName",
    selector: (row) => row.fname,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <Link
            to={`/apps/user/view/${row.id}`}
            className="user_name text-truncate text-body"
            onClick={() => {}}
          >
            <span className="fw-bolder">
              {row.fname}
              {" " + row.lname}
            </span>
          </Link>
        </div>
      </div>
    ),
  },
  {
    name: "ایمیل",
    sortable: true,
    minWidth: "250px",
    sortField: "role",
    selector: (row) => row.fname,
    cell: (row) => (
      <span className="fw-bolder text-capitalize">{row.gmail}</span>
    ),
  },
  {
    name: "شماره موبایل",
    minWidth: "138px",
    sortable: true,
    sortField: "currentPlan",
    selector: (row) => row.fname,
    cell: (row) => <span className="text-capitalize">{row.phoneNumber}</span>,
  },
  {
    name: "تاریخ",
    minWidth: "140px",
    sortable: true,
    sortField: "billing",
    selector: (row) => row.fname,
    cell: (row) => (
      <span className="text-capitalize">
        {new Date(row.insertDate).toLocaleDateString("fa-IR")}
      </span>
    ),
  },
  {
    name: "وضعیت کاربر",
    minWidth: "100px",
    sortable: true,
    sortField: "status",
    selector: (row) => row.fname,
    cell: (row) => (
      <Badge className="text-capitalize" color={statusObj[row.active]} pill>
        {row.active == "True" ? "فعال" : "غیرفعال"}
      </Badge>
    ),
  },
  {
    name: "مدیریت",
    minWidth: "100px",
    cell: (row) => (
      <div className="column-action ">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className="w-100"
              to={`/UserList/UserDetail/${row.id}`}
            >
              <FileText size={14} className="me-50" />
              <NavLink
                to={`/UserList/UserDetail/${row.id}`}
                className="align-middle"
                onClick={() => {}}
              >
                جزئیات
              </NavLink>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => e.preventDefault()}
            >
              <Archive size={14} className="me-50" />
              <NavLink
                to={`/UserList/EditUser/${row.id}`}
                className="align-middle"
                onClick={() => {}}
              >
                ویرایش
              </NavLink>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
  {
    name: "",
    minWidth: "138px",
    sortable: true,
    sortField: "status",
    selector: (row) => row.fname,
    cell: (row) => (
      <div className="d-flex justify-content-right align-items-center text-truncate">
        <Button
          onClick={() => {
            row.handleAddRole(true, { roleId: "5", userId: row.id });
          }}
          color="warning"
        >
          دسترسی
        </Button>
        <Button
          onClick={() => {
            row.handleDeleteUser({ userId: row.id });
          }}
          color="danger"
        >
          حذف
        </Button>
      </div>
    ),
  },
];
