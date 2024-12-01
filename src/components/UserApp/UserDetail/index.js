// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Third Party Components
import axios from "axios";

// ** Custom Components
import UILoader from "@components/ui-loader";
import Breadcrumbs from "@components/breadcrumbs";
import { AlignJustify, Rss, Info, Image, Users, Edit } from "react-feather";
// ** Reactstrap Imports
import { Row, Col, Button, Nav, NavItem, NavLink, Collapse } from "reactstrap";

// ** Demo Components
// import ProfilePoll from "./ProfilePolls";
import ProfileAbout from "./ProfileAbout";
// import ProfilePosts from "./ProfilePosts";
import ProfileHeader from "./ProfileHeader";
// import ProfileTwitterFeeds from "./ProfileTwitterFeeds";
// import ProfileLatestPhotos from "./ProfileLatestPhotos";
// import ProfileSuggestedPages from "./ProfileSuggestedPages";
// import ProfileFriendsSuggestions from "./ProfileFriendsSuggestions";

// ** Styles
import "@styles/react/pages/page-profile.scss";
import { useParams } from "react-router-dom";
import { GetUserDetail } from "../../../@core/services/API/AllUsersAdmin/UserEdit/user.details.api";
import ProfileSocialMedia from "./ProfileSocialMedia";
import ProfileRoles from "./ProfileRoles";

const UserDetailApp = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState("course");
  // *************************************************
  // Getting User Detail
  const [detail, setDetail] = useState({});
  const handleGetUserDetail = async (id) => {
    const res = await GetUserDetail(id);
    setDetail(res);
  };
  useEffect(() => {
    if (detail) console.log(detail);
  }, [detail]);

  useEffect(() => {
    handleGetUserDetail(id);
  }, []);
  // ** States
  const [block, setBlock] = useState(false);
  const [data, setData] = useState({
    coverImg: "/UserBg.jpg",
    avatar: "/ErrImg.jpg",
    username: "asdasasdhassalyfuaguyasftuasuda",
    designation: "koskho",
  });
  const handleBlock = () => {
    setBlock(true);
    setTimeout(() => {
      setBlock(false);
    }, 2000);
  };

  return (
    <Fragment>
      <Breadcrumbs
        title="UserDetailApp"
        data={[{ title: "Pages" }, { title: "UserDetailApp" }]}
      />
      {data !== null ? (
        <div id="user-profile">
          <Row>
            <Col sm="12">
              <ProfileHeader
                user={detail ? { ...detail, bg: "/UserBg.jpg" } : {}}
              />
            </Col>
          </Row>
          <section id="profile-info">
            <Row>
              <Col
                lg={{ size: 3, order: 1 }}
                sm={{ size: 12 }}
                xs={{ order: 2 }}
              >
                <ProfileAbout user={detail ? { ...detail } : {}} />
              </Col>
              <Col
                lg={{ size: 3, order: 1 }}
                sm={{ size: 12 }}
                xs={{ order: 2 }}
              >
                <ProfileSocialMedia user={detail ? { ...detail } : {}} />
                {/*<ProfileSuggestedPages data={data.suggestedPages} />
                <ProfileTwitterFeeds data={data.twitterFeeds} /> */}
              </Col>

              <Col
                lg={{ size: 3, order: 3 }}
                sm={{ size: 12 }}
                xs={{ order: 3 }}
              >
                <ProfileRoles user={detail ? { ...detail } : {}} />
              </Col>
            </Row>
            <Row>
              <Collapse isOpen={true} navbar>
                <div className="profile-tabs d-flex justify-content-between flex-wrap mt-1 mt-md-0">
                  <Nav className="mb-0" pills>
                    <NavItem>
                      <NavLink
                        className="fw-bold"
                        onClick={(e) => {
                          setIsOpen("course");
                        }}
                        active={isOpen === "course"}
                      >
                        <span className="d-none d-md-block">
                          لیست دوره های کاربر
                        </span>
                        <Rss className="d-block d-md-none" size={14} />
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className="fw-bold"
                        onClick={() => {
                          setIsOpen("reserve");
                        }}
                        active={isOpen === "reserve"}
                      >
                        <span className="d-none d-md-block">
                          لیست دوره های رزرو شده
                        </span>
                        <Info className="d-block d-md-none" size={14} />
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <Button color="primary">
                    <Edit className="d-block d-md-none" size={14} />
                    <span className="fw-bold d-none d-md-block">Edit</span>
                  </Button>
                </div>
              </Collapse>
            </Row>
            <Row>s</Row>
          </section>
        </div>
      ) : null}
    </Fragment>
  );
};

export default UserDetailApp;