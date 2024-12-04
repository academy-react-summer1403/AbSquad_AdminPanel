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

import { useState } from "react";
import { EditDepartment } from "../EditDepartment";
import { DetailDepartment } from "../DetailDepartment";

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

const statusObj = {
  false: "light-success",
  true: "light-danger",
};

export const columns = [
  {
    name: "نام دپارتمان",
    sortable: true,
    minWidth: "178px",
    sortField: "fullName",
    selector: (row) => row.depName,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <span className="user_name text-truncate text-body">
            <span className="fw-bolder">{row.depName}</span>
          </span>
        </div>
      </div>
    ),
  },
  {
    name: "نام ساختمان",
    sortable: true,
    minWidth: "178px",
    sortField: "fullName",
    selector: (row) => row.buildingName,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <span className="user_name text-truncate text-body">
            <span className="fw-bolder">{row.buildingName}</span>
          </span>
        </div>
      </div>
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
          <EditDepartment
            show={showEdit}
            setShow={setShowEdit}
            id={row.id}
            depName={row.depName}
            buildingId={row.buildingId}
          />
          <DetailDepartment
            show={showDetail}
            setShow={setShowDetail}
            depName={row.depName}
            buildingName={row.buildingName}
            insertDate={row.insertDate}
          />
        </div>
      );
    },
  },
];
