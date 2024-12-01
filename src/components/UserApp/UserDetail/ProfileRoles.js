// ** Reactstrap Imports
import { useEffect, useState } from "react";
import { Card, CardBody, CardText, Badge } from "reactstrap";

const ProfileRoles = ({ user }) => {
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    if (user) setUserRoles(user.roles);
  }, [user]);
  useEffect(() => {
    if (userRoles) console.log(userRoles);
  }, [userRoles]);
  const changeRoleName = (data) => {
    switch (data) {
      case "Administrator":
        return "مدیر";
      case "Teacher":
        return "استاد";
      case "Employee.Admin":
        return "زیرمدیر";
      case "Employee.Writer":
        return "نویسنده";
      case "Student":
        return "دانشجو";
      case "CourseAssistance":
        return "دستیار";
      case "TournamentAdmin":
        return "مدیر تورنمنت";
      case "Referee":
        return "داور";
      case "TournamentMentor":
        return "منتور تورنمنت";
      case "Support":
        return "پشتیبان";
    }
  };
  return (
    <Card>
      <CardBody>
        <h5 className="mb-75">نقش های کاربر :</h5>

        <CardText>
          {userRoles
            ? userRoles.map((it, index) => {
                return (
                  <div className="">
                    <Badge className="text-capitalize" color={"success"} pill>
                      {changeRoleName(it.roleName)}
                    </Badge>
                  </div>
                );
              })
            : ""}
        </CardText>
      </CardBody>
    </Card>
  );
};

export default ProfileRoles;
