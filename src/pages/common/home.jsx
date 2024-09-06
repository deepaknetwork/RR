import { useEffect, useState } from "react";
import { getRole } from "../../utils/auth"
import axios from "axios";
import './home.css';
import MenuGuest from "../../components/guest/menuguest";
import MenuOwner from "../../components/owner/menuowner";
import MenuCommon from "../../components/common/menucom";
import RoomCard from "../../components/common/roomcard";
import LoadingPage from "../../components/common/loading";
import { getBaseUrl } from "../../utils/api";

export default function Home() {
  var [load, setLoad] = useState(true)
  var [rooms, setRooms] = useState([])
  useEffect(() => {
    axios.get(`${getBaseUrl()}common/rooms`)
      .then((res) => {
        setRooms(res.data)
        setLoad(false)
      })
      .catch((err) => {
        console.log(err)
      })
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
    <div className="body">
      {load && <LoadingPage />}
      {renderMenu()}
      <div className="homebody1 row">
        {rooms.map((room, index) => {
          return <RoomCard key={index} data={room} />
        })}
      </div>
    </div>
  )
}