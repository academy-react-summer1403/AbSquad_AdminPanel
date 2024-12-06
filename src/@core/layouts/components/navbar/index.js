// ** React Imports
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

  // SpEEECHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
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

  // const handleVoiceCommand = (command) => {
  //   console.log("Received command:", command);
  //   // Add navigation logic here
  //   if (command.includes("go to home")) {
  //     window.location.href = "/";
  //   } else if (command.includes("go to about")) {
  //     window.location.href = "/about";
  //   } else {
  //     alert(`Unrecognized command: ${command}`);
  //   }
  // };

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // Adjust for language, e.g., "fa-IR" for Persian
    synth.speak(utterance);
  };

  // Example usage in the `handleVoiceCommand` function:
  const handleVoiceCommand = (command) => {
    if (command.includes("go to user list")) {
      speak("Yeah,Navigating to user list.");
      window.location.href = "/UserList";
    } else if (command.includes("go to home")) {
      speak("Navigating to home page.");
      window.location.href = "/home";
    } else if (command.includes("go to course list")) {
      speak("oh Course List? Ok. Navigating");
      window.location.href = "/Course/CourseList";
    } else if (command.includes("go to add course")) {
      speak("OMG, Ok. Navigating to add course.");
      window.location.href = "/Course/AddNewCourse";
    } else {
      speak(`I didn't understand the command: ${command}`);
    }
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
            <div className="d-flex flex-row">
              <button onClick={toggleListening}>
                {isListening ? "Stop Listening" : "Start Listening"}
              </button>
              <p>Command: {command}</p>
            </div>
          </NavLink>
        </NavItem>
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  );
};

export default ThemeNavbar;
