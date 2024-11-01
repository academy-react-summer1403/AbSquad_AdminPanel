import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
  Row,
  Col,
} from "reactstrap";
import { Eye, ShoppingBag, User } from "react-feather";
import CardCongratulations from "../@core/components/Home/Dashboard/CardCongratulations";
import StatsVertical from "../@core/components/widgets/stats/StatsVertical";
import SubscribersGained from "../@core/components/Home/Dashboard/SubscribersGained";
const Home = () => {
  return (
    <div>
      <Row className="match-height">
        <Col lg="12" sm="12">
          <CardCongratulations />
        </Col>
      </Row>
      <Row className="match-height">
        {" "}
        <Col lg="3" sm="6">
          <StatsVertical
            icon={<User size={24} />}
            color="info"
            stats="97.8k"
            statTitle="دوره های رزرو شده"
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsVertical
            icon={<Eye size={21} />}
            color="info"
            stats="36.9k"
            statTitle="تعداد تمام کاربر ها"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
