import { useLocation, useNavigate } from 'react-router-dom';
import MenuOwner from '../../components/owner/menuowner';
import './ownerroom.css';
import { useEffect, useState } from 'react';
import { getBaseUrl } from '../../utils/api';
import { getId } from '../../utils/auth';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import OwnerBookingCard from '../../components/owner/ownerbookingCard';
import Earning from '../../components/owner/earning';
import LoadingPage from '../../components/common/loading';

export default function EditRoom() {


    const location = useLocation();
    var data = location.state;
    const nav = useNavigate();
    var [load, setLoad] = useState(true)
    var [roomData, setRoomData] = useState(null);
    var [roomBooking, setRoomBooking] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [deleteProgress, setDeleteProgress] = useState(0);
    var [roomedit, setRoomEdit] = useState({ rent: 0, area: 0, beds: 0 });
    var [amenity, setamenity] = useState({ name: '', count: NaN });

    var [edit, setEdit] = useState(false);
    var [edita, setEdita] = useState(false);

    useEffect(() => {
        if (data === null) {
            nav('/RR')
        } else {
            fetchRoom()
            fetchBooing()
            setLoad(false)
        }
    }, [])

    async function handledltimg(x) {
        setDeleteProgress(x)
        await axios.delete(`${getBaseUrl()}owner/image/${data.houseNo}/${data.roomNo}/${x}`).then((res) => { fetchRoom(); setDeleteProgress(0) }).catch((err) => { console.log(err); setDeleteProgress(0) })
    }
    async function handleAmeAdd() {
        setLoad(true)
        var l = roomData.amenities
        l.push(amenity);
        await axios.patch(`${getBaseUrl()}owner/room/${data.houseNo}/${data.roomNo}`, { amenities: l }).then((res) => fetchRoom()).catch((err) => console.log())
        setEdita(false)
        setLoad(false)
    }
    async function handleamedlt(x) {
        setLoad(true)
        var l = roomData.amenities.filter(item => item !== x)
        await axios.patch(`${getBaseUrl()}owner/room/${data.houseNo}/${data.roomNo}`, { amenities: l }).then((res) => fetchRoom()).catch((err) => console.log())
        setLoad(false)
    }

    async function fetchRoom() {
        await axios.get(`${getBaseUrl()}common/room/${data.houseNo}/${data.roomNo}`)
            .then((res) => {
                setRoomData(res.data);
                setRoomEdit({ rent: res.data.rent, area: res.data.area, beds: res.data.beds })
            })
            .catch((err) => console.log(err))
    }

    async function fetchBooing() {
        await axios.get(`${getBaseUrl()}owner/bookings/${data.houseNo}/${data.roomNo}`).then((res) => setRoomBooking(res.data)).catch((err) => console.log(err))
    }
    async function handleSave() {
        setLoad(true)
        await axios.patch(`${getBaseUrl()}owner/room/${roomData.houseNo}/${roomData.roomNo}`, roomedit).then((res) => fetchRoom()).catch((err) => console.log())
        setEdit(false)
        setLoad(false)
    }
    async function imagedone(x) {
        if (x.target.files[0] !== null) {
            var formData = new FormData();
            formData.append('ownerId', getId());
            formData.append('houseId', roomData.houseNo);
            formData.append('roomNo', roomData.roomNo);
            formData.append('image', x.target.files[0]);
            setUploadProgress(1);
            axios.post(`${getBaseUrl()}owner/image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
                .then((res) => {
                    fetchRoom();
                    setUploadProgress(0);
                })
                .catch((err) => {
                    setUploadProgress(0);
                    console.log(err);
                })

        }
    }

    return (
        <div>
            {load && <LoadingPage />}
            <MenuOwner />
            {roomData != null && <div className='container editroombody'>
                <div className='subheadingedit'>
                    <span className='editroomheadings'>Room</span>

                    {edit === false && <svg width="16" height="16" fill="currentColor" className="bi bi-pencil-square editroomicon" viewBox="0 0 16 16" onClick={() => setEdit(true)}>
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                    </svg>}
                </div>

                <div className='row editroombasic'>
                    <div className='editroomrow col-8 col-lg-5'>
                        <span className='editroomrowtitle'>House No</span>
                        <span className='editroomrowvalue'>{roomData.houseNo}</span>
                    </div>
                    <div className='editroomrow col-8 col-lg-5'>
                        <span className='editroomrowtitle'>Room No</span>
                        <span className='editroomrowvalue'  >{roomData.roomNo}</span>
                    </div>
                    <div className='editroomrow col-8 col-lg-5'>
                        <span className='editroomrowtitle'>Area</span>
                        <span className='editroomrowvalue'  >{roomData.area}</span>
                    </div>
                    <div className='editroomrow col-8 col-lg-5'>
                        <span className='editroomrowtitle'>Rent</span>
                        <input className={`editroomrowvalue ${edit ? 'canchange' : 'nochange'}`} disabled={edit ? false : true}
                            type='number'
                            value={roomedit.rent}
                            onInput={(x) => {
                                setRoomEdit(prevData => ({
                                    ...prevData,
                                    rent: parseInt(x.target.value)
                                }))
                            }}
                        />
                    </div>
                    <div className='editroomrow col-8 col-lg-5'>
                        <span className='editroomrowtitle'>Beds</span>
                        <input className={`editroomrowvalue ${edit ? 'canchange' : 'nochange'}`} disabled={edit ? false : true}
                            type='number'
                            value={roomedit.beds}
                            onInput={(x) => {
                                setRoomEdit(prevData => ({
                                    ...prevData,
                                    beds: parseInt(x.target.value)
                                }))
                            }}
                        />
                    </div>
                </div>

                {edit && <div className='savediv'><button className='hbtn' onClick={handleSave}>Save</button></div>}

                <div className='editroomamenities'>
                    <div className='subheadingedit'>
                        <span className='editroomheadings'>Amenities</span>

                        {edita === false && <svg width="16" height="16" fill="currentColor" className="bi bi-plus-square editroomicon" viewBox="0 0 16 16"
                            onClick={() => setEdita(true)}>
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>}
                    </div>
                    <div className='row editroomamenitiesroom'>
                        {roomData.amenities.map((x, index) => {
                            return (
                                <div key={index} className='col-12 col-xl-6 col-lg-5 '>
                                    <div className='row editroomamenitiescard'>
                                        <span className='col-5 editroomamenitiesvalue'>{x.name}</span>
                                        <span className='col-1 editroomamenitiesvalue'>x</span>
                                        <span className='col-4 editroomamenitiesvalue'>{x.count}</span>
                                        <svg width="16" height="16" fill="currentColor" className="bi bi-trash3-fill amenitydlt col-1 " viewBox="0 0 16 16" onClick={() => handleamedlt(x)}>
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                        </svg>
                                    </div>
                                </div>
                            )
                        })}
                        {edita && <>
                            <div className='row'>
                                <div className='col-5'>
                                    <Form.Control placeholder="item name"
                                        value={amenity.name}
                                        type='text'
                                        onInput={(x) => {
                                            setamenity(prevData => ({
                                                ...prevData,
                                                name: x.target.value
                                            }))
                                        }}

                                    />
                                </div>
                                <div className='col-5'>
                                    <Form.Control placeholder="item count"
                                        value={amenity.count}
                                        type='number'
                                        onInput={(x) => {
                                            setamenity(prevData => ({
                                                ...prevData,
                                                count: parseInt(x.target.value)
                                            }))
                                        }}
                                    />
                                </div>
                                <div className='col-2'>
                                    <button className='hbtn' onClick={handleAmeAdd}>add</button>
                                </div>
                            </div>
                        </>}
                    </div>
                </div>

                <div className='editroomimages'>
                    <span className='editroomheadings'>Images</span>
                    <div className='editroomimagesdiv'>
                        <div className='col-8 col-lg-3 col-xl-3 editroomuploadtag'>
                            <div className='editroomuploadtag'>
                                <input className='choosefile' type="file" accept=".jpg, .jpeg"
                                    onChange={(x) => imagedone(x)}
                                />
                                {uploadProgress > 0 && (
                                    <span className='uploadtext back'>Uploading</span>)}
                                {uploadProgress === 0 && <span className='uploadtext'>click to upload</span>}
                            </div>
                        </div>
                        {roomData.images.map((x, i) => {
                            var url = getBaseUrl() + "common/image/" + x
                            return (
                                <div key={i} className='col-10 col-lg-4 col-xl-4 editroomimgdiv' >
                                    <img className='editroomimg' src={url} alt='' />
                                    <svg width="16" height="16" fill="currentColor" className="bi bi-trash3-fill imgdlt" viewBox="0 0 16 16" onClick={() => handledltimg(x)}>
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                    </svg>
                                    {deleteProgress === x && <span className='deletetext back1'>Deleting...</span>}
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className='editroomearn'>
                    <span className='editroomheadings'>Earning</span>
                    {roomBooking !== null && <Earning data={roomBooking} />}
                </div>

                <div className='editroombookings'>
                    <span className='editroomheadings'>Bookings</span>
                    {roomBooking !== null && <div className='bookingroom'>
                        {
                            roomBooking.map((x, index) => {
                                return <OwnerBookingCard key={index} data={x} />
                            })}
                    </div>}
                </div>


            </div>}
        </div>
    )
}