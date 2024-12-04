// ** Reactstrap Imports
import { Card, CardBody } from "reactstrap";

// ** Images
import medal from "@src/assets/images/illustration/badge.svg";

import { useEffect, useState } from "react";

const PaymentCost = ({ allPaymentCost }) => {
  return (
    <Card className="card-congratulations-medal">
      <CardBody>
        <h5>مقدار پرداختی های شما</h5>

        <h3 className="mb-75 mt-2 pt-50">
          <a href="/" onClick={(e) => e.preventDefault()}>
            {allPaymentCost + " تومان میباشد "}
          </a>
        </h3>
        <img className="congratulation-medal" src={medal} alt="Medal Pic" />
      </CardBody>
    </Card>
  );
};

export default PaymentCost;
