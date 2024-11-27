// ** React Imports
import { Fragment, useState, useEffect } from "react";

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
import { AddGroupApi } from "../../../../@core/services/API/AllCoursesAdmin/AddNewCourse/add.group";

const AddGroup = ({ stepper, courseId }) => {
  const [finalData, setFinalData] = useState({});
  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setFinalData({
      ...data,
      GroupCapacity: parseInt(data.GroupCapacity),
      CourseId: courseId,
    });
    stepper.next();
  };

  const handleFinalData = (finalData) => {
    const formData = new FormData();
    for (const key in finalData) {
      if (finalData.hasOwnProperty(key)) {
        formData.append(key, finalData[key]);
      }
    }
    console.log(formData);
    handleAddGroup(formData);
  };

  useEffect(() => {
    if (finalData) {
      console.log(finalData);
      handleFinalData(finalData);
    }
  }, [finalData]);
  const handleAddGroup = async (data) => {
    await AddGroupApi(data);
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
            <Label className="form-label" for="GroupName">
              نام گروه
            </Label>
            <Controller
              id="GroupName"
              name="GroupName"
              control={control}
              render={({ field: { onChange } }) => (
                <Input onChange={onChange} placeholder="نام دوره" />
              )}
            />
          </Col>

          <Col md="3" className="mb-1">
            <Label className="form-label" for="GroupCapacity">
              ظرفیت گروه
            </Label>
            <Controller
              id="GroupCapacity"
              name="GroupCapacity"
              control={control}
              render={({ field: { onChange } }) => (
                <Input
                  onChange={onChange}
                  placeholder="ظرفیت گروه"
                  type="number"
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

export default AddGroup;
