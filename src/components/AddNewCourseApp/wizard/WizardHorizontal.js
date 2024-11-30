// ** React Imports
import { useEffect, useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Steps
import DetailedInfo from "./steps-with-validation/DetailedInfo";
import CourseInfo from "./steps-with-validation/CourseInfo";
import ImageUpload from "./steps-with-validation/ImageUpload";
import AddGroup from "./steps-with-validation/AddGroup";
import AddTech from "./steps-with-validation/AddTech";

const WizardHorizontal = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const [finalData, setFinalData] = useState({});
  const [finalCourseId, setFinalCourseId] = useState("");
  const steps = [
    {
      id: "Image",
      title: "اضافه کردن عکس دوره",
      subtitle: "عکس دوره وارد شود.",
      content: (
        <ImageUpload
          stepper={stepper}
          finalData={finalData}
          setFinalData={setFinalData}
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
          finalData={finalData}
          setFinalData={setFinalData}
        />
      ),
    },
    {
      id: "DetailedInfo",
      title: "اطلاعات تکمیلی دوره",
      subtitle: "اطلاعات تکمیلی دوره را وارد کنید.",
      content: (
        <DetailedInfo
          stepper={stepper}
          finalData={finalData}
          setFinalData={setFinalData}
          setFinalCourseId={setFinalCourseId}
        />
      ),
    },
    {
      id: "AddGroup",
      title: "اضافه کردن گروه",
      subtitle: "اطلاعات گروه را اضافه کنید.",
      content: (
        <AddGroup
          stepper={stepper}
          setFinalData={setFinalData}
          courseId={finalCourseId}
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
          finalData={finalData}
          setFinalData={setFinalData}
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

export default WizardHorizontal;
