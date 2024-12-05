// ** React Imports
import { Fragment, lazy } from "react";
import { Navigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";
import Level from "../../pages/MetaData/Level.js";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/login";

const Home = lazy(() => import("../../pages/Home"));
const SecondPage = lazy(() => import("../../pages/SecondPage"));
const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
const Error = lazy(() => import("../../pages/Error"));
const CourseList = lazy(() =>
  import("../../components/CourseApp/CourseList/list")
);

const TeacherCourseList = lazy(() =>
  import("../../components/TeacherCourseApp/CourseList/list")
);

const EditUser = lazy(() => import("../../pages/Users/EditUser.js"));
const UserDetail = lazy(() => import("../../pages/Users/UserDetail.js"));

const CommentManagement = lazy(() =>
  import("../../pages/Course/CommentManagement")
);
const UserList = lazy(() => import("../../components/UserApp/user/list"));
const ArticleList = lazy(() => import("../../components/NewsComp/list"));
const CourseDetail = lazy(() =>
  import("../../components/CourseApp/CourseDetails")
);
const EditCourse = lazy(() => import("../../pages/Course/EditCourse"));

const AddNewCourse = lazy(() => import("../../pages/Course/AddNewCourse"));
const AddNewNews = lazy(() =>
  import("../../components/AddNewNews/AddNewNews.js")
);
const NewsDetails = lazy(() =>
  import("../../components/NewsDetails/blog/details/index.js")
);
const EditNews = lazy(() => import("../../components/EditNews/EditNews.js"));
const AddNewsCategory = lazy(() =>
  import(
    "../../components/NewsCategory/AddNewNewsCategory/AddNewNewsCategory.js"
  )
);
const NewsCategory = lazy(() => import("../../components/NewsCategory/list"));

const UserCommentDetail = lazy(() =>
  import("../../components/UserApp/UserDetail/CommentDetail.js")
);
const Semester = lazy(() => import("../../pages/MetaData/Semester.js"));
const SemesterDetail = lazy(() =>
  import("../../components/SemesterApp/list/SemesterDetail.js")
);
const Technology = lazy(() => import("../../pages/MetaData/Technology.js"));
const Status = lazy(() => import("../../pages/MetaData/Status.js"));
const ProfileAdmin = lazy(() =>
  import("../../components/SharedPanel/index.js")
);
const adminId = localStorage.getItem("id");
const ClassRoom = lazy(() => import("../../pages/MetaData/Classroom.js"));
const Building = lazy(() => import("../../pages/MetaData/Building.js"));
const Department = lazy(() => import("../../pages/MetaData/Department.js"));
const CourseSocialGroup = lazy(() =>
  import("../../pages/Course/CourseSocialGroup.js")
);

// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/Course/CourseList",
    element: <CourseList />,
  },
  {
    path: "/Course/YourCourseList",
    element: <TeacherCourseList />,
  },
  {
    path: "/Course/CommentManangement",
    element: <CommentManagement />,
  },
  {
    path: "/Course/CourseSocialGroup",
    element: <CourseSocialGroup />,
  },
  {
    path: "/UserList/UserCommentDetail/:id?/:uid?",
    element: <UserCommentDetail />,
  },
  {
    path: "/UserList",
    element: <UserList />,
  },
  {
    path: "/UserList/EditUser/:id?",
    element: <EditUser />,
  },
  {
    path: "/UserList/UserDetail/:id?",
    element: <UserDetail />,
  },
  {
    path: "/MetaData/Semester",
    element: <Semester />,
  },
  {
    path: "/MetaData/Technology",
    element: <Technology />,
  },
  {
    path: "/MetaData/Status",
    element: <Status />,
  },
  {
    path: "/MetaData/Level",
    element: <Level />,
  },
  {
    path: "/MetaData/Classroom",
    element: <ClassRoom />,
  },
  {
    path: "/MetaData/Building",
    element: <Building />,
  },
  {
    path: "/MetaData/Department",
    element: <Department />,
  },
  {
    path: "/MetaData/Semester/SemesterDetail/:id?",
    element: <SemesterDetail />,
  },
  {
    path: "/Artcle/articleList",
    element: <ArticleList />,
  },
  {
    path: "/Artcle/AddNewArticle",
    element: <AddNewNews />,
  },
  {
    path: "/Artcle/NewsDetails/:id?",
    element: <NewsDetails />,
  },
  {
    path: "/Artcle/EditNews/:id?",
    element: <EditNews />,
  },
  {
    path: "/Artcle/NewsCategory",
    element: <NewsCategory />,
  },
  {
    path: "/Artcle/AddNewNewsCategory",
    element: <AddNewsCategory />,
  },
  {
    path: "/Course/CourseList/CourseDetail/:id?",
    element: <CourseDetail />,
  },
  {
    path: "/Course/AddNewCourse",
    element: <AddNewCourse />,
  },
  {
    path: `/AdminDetails/Profile/:id?`,
    element: <ProfileAdmin />,
  },
  {
    path: "/Course/EditCourse/:id?",
    element: <EditCourse />,
  },
  {
    path: "/second-page",
    element: <SecondPage />,
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "*",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
