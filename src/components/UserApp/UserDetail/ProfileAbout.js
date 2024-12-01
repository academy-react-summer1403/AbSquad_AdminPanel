// ** Reactstrap Imports
import { Card, CardBody, CardText } from "reactstrap";

const ProfileAbout = ({ user }) => {
  return (
    <Card>
      <CardBody>
        <h5 className="mb-75"> اطلاعات اولیه کاربر:</h5>
        <div className="mt-2">
          <h5 className="mb-75">نام کاربری:</h5>
          <CardText>{user.userName}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75">جنسیت :</h5>
          <CardText>{user.gender == true ? "آقا" : "خانم"}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75">کدملی :</h5>
          <CardText>{user.nationalCode}</CardText>
        </div>

        <div className="mt-2">
          <h5 className="mb-75">درباره کاربر:</h5>
          <CardText>{user.userAbout}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75">شماره همراه:</h5>
          <CardText>{user.phoneNumber}</CardText>
        </div>

        <div className="mt-2">
          <h5 className="mb-75">آدرس :</h5>
          <CardText>{user.homeAdderess}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75">تاریخ تولد:</h5>
          <CardText>
            {new Date(user.birthDay).toLocaleDateString("fa-IR")}
          </CardText>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProfileAbout;
