// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Third Party Components
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

import { UpdateUserApi } from "../../../../../@core/services/API/AllUsersAdmin/UserEdit/update.user.api";

const SocialInfo = ({ stepper, initialInfo, finalData, setFinalData, id }) => {
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
    setFinalData({ ...finalData, ...data, id: id });
    stepper.next();
  };
  const handleUpdateUser = async (data) => {
    await UpdateUserApi(data);
  };
  useEffect(() => {
    if (finalData.gmail) handleUpdateUser(finalData);
  }, [finalData]);

  useEffect(() => {
    if (initialInfo) {
      setValue("gmail", initialInfo.gmail);
      setValue("recoveryEmail", initialInfo.recoveryEmail);
      setValue("telegramLink", initialInfo.telegramLink);
      setValue("linkdinProfile", initialInfo.linkdinProfile);
    }
  }, [initialInfo]);

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">اطلاعات دوره</h5>
        <small>اطلاعات دوره را اضافه کنید.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="3" className="mb-1">
            <Label className="form-label" for="gmail">
              ایمیل
            </Label>
            <Controller
              id="gmail"
              name="gmail"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  placeholder="ایمیل کاربر را وارد کنید"
                />
              )}
            />
          </Col>
          <Col md="3" className="mb-1">
            <Label className="form-label" for="recoveryEmail">
              ایمیل ریکاوری
            </Label>
            <Controller
              id="recoveryEmail"
              name="recoveryEmail"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input value={value} onChange={onChange} placeholder="" />
              )}
            />
          </Col>

          <Col md="3" className="mb-1">
            <Label
              className="form-label d-flex justify-content-between"
              for="telegramLink"
            >
              لینک تلگرام
            </Label>
            <Controller
              id="telegramLink"
              name="telegramLink"
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
            <Label className="form-label" for="linkdinProfile">
              لینک لینکدین
            </Label>
            <Controller
              id="linkdinProfile"
              name="linkdinProfile"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder=""
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
          <Button type="submit" color="success" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">ثبت</span>
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

export { SocialInfo };
