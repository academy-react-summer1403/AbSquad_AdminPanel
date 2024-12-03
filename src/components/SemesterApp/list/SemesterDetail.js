// ** React Imports
import { useState, Fragment, useEffect } from "react";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Badge,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
} from "reactstrap";

// ** Third Party Components
import { ThumbsDown, ThumbsUp, Calendar } from "react-feather";
import { useForm } from "react-hook-form";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

import { useNavigate, useParams } from "react-router-dom";
import { GetSemesterDetailApi } from "../../../@core/services/API/Semester/get.semester.detail.api";
import EditSemesterModal from "../EditSemesterModal";
import CloseTermModal from "../CloseTermModal";
import UpdateCloseTermModal from "../UpdateCloseTermModal";
// import EditCommentModal from "./EditCommentModal";

const statusColor = {
  true: "success",
  false: "danger",
};

const SemesterDetail = () => {
  const { id } = useParams();
  // ** State
  const [refresh, setRefresh] = useState(false);
  const [semesterDetail, setSemesterDetail] = useState({});
  const [show, setShow] = useState(false);
  const [showCloseDate, setShowCloseDate] = useState(false);
  const [showUpdateCloseDate, setShowUpdateCloseDate] = useState(false);
  // ** Hook
  const handleGetSemesterDetail = async (id) => {
    const res = await GetSemesterDetailApi(id);
    setSemesterDetail(res);
  };
  useEffect(() => {
    if (id) {
      handleGetSemesterDetail(id);
    }
  }, [id]);

  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  // ** render user img
  const statusObj = {
    false: "light-success",
    true: "light-danger",
  };
  return (
    <Fragment>
      {semesterDetail ? (
        <>
          <Card>
            <CardBody>
              <div className="user-avatar-section">
                <div className="d-flex align-items-center flex-column">
                  <div className="d-flex flex-column align-items-center text-center">
                    <div className="user-info">
                      <h4>
                        {semesterDetail != null
                          ? semesterDetail.termName
                          : "Eleanor Aguilar"}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-around my-2 pt-75">
                <div className="d-flex align-items-start me-2">
                  <Badge color="light-primary" className="rounded p-75">
                    <Calendar className="font-medium-2" />
                  </Badge>
                  <div className="ms-75">
                    <h4 className="mb-0">
                      {new Date(semesterDetail.startDate).toLocaleDateString(
                        "fa-IR"
                      )}
                    </h4>
                    <small>تاریخ شروع</small>
                  </div>
                </div>
                <div className="d-flex align-items-start">
                  <Badge color="light-primary" className="rounded p-75">
                    <Calendar className="font-medium-2" />
                  </Badge>
                  <div className="ms-75">
                    <h4 className="mb-0">
                      {" "}
                      {new Date(semesterDetail.endDate).toLocaleDateString(
                        "fa-IR"
                      )}
                    </h4>
                    <small>تاریخ پایان</small>
                  </div>
                </div>
              </div>
              <h4 className="fw-bolder border-bottom pb-50 mb-1">جزئیات ترم</h4>
              <div className="info-container">
                {semesterDetail !== null ? (
                  <ul className="list-unstyled">
                    <li className="mb-75">
                      <span className="fw-bolder me-25">نام ساختمان : </span>
                      <span>{semesterDetail.departmentName}</span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">وضعیت ترم :</span>
                      <span>
                        {" "}
                        <Badge
                          className="text-capitalize"
                          color={statusObj[semesterDetail.expire]}
                          pill
                        >
                          {semesterDetail.expire ? "منقضی شده" : "جاری"}
                        </Badge>
                      </span>
                    </li>
                  </ul>
                ) : null}
              </div>
              <div className="d-flex justify-content-center pt-2">
                <Button
                  className="ms-1"
                  color={"warning"}
                  onClick={() => setShow(true)}
                >
                  ویرایش
                </Button>
                <Button
                  className="ms-1"
                  color={"primary"}
                  onClick={() => setShowCloseDate(true)}
                >
                  تاریخ بست
                </Button>
                <Button
                  className="ms-1"
                  color={"primary"}
                  onClick={() => setShowUpdateCloseDate(true)}
                >
                  ویرایش تاریخ بست
                </Button>
              </div>
            </CardBody>
            <EditSemesterModal
              show={show}
              setShow={setShow}
              setRefresh={setRefresh}
              refresh={refresh}
              semesterDetail={semesterDetail}
            />
            <CloseTermModal
              show={showCloseDate}
              setShow={setShowCloseDate}
              setRefresh={setRefresh}
              refresh={refresh}
              termId={id}
              semesterDetail={semesterDetail}
            />
            <UpdateCloseTermModal
              show={showUpdateCloseDate}
              setShow={setShowUpdateCloseDate}
              setRefresh={setRefresh}
              refresh={refresh}
              termId={id}
              semesterDetail={semesterDetail}
            />
          </Card>
        </>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default SemesterDetail;
