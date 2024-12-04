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
import Select from "react-select";
import classnames from "classnames";
import { useForm, Controller } from "react-hook-form";
import EditBuildingApi from "../../@core/services/API/Building/update.building.api";
import Cleave from "cleave.js/react";
import { format, newDate } from "date-fns-jalali";
const EditBuilding = ({
  setShow,
  show,
  buildingId,
  buildingName,
  floor,
  workDate,
  latitude,
  longitude,
  active,
}) => {
  //   States
  const [parameters, setParameters] = useState({
    id: buildingId,
  });

  const handleEditStatus = async (data) => {
    await EditBuildingApi(data);
  };
  useEffect(() => {
    if (parameters.floor) handleEditStatus({ ...parameters });
  }, [parameters]);

  const {
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    if (buildingName && floor && buildingId) {
      setValue("buildingName", buildingName);
      setValue("floor", floor);
      setValue("workDate", workDate);
      setValue("latitude", latitude);
      setValue("longitude", longitude);
      setValue("active", active);
    }
  }, [buildingName, floor, buildingId]);
  const onSubmit = (data) => {
    setParameters({ ...parameters, ...data });
    setShow(!show);
  };
  console.log(parameters);
  // Handling Date
  const [startDate, setStartDate] = useState("");
  const [startDateReal, setStartDateReal] = useState("");

  const options = { date: true, delimiter: "-", datePattern: ["Y", "m", "d"] };

  const handleInitDate = (date) => {
    const initDate = new Date(date); // Convert ISO date string to a Date object
    const finalDate = format(initDate, "yyyy/MM/dd").replaceAll("/", "-"); // Format the date in the Persian calendar
    return finalDate.toString();
  };

  const handleDateConvert = (date) => {
    const splittedDate = date.split("-");
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
  useEffect(() => {
    if (workDate) setStartDate(handleInitDate(workDate));
  }, [workDate]);

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
          <h1 className="text-center mb-1">ویرایش ساختمان</h1>

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
              <Label className="form-label" for="floor  ">
                طبقات ساختمان
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
                        placeholder="طبقات ساختمان را وارد کنید..."
                        className={classnames("form-control")}
                      />
                    );
                  }}
                />
              </InputGroup>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="workDate  ">
                تاریخ ساخت
              </Label>

              <InputGroup>
                <Controller
                  name="workDate"
                  control={control}
                  render={({ field: { onChange } }) => {
                    return (
                      <Cleave
                        className="form-control"
                        placeholder="1403-01-01"
                        options={options}
                        value={startDate ? startDate : ""}
                        id="workDate"
                        onChange={(e) => {
                          setStartDateReal(e.target.value);
                          onChange(handleDateConvert(e.target.value));
                        }}
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

export { EditBuilding };
