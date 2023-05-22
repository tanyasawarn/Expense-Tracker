import { useState, useRef } from "react";
import classes from "./profile.module.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
  
const Profile = () => {
  const [displayName, setDisplayName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const idToken = localStorage.getItem('idToken');
   const nameRef = useRef();
  const photoRef = useRef();
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);

  
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const updatedPhoto = photoRef.current.value;

    const requestBody = {
  idToken: idToken,
  displayName: enteredName,
  photoUrl: updatedPhoto,
  deleteAttribute: [],
  returnSecureToken: true,
};


    try {
       
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCp3CtTZKkTpTX35hg6q4KXdL6fJXTDCgk`,
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setDisplayName(responseData.displayName);
        setPhotoUrl(responseData.photoUrl);
         setIsProfileUpdated(true);

        toast.success("Profile updated successfully");
         
      } else {
        toast.success("Error updating profile:");
        
      }
    } catch (error) {
      console.log(error);
    }

  
  };



  return (
    <div>
    <ToastContainer/>
       {!isProfileUpdated && (
        <form onSubmit={handleSubmit} className={classes["form-container"]}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" ref={nameRef} defaultValue={displayName} />
        <br />
        <label htmlFor="photoUrl">Profile Photo URL:</label>
        <input type="text" id="photoUrl" ref={photoRef} defaultValue={photoUrl} />
        <br />
        <button type="submit">Update</button>
      </form>
       )}
     
    </div>
  );
};

export default Profile;

