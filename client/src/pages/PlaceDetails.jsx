import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import * as myConst from "../MyConstant";
import * as datefns from "date-fns";

export default function PlaceDetails() {
  const [place, setPlaces] = useState(null);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guest, setGuest] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const[redirect,setRedirect] = useState('');
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const { id } = useParams();
 
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((res) => {
      const { data } = res;
      setPlaces(res.data);
      setAddedPhotos(data.photos);
    });
  }, [id]);

  async function bookThisPlace() {
    const response = await axios.post("/booking", {
      place: place._id,
      checkIn,
      checkOut,
      guest,
      name,
      mobile,
      price: numberOfDays * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/booking/`);
  }

  if(redirect)
  {
    return <Navigate to={redirect}/>
  }

  let numberOfDays = 0;
  if (checkIn && checkOut) {
    numberOfDays = datefns.differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }


  if (!place) return "";

  if (showAllPhotos) {
    return (
      <>
        <div className="absolute inset-0 bg-gray-50 min-h-screen grid  gap-2  p-5 justify-center ">
          <div>
            <h2 className="font-bold text-2xl mb-4">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="flex fixed  shadow shadow-black hover:scale-90 hover:transition-all rounded-2xl justify-center items-center px-4 py-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-9 h-9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Close Photos
            </button>
          </div>
          {place?.photos.length > 0 &&
            place.photos.map((photo) => (
              <div>
                <img
                  src={myConst.BACKEND_URL + "uploads/" + photo}
                  alt=""
                  srcset=""
                  className="rounded-xl max-w-3xl"
                />
              </div>
            ))}
        </div>
      </>
    );
  }
  return (
    <>
      <div className="mx-7 mt-10 bg-gray-200 rounded-xl p-8  ">
        <h1 className=" text-2xl font-bold tracking-wider lg:text-center">
          {place.title}
        </h1>
        <a
          target="_blank"
          href={"https://maps.google.com/?q=" + place.address}
          className="text-lg  underline"
        >
          <div className="flex mt-3 lg:justify-center gap-2 w-full text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            {place.address}
          </div>
        </a>
        <div className="relative">
          <div className="grid gap-2 grid-cols-4 grid-rows-2 mx-auto lg:max-w-7xl mt-4">
            <div className="col-span-2 row-span-2">
              {addedPhotos?.[0] && (
                <img
                  src={myConst.BACKEND_URL + "uploads/" + addedPhotos[0]}
                  alt=""
                  srcset=""
                  onClick={() => setShowAllPhotos(true)}
                  className="cursor-pointer aspect-square object-cover rounded-tl-xl rounded-bl-2xl"
                />
              )}
            </div>

            <div>
              {addedPhotos?.[1] && (
                <img
                  src={myConst.BACKEND_URL + "uploads/" + addedPhotos[1]}
                  alt=""
                  srcset=""
                  onClick={() => setShowAllPhotos(true)}
                  className="cursor-pointer aspect-square object-cover"
                />
              )}
            </div>
            <div>
              {addedPhotos?.[2] && (
                <img
                  src={myConst.BACKEND_URL + "uploads/" + addedPhotos[2]}
                  alt=""
                  srcset=""
                  onClick={() => setShowAllPhotos(true)}
                  className="cursor-pointer aspect-square object-cover rounded-tr-2xl"
                />
              )}
            </div>
            <div>
              {addedPhotos?.[3] && (
                <img
                  src={myConst.BACKEND_URL + "uploads/" + addedPhotos[3]}
                  alt=""
                  srcset=""
                  onClick={() => setShowAllPhotos(true)}
                  className="cursor-pointer aspect-square object-cover"
                />
              )}
            </div>
            <div>
              {addedPhotos?.[4] && (
                <img
                  src={myConst.BACKEND_URL + "uploads/" + addedPhotos[4]}
                  alt=""
                  srcset=""
                  onClick={() => setShowAllPhotos(true)}
                  className="cursor-pointer aspect-square object-cover rounded-br-2xl"
                />
              )}
            </div>

            <div className="absolute right-2 bottom-2 lg:right-36 lg:bottom-4 ">
              <button
                onClick={() => setShowAllPhotos(true)}
                className="bg-white rounded-lg py-2 px-3 flex gap-2 hover:scale-90 transition-all hover:bg-gray-100 shadow shadow-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                  />
                </svg>
                <span>Show more</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex  items-center justify-center lg:justify-around mt-6 mb-6 lg:gap-24">
          <div>
            <div className="my-5 max-w-sm lg:max-w-md">
              <h2 className="font-semibold text-xl mb-1 ">Description</h2>
              <span className="text-sm lg:text-lg grow ">
                {place.descreption}
              </span>
            </div>
            <div>
              Check in : {place.checkIn}
              <br />
              Check out : {place.checkOut}
              <br />
              Max guest : {place.maxGuests}
            </div>
          </div>
          <div className="bg-white rounded-2xl flex-col flex  my-2 mx-4 justify-center text-lg px-8 py-4">
            <span>Price : {place.price} / Per night</span>
            <div className="border rounded-xl mt-1 px-2 py-1">
              <label>Check in : </label>
              <input
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
                type="date"
                name=""
                id=""
              />
            </div>
            <div className="border rounded-xl mt-1 px-2 py-1">
              <label>Check in : </label>
              <input
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
                type="date"
                name=""
                id=""
              />
            </div>
            <div className="border rounded-xl mt-1 px-2 py-1">
              <label>Number of guest : </label>
              <input
                value={guest}
                onChange={(ev) => setGuest(ev.target.value)}
                type="number"
                name=""
                id=""
              />
            </div>
            <div className="border rounded-xl mt-1 px-2 py-1">
              <label>Enter full name : </label>
              <input
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                type="text"
                name=""
                id=""
              />
            </div>
            <div className="border rounded-xl mt-1 px-2 py-1">
              <label>Enter Mobile number : </label>
              <input
                value={mobile}
                onChange={(ev) => setMobile(ev.target.value)}
                type="tel"
                name=""
                id=""
              />
            </div>
            <span>
              Total Price :{" "}
              {numberOfDays > 0 && <>{numberOfDays * place.price}</>}
            </span>
            <button onClick={bookThisPlace} className="bg-primary rounded-2xl px-2 py-1 mt-1 mb-2">
              Book Now
            </button>
            {checkIn && checkOut && <>{}</>}
          </div>
        </div>
        <div className="lg:w-5/6 mx-auto">
          <h2 className="font-semibold text-xl my-1 ">Extra information</h2>
          {place.extraInfo}
        </div>
      </div>
    </>
  );
}
