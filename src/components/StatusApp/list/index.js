// ** User List Component
import TechList from "./Table";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from "react-feather";

// ** Styles
import "@styles/react/apps/app-users.scss";

const StatusApp = () => {
  return (
    <div className="app-user-list">
      <TechList />
    </div>
  );
};

export default StatusApp;
