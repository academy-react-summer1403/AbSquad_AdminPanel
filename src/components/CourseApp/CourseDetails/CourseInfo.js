// ** React Imports
import { useState, Fragment } from "react";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Badge,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
} from "reactstrap";

// ** Third Party Components
import Swal from "sweetalert2";
import Select from "react-select";
import { Check, Briefcase, X } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { ActiveDeactiveCourse } from "../../../@core/services/API/AllCoursesAdmin/GetCourseDetail/active.deactive.api";
import { DeleteCourse } from "../../../@core/services/API/AllCoursesAdmin/GetCourseDetail/delete.course.api";

const roleColors = {
  editor: "light-info",
  admin: "light-danger",
  author: "light-warning",
  maintainer: "light-success",
  subscriber: "light-primary",
};
const courseTechs = {
  editor: "light-info",
  admin: "light-danger",
  author: "light-warning",
  maintainer: "light-success",
  subscriber: "light-primary",
};

const courseLevelColor = {
  مبتدی: "light-success",
  پیشرفته: "light-warning",
  متوسط: "light-secondary",
};
const statusColor = {
  true: "success",
  false: "danger",
};
const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
];

const countryOptions = [
  { value: "uk", label: "UK" },
  { value: "usa", label: "USA" },
  { value: "france", label: "France" },
  { value: "russia", label: "Russia" },
  { value: "canada", label: "Canada" },
];

const languageOptions = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "dutch", label: "Dutch" },
];

