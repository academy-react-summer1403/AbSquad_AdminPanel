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

import { useForm, Controller } from "react-hook-form";
import AddTermClose from "../../@core/services/API/Semester/addClose.semester.api";

const CloseTermModal = ({ setShow, show, refresh, setRefresh, termId }) => {
  //   States
  const [parameters, setParameters] = useState({});
  const [depNameSelect, setDepNameSelect] = useState({});
  const [isExpire, setIsExpire] = useState(false);

  //   Getting Departments
  useEffect(() => {
    if (termId) setParameters({ ...parameters, termId: termId });
  }, [termId]);

  const handleAddTermClose = async (data) => {
    await AddTermClose(data);
  };
  useEffect(() => {
    if (parameters.closeReason) handleAddTermClose(parameters);
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

  //   Handling Date

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
          <h1 className="text-center mb-1">بستن ترم</h1>

          <Row
            tag="form"
            className="gy-1 gx-2 mt-75"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Col xs={12}>
              <Label className="form-label" for="closeReason">
                دلیل بستن
              </Label>
              <Controller
                id="closeReason"
                name="closeReason"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    placeholder="دلیل بستن را بنویسید..."
                  />
                )}
              />
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="startCloseDate">
                تاریخ شروع
              </Label>
              <Controller
                id="startCloseDate"
                name="startCloseDate"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Cleave
                    className="form-control"
                    placeholder="1403-01-01"
                    options={options}
                    value={startDate ? startDate : ""}
                    id="startCloseDate"
                    onChange={(e) => {
                      onChange(handleDateConvert(e.target.value));
                    }}
                  />
                )}
              />
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="endCloseDate">
                تاریخ پایان
              </Label>
              <Controller
                id="endCloseDate"
                name="endCloseDate"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Cleave
                    className="form-control"
                    placeholder="1403-01-01"
                    options={options}
                    value={endDate ? endDate : ""}
                    id="endCloseDate"
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

export default CloseTermModal;
