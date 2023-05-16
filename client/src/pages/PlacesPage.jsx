import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";
import * as myConst from "../../src/MyConstant";

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

  function inputHeader(text) {
    return <h2 className="text-xl mt-4">{text}</h2>;
  }

  async function addPhotoByLink(event) {
    event.preventDefault();
    if (photoLink != "") {
      const { data: filename } = await axios.post("/upload-by-link", {
        link: photoLink,
      });
      setAddedPhotos((prev) => {
        return [...prev, filename];
      });
      setPhotoLink("");
    }
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
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
          <form className="mx-4">
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
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={photoLink}
                onChange={(event) => setPhotoLink(event.target.value)}
                placeholder="Add photo using link"
              />
              <button
                onClick={addPhotoByLink}
                className="bg-primary text-white px-6 h-12 rounded-2xl"
              >
                Add&nbsp;Photo
              </button>
            </div>
            <div className="mt-5 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 text-xl text-gray-600">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => (
                  <div>
                    <img
                      className="rounded-2xl aspect-square object-cover"
                      src={myConst.BACKEND_URL + "uploads/" + link}
                      alt="img"
                    />
                  </div>
                ))}
              <label className="border hover:text-primary bg-transparent rounded-2xl p-8 cursor-pointer flex items-center justify-center gap-1">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={uploadPhoto}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                Upload
              </label>
            </div>

            {inputHeader("Description")}
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />

            {inputHeader("Perks")}
            <Perks selected={perks} onChange={setPerks} />
            {inputHeader("Extra Information")}
            <textarea
              value={extraInfo}
              onChange={(event) => setExtraInfo(event.target.value)}
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
