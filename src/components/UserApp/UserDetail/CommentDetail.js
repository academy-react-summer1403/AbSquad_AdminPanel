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
import { ThumbsDown, ThumbsUp } from "react-feather";
import { useForm } from "react-hook-form";
import { CourseCommentManagementApi } from "../../../@core/services/API/AllCoursesAdmin/CommentManagement/comment.manage.api";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

import { useParams } from "react-router-dom";
import { GetUserDetail } from "../../../@core/services/API/AllUsersAdmin/UserEdit/user.details.api";
import ReplyModal from "./ReplyComment";
import ReplyCommentList from "./ReplyCommentList";

const statusColor = {
  true: "success",
  false: "danger",
};

const UserCommentDetail = () => {
  const { id, uid } = useParams();
  // ** State

  const handleGetUser = async (id) => {
    const res = await GetUserDetail(id);
    setUserDetail(res);
  };
  useEffect(() => {
    if (uid) handleGetUser(uid);
  }, [uid]);

  //   Getting the specified detail
  const [commentDetail, setCommentDetail] = useState({});
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState(10);
  const [userDetail, setUserDetail] = useState({});
  const [show, setShow] = useState(false);
  // Getting Comments Api
  const handleGetCommentDetail = async (params) => {
    const res = await CourseCommentManagementApi({ ...params });
    setCount(res.totalCount);
    setComments(res.comments);
  };
  useEffect(() => {
    if (comments) {
      const arr = comments.find((it) => {
        return it.commentId == id;
      });
      setCommentDetail(arr);
    }
  }, [comments]);

  useEffect(() => {
    if (count && uid)
      handleGetCommentDetail({ userId: uid, RowsOfPage: count });
  }, [uid, count]);

  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  // ** render user img
  const renderUserImg = () => {
    return (
      <img
        height="210"
        width="210"
        alt="user-avatar"
        src={
          userDetail.currentPictureAddress
            ? userDetail.currentPictureAddress
            : "/ErrImg.jpg"
        }
        className="img-fluid rounded mt-3 mb-2"
      />
    );
  };

  return (
    <Fragment>
      {commentDetail && userDetail ? (
        <>
          <Card>
            <CardBody>
              <div className="user-avatar-section">
                <div className="d-flex align-items-center flex-column">
                  {renderUserImg()}
                  <div className="d-flex flex-column align-items-center text-center">
                    <div className="user-info">
                      <h4>
                        {commentDetail != null
                          ? commentDetail.userFullName
                          : "Eleanor Aguilar"}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-around my-2 pt-75">
                <div className="d-flex align-items-start me-2">
                  <Badge color="light-primary" className="rounded p-75">
                    <ThumbsUp className="font-medium-2" />
                  </Badge>
                  <div className="ms-75">
                    <h4 className="mb-0">{commentDetail.likeCount}</h4>
                    <small>تعداد لایک</small>
                  </div>
                </div>
                <div className="d-flex align-items-start">
                  <Badge color="light-primary" className="rounded p-75">
                    <ThumbsDown className="font-medium-2" />
                  </Badge>
                  <div className="ms-75">
                    <h4 className="mb-0">{commentDetail.dislikeCount}</h4>
                    <small>تعداد دیسلایک</small>
                  </div>
                </div>
              </div>
              <h4 className="fw-bolder border-bottom pb-50 mb-1">
                جزئیات کامنت
              </h4>
              <div className="info-container">
                {commentDetail !== null ? (
                  <ul className="list-unstyled">
                    <li className="mb-75">
                      <span className="fw-bolder me-25">عنوان کامنت : </span>
                      <span>{commentDetail.commentTitle}</span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">کامنت :</span>
                      <span>{commentDetail.describe}</span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">وضعیت کامنت:</span>
                      <Badge
                        className="text-capitalize"
                        color={statusColor[commentDetail.accept]}
                      >
                        {commentDetail.accept == true
                          ? "تایید شده"
                          : "تایید نشده"}
                      </Badge>
                    </li>
                  </ul>
                ) : null}
              </div>
              <div className="d-flex justify-content-center pt-2">
                <Button color="primary" onClick={() => setShow(true)}>
                  ریپلای
                </Button>
                <Button
                  className="ms-1"
                  color={commentDetail.accept == true ? "danger" : "success"}
                  onClick={() => {
                    handleActiveClick(commentDetail.accept);
                  }}
                >
                  {commentDetail.accept == true
                    ? "غیر فعال کردن دوره"
                    : "فعال کردن دوره"}
                </Button>
                <Button
                  className="ms-1"
                  color="danger"
                  outline
                  // onClick={() => {
                  //   handleDeleteComment({
                  //     data: { active: true, id: commentDetail.courseId },
                  //   });
                  // }}
                >
                  حذف کامنت
                </Button>
              </div>
            </CardBody>
            <ReplyModal
              show={show}
              setShow={setShow}
              commentId={commentDetail.commentId}
              userName={commentDetail.userFullName}
              commentTitle={commentDetail.commentTitle}
              describe={commentDetail.describe}
              courseId={commentDetail.courseId}
            />
          </Card>
          <ReplyCommentList
            commentId={commentDetail.commentId}
            courseId={commentDetail.courseId}
          />
        </>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default UserCommentDetail;
