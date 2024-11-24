// ** React Imports
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// ** Reactstrap Imports
import { Row, Col, Alert } from "reactstrap";

// ** User View Components
import UserTabs from "./Tabs";
import CourseInfo from "./CourseInfo";

// ** Styles
import "@styles/react/apps/app-users.scss";
import { GetCourseDetailApi } from "../../../@core/services/API/AllCoursesAdmin/GetCourseDetail/get.course.detail.api";

const CourseDetail = () => {
  // ** Hooks
  const { id } = useParams();

  const [active, setActive] = useState("1");

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  // Get Detail Api
  const [courseDetail, setCourseDetail] = useState({});
  const handleGetCourseDetail = async (id) => {
    const res = await GetCourseDetailApi(id);
    setCourseDetail(res);
  };
  useEffect(() => {
    handleGetCourseDetail(id);
  }, []);
  // useEffect(() => {
  //   if (JSON.stringify(courseDetail) != "{}") {
  //     console.log(courseDetail);
  //   }
  // }, [courseDetail]);

  return (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <CourseInfo courseDetail={courseDetail} />
          {/* <PlanCard /> */}
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs
            courseDetail={courseDetail}
            active={active}
            toggleTab={toggleTab}
          />
        </Col>
      </Row>
    </div>
  );
};
export default CourseDetail;
