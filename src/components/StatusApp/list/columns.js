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
  Button,
} from "reactstrap";
import { useState } from "react";
import { EditStatus } from "../EditStatus";
import { DetailStatus } from "../DetailStatus";
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
    name: "نام وضعیت",
    sortable: true,
    minWidth: "178px",
    sortField: "fullName",
    selector: (row) => row.statusName,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {renderClient(row)}
        <div className="d-flex flex-column">
          <Link className="user_name text-truncate text-body">
            <span className="fw-bolder">{row.statusName}</span>
          </Link>
        </div>
      </div>
    ),
  },
  {
    name: "درباره وضعیت",
    sortable: true,
    minWidth: "172px",
    sortField: "role",
    selector: (row) => row.describe,
    cell: (row) => (
      <span className="fw-bolder text-capitalize">{row.describe}</span>
    ),
  },
  {
    name: "Actions",
    minWidth: "100px",
    cell: (row) => {
      const [showEdit, setShowEdit] = useState(false);
      const [showDetail, setShowDetail] = useState(false);
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
          <EditStatus
            show={showEdit}
            setShow={setShowEdit}
            id={row.id}
            statusName={row.statusName}
            describe={row.describe}
            statusNumber={row.statusNumber}
          />
          <DetailStatus
            show={showDetail}
            setShow={setShowDetail}
            statusName={row.statusName}
            describe={row.describe}
          />
        </div>
      );
    },
  },
];