const UserInfoCard = ({ courseDetail }) => {
  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      setShow(false);
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual",
          });
        }
      }
    }
  };
  // ** State
  const [show, setShow] = useState(false);

  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  // ** render user img
  const renderUserImg = () => {
    return (
      <img
        height="210"
        width="210"
        alt="user-avatar"
        src={
          courseDetail.imageAddress ? courseDetail.imageAddress : "/ErrImg.jpg"
        }
        className="img-fluid rounded mt-3 mb-2"
      />
    );
  };
  // Post Api
  const postActiveDeactive = async (obj) => {
    await ActiveDeactiveCourse(obj);
  };

  // Delete
  const handleDeleteCourse = async (obj) => {
    console.log(obj);
    await DeleteCourse(obj);
  };
  // Activing The Course Modal
  const MySwal = withReactContent(Swal);

  const handleActiveClick = (status) => {
    return MySwal.fire({
      title: "آیا اطمینان دارید؟",
      text: `با تایید شما این دوره ${
        status == true ? "غیرفعال" : "فعال"
      } میشود`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `${status == true ? "غیرفعال" : "فعال"} شود`,
      cancelButtonText: "خیر",
      customClass: {
        confirmButton: `btn btn-${status == true ? "danger" : "success"}`,
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        postActiveDeactive({
          active: courseDetail.isActive == true ? false : true,
          id: courseDetail.courseId,
        });
        MySwal.fire({
          icon: "success",
          title: `${status == true ? "غیرفعال" : "فعال"} شد!`,
          text: `دوره مورد نظر با موفقیت${
            status == true ? " غیرفعال " : " فعال "
          }شد`,
          confirmButtonText: "حله",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: `${status == true ? "غیرفعال" : "فعال"} نشد`,
          text: "",
          icon: "error",
          confirmButtonText: "باشه",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };
  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderUserImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>
                    {courseDetail !== null
                      ? courseDetail.title
                      : "Eleanor Aguilar"}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <Check className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{courseDetail.teacherName}</h4>
                <small>استاد</small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <Briefcase className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">
                  <Badge
                    className="text-capitalize"
                    color={statusColor[courseDetail.isActive]}
                  >
                    {courseDetail.isActive == true ? "فعال" : "غیر فعال"}
                  </Badge>
                </h4>
                <small>وضعیت دوره</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">جزئیات دوره</h4>
          <div className="info-container">
            {courseDetail !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">نام دوره:</span>
                  <span>{courseDetail.title}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">نحوه برگزاری:</span>
                  <span>{courseDetail.courseTypeName}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">سطح دوره:</span>
                  <Badge
                    className="text-capitalize"
                    color={courseLevelColor[courseDetail.courseLevelName]}
                  >
                    {courseDetail.courseLevelName}
                  </Badge>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">وضعیت برگزاری دوره:</span>
                  <span className="text-capitalize">
                    {courseDetail.courseStatusName}
                  </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">قیمت دوره:</span>
                  <span>
                    {courseDetail.cost
                      ? courseDetail.cost.toLocaleString()
                      : courseDetail.cost}{" "}
                    تومان
                  </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">شماره کلاس :</span>
                  <span>{courseDetail.courseClassRoomName}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25"> تاریخ شروع دوره :</span>
                  <span>
                    {new Date(courseDetail.startTime).toLocaleDateString(
                      "fa-IR"
                    )}
                  </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">تاریخ پایان دوره :</span>
                  <span>
                    {new Date(courseDetail.endTime).toLocaleDateString("fa-IR")}
                  </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">تکنولوژی های دوره :</span>
                  {courseDetail.courseTeches &&
                    courseDetail.courseTeches.map((it, index) => {
                      return (
                        <Badge
                          key={index}
                          className="text-capitalize"
                          color={"light-info"}
                        >
                          {it}
                        </Badge>
                      );
                    })}
                </li>
              </ul>
            ) : null}
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => setShow(true)}>
              ویرایش
            </Button>
            <Button
              className="ms-1"
              color={courseDetail.isActive == true ? "danger" : "success"}
              onClick={() => {
                handleActiveClick(courseDetail.isActive);
              }}
            >
              {courseDetail.isActive == true
                ? "غیر فعال کردن دوره"
                : "فعال کردن دوره"}
            </Button>
            <Button
              className="ms-1"
              color="danger"
              outline
              onClick={() => {
                handleDeleteCourse({
                  data: { active: true, id: courseDetail.courseId },
                });
              }}
            >
              حذف دوره
            </Button>
          </div>
        </CardBody>
      </Card>
      {/* <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">Edit User Information</h1>
            <p>Updating user details will receive a privacy audit.</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-1 pt-75">
              <Col md={6} xs={12}>
                <Label className="form-label" for="firstName">
                  First Name
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="firstName"
                  name="firstName"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="firstName"
                      placeholder="John"
                      invalid={errors.firstName && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="lastName">
                  Last Name
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="lastName"
                  name="lastName"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="lastName"
                      placeholder="Doe"
                      invalid={errors.lastName && true}
                    />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className="form-label" for="username">
                  Username
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="username"
                  name="username"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="username"
                      placeholder="john.doe.007"
                      invalid={errors.username && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="billing-email">
                  Billing Email
                </Label>
                <Input
                  type="email"
                  id="billing-email"
                  defaultValue={courseDetail.email}
                  placeholder="example@domain.com"
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="status">
                  Status:
                </Label>
                <Select
                  id="status"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={statusOptions}
                  theme={selectThemeColors}
                  defaultValue={
                    statusOptions[
                      statusOptions.findIndex(
                        (i) => i.value === courseDetail.status
                      )
                    ]
                  }
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="tax-id">
                  Tax ID
                </Label>
                <Input id="tax-id" placeholder="Tax-1234" />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="contact">
                  Contact
                </Label>
                <Input
                  id="contact"
                  defaultValue={courseDetail.title}
                  placeholder="+1 609 933 4422"
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="language">
                  language
                </Label>
                <Select
                  id="language"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={languageOptions}
                  theme={selectThemeColors}
                  defaultValue={languageOptions[0]}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="country">
                  Country
                </Label>
                <Select
                  id="country"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={countryOptions}
                  theme={selectThemeColors}
                  defaultValue={countryOptions[0]}
                />
              </Col>
              <Col xs={12}>
                <div className="d-flex align-items-center mt-1">
                  <div className="form-switch">
                    <Input
                      type="switch"
                      defaultChecked
                      id="billing-switch"
                      name="billing-switch"
                    />
                    <Label
                      className="form-check-label"
                      htmlFor="billing-switch"
                    >
                      <span className="switch-icon-left">
                        <Check size={14} />
                      </span>
                      <span className="switch-icon-right">
                        <X size={14} />
                      </span>
                    </Label>
                  </div>
                  <Label
                    className="form-check-label fw-bolder"
                    for="billing-switch"
                  >
                    Use as a billing address?
                  </Label>
                </div>
              </Col>
              <Col xs={12} className="text-center mt-2 pt-50">
                <Button type="submit" className="me-1" color="primary">
                  Submit
                </Button>
                <Button
                  type="reset"
                  color="secondary"
                  outline
                  onClick={() => {
                    handleReset();
                    setShow(false);
                  }}
                >
                  Discard
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal> */}
    </Fragment>
  );
};

export default UserInfoCard;
