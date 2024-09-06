import { addDays} from 'date-fns';
import Modal from 'react-bootstrap/Modal';
import './reserve.css';
import { useEffect, useState } from 'react';
import { getBaseUrl } from '../../utils/api';
import { getId } from '../../utils/auth';
import axios from 'axios';
import LoadingPage from './loading';
import { useNavigate } from 'react-router-dom';

export default function Reserve(prop) {
    var nav=useNavigate();
    var [load, setLoad] = useState(false)
    var [tilldate,setTilldate]=useState('select a date from above available days')
    var [selectDate, setDate] = useState('select a date from above available days');
    var [days, setDays] = useState(1)
    var [mem, setMem] = useState(1)
    var [bookerr, setBookerr] = useState(null)
    var [showDayErr, setDayErr] = useState(false)
    var [showDatesErr, setDateErr] = useState(false)
    var [showMemErr, setMemErr] = useState(false)
    const [show, setShow] = useState(false);
    var [dateS, SetDateS] = useState([]);
    var dateB = []
    prop.data.room.bookings.map((x, i) => {
        for (var j = 0; j < x.day; j++) {
            dateB.push(addDays(x.date, j).toISOString().split("T")[0])
        }
    })
    var dateL = []
    var today = new Date()
    for (var i = 0; i < 44; i++) {
        dateL.push(addDays(today, i).toISOString().split("T")[0])
    }
    useEffect(() => {        
        if (selectDate !== 'select a date from above available days') {
            var list = []
            var isBreak = false
            for (var i = 0; i < days; i++) {
                if (dateB.includes(addDays(selectDate, i).toISOString().split("T")[0])) {
                    setDays(1); isBreak = true;
                    setDateErr(true);
                    setTimeout(() => {
                        setDateErr(false);
                    }, 2000)
                    break;
                }
                else { list.push(addDays(selectDate, i).toISOString().split("T")[0]) }
            }
            if (!isBreak) { 
                setTilldate(list[list.length-1])
                SetDateS(list) }
        }
    }, [selectDate, days])




    async function reserveroom() {
        setLoad(true)
        await axios.get(`${getBaseUrl()}common/room/${prop.data.house.id}/${prop.data.room.roomNo}`)
            .then((res) => {

                var bookedList = []
                res.data.bookings.map((x, i) => {
                    for (var j = 0; j < x.day; j++) {
                        bookedList.push(addDays(x.date, j).toISOString().split("T")[0])
                    }
                })
                var isbreak = false;
                for (var i = 0; i < days; i++) {
                    if (bookedList.includes(addDays(selectDate, i).toISOString().split("T")[0])) {
                        isbreak = true;
                        break;
                    }
                }
                if (!isbreak) {
                    axios.post(`${getBaseUrl()}customer/reserve/${getId()}`, { id: prop.data.house.id, roomNo: prop.data.room.roomNo, member: mem, date: selectDate, day: days })
                        .then((res) => {
                            nav("/RR/booking")
                        })
                        .catch((err) => {
                            console.log(err)
                            setBookerr(err.response.data.message)
                            setTimeout(() => {
                                setBookerr(null)
                            }, 3000);
                            setLoad(false)
                        })
                } else {
                    console.log("err")
                    setBookerr("something went wrong, please refresh and check the availabe days once again")
                    setLoad(false)
                }

            })
            .catch((err) => {
                console.log(err)
                setLoad(false)
            })
    }
    return (
        <div className='rbody'>
            {load && <LoadingPage />}
            <span className='rheadings'>Reserve</span>
            <div className='row calender'>
                {dateL.map((x, index) => {
                    if (dateB.includes(x)) {
                        return <span key={index} className={`col-1 red ${index > 13 ? 'not' : ''}`}  >{x}</span>
                    } else {
                        if (index < 13) {
                            return <span key={index} className={`col-1 black ${selectDate === x ? 'selected' : ''}`} onClick={() => { setDate(x);}}>{x}</span>
                        } else {
                            return <span key={index} className={`col-1 black not ${selectDate === x ? 'selected' : ''}`}>{x}</span>
                        }
                    }
                })}
            </div>
            <div className='resdetails'>
                <div className='row condiv1'>
                    <span className='col-5 label1'>Selected date</span>
                    <span className='col-5 value1'>{selectDate}</span>
                </div>
                 <div className='row condiv1'>
                    <span className='col-5 label1'>No of Days</span>
                    {selectDate !== 'select a date from above available days' && <input type='number' className='col-5 value1 inp' onChange={(x) => {
                        if ((parseInt(x.target.value) > 0 && parseInt(x.target.value) < 31) || x.target.value === '') {
                            setDays(x.target.value)
                        } else {
                            setDays(1)
                            setDayErr(true);
                            setTimeout(() => {
                                setDayErr(false);
                            }, 1500)
                        }
                    }} value={selectDate !== 'select a date from above available days' ? days : ''} />}
                </div>
                <div className='row condiv1'>
                    <span className='col-5 label1'>Till date</span>{selectDate !== 'select a date from above available days' &&
                    <input type="date" className='col-5 value1 inp' value={tilldate} onChange={(x)=>{
                        var aa=[31,28,31,30,31,30,31,31,30,31,31,30]
                        var d
                        if(parseInt(x.target.value.split("-")[1])===parseInt(selectDate.split("-")[1])){
                            d=parseInt(x.target.value.split("-")[2])+1-parseInt(selectDate.split("-")[2])
                        }else if(parseInt(x.target.value.split("-")[1])===parseInt(selectDate.split("-")[1])+1){
                             d=aa[parseInt(selectDate.split("-")[1]-1)]-parseInt(selectDate.split("-")[2])+1+parseInt(x.target.value.split("-")[2])
                        }
                        console.log(d)
                        if(d>0&&d<31){
                            setDays(d)
                        }else{
                            setDayErr(true);
                            setTimeout(() => {
                            setDayErr(false);
                            }, 2000)
                        }
                       
                    }} />}
                </div>
               
                <div className='err'>
                    {showDayErr && <span>days limit is max 30</span>}
                    {showDatesErr && <span>days not available, please check the available days above</span>}
                </div>
                <div className='row condiv1'>
                    <span className='col-5 label1'>No of Members</span>
                    {selectDate !== 'select a date from above available days' && <input type='number' className='col-5 value1 inp' onChange={(x) => {
                        if ((parseInt(x.target.value) > 0 && parseInt(x.target.value) < 5) || x.target.value === '') {
                            setMem(x.target.value)
                        } else {
                            setMemErr(true);
                            setMem(4)
                            setTimeout(() => {
                                setMemErr(false);
                            }, 1500)
                        }
                    }} value={selectDate !== 'select a date from above available days' ? mem : ''} />}
                </div>
                <div className='err'>
                    {showMemErr && <span>only maximum of 4 members</span>}
                </div>
                <div className='row condiv1'>
                    <span className='col-5 label1'>Total rent</span>
                    <span className='col-5 value1'>{selectDate !== 'select a date from above available days' ? prop.data.room.rent * days : ''}</span>
                </div>
                <div className='row condiv12'>
                    {selectDate !== 'select a date from above available days' && <button onClick={() => setShow(true)} disabled={days === '' || mem === ''} className='col-5 col-lg-3 reserbtn'>Reserve it</button>}
                </div>
                <Modal className='modeldiv' show={show} onHide={() => setShow(false)}>
                    <Modal.Body className='modelbody'>
                        <div className='c1r'>
                            <div className='c11r'>
                                <img className='modelicon' src={`${getBaseUrl()}common/roomireserve/image/rricon`} alt="" />
                                <span className='modelhead'>Confirm your room</span></div>

                            <svg width="20" height="20" fill="currentColor" onClick={() => setShow(false)} className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                            </svg>
                        </div>
                        <div className='c2'>
                            <div className='c21 row'>
                                <span className='col-5 lab'>Address</span>
                                <span className='col-5 val'>{prop.data.house.address}</span>
                            </div>
                            <div className='c21 row'>
                                <span className='col-5 lab'>Room No</span>
                                <span className='col-5 val'>{prop.data.room.roomNo}</span>
                            </div>
                            <div className='c21 row'>
                                <span className='col-5 lab'>Dates</span>
                                <div className='col-5 val condates'>{dateS.map((x, index) => {
                                    return <span key={index}>{x}</span>
                                })}</div>
                            </div>
                            <div className='c21 row'>
                                <span className='col-5 lab'>Rent</span>
                                <span className='col-5 val'>{prop.data.room.rent * days}</span>
                            </div>
                            <div className='c21 row'>
                                <span className='col-5 lab'>No of members</span>
                                <span className='col-5 val'>{mem}</span>
                            </div>
                            {bookerr !== null && <div className='c21 row'>
                                <span className='col-5 err'>{bookerr}</span>
                            </div>}

                        </div>
                        <div className='modelbtndiv'>
                            <button className='modelbtn' onClick={reserveroom}>Confirm</button>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}