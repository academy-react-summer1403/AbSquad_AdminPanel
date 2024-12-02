// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Third Party Components
import axios from "axios";
import classnames from "classnames";
import { CornerUpLeft, GitHub } from "react-feather";

// ** Utils
import { kFormatter } from "@utils";

// ** Custom Components
import Sidebar from "../BlogSidebar";
import Avatar from "@components/avatar";
import Breadcrumbs from "@components/breadcrumbs";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Badge,
  Input,
  Label,
  Button,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

// ** Styles
import "@styles/base/pages/page-blog.scss";
import { useParams } from "react-router-dom";
import { GetNewsWithID } from "../../../../@core/services/API/AllNewsAdmin/GetNewsWithId/GetNewsWithId.js";

// ** Images

const BlogDetails = () => {
  // ** States
  const [data, setData] = useState(null);
  const { id } = useParams();
  // console.log(id, "this is what u asked for");
  // console.log(res);
  const [NewsDetail, setNewsDetail] = useState({});
  const [NewsComments, setNewsComments] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const handleGetNewsDetail = async (id) => {
    const res = await GetNewsWithID(id);
    setNewsDetail(res.detailsNewsDto);
    setNewsComments(res.commentDtos);
    console.log(res, "resssssssssss");
    console.log(NewsDetail, "newssssssssss");
  };
  useEffect(() => {
    handleGetNewsDetail(id);
  }, [refresh]);
  const badgeColorsArr = {
    Quote: "light-info",
    Fashion: "light-primary",
    Gaming: "light-danger",
    Video: "light-warning",
    Food: "light-success",
  };

  // const renderTags = () => {
  //   return data.blog.tags.map((tag, index) => {
  //     return (
  //       <a key={index} href='/' onClick={e => e.preventDefault()}>
  //         <Badge
  //           className={classnames({
  //             'me-50': index !== data.blog.tags.length - 1
  //           })}
  //           color={badgeColorsArr[tag]}
  //           pill
  //         >
  //           {tag}
  //         </Badge>
  //       </a>
  //     )
  //   })
  // }

  const renderComments = () => {
    return NewsComments.map((comment) => {
      return (
        <Card className="mb-1" key={comment.title}>
          <CardBody>
            <div className="d-flex">
              <div>
                <Avatar
                  className="me-75"
                  img={comment.pictureAddress ? pictureAddress : defimg}
                  imgHeight="38"
                  imgWidth="38"
                />
              </div>
              <div>
                <h6 className="fw-bolder mb-25">{comment.autor}</h6>
                <Row>
                  <Col>
                    <CardText>تعداد لایک: {comment.likeCount}</CardText>
                  </Col>
                  <Col>
                    <CardText>تعداد ریپلای: {comment.replyCount}</CardText>
                  </Col>
                </Row>

                <CardText>{comment.title}</CardText>
                <a href="/" onClick={(e) => e.preventDefault()}>
                  <div className="d-inline-flex align-items-center">
                    <CornerUpLeft size={18} className="me-50" />

                    <span>Reply</span>
                  </div>
                </a>
              </div>
            </div>
          </CardBody>
        </Card>
      );
    });
  };
  const defimg = "/ErrImg.jpg";
  const GradHat = "/GradHat.png";
  return (
    <Fragment>
      <Breadcrumbs
        title="Blog Details"
        data={[{ title: "Pages" }, { title: "Blog" }, { title: "Details" }]}
      />
      <div className="blog-wrapper">
        <div className="content-detached content-left">
          <div className="content-body">
            <Row>
              <Col sm="12">
                <Card className="mb-3">
                  <CardImg
                    src={
                      NewsDetail.currentImageAddress
                        ? NewsDetail.currentImageAddress
                        : defimg
                    }
                    className="img-fluid"
                    top
                  />
                  <CardBody>
                    <CardTitle tag="h4">{NewsDetail.title}</CardTitle>
                    <div className="d-flex">
                      <Avatar
                        className="me-50 bg-white"
                        img={GradHat}
                        imgHeight="30"
                        imgWidth="30"
                      />
                      <div>
                        <small className="text-muted me-25">by </small>
                        <small>
                          <a
                            className="text-body"
                            href="/"
                            onClick={(e) => e.preventDefault()}
                          >
                            {NewsDetail.addUserFullName}
                          </a>
                        </small>
                        <span className="text-muted ms-50 me-25">|</span>

                        <small
                          className="bg-primary text-light rounded-pill "
                          style={{ padding: "0.5rem" }}
                        >
                          {NewsDetail.newsCatregoryName}
                        </small>
                        <span className="text-muted ms-50 me-25">|</span>
                        <small className="">{NewsDetail.insertDate}</small>
                      </div>
                    </div>
                    <div className="p-3 fs-3">{NewsDetail.describe}</div>
                    <div className="d-flex">
                      <div>
                        <Avatar
                          img={GradHat}
                          className="me-2 bg-white"
                          imgHeight="60"
                          imgWidth="60"
                        />
                      </div>
                      <div className="">
                        <h6 className="fw-bolder">
                          {NewsDetail.addUserFullName}
                        </h6>
                        <div>
                          <small className="text-muted me-25 ">
                            تعداد کامنت:
                          </small>
                          <small>
                            <a
                              className="text-body"
                              href="/"
                              onClick={(e) => e.preventDefault()}
                            >
                              {NewsDetail.currentLikeCount}
                            </a>
                          </small>
                          <span className="text-muted ms-50 me-25">|</span>
                          <small className="text-muted me-25 ">
                            اخرین آپدیت:
                          </small>
                          <small>
                            <a
                              className="text-body"
                              href="/"
                              onClick={(e) => e.preventDefault()}
                            >
                              {NewsDetail.updateDate}
                            </a>
                          </small>
                          <span className="text-muted ms-50 me-25">|</span>
                          <small className="text-muted me-25 ">
                            تعداد کامنت:
                          </small>
                          <small>
                            <a
                              className="text-body"
                              href="/"
                              onClick={(e) => e.preventDefault()}
                            >
                              {NewsDetail.commentsCount}
                            </a>
                          </small>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col>{renderComments()}</Col>
            </Row>
          </div>
        </div>
        <Sidebar />
      </div>
    </Fragment>
  );
};

export default BlogDetails;
