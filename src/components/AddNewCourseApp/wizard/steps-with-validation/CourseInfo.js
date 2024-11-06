// ** React Imports
import { Fragment, useState } from "react";

// ** Third Party Components
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

const defaultValues = {
  lastName: "",
  firstName: "",
};

const CourseInfo = ({ stepper }) => {
  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = () => {
    stepper.next();
  };

  const countryOptions = [
    { value: "UK", label: "UK" },
    { value: "USA", label: "USA" },
    { value: "Spain", label: "Spain" },
    { value: "France", label: "France" },
    { value: "Italy", label: "Italy" },
    { value: "Australia", label: "Australia" },
  ];

  const languageOptions = [
    { value: "English", label: "English" },
    { value: "French", label: "French" },
    { value: "Spanish", label: "Spanish" },
    { value: "Italian", label: "Italian" },
    { value: "Japanese", label: "Japanese" },
  ];

  // Price Convert
  const [shownPrice, setShownPrice] = useState();
  const handlePriceConvert = (price) => {
    const convertedPrice = parseInt(price).toLocaleString();
    setShownPrice(convertedPrice);
  };
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
              name="courseName"
              control={control}
              render={({ field }) => <Input placeholder="دوره 1" />}
            />
            `
          </Col>
          <Col md="3" className="mb-1">
            <Label className="form-label" for="miniDescribe">
              توضیح کوتاه درباره دوره
            </Label>
            <Controller
              id="miniDescribe"
              name="miniDescribe"
              control={control}
              render={({ field }) => <Input placeholder="توضیح کوتاه" />}
            />
          </Col>
          <Col md="3" className="mb-1">
            <Label className="form-label" for="capacity">
              ظرفیت دوره
            </Label>
            <Controller
              id="capacity"
              name="capacity"
              control={control}
              render={({ field }) => (
                <Input placeholder="ظرفیت دوره" type="number" />
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
              name="coursePrice"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="5000000"
                  onChange={(e) => handlePriceConvert(e.target.value)}
                />
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="courseDate">
              تاریخ برگذاری
            </Label>
            <Controller
              id="courseDate"
              name="courseDate"
              control={control}
              render={({ field }) => <Input placeholder="تاریخ برگذاری" />}
            />
          </Col>
          {/* <Col md="6" className="mb-1">
            <Label className="form-label" for="miniLink">
              لینک کوتاه برای دوره
            </Label>
            <Select
              isMulti
              isClearable={false}
              theme={selectThemeColors}
              id={`miniLink`}
              options={languageOptions}
              className="react-select"
              classNamePrefix="select"
            />
          </Col> */}
          <Col md="6" className="mb-1">
            <Label className="form-label" for="miniLink">
              لینک کوتاه دوره
            </Label>
            <Controller
              id="miniLink"
              name="miniLink"
              control={control}
              render={({ field }) => <Input placeholder="لینک دوره" />}
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
              name="description"
              control={control}
              render={({ field }) => (
                <Input
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
