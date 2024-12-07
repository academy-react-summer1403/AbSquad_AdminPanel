// ** User List Component
import DepartmentList from "./Table";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from "react-feather";

// ** Styles
import "@styles/react/apps/app-users.scss";

const DepartmentApp = () => {
  return (
    <div className="app-user-list">
      <DepartmentList />
    </div>
  );
};

export default DepartmentApp;
