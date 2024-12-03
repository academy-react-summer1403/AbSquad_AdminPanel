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
import EditTechApi from "../../@core/services/API/Technology/edit.tech.api";

const EditTech = ({ setShow, show, id, techName, describe }) => {
  //   States
  const [parameters, setParameters] = useState({
    id: id,
    parentId: null,
    iconAddress: "testi",
  });

  const handleEditTech = async (data) => {
    await EditTechApi(data);
  };
  useEffect(() => {
    if (parameters.describe) handleEditTech(parameters);
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
    if (describe && techName) {
      setValue("techName", techName);
      setValue("describe", describe);
    }
  }, [techName, describe]);

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
          <h1 className="text-center mb-1">ویرایش تکنولوژی</h1>

          <Row
            tag="form"
            className="gy-1 gx-2 mt-75"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Col xs={12}>
              <Label className="form-label" for="techName">
                نام تکنولوژی
              </Label>

              <InputGroup>
                <Controller
                  name="techName"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        id="techName"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="نام تکنولوژی را وارد کنید..."
                        className={classnames("form-control")}
                      />
                    );
                  }}
                />
              </InputGroup>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="describe">
                درباره تکنولوژی
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
                        placeholder="توضیحات تکنولوژی را وارد کنید..."
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

export { EditTech };
