// ** React Imports
import { Fragment } from "react";

// ** Utils
import { isObjEmpty } from "@utils";

// ** Third Party Components
import { useForm, Controller } from "react-hook-form";

// ** Reactstrap Imports
import { Form, Row, Col, Button } from "reactstrap";
import Import from "./Import";

const ImageUpload = ({ stepper, setFinalData }) => {
  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    if (isObjEmpty(errors)) {
      setFinalData({
        ...data,
        ImageAddress: data.TumbImageAddress, // This will contain the file object or Base64 string
        Image: data.TumbImageAddress, // Same as above, ensuring consistency
      });
      stepper.next();
    }
  };

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col className="mb-1">
            <Controller
              id="username"
              name="TumbImageAddress"
              control={control}
              render={({ field: { onChange } }) => (
                <Import
                  onChange={(file) => {
                    // Passing file (or Base64 string if configured) to React Hook Form
                    onChange(file);
                  }}
                />
              )}
            />
          </Col>
        </Row>
        <div className="d-flex gap-2">
          <Button color="primary" type="submit">
            <span className="align-middle d-sm-inline-block d-none">
              ثبت تغییرات
            </span>
          </Button>
          <Button color="secondary" type="reset">
            <span className="align-middle d-sm-inline-block d-none">لغو</span>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default ImageUpload;
