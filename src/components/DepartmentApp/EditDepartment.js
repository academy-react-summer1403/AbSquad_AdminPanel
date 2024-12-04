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
import Select from "react-select";
import classnames from "classnames";
import { useForm, Controller } from "react-hook-form";
import EditDepartmentApi from "../../@core/services/API/Department/edit.department.api";
import GetBuildingApi from "../../@core/services/API/Building/get.building.api";

const EditDepartment = ({ setShow, show, id, depName, buildingId }) => {
  //   States
  const [parameters, setParameters] = useState({
    id: id,
    buildingId: buildingId,
  });

  const handleEditStatus = async (data) => {
    await EditDepartmentApi(data);
  };
  useEffect(() => {
    if (parameters.depName) handleEditStatus({ ...parameters });
  }, [parameters]);

  // ** Hooks

  const {
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    if (depName && buildingId) {
      setValue("depName", depName);
      setValue("buildingId", buildingId);
    }
  }, [depName, buildingId]);
  const onSubmit = (data) => {
    setParameters({ ...parameters, ...data });
    setShow(!show);
  };

  // Building For Select Options
  const [buildings, setBuildings] = useState([]);
  const [builNameSelect, setBuilNameSelect] = useState({});
  const handleGetBuildings = async () => {
    const res = await GetBuildingApi();
    setBuildings(res);
  };
  const StandardOptionsForm = (data) => {
    const array = [];
    data.map((it) => {
      array.push({
        id: it.id,
        value: it.buildingName,
        label: it.buildingName,
      });
    });

    return array;
  };
  useEffect(() => {
    handleGetBuildings();
  }, []);

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
          <h1 className="text-center mb-1">ویرایش دپارتمان</h1>

          <Row
            tag="form"
            className="gy-1 gx-2 mt-75"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Col xs={12}>
              <Label className="form-label" for="depName">
                نام دپارتمان
              </Label>

              <InputGroup>
                <Controller
                  name="depName"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        id="depName"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="نام دپارتمان را وارد کنید..."
                        className={classnames("form-control")}
                      />
                    );
                  }}
                />
              </InputGroup>
            </Col>
            <Col xs={12}>
              <Label className="form-label">نام ساختمان</Label>
              <Controller
                id="buildingId"
                name="buildingId"
                control={control}
                render={({ field: { onChange } }) => (
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    options={buildings ? StandardOptionsForm(buildings) : {}}
                    isClearable={false}
                    value={
                      JSON.stringify(builNameSelect) != "{}"
                        ? builNameSelect
                        : buildings
                        ? StandardOptionsForm([
                            buildings.find((it) => it.id == buildingId),
                          ])
                        : {}
                    }
                    onChange={(e) => {
                      setBuilNameSelect(e);
                      onChange(e.id);
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

export { EditDepartment };
