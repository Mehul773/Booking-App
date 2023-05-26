import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import Register from "./pages/Register";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import ProfilePage from "./pages/ProfilePage";
import MyPlacesPage from "./pages/MyPlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlaceDetails from "./pages/PlaceDetails";
// import BookingPage from "./pages/BookingPage";
import AllBooking from "./pages/AllBooking";

// axios.defaults.baseURL = "http://localhost:4000/";
axios.defaults.baseURL = "https://booking-app-backend2.onrender.com";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<ProfilePage />} />
            <Route path="/account/places" element={<MyPlacesPage />} />
            {/* <Route path="/account/booking" element={<MyPlacesPage />} /> */}
            <Route path="/account/places/new" element={<PlacesFormPage />} />
            <Route path="/account/places/:id" element={<PlacesFormPage />} />
            <Route path="/place/:id" element={<PlaceDetails />} />
            {/* <Route path="/account/booking/:id" element={<BookingPage/>} /> */}
            <Route path="/account/booking" element={<AllBooking />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
