import { useEffect, useState } from 'react';
import MenuGuest from '../../components/guest/menuguest';
import './profileguest.css';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { getBaseUrl } from '../../utils/api';
import { getId } from '../../utils/auth';
import LoadingPage from '../../components/common/loading';

export default function ProfileGuest() {

    var [load, setLoad] = useState(true)
    var [data, setData] = useState(null)
    var [Bookdata, setBookData] = useState(null)
    var [totalspent, setSpent] = useState(0)
    var [showtopup, setShowTopup] = useState(false)
    var [topup, setTopup] = useState(null)
    var [topuperr, settopuperr] = useState(null)
    var [showtpass, setShowPass] = useState(false)
    var [oldpassword, setOldpassword] = useState(null)
    var [password, setPassword] = useState(null)
    var [passerr, setpasserr] = useState(null)
    
    useEffect(() => {
        axios.get(`${getBaseUrl()}customer/phone/${getId()}`).then((res) => setData(res.data))
        axios.get(`${getBaseUrl()}customer/reserve/${getId()}`).then((res) => {
            setBookData(res.data)
            var s = 0
            res.data.map((x) => {
                s = s + x.rent
            })
            setSpent(s)
        })
        setLoad(false)
    }, [])



    async function changePass() {

        if (password.toString().length > 7) {
            setLoad(true)
            console.log({ oldPassword: oldpassword, newPassword: password })
            await axios.post(`${getBaseUrl()}customer/changepassword/${getId()}`, { oldPassword: oldpassword.toString(), newPassword: password.toString() })
                .then((res) => setShowPass(false))
                .catch((err) => { console.log(err); setpasserr(err.response.data.message) })
            setLoad(false)
        } else {
            setpasserr("length of new password should be atleast 8")
            setTimeout(() => {
                setpasserr(null)
            }, 3000);
        }

    }
    async function maketopup() {
        if (topup >= 500 && topup <= 10000) {
            setLoad(true)
            await axios.post(`${getBaseUrl()}customer/topup/${getId()}/${topup}`)
                .then((res) => window.location.reload())
                .catch((err) => {
                    settopuperr("something went wrong, please try again later")
                    console.log(err)
                    setLoad(false)
                    setTimeout(() => {
                        settopuperr(null)
                    }, 3000);
                })

        } else {
            settopuperr("please enter between 500 - 10000")
            setTimeout(() => {
                settopuperr(null)
            }, 3000);
        }
    }

    return (
        <div className='profileg'>
            {load && <LoadingPage />}
            <MenuGuest />
            {data !== null &&
                <div className='profilegbody row'>
                    <div className='profileg1 nobr c1 col-10 col-lg-8'>
                        <span className='profileg1lab c1lab ballab'>Wallet Balance</span>
                        <span className='profileg1val c1val rs balval'>
                            <svg width="25" height="25" fill="currentColor" className="bi bi-currency-rupee" viewBox="0 0 16 16">
                                <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
                            </svg>
                            {data.balance}</span>
                    </div>
                    <div className='profileg2 col-10 col-lg-8'>
                        <button className='topup' onClick={() => setShowTopup(true)}>Topup now</button>
                        <Modal className='modeldiv' show={showtopup} onHide={() => setShowTopup(false)}>
                            <Modal.Body className='model'>
                                <div className='m1'>
                                    <div className='m11'>
                                        <img className='modelicon' src={`${getBaseUrl()}common/roomireserve/image/rricon`} alt="" />
                                        <span className='modelhead'>Wallet topup</span>
                                    </div>

                                    <svg width="20" height="20" fill="currentColor" onClick={() => setShowTopup(false)} className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                                    </svg>
                                </div>
                                <div className='m2'>
                                    <div className='m2h'>
                                        <span className='m2htext'>you can topup minimum of Rs.500 and maximum upto Rs.10000</span>
                                    </div>
                                    <div className='m21 row'>
                                        <span className='col-5 lab'>Amount in Rs</span>
                                        <input type='number' value={topup} onChange={(x) => setTopup(x.target.value)} className='col-5 val'></input>
                                    </div>
                                    {topuperr !== null && <div className='m2e'>
                                        <span className='m2etext'>{topuperr}</span>
                                    </div>}

                                </div>
                                <div className='modelbtndiv'>
                                    <button className='modelbtn' onClick={maketopup} >Topup</button>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </div>
                    <div className='detdiv row'>
                        <div className='profileg1 col-10 col-lg-3'>
                            <span className='profileg1lab'>Name</span>
                            <span className='profileg1val'>{data.name}</span>
                        </div>
                        <div className='profileg1 col-10 col-lg-3'>
                            <span className='profileg1lab'>Phone</span>
                            <span className='profileg1val'>{data.phone}</span>
                        </div>
                        <div className='profileg1 col-10 col-lg-3'>
                            <span className='profileg1lab'>Email</span>
                            <span className='profileg1val eval'>{data.email}</span>
                        </div>
                    </div>

                    <div className='profileg2 col-10 col-lg-8'>
                        <button className='cp' onClick={() => setShowPass(true)}>Change Passoword</button>
                        <Modal className='modeldiv' show={showtpass} onHide={() => setShowPass(false)}>
                            <Modal.Body className='model'>
                                <div className='m1'>
                                    <div className='m11'>
                                        <img className='modelicon' src={`${getBaseUrl()}common/roomireserve/image/rricon`} alt="" />
                                        <span className='modelhead'>Change password</span>
                                    </div>

                                    <svg width="20" height="20" fill="currentColor" onClick={() => setShowPass(false)} className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                                    </svg>
                                </div>
                                <div className='m2'>
                                    <div className='m2h'>
                                        <span className='m2htext'></span>
                                    </div>
                                    <div className='m21 row'>
                                        <span className='col-5 lab'>Old password</span>
                                        <input type='password' value={oldpassword} onChange={(x) => setOldpassword(x.target.value)} className='col-5 val'></input>
                                    </div>
                                    <div className='m21 row'>
                                        <span className='col-5 lab'>New password</span>
                                        <input type='password' value={password} onChange={(x) => setPassword(x.target.value)} className='col-5 val'></input>
                                    </div>
                                    {passerr !== null && <div className='m2e'>
                                        <span className='m2etext'>{passerr}</span>
                                    </div>}

                                </div>
                                <div className='modelbtndiv'>
                                    <button className='modelbtn' onClick={changePass} >Change</button>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </div>
                    {Bookdata !== null &&
                        <div className='proexp row'>
                            <div className='profileg3 col-10 col-lg-5'>
                                <span className='profileg1lab'>Total bookings</span>
                                <span className='profileg1val'>{Bookdata.length}</span>
                            </div>
                            <div className='profileg3 c3 col-10 col-lg-5'>
                                <span className='profileg1lab'>Total spent</span>
                                <span className='profileg1val'>{totalspent}</span>
                            </div>
                        </div>
                    }



                </div>}
        </div>
    )
}