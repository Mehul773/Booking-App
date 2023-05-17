import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import AccountNav from "../AccountNav";
import * as myConst from "../MyConstant";

function PlacesPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div className="mx-10">
      <AccountNav />
      <div className="text-center">
        List of all added places
        <br />
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

      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={'/account/places/'+place._id} className="flex cursor-pointer mt-3 rounded-xl p-4 bg-gray-200 mb-2 gap-4">
              <div className="w-32 h-32 grow bg-gray-300 rounded-xl shrink-0 ">
                {place.photos.length > 0 && (
                  <img src={myConst.BACKEND_URL + "uploads/"+place.photos[0]} alt="img" srcset="" className="grid aspect-square object-cover rounded" />
                )}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-lg font-bold">{place.title}</h2>
                <p className="text-sm mt-3">{place.descreption}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default PlacesPage;
