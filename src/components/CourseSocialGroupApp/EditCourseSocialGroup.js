// ** React Imports
import { Fragment, useEffect, useState } from "react";
// ** Utils
import { selectThemeColors } from "@utils";
// ** Reactstrap Imports
import {
  Row,
  Col,
  Modal,
  Label,
  Button,
  ModalBody,
  InputGroup,
  Input,
  ModalHeader,
} from "reactstrap";

import Select from "react-select";
import classnames from "classnames";
import { useForm, Controller } from "react-hook-form";
import EditCourseSocialGroupApi from "../../@core/services/API/CourseSocialGroup/update.courseSocialGroup.api";
import { AllCourseAdmin } from "../../@core/services/API/AllCoursesAdmin/allCourse.api";

const EditCourseSocialGroup = ({
  setShow,
  show,
  id,
  groupName,
  groupLink,
  courseId,
}) => {
  //   States
  const [parameters, setParameters] = useState({
    id: id,
  });

  const handleEditStatus = async (data) => {
    await EditCourseSocialGroupApi(data);
  };
  useEffect(() => {
    if (parameters.groupName) handleEditStatus({ ...parameters });
  }, [parameters]);

  // ** Hooks
  const {
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});

  // initing datauseEffect(() => {
  useEffect(() => {
    if (groupName) {
      setValue("groupName", groupName);
      setValue("groupLink", groupLink);
      setValue("courseId", courseId);
    }
  }, [groupName, courseId, groupLink]);

  const onSubmit = (data) => {
    setParameters({ ...data, ...parameters });
    setShow(!show);
  };
  console.log(parameters);
  // Managing Courses And Selected Courses
  const [courseSelect, setCourseSelect] = useState({});
  const [courses, setCourses] = useState([]);
  const [courseParams, setCourseParams] = useState({});
  const handleGetAllCourses = async (params) => {
    const res = await AllCourseAdmin(params);
    setCourses(res);
  };
  useEffect(() => {
    handleGetAllCourses(courseParams);
  }, [courseParams]);
  useEffect(() => {
    if (courses.totalCount) {
      setCourseParams({ RowsOfPage: courses.totalCount, PageNumber: 1 });
    }
  }, [courses.totalCount]);
  useEffect(() => {
    // if (courses) console.log(courses);
  }, [courses]);

  // Standard Form
  const StandardOptionsForm = (data) => {
    const array = [];
    data.map((it) => {
      array.push({
        id: it.courseId,
        value: it.title,
        label: it.title,
      });
    });

    return array;
  };
  return (
    <Fragment>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <h1 className="text-center mb-1">ویرایش گروه</h1>

          <Row
            tag="form"
            className="gy-1 gx-2 mt-75"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Col xs={12}>
              <Label className="form-label" for="groupName">
                نام گروه
              </Label>

              <InputGroup>
                <Controller
                  name="groupName"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        id="groupName"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="نام گروه را وارد کنید..."
                        className={classnames("form-control")}
                      />
                    );
                  }}
                />
              </InputGroup>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="groupLink">
                لینک گروه
              </Label>

              <InputGroup>
                <Controller
                  name="groupLink"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        id="groupLink"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="لینک گروه را وارد کنید..."
                        className={classnames("form-control")}
                      />
                    );
                  }}
                />
              </InputGroup>
            </Col>
            <Col xs={12}>
              <Label className="form-label">نام دوره</Label>
              <Controller
                id="courseId"
                name="courseId"
                control={control}
                render={({ field: { onChange } }) => (
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    options={
                      courses.courseDtos
                        ? StandardOptionsForm(courses.courseDtos)
                        : {}
                    }
                    isClearable={false}
                    value={
                      JSON.stringify(courseSelect) != "{}"
                        ? courseSelect
                        : courses
                        ? StandardOptionsForm([
                            courses.courseDtos.find(
                              (it) => it.courseId == courseId
                            ),
                          ])
                        : {}
                    }
                    onChange={(e) => {
                      setCourseSelect(e);
                      onChange(e.id);
                    }}
                  />
                )}
              />
            </Col>
            <Col>
              <Button type="submit" className="me-1" color="primary">
                ثبت
              </Button>
              <Button
                color="secondary"
                outline
                onClick={() => {
                  setShow(!show);
                  reset();
                }}
              >
                خروج
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export { EditCourseSocialGroup };
