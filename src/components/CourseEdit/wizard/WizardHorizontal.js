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
import { GetUserCourseDetail } from "../../../@core/services/API/AllCoursesAdmin/GetCourseDetail/get.user.courseDetail.api";

const WizardHorizontal = () => {
  // Getting Id
  const { id } = useParams();

  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const [finalData, setFinalData] = useState({});
  const [initialInfo, setInitialInfo] = useState({});
  const [secondInitialInfo, setSecondInitialInfo] = useState({});
  // Fetching Initialized Information
  const fetchInit = async (courseId) => {
    const res = await GetCourseDetailApi(courseId);
    setInitialInfo(res);
  };
  const fetchSecondInit = async (courseId) => {
    const res = await GetUserCourseDetail(courseId);

    setSecondInitialInfo(res);
  };
  useEffect(() => {
    if (secondInitialInfo) console.log(secondInitialInfo);
  }, [secondInitialInfo]);

  useEffect(() => {
    fetchInit(id);
    fetchSecondInit(id);
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
          secondInitialInfo={secondInitialInfo}
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
          secondInitialInfo={secondInitialInfo}
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
