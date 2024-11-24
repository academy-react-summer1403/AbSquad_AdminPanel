// ** React Imports
import { useEffect, useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Steps
import { DetailedInfo } from "./steps-with-validation/DetailedInfo";
import { CourseInfo } from "./steps-with-validation/CourseInfo";
import { ImageUpload } from "./steps-with-validation/ImageUpload";
import { AddTech } from "./steps-with-validation/AddTech";
import { useParams } from "react-router-dom";
import { GetCourseDetailApi } from "../../../@core/services/API/AllCoursesAdmin/GetCourseDetail/get.course.detail.api";

const WizardHorizontal = () => {
  // Getting Id
  const { id } = useParams();

  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const [finalData, setFinalData] = useState({});
  const [initialInfo, setInitialInfo] = useState({});

  // Fetching Initialized Information
  const fetchInit = async (courseId) => {
    const res = await GetCourseDetailApi(courseId);
    setInitialInfo(res);
  };
  useEffect(() => {
    if (initialInfo) console.log(initialInfo);
  }, [initialInfo]);

  useEffect(() => {
    fetchInit(id);
  }, []);

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
          setInitialInfo={setInitialInfo}
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
          finalData={finalData}
          setFinalData={setFinalData}
          setInitialInfo={setInitialInfo}
          initialInfo={initialInfo}
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
          setInitialInfo={setInitialInfo}
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
          finalData={finalData}
          setFinalData={setFinalData}
          setInitialInfo={setInitialInfo}
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
