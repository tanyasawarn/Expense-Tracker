import React, {useState,useRef} from "react";
import classes from "./login.module.css";

const Login = () =>{

    const emailInputRef = useRef();
  const passwordInputRef = useRef();

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
      console.log("user logged in")
      if (!res.ok) {
        alert("Login Error");
      }
      const data = await res.json();
      localStorage.setItem("token", data.token);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <section className={classes.loggedin}>
       <div>
       <form onSubmit={submitHandler}>
            <label htmlFor="email">Enter Your Email</label>
            <input type="text" ref={emailInputRef}/>
            <label htmlFor="password">Enter Your Password</label>
            <input type="text" ref={passwordInputRef}/>
            {error && <p className={classes.error}>{error}</p>}
            <div>
            <button>Login</button>
            </div>
        </form>
       </div>
    </section>
  );
};

export default Login;