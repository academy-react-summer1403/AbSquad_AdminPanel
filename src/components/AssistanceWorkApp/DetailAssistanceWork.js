// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Modal,
  Label,
  Button,
  ModalBody,
  ModalHeader,
  Badge,
} from "reactstrap";

const DetailAssistanceWork = ({
  setShow,
  show,
  active,
  AssistanceWorkName,
  workDate,
  courseName,
  inserDate,
  worktitle,
}) => {
  const statusObj = {
    true: "light-success",
    false: "light-danger",
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
          <h1 className="text-center mb-1">جزئیات </h1>

          <Row tag="form" className="gy-1 gx-2 mt-75">
            <Col xs={12}>
              <Label className="form-label" for="classRoomName">
                عنوان : {AssistanceWorkName}
              </Label>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="capacity">
                عنوان کار: {worktitle}
              </Label>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="AssistanceWorkName">
                تاریخ ساخت :{new Date(workDate).toLocaleDateString("fa-IR")}
              </Label>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="AssistanceWorkName">
                تاریخ بار گزاری :
                {new Date(inserDate).toLocaleDateString("fa-IR")}
              </Label>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="AssistanceWorkName">
                نام دوره :{courseName}
              </Label>
            </Col>
            <Col>
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

export { DetailAssistanceWork };
