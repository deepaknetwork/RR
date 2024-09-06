import { Modal } from 'react-bootstrap';
import MenuOwner from '../../components/owner/menuowner';
import { getBaseUrl } from '../../utils/api';
import { getId } from '../../utils/auth';
import './profileowner.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoadingPage from '../../components/common/loading';

export default function ProfileOwner() {

    var [load, setLoad] = useState(true)
    var [data, setData] = useState(null)
    var [Bookdata, setBookData] = useState(null)
    var [Resdata, setResData] = useState(null)
    var [totalearn, setEarn] = useState(0)
    var [totalspent, setSpent] = useState(0)
    var [showtopup, setShowTopup] = useState(false)
    var [topup, setTopup] = useState(null)
    var [topuperr, settopuperr] = useState(null)
    var [showdraw, setShowDraw] = useState(false)
    var [draw, setDraw] = useState(null)
    var [drawerr, setDrawerr] = useState(null)
    var [showtpass, setShowPass] = useState(false)
    var [oldpassword, setOldpassword] = useState(null)
    var [password, setPassword] = useState(null)
    var [passerr, setpasserr] = useState(null)
    useEffect(() => {
        axios.get(`${getBaseUrl()}owner/phone/${getId()}`).then((res) => setData(res.data))
        axios.get(`${getBaseUrl()}customer/reserve/${getId()}`).then((res) => {
            setBookData(res.data)
                var s = 0
                res.data.map((y) => {
                    return s = s + y.rent
                })
                setSpent(s)
            
        })
        axios.get(`${getBaseUrl()}owner/reserve/${getId()}`).then((res) => {
            setResData(res.data)
                var s = 0
                res.data.map((x) => {
                    return s = s + x.rent
                })
                setEarn(s)
        })
        setLoad(false)
    }, [])



    async function changePass() {
        if (password.toString().length > 7) {
            setLoad(true)
            await axios.post(`${getBaseUrl()}owner/changepassword/${getId()}`, { oldPassword: oldpassword.toString(), newPassword: password.toString() })
                .then((res) => { setLoad(false); setShowPass(false) })
                .catch((err) => { console.log(err); setLoad(false); setpasserr(err.response.data.message) })
        } else {
            setpasserr("length of new password should be atleast 8")
            setTimeout(() => {
                setpasserr(null)
            }, 3000);
        }

    }
    async function maketopup() {
        if (topup >= 500 && topup <= 40000) {
            if (topup <= data.balance) {
                setLoad(true);
                await axios.post(`${getBaseUrl()}owner/withdraw/${getId()}/${topup}`)
                    .then((res) => window.location.reload())
                    .catch((err) => {
                        setLoad(false); settopuperr("something went wrong, please try again later")
                        console.log(err)
                        setTimeout(() => {
                            settopuperr(null)
                        }, 3000);
                    })
            }
            else {
                settopuperr(`you have only ${data.balance} in your wallet`)
                setTimeout(() => {
                    settopuperr(null)
                }, 3000);
            }
        } else {
            settopuperr("please enter between 500 - 10000")
            setTimeout(() => {
                settopuperr(null)
            }, 3000);
        }
    }

    async function makedraw() {
        if (draw >= 500 && draw <= 10000) {
            setLoad(true);
            await axios.post(`${getBaseUrl()}owner/topup/${getId()}/${draw}`)
                .then((res) => window.location.reload())
                .catch((err) => {
                    setLoad(false); setDrawerr("something went wrong, please try again later")
                    console.log(err)
                    setTimeout(() => {
                        setDrawerr(null)
                    }, 3000);
                })

        } else {
            setDrawerr("please enter between 500 - 10000")
            setTimeout(() => {
                setDrawerr(null)
            }, 3000);
        }
    }


    return (
        <div className='profileg'>
            {load && <LoadingPage />}
            <MenuOwner />
            {data !== null && <div className='profilegbodyo row'>
                <div className='profileg1 nobr c1 col-10 col-lg-8'>
                    <span className='profileg1lab c1lab ballab'>Wallet Balance</span>
                    <span className='profileg1val c1val rs balval'>
                        <svg width="25" height="25" fill="currentColor" className="bi bi-currency-rupee" viewBox="0 0 16 16">
                            <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
                        </svg>
                        {data.balance}</span>
                </div>
                <div className='profileg2 col-10 col-lg-8'>
                    <button className='topup' onClick={() => setShowTopup(true)}>Withdraw now</button>
                    <Modal className='modeldiv' show={showtopup} onHide={() => setShowTopup(false)}>
                        <Modal.Body className='model'>
                            <div className='m1'>
                                <div className='m11'>
                                    <img className='modelicon' src={`${getBaseUrl()}common/roomireserve/image/rricon`} alt="" />
                                    <span className='modelhead'>Withdraw ammount</span>
                                </div>

                                <svg width="20" height="20" fill="currentColor" onClick={() => setShowTopup(false)} className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                                </svg>
                            </div>
                            <div className='m2'>
                                <div className='m2h'>
                                    <span className='m2htext'>you can withdraw minimum of Rs.500 and maximum upto Rs.40000</span>
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
                                <button className='modelbtn' onClick={maketopup} >Withdraw</button>
                            </div>
                        </Modal.Body>
                    </Modal>

                    <button className='topup' onClick={() => setShowDraw(true)}>Topup now</button>
                    <Modal className='modeldiv' show={showdraw} onHide={() => setShowDraw(false)}>
                        <Modal.Body className='model'>
                            <div className='m1'>
                                <div className='m11'>
                                    <img className='modelicon' src={`${getBaseUrl()}common/roomireserve/image/rricon`} alt="" />
                                    <span className='modelhead'>Topup wallet</span>
                                </div>

                                <svg width="20" height="20" fill="currentColor" onClick={() => setShowDraw(false)} className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                                </svg>
                            </div>
                            <div className='m2'>
                                <div className='m2h'>
                                    <span className='m2htext'>you can topup minimum of Rs.500 and maximum upto Rs.10000</span>
                                </div>
                                <div className='m21 row'>
                                    <span className='col-5 lab'>Amount in Rs</span>
                                    <input type='number' value={draw} onChange={(x) => setDraw(x.target.value)} className='col-5 val'></input>
                                </div>
                                {drawerr !== null && <div className='m2e'>
                                    <span className='m2etext'>{drawerr}</span>
                                </div>}

                            </div>
                            <div className='modelbtndiv'>
                                <button className='modelbtn' onClick={makedraw} >Topup</button>
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

                <div className='profileg4 col-10 col-lg-8'>
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

                {Resdata !== null &&
                    <div className='proexp m-0 row'>
                        <div className='profileg3 col-10 col-lg-5'>
                            <span className='profileg1lab'>My rooms booking</span>
                            <span className='profileg1val'>{Resdata.length}</span>
                        </div>
                        <div className='profileg3 c3 col-10 col-lg-5'>
                            <span className='profileg1lab'>Total earning</span>
                            <span className='profileg1val'>{totalearn}</span>
                        </div>
                    </div>
                }

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