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

const DetailBuilding = ({
  setShow,
  show,
  active,
  buildingName,
  workDate,
  floor,
  latitude,
  longitude,
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
          <h1 className="text-center mb-1">جزئیات ساختمان</h1>

          <Row tag="form" className="gy-1 gx-2 mt-75">
            <Col xs={12}>
              <Label className="form-label" for="classRoomName">
                نام ساختمان : {buildingName}
              </Label>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="capacity">
                تعداد طبقات ساختمان : {floor}
              </Label>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="buildingName">
                تاریخ ساخت ساختمان :
                {new Date(workDate).toLocaleDateString("fa-IR")}
              </Label>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="active">
                <span className="user_name text-truncate text-body">
                  وضعیت ساختمان:
                  <Badge
                    className="text-capitalize"
                    color={statusObj[active]}
                    pill
                  >
                    {active ? "فعال" : "غیر فعال"}
                  </Badge>
                </span>
              </Label>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="buildingName">
                longitude :{longitude}
              </Label>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="buildingName">
                latitude :{latitude}
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

export { DetailBuilding };
