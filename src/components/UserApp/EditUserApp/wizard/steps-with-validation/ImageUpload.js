// ** React Imports
import { Fragment, useEffect } from "react";

// ** Utils
import { isObjEmpty } from "@utils";

// ** Third Party Components
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Reactstrap Imports
import {
  Form,
  Label,
  Input,
  Row,
  Col,
  Button,
  FormFeedback,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";
import Import from "./Import";

const ImageUpload = ({ stepper, initialInfo, setFinalData }) => {
  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (initialInfo.currentPictureAddress) {
      setValue("currentPictureAddress", initialInfo.currentPictureAddress);
    }
  }, [initialInfo.currentPictureAddress]);

  const onSubmit = (data) => {
    if (isObjEmpty(errors)) {
      stepper.next();
    }
  };

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col className="mb-1">
            <Controller
              id="currentPictureAddress"
              name="currentPictureAddress"
              control={control}
              render={({ field }) => (
                <Import
                  {...field}
                  onChange={field.onChange}
                  initialInfo={initialInfo}
                />
              )}
            />
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Button color="secondary" className="btn-prev" outline disabled>
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

export { ImageUpload };
