// ** Reactstrap Imports
import { Badge, Card, Button } from "reactstrap";

// ** Third Party Components
import {
  ChevronDown,
  CheckCircle,
  MinusCircle,
  MessageCircle,
} from "react-feather";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
// ** Custom Components
import Avatar from "@components/avatar";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useEffect, useState } from "react";
import { GetReplyComments } from "../../../@core/services/API/AllUsersAdmin/Comment/get.reply.comment.api";
import { GetCourseDetailApi } from "../../../@core/services/API/AllCoursesAdmin/GetCourseDetail/get.course.detail.api";
import { AcceptCourseCommentApi } from "../../../@core/services/API/AllCoursesAdmin/CommentManagement/accept.comment.api";
import { RejectCourseCommentApi } from "../../../@core/services/API/AllCoursesAdmin/CommentManagement/reject.comment.api";
import ReplyModal from "./ReplyComment";
import { NavLink } from "react-router-dom";
const statusColor = {
  true: "success",
  false: "danger",
};

export const columns = [
  {
    sortable: true,
    minWidth: "100px",
    name: "نام دوره",
    selector: (row) => row.courseTitle,
    cell: (row) => {
      const [courseDetail, setCourseDetail] = useState({});
      const handleCourseDetail = async (id) => {
        const res = await GetCourseDetailApi(id);
        setCourseDetail(res);
      };

      useEffect(() => {
        if (courseDetail) console.log(courseDetail);
      }, [courseDetail]);
      useEffect(() => {
        if (row.courseId) handleCourseDetail(row.courseId);
      }, [row.courseId]);

      return (
        <div className="d-flex justify-content-left align-items-center">
          <div className="avatar-wrapper">
            <Avatar
              className="me-1"
              img={
                courseDetail.imageAddress
                  ? courseDetail.imageAddress
                  : "/ErrImg.jpg"
              }
              alt={row.title}
              imgWidth="32"
            />
          </div>
          <NavLink
            to={`/UserList/UserCommentDetail/${row.id}/${row.userId}`}
            className="d-flex flex-column"
          >
            <span className="text-truncate fw-bolder">
              {courseDetail.title}
            </span>
          </NavLink>
        </div>
      );
    },
  },
  {
    name: "نام کاربر",
    minWidth: "100px",
    selector: (row) => row.author,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center text-truncate">
          <div className="d-flex flex-column text-truncate">
            <span className="text-truncate fw-bolder">{row.author}</span>
          </div>
        </div>
      );
    },
  },
  {
    name: "کامنت کاربر",
    minWidth: "100px",
    selector: (row) => row.title,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center text-truncate">
          <div className="d-flex flex-column text-truncate">
            <span className="text-truncate fw-bolder">{row.title}</span>
          </div>
        </div>
      );
    },
  },
  {
    name: "وضعیت تایید",
    minWidth: "100px",
    selector: (row) => row.accept,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center text-truncate">
          <div className="d-flex flex-column text-truncate">
            <Badge className="text-capitalize" color={statusColor[row.accept]}>
              {row.accept == true ? "تایید شده" : "تایید نشده"}
            </Badge>
          </div>
        </div>
      );
    },
  },
  {
    name: "ریپلای",
    minWidth: "100px",
    selector: (row) => row.courseId,
    cell: (row) => {
      const [show, setShow] = useState(false);
      return (
        <div className="d-flex justify-content-left align-items-center text-truncate">
          <div className="d-flex flex-row text-truncate">
            <Button
              onClick={() => {
                setShow(true);
              }}
              color="primary"
            >
              <MessageCircle />
            </Button>
          </div>
          <ReplyModal
            show={show}
            setShow={setShow}
            userName={row.author}
            commentTitle={row.title}
            describe={row.describe}
            courseId={row.courseId}
            commentId={row.id}
          />
        </div>
      );
    },
  },
  {
    name: "عملیات تایید",
    minWidth: "100px",
    selector: (row) => row.accept,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center text-truncate">
          <div className="d-flex flex-row text-truncate">
            <Button
              onClick={async () => {
                await row.AcceptCourseCommentApi(row.courseId);
              }}
              color="success"
            >
              <CheckCircle />
            </Button>
            <Button
              onClick={async () => {
                // getting TeacherId
                await row.RejectCourseCommentApi(row.courseId);
              }}
              color="danger"
            >
              <MinusCircle />
            </Button>
          </div>
        </div>
      );
    },
  },
];

const UserComment = ({ commentId, courseId }) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [comments, setComments] = useState([]);

  const [ref, setRef] = useState(false);
  const [parameters, setParameters] = useState({
    commentId: commentId,
    courseId: courseId,
  });

  // Getting Comments Api
  const handleGetComments = async (params) => {
    const res = await GetReplyComments({ ...params });
    setComments(res);
  };
  useEffect(() => {
    handleGetComments(parameters);
  }, [parameters]);

  // hamdling CourseDetail

  const CustomPagination = () => {
    const count = Number(Math.ceil(comments.length / rowsPerPage));

    const handlePagination = (pageNum) => {
      setCurrentPage(pageNum + 1);
    };

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page.selected)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pe-1"
        }
      />
    );
  };

  return (
    <Card className="overflow-hidden">
      <div className="react-dataTable">
        <DataTable
          noHeader
          subHeader
          sortServer
          pagination
          responsive
          selectableRows
          paginationServer
          columns={columns}
          onSort={() => {}}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          paginationComponent={() => (
            <CustomPagination currentPage={currentPage} />
          )}
          data={
            comments != undefined
              ? comments.map((it, index) => {
                  return {
                    ...it,
                    AcceptCourseCommentApi: AcceptCourseCommentApi,
                    RejectCourseCommentApi: RejectCourseCommentApi,
                  };
                })
              : []
          }
        />
      </div>
    </Card>
  );
};

export default UserComment;
