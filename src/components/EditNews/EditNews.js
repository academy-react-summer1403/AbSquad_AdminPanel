import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import { WizardHorizontal } from "../CourseEdit/wizard/WizardHorizontal";
const EditNews = () => {
  return (
    <>
      <Row>
        <Col className="d-flex align-items-center p-0">
          <div>ویرایش خبر</div>
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

export default EditNews;
