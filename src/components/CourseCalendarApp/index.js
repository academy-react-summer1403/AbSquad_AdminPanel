// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Third Party Components
import { Row, Col } from "reactstrap";
import axios from "axios";

// ** Calendar App Component Imports
import Calendar from "./Calendar";

// ** Custom Hooks
import { useRTL } from "@hooks/useRTL";

// ** Styles
import "@styles/react/apps/app-calendar.scss";

// ** CalendarColors
const calendarsColor = {
  Business: "primary",
  Holiday: "success",
  Personal: "danger",
  Family: "warning",
  ETC: "info",
};

const CourseCalendarApp = () => {
  // ** states
  const [calendarApi, setCalendarApi] = useState(null);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ** Hooks
  const [isRtl] = useRTL();

  // ** Blank Event Object
  const blankEvent = {
    title: "",
    start: "",
    end: "",
    allDay: false,
    extendedProps: {
      calendar: "",
      description: "",
    },
  };

  // ** Fetch Events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `/Course/CourseList?PageNumber=1&RowsOfPage=592`
        );

        const courses = response.data.courseDtos;

        // Transform courses into FullCalendar event format
        const formattedEvents = courses.map((course) => ({
          id: course.courseId,
          title: course.title,
          start: course.lastUpdate,
          allDay: true,
          extendedProps: {
            calendar: "Business",
            description: course.describe,
            instructor: course.fullName,
            classroom: course.classRoomName,
            status: course.statusName,
          },
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Fragment>
      <div className="app-calendar overflow-hidden border">
        <Row className="g-0">
          <Col className="position-relative">
            {!isLoading ? (
              <Calendar
                isRtl={isRtl}
                blankEvent={blankEvent}
                calendarApi={calendarApi}
                calendarsColor={calendarsColor}
                setCalendarApi={setCalendarApi}
                events={events} // Pass fetched events
              />
            ) : (
              <p>Loading...</p>
            )}
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default CourseCalendarApp;
