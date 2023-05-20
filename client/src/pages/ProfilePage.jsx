import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import {  Navigate, useParams } from "react-router-dom";
import axios from "axios";
import MyPlacesPage from "./MyPlacesPage";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
  const { user, ready, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

 

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <AccountNav/>
      {subpage === "profile" && (
        <div className="text-center">
          Logged in as {user.name}  {user.email}<br></br>
          <button onClick={logout} className="primary max-w-md ">
            Logout
          </button>
        </div>
      )}

      {subpage === "places" && <MyPlacesPage />}
      
    </div>
  );
}
