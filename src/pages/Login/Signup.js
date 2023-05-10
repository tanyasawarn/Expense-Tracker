import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./login.module.css";

const Signup = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

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
    //   try {
    //     const res = await axios.post(
    //       "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCp3CtTZKkTpTX35hg6q4KXdL6fJXTDCgk",
    //       obj
    //     );
    //   localStorage.setItem("token", res.data.token);
    //     navigate("/store");
    //     console.log(res);
    //   } catch (error) {
    //     setError("Invalid email or password");
    //     console.log(error);
    //   }
    // };
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCp3CtTZKkTpTX35hg6q4KXdL6fJXTDCgk",
        {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        alert("Sign Up Error");
      }
      const data = await res.json();
      localStorage.setItem("token", data.token);
      navigate("/login")
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <section className={classes.auth}>
          <form onSubmit={submitHandler}>
            <div className={classes.control}>
              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" required ref={emailInputRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor="password">Your Password</label>
              <input
                type="password"
                id="password"
                required
                ref={passwordInputRef}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="password">confirm Password</label>
              <input type="password" id="password" required />
            </div>
            {error && <p className={classes.error}>{error}</p>}
            <div className={classes.actions}>
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </section>
      </div>
      <div className={classes.loggedin}>
      <p>Have An Account? <button >Login</button>
        
      </p>
      </div>
    </div>
  );
};

export default Signup;
