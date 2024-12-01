// ** React Imports
import { useEffect, useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Steps
import { CourseInfo } from "./steps-with-validation/CourseInfo";
import { ImageUpload } from "./steps-with-validation/ImageUpload";
import { AddTech } from "./steps-with-validation/AddTech";
import { useParams } from "react-router-dom";
import { GetUserDetail } from "../../../../@core/services/API/AllUsersAdmin/UserEdit/user.details.api";

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
      title: "اضافه کردن عکس دوره",
      subtitle: "عکس دوره وارد شود.",
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
      title: "اطلاعات دوره",
      subtitle: "اطلاعات دوره را اضافه کنید.",
      content: (
        <CourseInfo
          stepper={stepper}
          setFinalData={setFinalData}
          finalData={finalData}
          initialInfo={initialInfo}
        />
      ),
    },
    {
      id: "AddTech",
      title: "اضافه کردن تکنولوژی دوره",
      subtitle: "تکنولوژی های مورد نظر را انتخاب کنید.",
      content: (
        <AddTech
          stepper={stepper}
          setFinalData={setFinalData}
          finalData={finalData}
          initialInfo={initialInfo}
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
