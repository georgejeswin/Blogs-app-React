import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import {
  selectSignedIn,
  setSignedIn,
  setUserData,
  selectUserData,
  setInput,
} from "../features/userSlice";

const Navbar = () => {
  const [inputValue, setInputValue] = useState("tech");
  const isSignedIn = useSelector(selectSignedIn);
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(setSignedIn(false));
    dispatch(setUserData(null));
  };
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setInput(inputValue));
    setInput("");
  };
  return (
    <div className="navbar">
      <h1 className="navbar__header">News</h1>
      {isSignedIn ? (
        <form className="blog__search">
          <input
            type="text"
            className="search"
            placeholder="search for a blog"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="submit" onClick={handleClick}>
            Search
          </button>
        </form>
      ) : (
        <h1 className="notSignedIn">No user Available</h1>
      )}
      {isSignedIn ? (
        <div className="navbar__user__data">
          <Avatar
            className="user"
            src={userData?.imageUrl}
            alt={userData?.name}
          />
          {/* <h1 className="signedIn">{userData?.givenName}</h1> */}
          <GoogleLogout
            clientId="1095388016530-8dfk5rhodiajm7f2ji1ql5ho6i6lq7et.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="logout__button"
              >
                <ExitToAppIcon />
              </button>
            )}
            onLogoutSuccess={logout}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
