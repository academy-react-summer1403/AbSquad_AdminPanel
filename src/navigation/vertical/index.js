import { Mail, Home, Archive, List, Circle } from "react-feather";

export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "secondPage",
    title: "Second Page",
    icon: <Mail size={20} />,
    navLink: "/second-page",
  },
  {
    id: "CourseList",
    title: "دوره",
    icon: <Archive size={20} />,
    // navLink: "/sample",
    children: [
      {
        id: "invoiceList",
        title: "List",
        icon: <List size={20} />,
        navLink: "/Course/CourseList",
      },
    ],
  },
  {
    id: "smaplePage",
    title: "Sample Page",
    icon: <Archive size={20} />,
    // navLink: "/sample",
    children: [
      {
        id: "invoiceList",
        title: "List",
        icon: <List size={24} />,
        navLink: "/apps/invoice/list",
      },
    ],
  },
];
