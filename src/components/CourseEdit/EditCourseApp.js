import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import { WizardHorizontal } from "./wizard/WizardHorizontal";

const EditCourseApp = () => {
  return (
    <>
      <Row>
        <Col className="d-flex align-items-center p-0">
          <div>ویرایش کردن دوره</div>
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <WizardHorizontal />
        </Col>
      </Row>
    </>
  );
};

export default EditCourseApp;
