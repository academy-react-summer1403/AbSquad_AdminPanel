import { Mail, Home, Archive, List, UserPlus, User } from "react-feather";

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
        title: "ایجاد لیست جدید",
        icon: <List size={20} />,
        navLink: "/Artcle/AddNewArticle",
      },
      {
        id: "CategoriesArticle",
        title: "لیست دیسته بندی",
        icon: <List size={20} />,
        navLink: "/Artcle/categoriesList",
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
    ],
    navLink: "/MetaData",
  },
];
