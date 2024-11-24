// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Third Party Components
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import Select from "react-select";

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from "reactstrap";

import { addCourseTechnology } from "../../../../@core/services/API/AllCoursesAdmin/AddNewCourse/add.tech.api";
import { GetCreateApi } from "../../../../@core/services/API/AllCoursesAdmin/AddNewCourse/get.create.api";
const StandardOptionsForm = (data, itName) => {
  const array = [];
  data.map((it) => {
    array.push({
      id: it.id ? it.id : it.teacherId,
      value: it[`${itName}`],
      label: it[`${itName}`],
    });
  });
  return array;
};
const AddTech = ({ stepper, finalData, setFinalData }) => {
  // All Details UseStates

  const [courseTech, setCourseTech] = useState([]);
  const [tech, setTech] = useState([]);
  // Get All The Detailed Info Api
  const [getCreate, setGetCreate] = useState({});

  const handleGetCreateApi = async () => {
    const res = await GetCreateApi();
    setGetCreate(res);
  };
  // Handle Tech Api
  const handleTechApi = async (courseId, tech) => {
    const techBody = tech.map((it, index) => {
      return {
        techId: it.id,
      };
    });
    await addCourseTechnology(courseId, techBody);
  };
  useEffect(() => {
    handleGetCreateApi();
  }, []);
  // Setting Up The UI Options
  useEffect(() => {
    if (JSON.stringify(getCreate) !== "{}") {
      // ** Course Technologies
      setCourseTech(StandardOptionsForm(getCreate.technologyDtos, "techName"));
    }
  }, [getCreate]);

  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  // On Submit
  const onSubmit = () => {
    handleTechApi(finalData.CoursePrerequisiteId, tech);
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">اطلاعات تکمیلی دوره</h5>
        <small>اطلاعات دقیق تری از دوره را وارد کنید.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col className="mb-1" md="4" sm="12">
            <Label className="form-label">تکنولوژی دوره</Label>
            <Select
              isClearable={false}
              theme={selectThemeColors}
              isMulti
              name="courseTech"
              className="react-select"
              classNamePrefix="select"
              options={courseTech}
              onChange={(e) => {
                setTech(e);
              }}
            />
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Button
            type="button"
            color="primary"
            className="btn-prev"
            onClick={() => {
              stepper.previous();
            }}
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">قبلی</span>
          </Button>
          <Button type="submit" color="success" className="btn-submit">
            <span className="align-middle d-sm-inline-block d-none">ثبت</span>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default AddTech;
