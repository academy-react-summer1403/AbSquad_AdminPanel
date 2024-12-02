// ** React Imports
import { Fragment, useState } from "react";

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
import { compareAsc, format, newDate } from "date-fns-jalali";

// Generating Random Things for the rest of the api
import { v4 as uuidv4 } from "uuid";

const CourseInfo = ({ stepper, finalData, setFinalData }) => {
  // random string
  const randomString = Math.random();

  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setFinalData({
      ...finalData,
      ...data,
      CoursePrerequisiteId: uuidv4(),
      GoogleSchema: randomString.toString(),
      GoogleTitle: randomString.toString(),
      UniqeUrlString: randomString.toString(),
      CurrentCoursePaymentNumber: parseInt(randomString),
    });
    stepper.next();
  };
  // Price Convert
  const [shownPrice, setShownPrice] = useState();
  const handlePriceConvert = (price) => {
    const convertedPrice = parseInt(price).toLocaleString();
    setShownPrice(convertedPrice);
  };

  // Date Options
  const options = { date: true, delimiter: "-", datePattern: ["Y", "m", "d"] };

  // Date Conversion To ISO
  const date = "1392-05-12";
  const splittedDate = date.split("-");
  const UTCDate = new Date();
  const time = UTCDate.toUTCString().split(" ");
  const convertedDate = newDate(
    parseInt(splittedDate[0]),
    parseInt(splittedDate[1]),
    parseInt(splittedDate[2])
  );

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
      <div className="content-header">
        <h5 className="mb-0">ویرایش خبر</h5>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="3" className="mb-1">
            <Label className="form-label" for="courseName">
              عنوان خبر
            </Label>
            <Controller
              id="courseName"
              name="Title"
              control={control}
              render={({ field: { onChange } }) => (
                <Input onChange={onChange} placeholder="دوره 1" />
              )}
            />
            `
          </Col>
          <Col md="3" className="mb-1">
            <Label className="form-label" for="miniDescribe">
              توضیح کوتاه درباره خبر
            </Label>
            <Controller
              id="miniDescribe"
              name="MiniDescribe"
              control={control}
              render={({ field: { onChange } }) => (
                <Input onChange={onChange} placeholder="توضیح کوتاه" />
              )}
            />
          </Col>
          <Col md="3" className="mb-1">
            <Label className="form-label" for="capacity">
              کلمات کلیدی
            </Label>
            <Controller
              id="capacity"
              name="Capacity"
              control={control}
              render={({ field: { onChange } }) => (
                <Input
                  onChange={onChange}
                  placeholder="ظرفیت دوره"
                  type="number"
                />
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col md="3" className="mb-1">
            <Label className="form-label" for="miniLink">
              شماره گروه خبر
            </Label>
            <Controller
              id="miniLink"
              name="ShortLink"
              control={control}
              render={({ field: { onChange } }) => (
                <Input onChange={onChange} placeholder="لینک دوره" />
              )}
            />
          </Col>
          <Col md="12" className="mb-1">
            <Label className="form-label" for="description">
              توضیحات کامل خبر
            </Label>
            <Controller
              id="description"
              name="Describe"
              control={control}
              render={({ field: { onChange } }) => (
                <Input
                  onChange={onChange}
                  style={{ resize: "none", height: "200px" }}
                  placeholder="توضیحات کامل دوره"
                  type="textarea"
                />
              )}
            />
          </Col>
        </Row>
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

export default CourseInfo;