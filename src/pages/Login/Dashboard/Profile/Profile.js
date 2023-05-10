import { useState } from "react";
import { getAuth } from "firebase/auth";
import classes from "./profile.module.css";

const Profile = () => {
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;
    const idToken = await user.getIdToken();

    const requestBody = {
      displayName: name,
      photoUrl: photoUrl,
      idToken: idToken,
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
        console.log("Profile updated successfully");
      } else {
        console.log("Error updating profile:", response.status.Text);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes["form-container"]}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <br />
      <label htmlFor="photoUrl">Profile Photo URL:</label>
      <input
        type="text"
        id="photoUrl"
        value={photoUrl}
        onChange={(event) => setPhotoUrl(event.target.value)}
      />
      <br />
      <button type="submit">Update</button>
    </form>
  );
};

export default Profile;
