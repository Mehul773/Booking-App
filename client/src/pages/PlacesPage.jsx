import React, { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUpload";
import axios from "axios"

function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState("");
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect,setRedirect] = useState("");

  function inputHeader(text) {
    return <h2 className="text-xl mt-4">{text}</h2>;
  }

  async function addNewPlace(ev) {
    ev.preventDefault(); //cancels the event if it is cancelable
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    };
    
    await axios.post("/places",placeData);

    setRedirect('/account/places');
  }

  if(redirect)
  {
    return <Navigate to={redirect}/>
  }

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            to="/account/places/new"
            className="flex inline-flex gap-1 items-center bg-primary text-white py-2 px-4 rounded-full text-sm font-bold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}

      {action === "new" && (
        <div className="font-bold">
          <form className="mx-4" onSubmit={addNewPlace}>
            {inputHeader("Title")}
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter sweet and short name to your place"
            />

            {inputHeader("Address")}
            <input
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Enter address to your place"
            />

            {inputHeader("Photos")}
            <PhotosUploader
              photoLink={photoLink}
              setPhotoLink={setPhotoLink}
              setAddedPhotos={setAddedPhotos}
              addedPhotos={addedPhotos}
            />

            {inputHeader("Description")}
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="h-40"
            />

            {inputHeader("Perks")}
            <Perks selected={perks} onChange={setPerks} />

            {inputHeader("Extra Information")}
            <textarea
              value={extraInfo}
              onChange={(event) => setExtraInfo(event.target.value)}
              className="h-40"
            />
            <div className="grid sm:grid-cols-3 gap-2">
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input
                  type="text"
                  value={checkIn}
                  onChange={(event) => setCheckIn(event.target.value)}
                  placeholder="Enter check in time in 24 Hrs"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>
                <input
                  type="text"
                  value={checkOut}
                  onChange={(event) => setCheckOut(event.target.value)}
                  placeholder="Enter check in time in 24 Hrs"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Maximum guests</h3>

                <input
                  type="number"
                  value={maxGuests}
                  onChange={(event) => setMaxGuests(event.target.value)}
                  placeholder="Enter maximum guest allowed"
                />
              </div>
            </div>

            <button className="primary my-4">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PlacesPage;
