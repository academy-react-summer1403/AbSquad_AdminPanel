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
} from "reactstrap";

const DetailAssistant = ({
  setShow,
  show,
  courseName,
  assistanceName,
  teacherName,
}) => {
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
          <h1 className="text-center mb-1">جزئیات گروه</h1>

          <Row tag="form" className="gy-1 gx-2 mt-75">
            <Col xs={12}>
              <Label className="form-label" for="courseName">
                نام گروه : {courseName}
              </Label>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="assistanceName">
                نام دستیار : {assistanceName}
              </Label>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="teacherName">
                نام استاد : {teacherName}
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

export { DetailAssistant };
