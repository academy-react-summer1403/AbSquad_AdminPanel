// ** Reactstrap Imports
import { Card, CardBody, CardText } from "reactstrap";

const ProfileSocialMedia = ({ user }) => {
  return (
    <Card>
      <CardBody>
        <h5 className="mb-75">لینک فضای مجازی :</h5>
        <h5 className="mb-75">Linkdein :</h5>
        <CardText>{user.linkdinProfile}</CardText>
        <div className="mt-2">
          <h5 className="mb-75">Telegram :</h5>
          <CardText>{user.telegramLink}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75">ایمیل :</h5>
          <CardText>{user.gmail}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75">ایمیل ریکاوری:</h5>
          <CardText>{user.recoveryEmail}</CardText>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProfileSocialMedia;
