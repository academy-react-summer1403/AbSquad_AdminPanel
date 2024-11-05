import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import WizardHorizontal from "./wizard/WizardHorizontal";

const AddNewCourseApp = () => {
  const [step, setStep] = useState(1);

  return (
    <>
      <Row>
        <Col className="d-flex align-items-center p-0">
          <div>اضافه کردن دوره</div>
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

export default AddNewCourseApp;
