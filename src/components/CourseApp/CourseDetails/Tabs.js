// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

// ** Icons Imports
import { User, MessageSquare, Bookmark, Bell, Link } from "react-feather";

// ** User Components
import StatsCard from "./StatsCard";
import CommentList from "./CommentList";
import ReserveList from "./ReserveList";
const UserTabs = ({ active, toggleTab, courseDetail }) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">جزئیات بیشتر</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <MessageSquare className="font-medium-3 me-50" />
            <span className="fw-bold">نظرات دوره</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
            <Bookmark className="font-medium-3 me-50" />
            <span className="fw-bold">رزرو های دوره</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "4"} onClick={() => toggleTab("4")}>
            <Bell className="font-medium-3 me-50" />
            <span className="fw-bold">Notifications</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "5"} onClick={() => toggleTab("5")}>
            <Link className="font-medium-3 me-50" />
            <span className="fw-bold">Connections</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <StatsCard
            courseDetail={courseDetail}
            cols={{ md: "3", sm: "6", xs: "12" }}
          />
          <Card>
            <CardHeader>توضیحات دوره</CardHeader>
            <CardBody>{courseDetail.describe}</CardBody>
          </Card>
        </TabPane>
        <TabPane tabId="2">
          <CommentList courseDetail={courseDetail} />
        </TabPane>
        <TabPane tabId="3">
          <ReserveList courseDetail={courseDetail} />
        </TabPane>
        <TabPane tabId="4"></TabPane>
        <TabPane tabId="5"></TabPane>
      </TabContent>
    </Fragment>
  );
};
export default UserTabs;
