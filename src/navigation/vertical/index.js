import { Mail, Home, Archive, List, Circle, User } from "react-feather";

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
    id: "CourseList",
    title: "دوره",
    icon: <List size={20} />,
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
];
