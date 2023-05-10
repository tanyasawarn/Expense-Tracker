import React, {useState,useRef} from "react";
import classes from "./login.module.css";
import { useNavigate } from "react-router-dom";
const Login = () =>{

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
      navigate('/dashboard');
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
           <u><p><b>Forgot Password</b></p></u>
           <p>Did No Have An Account? <button>Sign Up!</button></p>
            </div>
        </form>
       </div>
    </section>
  );
};

export default Login;