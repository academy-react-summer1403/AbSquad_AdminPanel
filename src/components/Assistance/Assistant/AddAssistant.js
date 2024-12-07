// ** React Imports
import { Fragment, useEffect, useState } from "react";
// ** Utils
import { selectThemeColors } from "@utils";
import Select from "react-select";
// ** Reactstrap Imports
import {
  Row,
  Col,
  Modal,
  Label,
  Button,
  ModalBody,
  ModalHeader,
} from "reactstrap";

import { useForm, Controller } from "react-hook-form";
import { AddAssistantApi } from "../../../@core/services/API/AllCoursesAdmin/Assistants/add.assistant.api";

const AddAssistant = ({ setShow, show, courses, user }) => {
  //   States
  const [parameters, setParameters] = useState({});

  const handleAddAssistant = async (data) => {
    await AddAssistantApi(data);
  };
  useEffect(() => {
    if (parameters.userId) handleAddAssistant({ ...parameters });
  }, [parameters]);

  // ** Hooks
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    setParameters({ ...data, ...parameters });
    setShow(!show);
  };

  // COURSE*********************************
  // Managing Courses And Selected Courses
  const [courseSelect, setCourseSelect] = useState({});

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
  const StandardOptionsFormUser = (data) => {
    const array = [];
    data.map((it) => {
      array.push({
        id: it.id,
        value: it.fname + " " + it.lname,
        label: it.fname + " " + it.lname,
      });
    });

    return array;
  };

  // USERS*****************************************
  const [userSelect, setUserSelect] = useState({});

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
          <h1 className="text-center mb-1">ویرایش دستیار</h1>

          <Row
            tag="form"
            className="gy-1 gx-2 mt-75"
            onSubmit={handleSubmit(onSubmit)}
          >
            {courses && (
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
                          : [{}]
                      }
                      isClearable={false}
                      value={
                        JSON.stringify(courseSelect) != "{}" ? courseSelect : {}
                      }
                      onChange={(e) => {
                        setCourseSelect(e);
                        onChange(e.id);
                      }}
                    />
                  )}
                />
              </Col>
            )}
            {user && (
              <Col xs={12}>
                <Label className="form-label">نام کاربر</Label>
                <Controller
                  id="userId"
                  name="userId"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Select
                      theme={selectThemeColors}
                      className="react-select"
                      classNamePrefix="select"
                      options={
                        user.listUser
                          ? StandardOptionsFormUser(user.listUser)
                          : [{}]
                      }
                      isClearable={false}
                      value={
                        JSON.stringify(userSelect) != "{}" ? userSelect : {}
                      }
                      onChange={(e) => {
                        setUserSelect(e);
                        onChange(e.id);
                      }}
                    />
                  )}
                />
              </Col>
            )}
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

export { AddAssistant };
