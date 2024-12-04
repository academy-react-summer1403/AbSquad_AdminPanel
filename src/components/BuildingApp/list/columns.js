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
import { EditBuilding } from "../EditBuilding";
import { DetailBuilding } from "../DetailBuilding";
// Scroll Modal

// ** Renders Client Columns

const statusObj = {
  true: "light-success",
  false: "light-danger",
};

export const columns = [
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
    name: "تعداد طبقات",
    sortable: true,
    minWidth: "178px",
    sortField: "fullName",
    selector: (row) => row.floor,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <Link className="user_name text-truncate text-body">
            <span className="fw-bolder">{row.floor}</span>
          </Link>
        </div>
      </div>
    ),
  },
  {
    name: "ظرفیت کلاس",
    sortable: true,
    minWidth: "178px",
    sortField: "fullName",
    selector: (row) => row.active,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <span className="user_name text-truncate text-body">
            <Badge
              className="text-capitalize"
              color={statusObj[row.active]}
              pill
            >
              {row.active ? "فعال" : "غیر فعال"}
            </Badge>
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
          <EditBuilding
            show={showEdit}
            setShow={setShowEdit}
            buildingId={row.id}
            active={row.active}
            buildingName={row.buildingName}
            workDate={row.workDate}
            floor={row.floor}
            latitude={row.latitude}
            longitude={row.longitude}
          />
          <DetailBuilding
            show={showDetail}
            setShow={setShowDetail}
            active={row.active}
            buildingName={row.buildingName}
            workDate={row.workDate}
            floor={row.floor}
            latitude={row.latitude}
            longitude={row.longitude}
          />
        </div>
      );
    },
  },
];
