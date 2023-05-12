import { useState } from "react";
import { Navbar } from "react-bootstrap";
import Profile from "./Profile/Profile";

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const idToken = localStorage.getItem("idToken");
  console.log(idToken);

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

  checkEmailVerificationStatus();

  return (
    <>
      <Navbar style={{ marginTop: "1rem" }}>
        <b>Welcome To Expense Tracker</b>
        {!showForm && (
          <p style={{ marginLeft: "55rem", marginTop: "0rem" }}>
            Your Profile is Incomplete{" "}
            <button onClick={profileCompleteHandler}>Complete Now</button>
          </p>
        )}
      </Navbar>
      <hr />
      {!emailVerified && (
        <p style={{ marginLeft: "2rem", marginTop: "0rem" }}>
          Your Email is Not Verified{" "}
          <button onClick={sendVerificationEmail}>Verify Your Email</button>
        </p>
      )}

      {showForm && <Profile />}
      
    
    </>
  );
};

export default Dashboard;

