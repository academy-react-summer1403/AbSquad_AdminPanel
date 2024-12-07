// ** React Imports
import { useState } from "react";

// ** Icons Imports
import { AlignJustify, Rss, Info, Image, Users, Edit } from "react-feather";

// ** Reactstrap Imports
import {
  Card,
  CardImg,
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";

const ProfileHeader = ({ user }) => {
  // ** States
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Card className="profile-header mb-2">
      <CardImg src={user.bg} alt="User Profile Image" top />
      <div className="position-relative">
        <div className="profile-img-container d-flex align-items-center">
          <div className="profile-img">
            <img
              className="rounded img-fluid"
              src={
                user.currentPictureAddress
                  ? user.currentPictureAddress
                  : "/ErrImg.jpg"
              }
            />
          </div>
          <div className="profile-title ms-3">
            <h2 className="text-white">
              {user.fName} {" " + user.lName}
            </h2>
            <p className="text-white">
              {user.roles
                ? user.roles.map((it, index) => {
                    it.roleName + " ";
                  })
                : ""}
            </p>
          </div>
        </div>
      </div>
      <div className="profile-header-nav">
        <Navbar
          container={false}
          className="justify-content-end justify-content-md-between w-100"
          expand="md"
          light
        >
          <Button color="" className="btn-icon navbar-toggler" onClick={toggle}>
            <AlignJustify size={21} />
          </Button>
        </Navbar>
      </div>
    </Card>
  );
};

export default ProfileHeader;
