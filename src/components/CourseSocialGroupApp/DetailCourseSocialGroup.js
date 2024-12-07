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

const DetailCourseSocialGroup = ({
  setShow,
  show,
  groupName,
  groupLink,
  courseName,
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
              <Label className="form-label" for="levelName">
                نام گروه : {groupName}
              </Label>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="levelName">
                لینک گروه : {groupLink}
              </Label>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="levelName">
                نام دوره : {courseName}
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

export { DetailCourseSocialGroup };
