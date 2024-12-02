// ** React Imports
import { useEffect, useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Steps
import { UserInfo } from "./steps-with-validation/UserInfo";
import { ImageUpload } from "./steps-with-validation/ImageUpload";

import { useParams } from "react-router-dom";
import { GetUserDetail } from "../../../../@core/services/API/AllUsersAdmin/UserEdit/user.details.api";
import { SocialInfo } from "./steps-with-validation/SocialLinks";

const WizardHorizontal = () => {
  // Getting Id
  const { id } = useParams();

  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);
  const [finalData, setFinalData] = useState({});
  const [initialInfo, setInitialInfo] = useState({});
  const GetInitInfo = async (id) => {
    const res = await GetUserDetail(id);
    setInitialInfo(res);
  };
  useEffect(() => {
    GetInitInfo(id);
  }, []);

  const steps = [
    {
      id: "Image",
      title: "ویرایش کردن عکس کاربر",
      subtitle: "",
      content: (
        <ImageUpload
          stepper={stepper}
          setFinalData={setFinalData}
          finalData={finalData}
          initialInfo={initialInfo}
        />
      ),
    },
    {
      id: "Info",
      title: "ویرایش اطلاعات کاربر",
      subtitle: "",
      content: (
        <UserInfo
          stepper={stepper}
          setFinalData={setFinalData}
          finalData={finalData}
          initialInfo={initialInfo}
        />
      ),
    },
    {
      id: "SocialInfo",
      title: "ویرایش فضای مجازی",
      subtitle: "",
      content: (
        <SocialInfo
          stepper={stepper}
          setFinalData={setFinalData}
          finalData={finalData}
          initialInfo={initialInfo}
          id={id}
        />
      ),
    },
  ];

  return (
    <div className="horizontal-wizard">
      <Wizard instance={(el) => setStepper(el)} ref={ref} steps={steps} />
    </div>
  );
};

export { WizardHorizontal };
