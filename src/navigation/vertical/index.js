import { Mail, Home, Archive, List, UserPlus, User } from "react-feather";
const adminId = localStorage.getItem("id");

export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "UserList",
    title: "کاربران",
    icon: <User size={20} />,

    navLink: "/UserList",
  },
  {
    id: "Course",
    title: "دوره",
    icon: <List size={20} />,
    // navLink: "/sample",
    children: [
      {
        id: "CourseList",
        title: "لیست دوره ها",
        icon: <List size={20} />,
        navLink: "/Course/CourseList",
      },
      {
        id: "AddNewCourse",
        title: "اضافه کردن دوره",
        icon: <UserPlus size={20} />,
        navLink: "/Course/AddNewCourse",
      },
      {
        id: "TeacherCourseList",
        title: "لیست دوره های شما",
        icon: <List size={20} />,
        navLink: "/Course/YourCourseList",
      },
      {
        id: "CourseCommentManagement",
        title: "مدیریت کامنت ها",
        icon: <List size={20} />,
        navLink: "/Course/CommentManangement",
      },
    ],
  },
  {
    id: "Articles",
    title: "اخبار",
    icon: <List size={20} />,
    children: [
      {
        id: "ََArticleList",
        title: "لیست اخبار",
        icon: <List size={20} />,
        navLink: "/Artcle/articleList",
      },
      {
        id: "NewArticle",
        title: "ایجاد خبر جدید",
        icon: <List size={20} />,
        navLink: "/Artcle/AddNewArticle",
      },
      {
        id: "CategoriesArticle",
        title: "لیست دیسته بندی",
        icon: <List size={20} />,
        navLink: "/Artcle/NewsCategory",
      },
    ],
  },
  {
    id: "MetaData",
    title: "ریز تنظیمات",
    icon: <User size={20} />,
    children: [
      {
        id: "ََSemester",
        title: "لیست ترم",
        icon: <List size={20} />,
        navLink: "/MetaData/Semester",
      },
      {
        id: "AssistanceWork",
        title: "لیست دستیار آموزشی",
        icon: <List size={20} />,
        navLink: "/MetaData/AssistanceWork",
      },
      {
        id: "Technology",
        title: "لیست تکنولوژی",
        icon: <List size={20} />,
        navLink: "/MetaData/Technology",
      },
      {
        id: "Status",
        title: "لیست وضعیت ها",
        icon: <List size={20} />,
        navLink: "/MetaData/Status",
      },
      {
        id: "Level",
        title: "لیست لول ها",
        icon: <List size={20} />,
        navLink: "/MetaData/Level",
      },
      {
        id: "Classroom",
        title: "لیست کلاس ها",
        icon: <List size={20} />,
        navLink: "/MetaData/Classroom",
      },
      {
        id: "Building",
        title: "لیست ساختمان ها",
        icon: <List size={20} />,
        navLink: "/MetaData/Building",
      },
      {
        id: "Departments",
        title: "لیست دپارتمان ها",
        icon: <List size={20} />,
        navLink: "/MetaData/Department",
      },
    ],
    navLink: "/MetaData",
  },
  {
    id: "AdminDetails",
    title: "اطلاعات کاربری ادمین",
    icon: <User size={20} />,
    children: [
      {
        id: "profile",
        title: "پروفایل",
        icon: <List size={20} />,
        navLink: `/AdminDetails/Profile/${adminId ? adminId : ""}`,
      },
    ],
    navLink: "/MetaData",
  },
];
