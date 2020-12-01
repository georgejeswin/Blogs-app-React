import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Blogs.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInput, setBlogData } from "../features/userSlice";
import Spinner from "./Spinner";

const Blogs = () => {
  const searchInput = useSelector(selectUserInput);
  const API_KEY = "88adfe00d8d886ce5ae33c07bbb9ccfc";
  const URL = `https://gnews.io/api/v4/search?q=${searchInput}&token=${API_KEY}`;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState();

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        dispatch(setBlogData(response.data));
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchInput, URL, dispatch]);

  return (
    <div className="blog__page">
      {loading ? (
        <h1 className="loading">
          <Spinner />
        </h1>
      ) : (
        ""
      )}
      <div className="blogs">
        {blogs?.articles?.map((blog) => (
          <a
            key={blog.url}
            rel="noopener noreferrer"
            href={blog.url}
            target="_blank"
            className="blog"
          >
            <img src={blog.image} alt="" />
            <div>
              <h3 className="sourceName">
                <span>{blog.source.name}</span>
                <p>{blog.publishedAt}</p>
              </h3>
              <h1>{blog.title}</h1>
              <p>{blog.description}</p>
            </div>
          </a>
        ))}
        {blogs?.totalArticles === 0 && (
          <h1 className="no__blogs">
            No blogs Available . Search Something Else
          </h1>
        )}
      </div>
    </div>
  );
};

export default Blogs;
