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
import { UpdateComment } from "../../../@core/services/API/AllUsersAdmin/Comment/update.comment.api";

const EditCommentModal = ({
  setShow,
  show,
  userName,
  commentTitle,
  describe,
  courseId,
  commentId,
  refresh,
  setRefresh,
}) => {
  const [parameters, setParameters] = useState({
    courseId: courseId,
    commentId: commentId,
  });
  // ** Hooks
  const {
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});
  const handleReply = async (data) => {
    await UpdateComment(data);
  };

  const onSubmit = (data) => {
    setParameters({ ...data, ...parameters });
    setShow(!show);
    setRefresh(!refresh);
  };
  const handleFinalData = (finalData) => {
    const formData = new FormData();
    for (const key in finalData) {
      if (finalData.hasOwnProperty(key)) {
        formData.append(key, finalData[key]);
      }
    }
    handleReply(formData);
  };
  useEffect(() => {
    if (parameters.Describe) handleFinalData(parameters);
  }, [parameters]);

  //   setting init values
  useEffect(() => {
    setValue("Title", commentTitle);
    setValue("Describe", describe);
  }, [commentTitle, describe]);

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
          <h1 className="text-center mb-1">ویرایش کامنت</h1>
          <h2 className="text-center mb-1"> کاربر :{userName}</h2>
          {/* <h3 className="text-center mb-1">
            عنوان کامنت کاربر: {commentTitle}
          </h3>
          <h3 className="text-center mb-1"> کامنت کاربر:{describe} </h3> */}
          <Row
            tag="form"
            className="gy-1 gx-2 mt-75"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Col xs={12}>
              <Label className="form-label" for="firstName">
                عنوان کامنت
              </Label>

              <InputGroup>
                <Controller
                  name="Title"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Cleave
                        {...field}
                        id="Title"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="عنوان کامنت را وارد کنید..."
                        className={classnames("form-control")}
                      />
                    );
                  }}
                />
              </InputGroup>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="Describe">
                کامنت
              </Label>

              <InputGroup>
                <Controller
                  name="Describe"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Cleave
                        {...field}
                        id="lastName"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="کامنت خود را وارد کنید..."
                        className={classnames("form-control")}
                      />
                    );
                  }}
                />
              </InputGroup>
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

export default EditCommentModal;
