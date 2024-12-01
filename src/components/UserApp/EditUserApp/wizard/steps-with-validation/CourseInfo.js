// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Third Party Components
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Third Party Components
import Cleave from "cleave.js/react";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

// Date Related
import { format, newDate } from "date-fns-jalali";

const CourseInfo = ({ stepper, initialInfo }) => {
  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    stepper.next();
  };

  useEffect(() => {
    if (initialInfo) {
      setValue("fName", initialInfo.fName);
      setValue("lName", initialInfo.lName);
    }
  }, [initialInfo]);

  // Date Options

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
  // handling the Conversion and replacing the init date
  const handleInitDate = (date) => {
    const initDate = new Date(date); // Convert ISO date string to a Date object
    const finalDate = format(initDate, "yyyy/MM/dd").replaceAll("/", "-"); // Format the date in the Persian calendar
    return finalDate.toString();
  };

  // Getting For Initing The Start
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDateReal, setStartDateReal] = useState("");
  const [endDateReal, setEndDateReal] = useState("");

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">اطلاعات دوره</h5>
        <small>اطلاعات دوره را اضافه کنید.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="3" className="mb-1">
            <Label className="form-label" for="fName">
              نام
            </Label>
            <Controller
              id="fName"
              name="fName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input value={value} onChange={onChange} placeholder="دوره 1" />
              )}
            />
          </Col>
          <Col md="3" className="mb-1">
            <Label className="form-label" for="lName">
              نام خانوادگی
            </Label>
            <Controller
              id="lName"
              name="lName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  placeholder="توضیح کوتاه"
                />
              )}
            />
          </Col>

          <Col md="3" className="mb-1">
            <Label
              className="form-label d-flex justify-content-between"
              for="nationalCode"
            >
              کد ملی
            </Label>
            <Controller
              id="nationalCode"
              name="nationalCode"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder="2087415487"
                />
              )}
            />
          </Col>
          <Col md="3" className="mb-1">
            <Label className="form-label" for="birthDay">
              تاریخ تولد
            </Label>
            <Controller
              id="birthDay"
              name="birthDay"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Cleave
                  className="form-control"
                  placeholder="1403-01-01"
                  options={options}
                  value={startDateReal ? startDateReal : ""}
                  id="date"
                  onChange={(e) => {
                    setStartDateReal(e.target.value);
                    onChange(handleDateConvert(e.target.value));
                  }}
                />
              )}
            />
          </Col>
        </Row>

        <Row>
          <Col md="3" className="mb-1">
            <Label className="form-label" for="userAbout">
              شماره تلفن:
            </Label>
            <Controller
              id="userAbout"
              name="userAbout"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  placeholder="شماره تلفن را وارد کنید..."
                />
              )}
            />
          </Col>
          <Col md="3" className="mb-1">
            <Label className="form-label" for="homeAdderess">
              آدرس خانه
            </Label>
            <Controller
              id="homeAdderess"
              name="homeAdderess"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  placeholder="آدرس را وارد کنید..."
                />
              )}
            />
          </Col>
          <Col md="3" className="mb-1">
            <Label className="form-label" for="userAbout">
              درباره کاربر
            </Label>
            <Controller
              id="userAbout"
              name="userAbout"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  placeholder="توضیح کوتاه"
                />
              )}
            />
          </Col>
        </Row>
        <Row></Row>
        <div className="d-flex justify-content-between">
          <Button
            type="button"
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">قبلی</span>
          </Button>
          <Button type="submit" color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">بعدی</span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export { CourseInfo };
