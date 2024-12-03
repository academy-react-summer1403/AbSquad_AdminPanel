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
import { format, newDate } from "date-fns-jalali";
const options = { date: true, delimiter: "-", datePattern: ["Y", "m", "d"] };
// ** Third Party Components
import classnames from "classnames";
import Cleave from "cleave.js/react";
import { Check, X } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import GetDepartment from "../../@core/services/API/Department/get.department.api";
import UpdateSemester from "../../@core/services/API/Semester/update.semester.api";

const EditSemesterModal = ({
  setShow,
  show,
  refresh,
  setRefresh,
  semesterDetail,
}) => {
  useEffect(() => {
    if (semesterDetail) {
      setParameters({ id: semesterDetail.id });
      setValue("id", semesterDetail.id);
      setValue("termName", semesterDetail.termName);
      setValue("departmentId", semesterDetail.departmentId);
      setValue("startDate", semesterDetail.startDate);
      setValue("endDate", semesterDetail.endDate);
      setValue("expire", semesterDetail.expire);
    }
  }, [semesterDetail]);

  //   States
  const [parameters, setParameters] = useState({});
  const [depNameSelect, setDepNameSelect] = useState({});
  const [isExpire, setIsExpire] = useState(false);
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
  useEffect(() => {
    setIsExpire(semesterDetail.expire);
  }, [semesterDetail.expire]);

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
    setRefresh(!refresh);
  };
  const handleUpdate = async (data) => {
    await UpdateSemester(data);
  };
  useEffect(() => {
    if (parameters.termName) handleUpdate(parameters);
  }, [parameters]);

  //   Handling Date
  const handleInitDate = (date) => {
    const initDate = new Date(date); // Convert ISO date string to a Date object
    const finalDate = format(initDate, "yyyy/MM/dd").replaceAll("/", "-"); // Format the date in the Persian calendar
    return finalDate.toString();
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
  const [startDateReal, setStartDateReal] = useState("");
  const [endDateReal, setEndDateReal] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (semesterDetail.startDate)
      setStartDate(handleInitDate(semesterDetail.startDate));
  }, [semesterDetail.startDate]);

  useEffect(() => {
    if (semesterDetail.endDate)
      setEndDate(handleInitDate(semesterDetail.endDate));
  }, [semesterDetail.endDate]);
  // Handlging the Expire
  const handleExpire = (val) => {
    setParameters({ ...parameters, expire: val });
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
          <h1 className="text-center mb-1">ویرایش ترم</h1>

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
                render={({ field: { onChange, value } }) => (
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    options={
                      departments ? StandardOptionsForm(departments) : {}
                    }
                    isClearable={false}
                    value={
                      JSON.stringify(depNameSelect) != "{}"
                        ? depNameSelect
                        : StandardOptionsForm([
                            departments.find(
                              (it) => it.id == semesterDetail.departmentId
                            ),
                          ])
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
              <div className="d-flex align-items-center">
                <div className="form-switch w-100">
                  <Input
                    type="switch"
                    name="expire"
                    id="expire"
                    checked={isExpire}
                    onChange={(e) => {
                      handleExpire(e.target.checked);
                      setIsExpire(e.target.checked);
                    }}
                  />
                  <Label className="form-check-label" for="expire">
                    <span className="switch-icon-left">
                      <Check size={14} />
                    </span>
                    <span className="switch-icon-right">
                      <X size={14} />
                    </span>
                  </Label>
                  <Label
                    className="form-check-label fw-bolder ms-1"
                    for="expire"
                  >
                    {isExpire == true ? "منقضی" : "جاری"}
                  </Label>
                </div>
              </div>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="startDate">
                تاریخ شروع
              </Label>
              <Controller
                id="startDate"
                name="startDate"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Cleave
                    className="form-control"
                    placeholder="1403-01-01"
                    options={options}
                    value={startDate ? startDate : ""}
                    id="startDate"
                    onChange={(e) => {
                      setStartDateReal(e.target.value);
                      onChange(handleDateConvert(e.target.value));
                    }}
                  />
                )}
              />
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="startDate">
                تاریخ پایان
              </Label>
              <Controller
                id="startDate"
                name="startDate"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Cleave
                    className="form-control"
                    placeholder="1403-01-01"
                    options={options}
                    value={endDate ? endDate : ""}
                    id="startDate"
                    onChange={(e) => {
                      setStartDateReal(e.target.value);
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

export default EditSemesterModal;
