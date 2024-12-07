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
import Cleave from "cleave.js/react";
import classnames from "classnames";
import { useForm, Controller } from "react-hook-form";
import AddAssistanceWorkApi from "../../@core/services/API/AssistanceWork/AddAssistanceWorkApi";
// ** UUID Import
import { v4 as uuidv4 } from "uuid";

const AddAssistanceWork = ({ setShow, show }) => {
  // State for storing parameters
  const [parameters, setParameters] = useState({});

  const handleAddAssistanceWork = async (data) => {
    try {
      const response = await AddAssistanceWorkApi(data);
      console.log("API Response:", response); // Debugging response
    } catch (error) {
      console.error("Error occurred while sending data to API:", error);
    }
  };

  useEffect(() => {
    if (parameters.worktitle) {
      handleAddAssistanceWork(parameters);
    }
  }, [parameters]);

  // React Hook Form
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    const generatedUUID = uuidv4(); // Generate a valid UUID
    const updatedData = {
      ...data,
      assistanceId: generatedUUID, // Add generated UUID
    };

    setParameters(updatedData); // Set parameters for API call
    setShow(!show); // Close the modal
    console.log("Data to be sent:", updatedData); // Log data for debugging
  };

  // Date formatting function
  const handleDateConvert = (date) => {
    const [year, month, day] = date.split("-");
    const formattedDate = new Date(year, month - 1, day).toISOString();
    return formattedDate;
  };

  // Cleave.js options for date input
  const dateInputOptions = {
    date: true,
    delimiter: "-",
    datePattern: ["Y", "m", "d"],
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
          <h1 className="text-center mb-1">اضافه کردن دستیار</h1>
          <Row
            tag="form"
            className="gy-1 gx-2 mt-75"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Col xs={12}>
              <Label className="form-label" for="worktitle">
                عنوان کار
              </Label>
              <InputGroup>
                <Controller
                  name="worktitle"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="worktitle"
                      placeholder="نام کار را وارد کنید..."
                      className={classnames("form-control", {
                        "is-invalid": errors.worktitle,
                      })}
                    />
                  )}
                />
              </InputGroup>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="workDescribe">
                توضیحات کار
              </Label>
              <InputGroup>
                <Controller
                  name="workDescribe"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="workDescribe"
                      placeholder="توضیحات کار را وارد کنید..."
                      className={classnames("form-control", {
                        "is-invalid": errors.workDescribe,
                      })}
                    />
                  )}
                />
              </InputGroup>
            </Col>
            <Col xs={12} className="mb-1">
              <Label className="form-label" for="workDate">
                تاریخ کار
              </Label>
              <Controller
                id="workDate"
                name="workDate"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Cleave
                    className="form-control"
                    placeholder="1403-01-01"
                    options={dateInputOptions}
                    value={value}
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
                  reset(); // Reset form fields
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

export { AddAssistanceWork };
