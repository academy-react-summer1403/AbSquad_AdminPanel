import { Fragment, useEffect, useState } from "react";

// ** Custom Components
import NavbarUser from "./NavbarUser";

// ** Third Party Components
import { Sun, Moon, Menu } from "react-feather";

// ** Reactstrap Imports
import { NavItem, NavLink } from "reactstrap";

const ThemeNavbar = (props) => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props;

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === "dark") {
      return <Sun className="ficon" onClick={() => setSkin("light")} />;
    } else {
      return <Moon className="ficon" onClick={() => setSkin("dark")} />;
    }
  };

  // Speech To Text
  const [command, setCommand] = useState("");
  const [isListening, setIsListening] = useState(false);

  const recognition =
    window.SpeechRecognition || window.webkitSpeechRecognition
      ? new (window.SpeechRecognition || window.webkitSpeechRecognition)()
      : null;

  useEffect(() => {
    if (recognition) {
      recognition.continuous = true;
      recognition.interimResults = false;

      recognition.onstart = () => console.log("Voice recognition started.");
      recognition.onresult = (event) => {
        const transcript =
          event.results[event.results.length - 1][0].transcript.trim();
        setCommand(transcript);
        handleVoiceCommand(transcript);
      };
      recognition.onerror = (event) =>
        console.error("Error occurred in recognition:", event.error);
    }
  }, [recognition]);

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // Adjust for language, e.g., "fa-IR" for Persian
    synth.speak(utterance);
  };

  const handleVoiceCommand = (command) => {
    if (command.includes("go to home")) {
      speak("Navigating to home page.");
      window.location.href = "/home";
    } else if (command.includes("go to course list")) {
      speak("Navigating to course list.");
      window.location.href = "/Course/CourseList";
    } else if (command.includes("go to your course list")) {
      speak("Navigating to your course list.");
      window.location.href = "/Course/YourCourseList";
    } else if (command.includes("go to course calendar")) {
      speak("Navigating to course calendar.");
      window.location.href = "/Course/CourseCalendar";
    } else if (command.includes("go to comment management")) {
      speak("Navigating to comment management.");
      window.location.href = "/Course/CommentManangement";
    } else if (command.includes("go to course social group")) {
      speak("Navigating to course social group.");
      window.location.href = "/Course/CourseSocialGroup";
    } else if (command.includes("go to assistants")) {
      speak("Navigating to assistants.");
      window.location.href = "/Course/Assistants";
    } else if (command.includes("go to user list")) {
      speak("Navigating to user list.");
      window.location.href = "/UserList";
    } else if (command.includes("go to user details")) {
      speak("Navigating to user details.");
      window.location.href = "/UserList/UserDetail";
    } else if (command.includes("go to edit user")) {
      speak("Navigating to edit user.");
      window.location.href = "/UserList/EditUser";
    } else if (command.includes("go to user comment details")) {
      speak("Navigating to user comment details.");
      window.location.href = "/UserList/UserCommentDetail";
    } else if (command.includes("go to semester")) {
      speak("Navigating to semester.");
      window.location.href = "/MetaData/Semester";
    } else if (command.includes("go to technology")) {
      speak("Navigating to technology.");
      window.location.href = "/MetaData/Technology";
    } else if (command.includes("go to status")) {
      speak("Navigating to status.");
      window.location.href = "/MetaData/Status";
    } else if (command.includes("go to level")) {
      speak("Navigating to level.");
      window.location.href = "/MetaData/Level";
    } else if (command.includes("go to classroom")) {
      speak("Navigating to classroom.");
      window.location.href = "/MetaData/Classroom";
    } else if (command.includes("go to building")) {
      speak("Navigating to building.");
      window.location.href = "/MetaData/Building";
    } else if (command.includes("go to department")) {
      speak("Navigating to department.");
      window.location.href = "/MetaData/Department";
    } else if (command.includes("go to semester detail")) {
      speak("Navigating to semester detail.");
      window.location.href = "/MetaData/Semester/SemesterDetail";
    } else if (command.includes("go to article list")) {
      speak("Navigating to article list.");
      window.location.href = "/Artcle/articleList";
    } else if (command.includes("go to add new article")) {
      speak("Navigating to add new article.");
      window.location.href = "/Artcle/AddNewArticle";
    } else if (command.includes("go to news details")) {
      speak("Navigating to news details.");
      window.location.href = "/Artcle/NewsDetails";
    } else if (command.includes("go to edit news")) {
      speak("Navigating to edit news.");
      window.location.href = "/Artcle/EditNews";
    } else if (command.includes("go to news category")) {
      speak("Navigating to news category.");
      window.location.href = "/Artcle/NewsCategory";
    } else if (command.includes("go to add new news category")) {
      speak("Navigating to add new news category.");
      window.location.href = "/Artcle/AddNewNewsCategory";
    } else if (command.includes("go to course detail")) {
      speak("Navigating to course detail.");
      window.location.href = "/Course/CourseList/CourseDetail";
    } else if (command.includes("go to add new course")) {
      speak("Navigating to add new course.");
      window.location.href = "/Course/AddNewCourse";
    } else if (command.includes("go to profile")) {
      speak("Navigating to profile.");
      window.location.href = "/AdminDetails/Profile";
    } else if (command.includes("go to edit course")) {
      speak("Navigating to edit course.");
      window.location.href = "/Course/EditCourse";
    } else if (command.includes("go to login")) {
      speak("Navigating to login page.");
      window.location.href = "/login";
    } else {
      speak(`I didn't understand the command: ${command}`);
    }
  };

  // Style for the button
  const buttonStyles = {
    marginRight: "20px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: isListening ? "#007BFF" : "#343A40", // Subtle dark tones
    color: "#fff",
    fontSize: "25px",
    border: "none",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
    transition: "all 0.2s ease-in-out",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 9999,
    outline: "none",
  };

  // Shazam floating animation (smooth floating effect)
  const floatingAnimation = {
    animation: "float 3s ease-in-out infinite", // Smooth floating animation
  };

  return (
    <Fragment>
      <div className="bookmark-wrapper d-flex align-items-center">
        <ul className="navbar-nav d-xl-none">
          <NavItem className="mobile-menu me-auto">
            <NavLink
              className="nav-menu-main menu-toggle hidden-xs is-active"
              onClick={() => setMenuVisibility(true)}
            >
              <Menu className="ficon" />
            </NavLink>
          </NavItem>
        </ul>
        <NavItem className="d-none d-lg-block">
          <NavLink className="nav-link-style d-flex flex-row">
            <ThemeToggler />
          </NavLink>
        </NavItem>
      </div>

      {/* Floating button for listening with smooth floating effect */}
      <button
        onClick={toggleListening}
        style={{ ...buttonStyles, ...floatingAnimation }}
      >
        {isListening ? "🎤" : "🎧"}
      </button>

      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  );
};

export default ThemeNavbar;
