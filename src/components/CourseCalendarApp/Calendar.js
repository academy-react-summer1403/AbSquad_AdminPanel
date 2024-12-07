import { useEffect, useState, useRef, memo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import toast from "react-hot-toast";
import { Card, CardBody } from "reactstrap";

// Import the AllCourseAdmin function
import { AllCourseAdmin } from "../../@core/services/API/AllCoursesAdmin/allCourse.api";

const Calendar = (props) => {
  const calendarRef = useRef(null);

  // State to store events
  const [events, setEvents] = useState([]);

  // Props
  const { isRtl, calendarsColor, calendarApi, setCalendarApi, blankEvent } =
    props;

  // Fetch Events Data from API using AllCourseAdmin
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Define searchParams for API call, like pagination
        const searchParams = {
          PageNumber: 1,
          RowsOfPage: 592, // Assuming we want to load all courses
        };

        // Call the API service to fetch courses
        const response = await AllCourseAdmin(searchParams);

        if (response && response && response.courseDtos) {
          // Format the events based on API response
          const formattedEvents = response.courseDtos.map((course) => {
            // Parse the lastUpdate date properly to make sure it works for FullCalendar
            const startDate = new Date(course.lastUpdate);
            const endDate = new Date(startDate); // Using the same date as end date, can adjust if needed

            // Format the events for FullCalendar
            return {
              title: course.title,
              start: startDate,
              end: endDate,
              extendedProps: {
                description: course.describe,
                cost: course.cost,
                status: course.statusName,
                reserveCount: course.reserveCount,
                level: course.levelName,
              },
              backgroundColor:
                calendarsColor[course.classRoomName] || "#FF0000", // Default background if not found
              borderColor: "#ffffff", // Ensure visible border
            };
          });

          // Update state with the fetched events
          setEvents(formattedEvents);
        }
      } catch (error) {
        toast.error("Failed to load events");
        console.error(error);
      }
    };

    fetchEvents();
  }, []); // This runs once when the component mounts

  // ** UseEffect to set calendarApi if it's not already set
  useEffect(() => {
    if (calendarApi === null) {
      setCalendarApi(calendarRef.current.getApi());
    }
  }, [calendarApi]);

  // ** Calendar Options
  const calendarOptions = {
    events, // Pass the events from state to FullCalendar
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
    },
    editable: false,
    navLinks: true,
    dayMaxEvents: true,
    direction: isRtl ? "rtl" : "ltr",
    eventClick({ event }) {
      toast.info(`Event: ${event.title}`);
    },
  };

  return (
    <Card className="shadow-none border-0 mb-0 rounded-0">
      <CardBody className="pb-0">
        <FullCalendar {...calendarOptions} ref={calendarRef} />
      </CardBody>
    </Card>
  );
};

export default memo(Calendar);
