// ** React Imports
import { useEffect, useState } from "react";

// ** Third Party Components
import axios from "axios";
import Chart from "react-apexcharts";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const Tracker = (
  props
  // allUser,
  // deactiveUsers,
  // activeUserPercent
  // activeUsers
) => {
  const options = {
      plotOptions: {
        radialBar: {
          size: 150,
          offsetY: 20,
          startAngle: -150,
          endAngle: 150,
          hollow: {
            size: "65%",
          },
          track: {
            background: "#fff",
            strokeWidth: "100%",
          },
          dataLabels: {
            name: {
              offsetY: -5,
              fontFamily: "Montserrat",
              fontSize: "1rem",
            },
            value: {
              offsetY: 15,
              fontFamily: "Montserrat",
              fontSize: "1.714rem",
            },
          },
        },
      },
      colors: [props.danger],
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: [props.primary],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        dashArray: 8,
      },
      labels: [props.type == "user" ? "کاربران فعال" : "رزروهای تایید شده"],
    },
    series = [
      props.type == "user" && props.activeUserPercent
        ? Math.floor(props.activeUserPercent)
        : Math.floor(props.reserveAcceptPercent),
    ];

  // *****************************
  const options2 = {
      plotOptions: {
        radialBar: {
          size: 150,
          offsetY: 20,
          startAngle: -150,
          endAngle: 150,
          hollow: {
            size: "65%",
          },
          track: {
            background: "#fff",
            strokeWidth: "100%",
          },
          dataLabels: {
            name: {
              offsetY: -5,
              fontFamily: "Montserrat",
              fontSize: "1rem",
            },
            value: {
              offsetY: 15,
              fontFamily: "Montserrat",
              fontSize: "1.714rem",
            },
          },
        },
      },
      colors: [props.danger],
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: [props.primary],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        dashArray: 8,
      },
      labels: [
        props.type == "user" ? "کاربران غیرفعال" : "رزرو های تایید نشده",
      ],
    },
    series2 = [
      props.type == "user" && props.interActiveUserPercent
        ? Math.floor(props.interActiveUserPercent)
        : Math.floor(props.reserveNotAcceptPercent),
    ];

  // States And Handling

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle tag="h4">
          {props.type == "user" ? "کاربران" : "دوره ها"}
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col sm="2" className="d-flex flex-column flex-wrap text-center">
            <h1 className="font-large-2 fw-bolder mt-2 mb-0">
              {props.type == "user" ? props.allUser : props.allReserve}
            </h1>
            <CardText>
              {props.type == "user" ? "همه کاربران" : "همه دوره ها"}
            </CardText>
          </Col>
          <Col sm="12" className="d-flex justify-content-center">
            <Chart
              options={options}
              series={series}
              type="radialBar"
              height={220}
              id="active-card"
            />
            <Chart
              options={options2}
              series={series2}
              type="radialBar"
              height={220}
              id="deactive-card"
            />
          </Col>
        </Row>
        <div className="d-flex justify-content-between mt-1">
          <div className="text-center">
            <CardText className="mb-50">
              {props.type == "user" ? "کاربران فعال" : "رزرو های تایید شده"}
            </CardText>
            <span className="font-large-1 fw-bold">
              {props.type == "user"
                ? props.activeUsers
                : props.allReserveAccept}
            </span>
          </div>
          <div className="text-center">
            <CardText className="mb-50">
              {props.type == "user" ? "کاربران غیرفعال" : "رزرو های تایید نشده"}
            </CardText>
            <span className="font-large-1 fw-bold">
              {props.type == "user"
                ? props.deactiveUsers
                : props.allReserveNotAccept}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
export default Tracker;
