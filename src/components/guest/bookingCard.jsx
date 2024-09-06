import { useEffect, useState } from 'react';
import './bookingCard.css';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { getBaseUrl } from '../../utils/api';
import { addDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export default function BookingCard(prop){
    const [show, setShow] = useState(false);
    const nav=useNavigate()
    var[owner,setOwner]=useState("")
    var dates=[]
        for(var i=0;i<prop.data.days;i++){
            dates.push(addDays(prop.data.date,i).toISOString().split("T")[0])
        }
    useEffect(()=>{
        axios.get(`${getBaseUrl()}common/owner/${[prop.data.ownerId]}`)
        .then((res)=>setOwner(res.data)).catch((err)=>console.log(err))
    },[])

    function handleviewroom(){
        nav(`/RR/room/${prop.data.houseId}/${prop.data.roomId}`)
    }

    return (
        <div className='bookcard col-11 col-lg-5' onClick={() => setShow(true)}>
        <div className='book1 row'>
            <div className='bookdiv col-6'>
                <span className='book1lab'>Address</span>
                <span className='book1valadd'>{prop.data.address}</span>
            </div>
            <div className='bookdiv col-3'>
                <span className='book1lab'>RoomNo</span>
                <span className='book1val'>{prop.data.roomId}</span>
            </div>
        </div>
        <div className='book2 row'>
            <div className='bookdiv col-4'>
                <span className='book2lab'>date</span>
                <span className='book2val'>{prop.data.bookedDate}</span>
            </div>
            <div className='bookdiv col-3'>
                <span className='book2lab'>days</span>
                <span className='book2val'>{prop.data.days}</span>
            </div>
            <div className='bookdiv col-3'>
                <span className='book2lab'>Rent</span>
                <span className='book2val'>{prop.data.rent}</span>
            </div>
        </div>
            {owner!==""&&<Modal show={show} fullscreen={true}  onHide={() => {window.location.reload()}} >
            <Modal.Header closeButton >
            <Modal.Title >Booking Id : {prop.data.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='container bookingbody'>
                <div className='bookingdiv'>
                    <div className='row'>
                        <span className='col-5 bookedlab'>House Id</span>
                        <span className='col-5 bookedval'>{prop.data.houseId}</span>
                    </div>
                    <div className='row'>
                        <span className='col-5 bookedlab'>Address</span>
                        <span className='col-5 bookedval'>{prop.data.address}</span>
                    </div>
                    <div className='row'>
                        <span className='col-5 bookedlab'>Room No</span>
                        <span className='col-5 bookedval'>{prop.data.roomId}</span>
                    </div>
                    <div className='row'>
                        <span className='col-5 bookedlab'>Booked on</span>
                        <span className='col-5 bookedval'>{prop.data.date}</span>
                    </div>
                </div>
                <div className='bookingdivview' onClick={handleviewroom}>
                    <div className='viewroom'>
                            <span >View room</span>
                    </div>
                </div>
                <div className='bookingdiv'>
                    <div className='row'>
                        <span className='col-5 bookedlab'>Dates</span>
                        <span className='col-5 dates bookedval'>
                            <div className='row'>
                                {dates.map((x,index)=>{
                                return <span className='col-10 col-lg-4' key={index}>{x}</span>
                                })}
                          </div>
                        </span>
                    </div>
                    <div className='row'>
                        <span className='col-5 bookedlab'>Members</span>
                        <span className='col-5 bookedval'>{prop.data.member}</span>
                    </div>
                    <div className='row'>
                        <span className='col-5 bookedlab'>Rent</span>
                        <span className='col-5 bookedval'>{prop.data.rent}</span>
                    </div>
                </div>
                <div className='bookingdiv'>
                    <div className='row'>
                        <span className='col-5 bookedlab'>Owner Name</span>
                        <span className='col-5 bookedval'>{owner.name}</span>
                    </div>
                    <div className='row'>
                        <span className='col-5 bookedlab'>Owner Phone</span>
                        <span className='col-5 bookedval'>{owner.phone}</span>
                    </div>
                    <div className='row'>
                        <span className='col-5 bookedlab'>Owner Phone</span>
                        <span className='col-5 bookedval'>{owner.email}</span>
                    </div>
                </div>
                
            </Modal.Body>
            </Modal>}
        </div>
    )
}