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

import { GetCreateApi } from "../../../../@core/services/API/AllCoursesAdmin/AddNewCourse/get.create.api";
import { CreateCourseApi } from "../../../../@core/services/API/AllCoursesAdmin/AddNewCourse/add.course.part1.api";
import { addCourseTechnology } from "../../../../@core/services/API/AllCoursesAdmin/AddNewCourse/add.tech.api";

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
const DetailedInfo = ({ stepper, finalData, setFinalData }) => {
  // All Details UseStates
  const [courseType, setCourseType] = useState([]);
  const [courseLevel, setCourseLevel] = useState([]);
  const [courseSemester, setCourseSemester] = useState([]);
  const [courseClass, setCourseClass] = useState([]);
  const [courseTeacher, setCourseTeacher] = useState([]);
  const [courseTech, setCourseTech] = useState([]);
  const [tech, setTech] = useState([]);

  // Get All The Detailed Info Api
  const [getCreate, setGetCreate] = useState({});
  // Handling Get Create Api
  const handleGetCreateApi = async () => {
    const res = await GetCreateApi();
    setGetCreate(res);
  };
  useEffect(() => {
    handleGetCreateApi();
  }, []);

  // Setting Up The UI Options
  useEffect(() => {
    if (JSON.stringify(getCreate) !== "{}") {
      // ** Course Types
      setCourseType(StandardOptionsForm(getCreate.courseTypeDtos, "typeName"));

      // ** Course Level
      setCourseLevel(
        StandardOptionsForm(getCreate.courseLevelDtos, "levelName")
      );
      // ** Course Semester
      setCourseSemester(StandardOptionsForm(getCreate.termDtos, "termName"));

      // ** Course Class
      setCourseClass(
        StandardOptionsForm(getCreate.classRoomDtos, "classRoomName")
      );

      // ** Course Teacher
      setCourseTeacher(StandardOptionsForm(getCreate.teachers, "fullName"));
    }
  }, [getCreate]);

  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  // Api For Creating The Course
  const handleCreateCourse = async (form) => {
    await CreateCourseApi(form);
  };

  // Handling FInal Data
  const handleFinalData = () => {
    const formData = new FormData();
    for (const key in finalData) {
      if (finalData.hasOwnProperty(key)) {
        formData.append(key, finalData[key]);
      }
    }
    handleCreateCourse(formData);
  };
  // On Submit
  const onSubmit = (data) => {
    setFinalData({ ...finalData, ...data });
    stepper.next();
  };

  useEffect(() => {
    if (finalData.CourseTypeId) {
      handleFinalData();
    }
  }, [finalData]);

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">اطلاعات تکمیلی دوره</h5>
        <small>اطلاعات دقیق تری از دوره را وارد کنید.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col className="mb-1" md="4" sm="12">
            <Label className="form-label">نحوه برگذاری دوره</Label>
            <Controller
              id="CourseTypeId"
              name="CourseTypeId"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  options={courseType}
                  isClearable={false}
                  onChange={(e) => {
                    onChange(e.id);
                  }}
                />
              )}
            />
          </Col>
          <Col className="mb-1" md="4" sm="12">
            <Label className="form-label">سطح دوره</Label>
            <Controller
              id="CourseLvlId"
              name="CourseLvlId"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  options={courseLevel}
                  isClearable={false}
                  onChange={(e) => {
                    onChange(e.id);
                  }}
                />
              )}
            />
          </Col>
          <Col className="mb-1" md="4" sm="12">
            <Label className="form-label">ترم دوره</Label>
            <Controller
              id="TremId"
              name="TremId"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  options={courseSemester}
                  isClearable={false}
                  onChange={(e) => {
                    onChange(e.id);
                  }}
                />
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col className="mb-1" md="4" sm="12">
            <Label className="form-label">شماره کلاس</Label>
            <Controller
              id="ClassId"
              name="ClassId"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  options={courseClass}
                  isClearable={false}
                  onChange={(e) => onChange(e.id)}
                />
              )}
            />
          </Col>
          <Col className="mb-1" md="4" sm="12">
            <Label className="form-label">استاد دوره</Label>
            <Controller
              id="TeacherId"
              name="TeacherId"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  options={courseTeacher}
                  isClearable={false}
                  onChange={(e) => {
                    onChange(e.id);
                  }}
                />
              )}
            />
          </Col>
          {/* <Col className="mb-1" md="4" sm="12">
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
          </Col> */}
          {/* <Col className="mb-1" md="4" sm="12">
            <Label className="form-label">تکنولوژی دوره</Label>
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              options={courseTech}
              isClearable={false}
            />
          </Col> */}
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
          <Button type="submit" color="primary" className="btn-submit">
            <span className="align-middle d-sm-inline-block d-none">بعدی</span>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export  {DetailedInfo};
