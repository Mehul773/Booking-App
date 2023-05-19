import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUpload";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function PlacesFormPage() {
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
  const [redirect, setRedirect] = useState(false);
  const[price,setPrice] = useState("");

  const { id } = useParams();
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((res) => {
      const { data } = res;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.descreption);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-xl mt-4">{text}</h2>;
  }

  async function savePlace(ev) {
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
      price,
    };
    if (id) {
      //Update
      await axios.put("/places", {id,...placeData});
      setRedirect(true);
    } else {
      //new place

      await axios.post("/places", placeData);
      setRedirect(true);
    }
  }
  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <>
      <AccountNav />
      <div className="font-bold ">
        <form className="mx-4" onSubmit={savePlace}>
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
          <div className="grid sm:grid-cols-2 gap-2">
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
            <div>
              <h3 className="mt-2 -mb-1">Price per night</h3>

              <input
                type="number"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="Enter Price"
              />
            </div>
          </div>

          <button className="primary my-4">Save</button>
        </form>
      </div>
    </>
  );
}
