// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Modal,
  Label,
  Input,
  Button,
  CardBody,
  CardText,
  CardTitle,
  ModalBody,
  InputGroup,
  ModalHeader,
  FormFeedback,
  InputGroupText,
} from "reactstrap";

// ** Third Party Components
import classnames from "classnames";
import Cleave from "cleave.js/react";
import { Check, X } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import { AddUserApi } from "../../../../@core/services/API/AllUsersAdmin/AddUser/add.user.api";

const AddUser = ({ setShow, show }) => {
  // ** States

  const [parameters, setParameters] = useState({
    isTeacher: false,
    isStudent: true,
  });
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
  const handleAddUser = async (params) => {
    await AddUserApi(params);
  };
  useEffect(() => {
    if (parameters["firstName"]) handleAddUser(parameters);
  }, [parameters]);

  // Handling Role for adding Users
  const handleStudentRole = (val) => {
    setParameters({ ...parameters, isStudent: val });
  };
  const handleTeacherRole = (val) => {
    setParameters({ ...parameters, isTeacher: val });
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
          <h1 className="text-center mb-1">ساخت کاربر جدید</h1>

          <Row
            tag="form"
            className="gy-1 gx-2 mt-75"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Col xs={12}>
              <Label className="form-label" for="firstName">
                نام
              </Label>

              <InputGroup>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Cleave
                        {...field}
                        id="firstName"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="نام را وارد کنید..."
                        className={classnames("form-control")}
                      />
                    );
                  }}
                />
              </InputGroup>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="lastName">
                نام خانوادگی
              </Label>

              <InputGroup>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Cleave
                        {...field}
                        id="lastName"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="نام خانوادگی را وارد کنید..."
                        className={classnames("form-control")}
                      />
                    );
                  }}
                />
              </InputGroup>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="gmail">
                ایمیل
              </Label>

              <InputGroup>
                <Controller
                  name="gmail"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Cleave
                        {...field}
                        id="gmail"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="ایمیل را وارد کنید..."
                        className={classnames("form-control")}
                      />
                    );
                  }}
                />
              </InputGroup>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="password">
                رمزعبور
              </Label>

              <InputGroup>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Cleave
                        {...field}
                        id="password"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="رمز را وارد کنید..."
                        className={classnames("form-control")}
                      />
                    );
                  }}
                />
              </InputGroup>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="phoneNumber">
                شماره تلفن
              </Label>

              <InputGroup>
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Cleave
                        {...field}
                        id="phoneNumber"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="شماره را وارد کنید..."
                        className={classnames("form-control")}
                      />
                    );
                  }}
                />
              </InputGroup>
            </Col>

            <Col xs={12}>
              <div className="d-flex align-items-center">
                <div className="form-switch w-100">
                  <Input
                    defaultChecked
                    type="switch"
                    name="SRole"
                    id="SRole"
                    onChange={(e) => {
                      handleStudentRole(e.target.checked);
                    }}
                  />
                  <Label className="form-check-label" for="SRole">
                    <span className="switch-icon-left">
                      <Check size={14} />
                    </span>
                    <span className="switch-icon-right">
                      <X size={14} />
                    </span>
                  </Label>
                  <Label
                    className="form-check-label fw-bolder ms-1"
                    for="SRole"
                  >
                    دانشجو
                  </Label>
                </div>
              </div>
            </Col>
            <Col xs={12}>
              <div className="d-flex align-items-center">
                <div className="form-switch w-100">
                  <Input
                    type="switch"
                    name="TRole"
                    id="TRole"
                    onChange={(e) => {
                      handleTeacherRole(e.target.checked);
                    }}
                  />
                  <Label className="form-check-label" for="TRole">
                    <span className="switch-icon-left">
                      <Check size={14} />
                    </span>
                    <span className="switch-icon-right">
                      <X size={14} />
                    </span>
                  </Label>
                  <Label
                    className="form-check-label fw-bolder ms-1"
                    for="TRole"
                  >
                    استاد
                  </Label>
                </div>
              </div>
            </Col>
            <Col className="text-center mt-1" xs={12}>
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

export default AddUser;
