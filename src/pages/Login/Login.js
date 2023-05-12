import React, { useState, useRef } from "react";
import classes from "./login.module.css";
import { useNavigate } from "react-router-dom";
import Profile from "../Dashboard/Profile/Profile";

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    const obj = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    console.log(obj);
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCp3CtTZKkTpTX35hg6q4KXdL6fJXTDCgk",
        {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("user logged in");
      navigate("/dashboard");
      if (!res.ok) {
        alert("Login Error");
      }
      const data = await res.json();
      console.log(data.idToken);
      localStorage.setItem("idToken", data.idToken);
      setIdToken(data.idToken);
    } catch (error) {
      setError(error.message);

      console.log(error);
    }
  };

  const forgotPasswordHandler = async (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;
    setIsLoading(true);

    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCp3CtTZKkTpTX35hg6q4KXdL6fJXTDCgk`,
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error Sending Password Reset");
      }
      alert("Password reset email sent");
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <section className={classes.loggedin}>
        <div>
          <form onSubmit={submitHandler}>
            <label htmlFor="email">Enter Your Email</label>
            <input type="text" ref={emailInputRef} />
            <label htmlFor="password">Enter Your Password</label>
            <input type="text" ref={passwordInputRef} />
            {error && <p className={classes.error}>{error}</p>}
            <div className={classes.actions}>
              <button>Login</button>
              <p>
                <button onClick={forgotPasswordHandler}>Forgot Password?</button>{" "}
               
              </p>
              <p>
                Did Not Have An Account? <button>Sign Up!</button>
              </p>
            </div>
          </form>
        </div>
      </section>
      {idToken && <Profile idToken={idToken} />}
    </div>
  );
};

export default Login;
