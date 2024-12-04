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
import { newDate } from "date-fns-jalali";
import Cleave from "cleave.js/react";

import classnames from "classnames";
import { useForm, Controller } from "react-hook-form";
import AddBuildingApi from "../../@core/services/API/Building/add.building.api";
import GetBuildingApi from "../../@core/services/API/Building/get.building.api";
const AddBuilding = ({ setShow, show }) => {
  //   States
  const [parameters, setParameters] = useState({
    latitude: Math.random().toString(),
    longitude: Math.random().toString(),
  });
  const handleAddBuilding = async (data) => {
    await AddBuildingApi(data);
  };
  useEffect(() => {
    if (parameters.buildingName) handleAddBuilding(parameters);
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

  // Handle Date
  const options = { date: true, delimiter: "-", datePattern: ["Y", "m", "d"] };
  const handleDateConvert = (date) => {
    const splittedDate = date.split("-");
    const UTCDate = new Date();
    const time = UTCDate.toUTCString().split(" ");
    const convertedDate = newDate(
      parseInt(splittedDate[0]),
      parseInt(splittedDate[1]),
      parseInt(splittedDate[2])
    );
    const splitConvDate = convertedDate.toString().split(" ");
    const finalDate = new Date(
      splitConvDate[1] + " " + splitConvDate[2] + ", " + splitConvDate[3]
    );

    return finalDate.toISOString();
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
          <h1 className="text-center mb-1">اضافه کردن ساختمان</h1>

          <Row
            tag="form"
            className="gy-1 gx-2 mt-75"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Col xs={12}>
              <Label className="form-label" for="buildingName">
                نام ساختمان
              </Label>

              <InputGroup>
                <Controller
                  name="buildingName"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        id="buildingName"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="نام ساختمان را وارد کنید..."
                        className={classnames("form-control")}
                      />
                    );
                  }}
                />
              </InputGroup>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="floor">
                تعداد طبقات ساختمان
              </Label>

              <InputGroup>
                <Controller
                  name="floor"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        id="floor"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="تعداد طبقات ساختمان را وارد کنید..."
                        className={classnames("form-control")}
                      />
                    );
                  }}
                />
              </InputGroup>
            </Col>
            <Col xs={12} className="mb-1">
              <Label className="form-label" for="workDate">
                تاریخ ساخت
              </Label>
              <Controller
                id="workDate"
                name="workDate"
                control={control}
                render={({ field: { onChange } }) => (
                  <Cleave
                    className="form-control"
                    placeholder="1403-01-01"
                    options={options}
                    id="date"
                    onChange={(e) => {
                      onChange(handleDateConvert(e.target.value));
                    }}
                  />
                )}
              />
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

export { AddBuilding };
