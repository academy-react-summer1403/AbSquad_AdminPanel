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
import { newDate } from "date-fns-jalali";
const options = { date: true, delimiter: "-", datePattern: ["Y", "m", "d"] };
// ** Third Party Components
import classnames from "classnames";
import Cleave from "cleave.js/react";
import { Check, X } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import GetDepartment from "../../@core/services/API/Department/get.department.api";
import AddSemester from "../../@core/services/API/Semester/add.semester.api";

const AddSemesterModal = ({ setShow, show }) => {
  //   States
  const [parameters, setParameters] = useState({ id: 1 });
  const [depNameSelect, setDepNameSelect] = useState({});
  //   Auxilary Function for select
  const StandardOptionsForm = (data) => {
    const array = [];
    data.map((it) => {
      array.push({
        id: it.id,
        value: it.depName,
        label: it.depName,
      });
    });

    return array;
  };
  //   Getting Departments
  const [departments, setDepartments] = useState([]);

  const handleGetDepartments = async () => {
    const res = await GetDepartment();
    setDepartments(res);
  };
  useEffect(() => {
    handleGetDepartments();
  }, []);
  useEffect(() => {
    console.log(parameters);
  }, [parameters]);
  const handleAddSemester = async (data) => {
    await AddSemester(data);
  };
  useEffect(() => {
    if (parameters.termName) handleAddSemester(parameters);
  }, [parameters]);

  // ** Hooks
  const {
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    setParameters({ ...data, ...parameters });
    setShow(!show);
  };

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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
          <h1 className="text-center mb-1">ساخت ترم</h1>

          <Row
            tag="form"
            className="gy-1 gx-2 mt-75"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Col xs={12}>
              <Label className="form-label" for="termName">
                نام ترم
              </Label>

              <InputGroup>
                <Controller
                  name="termName"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Cleave
                        {...field}
                        id="termName"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="نام ترم را وارد کنید..."
                        className={classnames("form-control")}
                      />
                    );
                  }}
                />
              </InputGroup>
            </Col>
            <Col xs={12}>
              <Label className="form-label">نام دپارتمان</Label>
              <Controller
                id="departmentId"
                name="departmentId"
                control={control}
                render={({ field: { onChange } }) => (
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    options={
                      departments ? StandardOptionsForm(departments) : {}
                    }
                    isClearable={false}
                    value={
                      JSON.stringify(depNameSelect) != "{}" ? depNameSelect : {}
                    }
                    onChange={(e) => {
                      setDepNameSelect(e);
                      onChange(e.id);
                    }}
                  />
                )}
              />
            </Col>

            <Col xs={12}>
              <Label className="form-label" for="startDate">
                تاریخ شروع
              </Label>
              <Controller
                id="startDate"
                name="startDate"
                control={control}
                render={({ field: { onChange } }) => (
                  <Cleave
                    className="form-control"
                    placeholder="1403-01-01"
                    options={options}
                    value={startDate ? startDate : ""}
                    id="startDate"
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      onChange(handleDateConvert(e.target.value));
                    }}
                  />
                )}
              />
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="endDate">
                تاریخ پایان
              </Label>
              <Controller
                id="endDate"
                name="endDate"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Cleave
                    className="form-control"
                    placeholder="1403-01-01"
                    options={options}
                    value={endDate ? endDate : ""}
                    id="endDate"
                    onChange={(e) => {
                      setEndDate(e.target.value);
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

export default AddSemesterModal;
