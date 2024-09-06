import { useEffect, useState } from 'react';
import MenuGuest from '../../components/guest/menuguest';
import './guestBooking.css';
import { getBaseUrl } from '../../utils/api';
import { getId, getRole } from '../../utils/auth';
import axios from 'axios';
import BookingCard from '../../components/guest/bookingCard';
import MenuOwner from '../../components/owner/menuowner';
import MenuCommon from '../../components/common/menucom';
import LoadingPage from '../../components/common/loading';

export default function GuestBookings() {
  var [load, setLoad] = useState(true)
  var [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get(`${getBaseUrl()}customer/reserve/${getId()}`).then((res) => { setBookings(res.data); setLoad(false) }).catch((err) => console.log(err))
  }, [])
  function renderMenu() {
    if (getRole() === "GUEST") {
      return <MenuGuest />;
    } else if (getRole() === "OWNER") {
      return <MenuOwner />;
    } else {
      return <MenuCommon />;
    }
  };
  return (
    <div className='guestbookmain'>
      {renderMenu()}
      {load && <LoadingPage />}
      <div className='guestbookmainbody row'>
        {bookings.map((x, index) => {
          return <BookingCard key={index} data={x} />
        })}
      </div>
    </div>
  )
}