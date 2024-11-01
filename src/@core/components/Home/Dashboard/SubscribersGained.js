// ** React Imports
import { useEffect, useState } from "react";

// ** Third Party Components
import axios from "axios";
import { Users } from "react-feather";

// ** Custom Components
import StatsWithAreaChart from "../../widgets/stats/StatsWithAreaChart";

const SubscribersGained = ({ kFormatter }) => {
  return (
    <StatsWithAreaChart
      icon={<Users size={21} />}
      color="primary"
      // stats={kFormatter(data.analyticsData.subscribers)}
      statTitle="Subscribers Gained"
      // series={data.series}
      type="area"
    />
  );
};

export default SubscribersGained;
