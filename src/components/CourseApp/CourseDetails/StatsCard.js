// ** Third Party Components
import classnames from "classnames";
import {
  ShoppingBag,
  ThumbsUp,
  MessageCircle,
  DollarSign,
  Users,
} from "react-feather";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
} from "reactstrap";

const StatsCard = ({ cols, courseDetail }) => {
  const data = [
    {
      title: courseDetail.paymentDoneTotal,
      subtitle: "تعداد خرید",
      color: "light-success",
      icon: <ShoppingBag size={24} />,
    },
    {
      title: courseDetail.paymentNotDoneTotal,
      subtitle: "تعداد خرید انجام نشده",
      color: "light-success",
      icon: <Users size={24} />,
    },
    {
      title: courseDetail.courseLikeTotal,
      subtitle: "تعداد علاقمندی",
      color: "light-info",
      icon: <ThumbsUp size={24} />,
    },
    {
      title: courseDetail.courseCommentTotal,
      subtitle: "تعداد کامنت ها",
      color: "light-danger",
      icon: <MessageCircle size={24} />,
    },
    {
      title: courseDetail.courseUserTotal,
      subtitle: "تعداد دانشجو ها",
      color: "light-success",
      icon: <Users size={24} />,
    },
  ];

  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols);
      const margin = index === 2 ? "sm" : colMargin[0];
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== data.length - 1,
          })}
        >
          <div className="d-flex align-items-center mt-2">
            <Avatar color={item.color} icon={item.icon} className="me-2" />
            <div className="my-auto">
              <h4 className="fw-bolder mb-0">{item.title}</h4>
              <CardText className="font-small-3 mb-0">{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      );
    });
  };

  return (
    <Card className="card-statistics p-0">
      {/* statistics-body !p-0 */}
      <CardBody className="statistics-body">
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  );
};

export default StatsCard;
