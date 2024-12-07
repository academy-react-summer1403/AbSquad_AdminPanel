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
  Badge,
} from "reactstrap";
import { useState } from "react";
import { EditAssistanceWork } from "../EditAssistanceWork";
import { DetailAssistanceWork } from "../DetailAssistanceWork";
// Scroll Modal

// ** Renders Client Columns

const statusObj = {
  true: "light-success",
  false: "light-danger",
};

export const columns = [
  {
    name: "عنوان کار",
    sortable: true,
    minWidth: "178px",
    sortField: "worktitle",
    selector: (row) => row.worktitle,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <span className="user_name text-truncate text-body">
            <span className="fw-bolder">{row.worktitle}</span>
          </span>
        </div>
      </div>
    ),
  },
  {
    name: "شرح کار",
    sortable: true,
    minWidth: "250px",
    sortField: "workDescribe",
    selector: (row) => row.workDescribe,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <span className="user_name text-truncate text-body">
            {row.workDescribe}
          </span>
        </div>
      </div>
    ),
  },
  {
    name: "نام دوره",
    sortable: true,
    minWidth: "200px",
    sortField: "courseName",
    selector: (row) => row.courseName,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <Link className="user_name text-truncate text-body">
            <span className="fw-bolder">{row.courseName}</span>
          </Link>
        </div>
      </div>
    ),
  },
  {
    name: "تاریخ کار",
    sortable: true,
    minWidth: "150px",
    sortField: "workDate",
    selector: (row) => row.workDate,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <span className="user_name text-truncate text-body">
            {new Date(row.workDate).toLocaleDateString("fa-IR")}
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
          <EditAssistanceWork
            show={showDetail}
            setShow={setShowDetail}
            active={row.active}
            AssistanceWorkName={row.assistanceName}
            workDate={row.workDate}
            courseName={row.courseName}
            inserDate={row.inserDate}
            worktitle={row.worktitle}
          />
          <DetailAssistanceWork
            show={showDetail}
            setShow={setShowDetail}
            active={row.active}
            AssistanceWorkName={row.assistanceName}
            workDate={row.workDate}
            courseName={row.courseName}
            inserDate={row.inserDate}
            worktitle={row.worktitle}
            assistanceId={row.assistanceId}
          />
        </div>
      );
    },
  },
];
