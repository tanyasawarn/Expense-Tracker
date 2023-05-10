import { useState } from "react";
import { Navbar } from "react-bootstrap";
import Profile from "./Profile/Profile";

const Dashboard = () =>{

    const [showForm, setShowForm] = useState(false);

    const profileCompleteHandler = ()=>{
        setShowForm(true);
    }
  return (
    <>
        <Navbar style={{marginTop:"1rem"}}><b>Welcome To Expense Tracker</b></Navbar>
        <p style={{marginLeft:"55rem", marginTop:"0rem"}}>Your Profile is Incomplete <button onClick={profileCompleteHandler}>Complete Now</button></p>
    <hr/>
    {showForm && <Profile />}

    </>
  );
};

export default Dashboard;