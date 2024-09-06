import { useNavigate, useParams } from "react-router-dom";
import MenuCommon from "../../components/common/menucom";
import MenuGuest from "../../components/guest/menuguest";
import MenuOwner from "../../components/owner/menuowner";
import { getRole } from "../../utils/auth";
import './room.css';
import { getBaseUrl } from "../../utils/api";
import axios from "axios";
import { useEffect, useState } from "react";
import ImgBox from "../../components/common/imgbox";
import RoomDetail from "../../components/common/roomdetails";
import RoomCardSm from "../../components/common/roomcardsm";
import Reserve from "../../components/common/reserve";
import LoadingPage from "../../components/common/loading";

export default function Room() {

  var [load, setLoad] = useState(true)
  const { houseNo, roomNo } = useParams()
  const [roomData, setRoomData] = useState(null)
  const [houseData, sethouseData] = useState(null)
  const [ownerData, setownerData] = useState(null)
  const nav = useNavigate()

  useEffect(() => {
    setLoad(true)
    fetcRoom()
    fetcHouse()
  }, [roomNo, houseNo])

  async function fetcRoom() {
    await axios.get(`${getBaseUrl()}common/room/${houseNo}/${roomNo}`).then((res) => setRoomData(res.data)).catch((err) => nav("/RR"))
  }
  async function fetcHouse() {
    await axios.get(`${getBaseUrl()}common/house/${houseNo}`).then((res) => { sethouseData(res.data); fetcOwner(res.data.ownerId) }).catch((err) => nav("/RR"))
    setLoad(false)
  }
  async function fetcOwner(ownerId) {
    await axios.get(`${getBaseUrl()}common/owner/${ownerId}`).then((res) => setownerData(res.data)).catch((err) => nav("/RR"))

  }

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
    <div className="room">
      {renderMenu()}
      {load && <LoadingPage />}

      {houseData !== null && ownerData !== null && roomData !== null && <div className="roomdiv row">
        <div className="col-12 col-lg-9 leftroom">
          <ImgBox data={roomData.images} />
          <RoomDetail data={{ room: roomData, house: houseData, owner: ownerData }} />
          {getRole() === null && <div className="signinbox"><div className="signindiv" onClick={() => nav("/RR/login")}><span className="signintext">Please signin to reserve</span></div></div>}
          {getRole() !== null && <Reserve data={{ room: roomData, house: houseData }} />}
        </div>
        <div className="col-12 col-lg-3 rigthroom">
          <span className="heading">Rooms from same house</span>
          <div className="rightbox">
            {houseData.rooms.filter((x) => x.roomNo !== roomData.roomNo).map((x, index) => {
              return <RoomCardSm key={index} data={x} />
            })}
          </div>
        </div>
      </div>}

    </div>
  )
}