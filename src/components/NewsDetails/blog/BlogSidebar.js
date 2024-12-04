// ** React Imports
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Fragment, useState, useEffect } from "react";
// ** Third Party Components
import classnames from "classnames";
import * as Icon from "react-feather";
// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import { InputGroup, Input, InputGroupText } from "reactstrap";
import axios from "axios";
import AllNewsAdmin from "../../../@core/services/API/AllNewsAdmin/AllNewsAdmin.js";
const BlogSidebar = () => {
  // ** Static Data
  const data1 = [
    { category: "Quote", color: "light-info" },
    { category: "Fashion", color: "light-primary" },
    { category: "Gaming", color: "light-danger" },
    { category: "Video", color: "light-warning" },
    { category: "Food", color: "light-success" },
  ];
  const [newsList, setNewsList] = useState([]);

  // Function to fetch and set news data
  const fetchNews = async () => {
    try {
      const res = await AllNewsAdmin(); // API call to fetch news
      console.log(res, "Fetched news");
      setNewsList(res.news.slice(0, 5)); // Take the first 5 items
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };
  useEffect(() => {
    fetchNews();
  }, []);
  const categories = [
    { category: "یک نام متناسب", color: "light-info" },
    { category: "گددرتت", color: "light-primary" },
    { category: "hvddd", color: "light-success" },
    { category: "aa aliAliTAHA", color: "light-danger" },
    { category: "editedTAHA2", color: "light-warning" },
  ];

  const renderRecentPosts = () => {
    return newsList.map((post, index) => (
      <div key={index} className="d-flex mb-2">
        <Link className="me-2" to={`/Artcle/NewsDetails/${post.id}`}>
          <Avatar
            className="rounded"
            color={post.color || "primary"} // Fallback color
            icon={<Icon.Image size={18} />} // Replace with appropriate icon
          />
        </Link>
        <div>
          <h6 className="blog-recent-post-title">
            <Link
              className="text-body-heading"
              to={`/Artcle/NewsDetails/${post.id}`}
            >
              {post.title || "No Title"} {/* Display news title */}
            </Link>
          </h6>
          <div className="text-muted mb-0">
            {post.description || "No description available"}
          </div>
        </div>
      </div>
    ));
  };

  const renderCategories = () => {
    return categories.map((item, index) => {
      return (
        <div
          key={index}
          className={classnames(
            "d-flex justify-content-start align-items-center",
            {
              "mb-75": index !== categories.length - 1,
            }
          )}
        >
          <a className="me-75" href="/" onClick={(e) => e.preventDefault()}>
            <Avatar
              className="rounded"
              color={item.color}
              icon={<Icon.Tag size={14} />}
            />
          </a>
          <a href="/" onClick={(e) => e.preventDefault()}>
            <div className="blog-category-title text-body">{item.category}</div>
          </a>
        </div>
      );
    });
  };

  return (
    <div className="sidebar-detached sidebar-right">
      <div className="sidebar">
        <div className="blog-sidebar right-sidebar my-2 my-lg-0">
          <div className="right-sidebar-content">
            <Fragment>
              <div className="blog-recent-posts mt-3">
                <h6 className="section-label">آخرین اخبار</h6>
                <div className="mt-75">{renderRecentPosts()}</div>
              </div>
              <div className="blog-categories mt-3">
                <h6 className="section-label">دسته بندی ها</h6>
                <div className="mt-1">{renderCategories()}</div>
              </div>
            </Fragment>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
