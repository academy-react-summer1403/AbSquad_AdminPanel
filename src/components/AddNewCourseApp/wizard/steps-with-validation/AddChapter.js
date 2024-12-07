﻿import { Fragment, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Label, Row, Col, Button, Form, Input } from "reactstrap";
import "@styles/react/libs/react-select/_react-select.scss";
import { v4 as uuidv4 } from "uuid";
import { AddChapterApi } from "../../../../@core/services/API/AllCoursesAdmin/AddNewCourse/add.chapter.api";
import { AddNotif } from "../../../../@core/services/API/AllCoursesAdmin/AddNewCourse/add.notif.api";

const AddChapter = ({ stepper, courseId }) => {
  // States
  const [chapters, setChapters] = useState([]);
  const [notif, setNotif] = useState([]); // State for notifications
  const [currentChapter, setCurrentChapter] = useState({
    cId: courseId,
    chapterName: "",
    sessions: [],
  });
  const [sessionName, setSessionName] = useState("");
  const [sessionDescription, setSessionDescription] = useState("");

  // Fetch notifications on component mount
  useEffect(() => {
    const fetchNotif = async () => {
      try {
        const response = await fetch("http://localhost:8080/notif");
        const data = await response.json();
        setNotif(data.notif || []); // Ensure notif is an array
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotif();
  }, []);

  // Update cId if courseId changes
  useEffect(() => {
    setCurrentChapter((prev) => ({
      ...prev,
      cId: courseId,
    }));
  }, [courseId]);

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handlers
  const handleAddSession = () => {
    const newSession = {
      sessionId: uuidv4(),
      sessionName,
      sessionDescription,
    };
    setCurrentChapter((prev) => ({
      ...prev,
      sessions: [...prev.sessions, newSession],
    }));
    setSessionName("");
    setSessionDescription("");
  };

  const handleAddChapter = async () => {
    // Check for duplicate notifications
    const existingNotif = notif.find(
      (notification) => notification.cId === courseId
    );

    if (!existingNotif) {
      // Add notification if it doesn't exist
      await AddNotif({
        cId: courseId,
        isRead: false,
      });
    }

    // Add the chapter to the list
    setChapters([...chapters, currentChapter]);

    // Reset current chapter
    setCurrentChapter({
      cId: courseId,
      chapterName: "",
      sessions: [],
    });
  };

  const handleSubmitApi = async () => {
    // Submit chapters to API
    for (const chapter of chapters) {
      await AddChapterApi({ ...chapter });
    }
    alert("Chapters submitted successfully!");
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">اطلاعات دوره</h5>
        <small>اطلاعات دوره را اضافه کنید.</small>
      </div>
      <Form onSubmit={handleSubmit(handleSubmitApi)}>
        <Row>
          <Col md="12" className="mb-1">
            <Label className="form-label" for="chapterName">
              نام فصل
            </Label>
            <Controller
              id="chapterName"
              name="chapterName"
              control={control}
              render={() => (
                <Input
                  value={currentChapter.chapterName}
                  onChange={(e) =>
                    setCurrentChapter((prev) => ({
                      ...prev,
                      chapterName: e.target.value,
                    }))
                  }
                  placeholder="نام فصل را وارد کنید"
                />
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="sessionName">
              نام جلسه
            </Label>
            <Controller
              id="sessionName"
              name="sessionName"
              control={control}
              render={() => (
                <Input
                  value={sessionName}
                  onChange={(e) => setSessionName(e.target.value)}
                  placeholder="نام جلسه را وارد کنید"
                />
              )}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="sessionDescription">
              توضیحات جلسه
            </Label>
            <Controller
              id="sessionDescription"
              name="sessionDescription"
              control={control}
              render={() => (
                <Input
                  value={sessionDescription}
                  onChange={(e) => setSessionDescription(e.target.value)}
                  placeholder="توضیحات جلسه را وارد کنید"
                />
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Button color="info" onClick={handleAddSession}>
              اضافه کردن جلسه
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md="12" className="mb-1">
            <Button color="success" onClick={handleAddChapter}>
              اضافه کردن فصل
            </Button>
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Button
            type="button"
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0" />
            <span className="align-middle d-sm-inline-block d-none">قبلی</span>
          </Button>
          <Button type="submit" color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">
              ثبت فصل
            </span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0" />
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default AddChapter;
