import React, { useState } from "react";
import AccountNav from "../AccountNav";
import { useEffect } from "react";
import axios from 'axios';

function AllBooking() {
  const [bookings, setBokkings] = useState([]);
  useEffect(() => {
    axios.get('/booking').then((res)=>{
      setBokkings(res.data);
    })
  }, [])
  return (
    <>
      <AccountNav />
      <div>
        {bookings.length > 0 && bookings.map((booking)=>(
          <div>
            {booking.name}
          </div>
        ))}
      </div>
    </>
  );
}

export default AllBooking;
