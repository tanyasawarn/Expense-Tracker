import { useState, useRef, useEffect } from "react";
import classes from "./profile.module.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Profile = () => {
  const [displayName, setDisplayName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const nameRef = useRef();
  const photoRef = useRef();

  
  

  useEffect(() => {
    const fetchProfileData = async () => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const idToken = await user.getIdToken();
          const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCp3CtTZKkTpTX35hg6q4KXdL6fJXTDCgk`,
            {
              method: "POST",
              body: JSON.stringify({ idToken }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.ok) {
            const responseData = await response.json();
            setDisplayName(responseData.displayName);
            setPhotoUrl(responseData.photoUrl);
          } else {
            console.log("Error fetching profile data:", response.status);
          }
        }
      });
    };

    fetchProfileData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const updatedPhoto = photoRef.current.value;

    const requestBody = {
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
        setDisplayName(responseData.displayName);
        setPhotoUrl(responseData.photoUrl);
        console.log("Profile updated successfully");
      } else {
        console.log("Error updating profile:");
      }
    } catch (error) {
      console.log(error);
    }

  
  };



  return (
    <div>
      <form onSubmit={handleSubmit} className={classes["form-container"]}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" ref={nameRef} defaultValue={displayName} />
        <br />
        <label htmlFor="photoUrl">Profile Photo URL:</label>
        <input type="text" id="photoUrl" ref={photoRef} defaultValue={photoUrl} />
        <br />
        <button type="submit">Update</button>
      </form>
      <div>
        <h2>{displayName}</h2>
        <img src={photoUrl} alt="Profile" />
      </div>
    </div>
  );
};

export default Profile;

