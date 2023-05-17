
import React, { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Profile from "./Profile/Profile";
import { useSelector, useDispatch } from "react-redux";
import { setExpense } from "../../store/expenseSlice";
import ExpenseTracker from "../ExpenseTracker/Tracker";
import axios from "axios";

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [isPremium, setIsPremium] = useState(false);


  const dispatch = useDispatch();
  const expenseList = useSelector((state) => state.expenses);

  const idToken = localStorage.getItem("idToken");

  const checkEmailVerificationStatus = async () => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCp3CtTZKkTpTX35hg6q4KXdL6fJXTDCgk`,
        {
          method: "POST",
          body: JSON.stringify({
            idToken: idToken,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setEmailVerified(data.users[0].emailVerified);
      } else {
        console.log("Error checking email verification status");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const profileCompleteHandler = () => {
    setShowForm(true);
  };

  const sendVerificationEmail = async () => {
    const requestBody = {
      requesType: "VERIFY_EMAIL",
      idToken: idToken,
    };
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCp3CtTZKkTpTX35hg6q4KXdL6fJXTDCgk`,
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("Verification mail sent successfully");
      } else {
        console.log("Error sending verification email");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("idToken");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://react-http-d874d-default-rtdb.firebaseio.com/expense.json"
        );
        if (response.data) {
          const loadedExpense = Object.keys(response.data).map((key) => ({
            id: key,
            ...response.data[key],
          }));
          dispatch(setExpense(loadedExpense));
          const totalExpense = loadedExpense.reduce(
            (total, expense) => total + expense.amount,
            0
          );
          if (totalExpense > 10000) {
            setIsPremium(true);
          } else {
            setIsPremium(false);
          }
        }
      
        }catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    checkEmailVerificationStatus();
  }, []);

  return (
    <>
      <Navbar style={{ marginTop: "1rem", backgroundColor: "teal" }}>
        <b>Welcome To Expense Tracker</b>
        {!showForm && (
          <p style={{ marginLeft: "55rem", marginTop: "0rem" }}>
            Your Profile is Incomplete{" "}
            <button onClick={profileCompleteHandler}>Complete Now</button>
          </p>
        )}
        <Link to="/login">
          <button onClick={logoutHandler} style={{ marginLeft: "70rem" }}>
            Logout
          </button>
        </Link>
      </Navbar>
      <hr />
      {!emailVerified && (
        <p style={{ marginLeft: "2rem", marginTop: "0rem" }}>
          Your Email is Not Verified{" "}
          <button onClick={sendVerificationEmail}>Verify Your Email</button>
        </p>
      )}
      <ExpenseTracker expenseList={expenseList} />
      {isPremium && (
        <p style={{ marginLeft: "2rem", marginTop: "0rem" }}>
          Expenses exceed 10,000 rupees! Activate Premium Now{" "}
          <button>Activate Premium</button>
        </p>
      )}
      {showForm && <Profile />}
    </>
  );
};

export default Dashboard;

