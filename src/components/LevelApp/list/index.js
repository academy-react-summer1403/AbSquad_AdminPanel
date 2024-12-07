// ** User List Component
import LevelList from "./Table";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from "react-feather";

// ** Styles
import "@styles/react/apps/app-users.scss";

const LevelApp = () => {
  return (
    <div className="app-user-list">
      <LevelList />
    </div>
  );
};

export default LevelApp;
