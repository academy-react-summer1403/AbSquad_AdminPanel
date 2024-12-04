import React, { useContext, useEffect, useState } from "react";
// ** React Imports

import PaymentCost from "./PaymentCost";

import { Row, Col } from "reactstrap";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import { GetDashboardReport } from "../../@core/services/API/Dashboard/get.report.api";
import Tracker from "./Tracker";
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

  return (
    <>
      <Row className="match-height">
        <Col xl="12" md="12" xs="12">
          <PaymentCost allPaymentCost={report.allPaymentCost} />
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
