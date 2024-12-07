import React, { useContext, useEffect, useState } from "react";
// ** React Imports
// ** Utils
import { selectThemeColors } from "@utils";

import PaymentCost from "./PaymentCost";
import Select from "react-select";
import { Row, Col, Card, CardBody } from "reactstrap";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import { GetDashboardReport } from "../../@core/services/API/Dashboard/get.report.api";
import Tracker from "./Tracker";
import GetTechApi from "../../@core/services/API/Technology/get.tech.api";
import { GetDashboardTechReport } from "../../@core/services/API/Dashboard/get.techReport.api";

const DashboardApp = () => {
  const context = useContext(ThemeColors);
  // States
  const [report, setReport] = useState({});
  const handleGetReport = async () => {
    const res = await GetDashboardReport();
    setReport(res);
  };
  useEffect(() => {
    handleGetReport();
  }, []);

  // Get Dashboard Tech Report
  const [techReport, setTechReport] = useState([]);
  const handleGetTechReport = async () => {
    const res = await GetDashboardTechReport();
    setTechReport(res);
  };
  useEffect(() => {
    handleGetTechReport();
  }, []);

  // Getting Tech List
  const [techList, setTechList] = useState([]);
  const [selValue, setSelValue] = useState({});
  useEffect(() => {
    if (techList) {
      setSelValue(StandardOptionsForm(techList)[0]);
    }
  }, [techList]);

  const handleGetTechList = async () => {
    const res = await GetTechApi();
    setTechList(res);
  };
  useEffect(() => {
    handleGetTechList();
  }, []);

  const StandardOptionsForm = (data) => {
    const array = [];
    data.map((it) => {
      array.push({
        id: it.id,
        value: it.techName,
        label: it.techName,
      });
    });
    return array;
  };
  const [numberUsed, setNumberUsed] = useState(0);
  useEffect(() => {
    if (selValue && techList.length && techReport.length) {
      const num = handleGetUsedTech();
      console.log(num.countUsed);
      setNumberUsed(num.countUsed);
    }
  }, [selValue, techList, techReport]);

  const handleGetUsedTech = () => {
    const obj1 = techList.find((it) => {
      return it.id == selValue.id;
    });
    const obj2 = techReport.find((it) => {
      return it.id == obj1.id;
    });
    return obj2;
  };

  return (
    <>
      <Row className="match-height">
        <Col xl="6" md="6" xs="6">
          <PaymentCost allPaymentCost={report.allPaymentCost} />
        </Col>
        <Col xl="6" md="6" xs="6">
          <Card>
            <CardBody>
              <h5>
                تعداد استفاده از این تکنولوژی :{" "}
                {techList && selValue ? numberUsed : ""}
              </h5>
              <Select
                xl="6"
                md="6"
                xs="6"
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                options={StandardOptionsForm(techList)}
                isClearable={false}
                value={selValue}
                onChange={(e) => {
                  setSelValue(e);
                }}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg="6" xs="12">
          {report ? (
            <Tracker
              type="user"
              allUser={report.allUser}
              deactiveUsers={report.deactiveUsers}
              activeUserPercent={report.activeUserPercent}
              interActiveUserPercent={report.interActiveUserPercent}
              activeUsers={report.inCompeletUserCount}
              primary={context.colors.primary.main}
              danger={context.colors.danger.main}
            />
          ) : (
            ""
          )}
        </Col>
        <Col lg="6" xs="12">
          {report ? (
            <Tracker
              type="course"
              allReserve={report.allReserve}
              allReserveAccept={report.allReserveAccept}
              allReserveNotAccept={report.allReserveNotAccept}
              reserveAcceptPercent={report.reserveAcceptPercent}
              reserveNotAcceptPercent={report.reserveNotAcceptPercent}
              primary={context.colors.primary.main}
              danger={context.colors.danger.main}
            />
          ) : (
            ""
          )}
        </Col>
      </Row>
    </>
  );
};

export default DashboardApp;
