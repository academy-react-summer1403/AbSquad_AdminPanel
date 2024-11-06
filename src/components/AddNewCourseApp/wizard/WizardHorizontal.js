// ** React Imports
import { useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Steps
import Address from "./steps-with-validation/Address";
import SocialLinks from "./steps-with-validation/SocialLinks";
import CourseInfo from "./steps-with-validation/CourseInfo";
import ImageUpload from "./steps-with-validation/ImageUpload";

const WizardHorizontal = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const steps = [
    {
      id: "Image",
      title: "اضافه کردن عکس دوره",
      subtitle: "عکس دوره وارد شود.",
      content: <ImageUpload stepper={stepper} />,
    },
    {
      id: "Info",
      title: "اطلاعات دوره",
      subtitle: "اطلاعات دوره را اضافه کنید.",
      content: <CourseInfo stepper={stepper} />,
    },
    {
      id: "Attributes",
      title: "اطلاعات تکمیلی دوره",
      subtitle: "اطلاعات تکمیلی دوره را وارد کنید.",
      content: <Address stepper={stepper} />,
    },
    {
      id: "Description",
      title: "توضیحات دوره",
      subtitle: "توضیحات دوره را وارد کنید.",
      content: <SocialLinks stepper={stepper} />,
    },
    {
      id: "Technologies",
      title: "تکنولوژی های دوره",
      subtitle: "تکنولوژی های دوره را وارد کنید.",
      content: <SocialLinks stepper={stepper} />,
    },
  ];

  return (
    <div className="horizontal-wizard">
      <Wizard instance={(el) => setStepper(el)} ref={ref} steps={steps} />
    </div>
  );
};

export default WizardHorizontal;
