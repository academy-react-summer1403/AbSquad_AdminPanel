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
import { newDate } from "date-fns-jalali";

// Generating Random Things for the rest of the api
import { v4 as uuidv4 } from "uuid";
import { getCourseGroup } from "../../../../@core/services/API/AllCoursesAdmin/GetCourseDetail/get.coursegroup.api";
import { GetCourseGroupDetail } from "../../../../@core/services/API/AllCoursesAdmin/GetCourseDetail/courseGroup.detail.api";

const CourseInfo = ({ stepper, finalData, setFinalData, initialInfo }) => {
  // random string
  const randomString = Math.random();
  const [courseCapacity, setCourseCapacity] = useState(0);
  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (initialInfo) {
      reset({
        Title: initialInfo.title,
        Cost: initialInfo.cost,
        Capacity: courseCapacity,
        Describe: initialInfo.describe,
        // StartTime: startTime,
        // EndTime: endTime,
      });
    }
  }, [initialInfo, courseCapacity]);

  // Getting Group Id Of Course
  const [groupId, setGroupId] = useState(0);

  // Handle Capacity
  const handleGroupId = async (teacherId, courseId) => {
    const res = await getCourseGroup(teacherId, courseId);
    setGroupId(res[0].groupId);
  };
  useEffect(() => {
    if (initialInfo.teacherId && initialInfo.courseId) {
      handleGroupId(initialInfo.teacherId, initialInfo.courseId);
    }
  }, [initialInfo.teacherId, initialInfo.courseId]);

  const handleGroupDetail = async (id) => {
    const res = await GetCourseGroupDetail(id);
    setCourseCapacity(res.courseGroupDto.courseCapacity);
  };
  useEffect(() => {
    if (courseCapacity) {
      console.log(courseCapacity);
    }
  }, [courseCapacity]);

  useEffect(() => {
    if (groupId) {
      handleGroupDetail(groupId);
    }
  }, [groupId]);

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
  // const date = "1392-05-12";
  // const splittedDate = date.split("-");
  // const UTCDate = new Date();
  // const time = UTCDate.toUTCString().split(" ");
  // const convertedDate = newDate(
  //   parseInt(splittedDate[0]),
  //   parseInt(splittedDate[1]),
  //   parseInt(splittedDate[2])
  // );

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

  // Setting Dates
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  useEffect(() => {
    if (initialInfo.startTime) {
      var isodate = new Date(initialInfo.startTime);
      var localedateformat = isodate.toLocaleDateString("fa-IR");
      // const finalDate = localedateformat.replaceAll("/", "-");
      setStartTime(localedateformat);
    }
    if (initialInfo.endTime) {
      var isodate = new Date(initialInfo.endTime);
      var localedateformat = isodate.toLocaleDateString("fa-IR");
      const finalDate = localedateformat.replaceAll("/", "-");
      setEndTime(finalDate);
    }
  }, [initialInfo.startTime, initialInfo.endTime]);
  useEffect(() => {
    if (startTime) {
      console.log(startTime);
      console.log(typeof startTime);
    }
  }, [startTime]);

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">اطلاعات دوره</h5>
        <small>اطلاعات دوره را اضافه کنید.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="3" className="mb-1">
            <Label className="form-label" for="courseName">
              نام دوره
            </Label>
            <Controller
              id="courseName"
              name="Title"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input value={value} onChange={onChange} placeholder="دوره 1" />
              )}
            />
          </Col>
          <Col md="3" className="mb-1">
            <Label className="form-label" for="miniDescribe">
              توضیح کوتاه درباره دوره
            </Label>
            <Controller
              id="miniDescribe"
              name="MiniDescribe"
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
            <Label className="form-label" for="capacity">
              ظرفیت دوره
            </Label>
            <Controller
              id="capacity"
              name="Capacity"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  placeholder="ظرفیت دوره"
                  type="number"
                />
              )}
            />
          </Col>
          <Col md="3" className="mb-1">
            <Label
              className="form-label d-flex justify-content-between"
              for="coursePrice"
            >
              قیمت دوره
              <span>
                {shownPrice != "NaN" && shownPrice != undefined
                  ? shownPrice + " تومان "
                  : ""}
              </span>
            </Label>
            <Controller
              id="coursePrice"
              name="Cost"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChange={(e) =>
                    // handlePriceConvert(e.target.value)
                    onChange(e.target.value)
                  }
                  placeholder="5000000"
                />
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col md="3" className="mb-1">
            <Label className="form-label" for="StartTime">
              تاریخ شروع برگزاری
            </Label>
            <Controller
              id="StartTime"
              name="StartTime"
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
          <Col md="3" className="mb-1">
            <Label className="form-label" for="EndTime">
              تاریخ اتمام برگزاری
            </Label>

            <Controller
              id="EndTime"
              name="EndTime"
              control={control}
              render={({ field: { onChange } }) => (
                <Cleave
                  className="form-control"
                  placeholder="1403-02-01"
                  options={options}
                  id="date"
                  onChange={(e) => {
                    onChange(handleDateConvert(e.target.value));
                  }}
                />
              )}
            />
          </Col>
          <Col md="3" className="mb-1">
            <Label className="form-label" for="miniLink">
              لینک کوتاه دوره
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
          <Col md="3" className="mb-1">
            <Label className="form-label" for="SessionNumber">
              تعداد جلسات دوره
            </Label>
            <Controller
              id="SessionNumber"
              name="SessionNumber"
              control={control}
              render={({ field: { onChange } }) => (
                <Input
                  onChange={(e) =>
                    // handlePriceConvert(e.target.value)
                    onChange(e.target.value)
                  }
                  placeholder="12"
                />
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col md="12" className="mb-1">
            <Label className="form-label" for="description">
              توضیحات کامل دوره
            </Label>
            <Controller
              id="description"
              name="Describe"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  onChange={onChange}
                  value={value}
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

export { CourseInfo };
