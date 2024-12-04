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

import classnames from "classnames";
import { useForm, Controller } from "react-hook-form";
import EditStatusApi from "../../@core/services/API/Status/edit.status.api";

const EditStatus = ({
  setShow,
  show,
  id,
  statusName,
  describe,
  statusNumber,
}) => {
  //   States
  const [parameters, setParameters] = useState({
    id: id,
  });

  const handleEditStatus = async (data) => {
    await EditStatusApi(data);
  };
  useEffect(() => {
    if (parameters.describe)
      handleEditStatus({ ...parameters, statusNumber: statusNumber });
  }, [parameters]);
  console.log(parameters);
  // ** Hooks
  const {
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});
  useEffect(() => {
    if (describe && statusName) {
      setValue("statusName", statusName);
      setValue("describe", describe);
    }
  }, [statusName, describe]);

  const onSubmit = (data) => {
    setParameters({ ...data, ...parameters });
    setShow(!show);
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
          <h1 className="text-center mb-1">ویرایش وضعیت</h1>

          <Row
            tag="form"
            className="gy-1 gx-2 mt-75"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Col xs={12}>
              <Label className="form-label" for="statusName">
                نام وضعیت
              </Label>

              <InputGroup>
                <Controller
                  name="statusName"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        id="statusName"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="نام وضعیت را وارد کنید..."
                        className={classnames("form-control")}
                      />
                    );
                  }}
                />
              </InputGroup>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="describe">
                درباره وضعیت
              </Label>

              <InputGroup>
                <Controller
                  name="describe"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        id="describe"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="توضیحات وضعیت را وارد کنید..."
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

export { EditStatus };
