import React from "react";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSignedIn,
  setSignedIn,
  setUserData,
} from "../features/userSlice";
import "./HomePage.css";

const Home = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(selectSignedIn);

  const login = (response) => {
    dispatch(setSignedIn(true));
    dispatch(setUserData(response.profileObj));
  };

  return (
    <div className="home__page" style={{ display: isSignedIn ? "none" : "" }}>
      {!isSignedIn ? (
        <div className="login__message">
          <h2>📘</h2>
          <h1>A Readers Favorite Place!!</h1>
          <p>
            We provide high quality online resources for you. Sign in and start
            gaining some knowledge
          </p>
          <GoogleLogin
            clientId="1095388016530-8dfk5rhodiajm7f2ji1ql5ho6i6lq7et.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="login__button"
              >
                Login with Google
              </button>
            )}
            onSuccess={login}
            onFailure={login}
            isSignedIn={true}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
