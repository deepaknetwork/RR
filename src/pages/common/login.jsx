import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login.css'
import { useEffect, useState } from 'react';
import { getName, loginUser, loginUserMail } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import LoadingPage from '../../components/common/loading';


export default function Login() {
  var [load, setLoad] = useState(false)
  var [isMail, setMail] = useState(false)
  var [phone, setPhone] = useState('');
  var [email, setEmail] = useState('');
  var [password, setpassword] = useState('');
  var [err, seterr] = useState('');
  var [shoerr, setshowerr] = useState(false);
  const navigate = useNavigate();


  async function handleLogin(event) {
    event.preventDefault();
    var error
    if ((phone === '' && password === '') || (email === '' && password === '')) {
      error = "please fill all the above feilds"
    } else {
      if (isMail) {
        setLoad(true)
        error = await loginUserMail(email, password);
      } else {
        setLoad(true)
        error = await loginUser(phone, password);
      }
    }
    setLoad(false)
    seterr(error)
    setshowerr(true)
    setTimeout(() => {
      setshowerr(false)
    }, 3000);
    if (getName() !== null) {
      window.location.href = "https://deepaknetwork.github.io/RR/";
    }
  }
  function goHome() {
    navigate("/RR/")
  }
  function goSignUp(){
    navigate("/RR/signup")
  }


  return (
    <div className='app row'>
      {load && <LoadingPage />}
      <div className='loginl col-12 col-lg-6'>
        <Carousel className='logincaro' controls={false} interval={1300} indicators={false}>
          <Carousel.Item>
            <img className="loginimg" src="icon.png" alt="" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="loginimg" src="images/addhouse1.png" alt="" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="loginimg" src="images/addhome2.png" alt="" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="loginimg" src="images/menusign.png" alt="" />
          </Carousel.Item>
        </Carousel>
      </div>
      <div className='loginr col-9 col-lg-6'>
        <div className='loginr1'>
          <span className='lheadings'>Welcome back to RoomieReserve</span>
        </div>
        <div className='loginr2'>
          <Form onSubmit={handleLogin}>
            {isMail === true && <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={(x) => {
                setEmail(x.target.value)
              }}
                value={email}
                type="email" placeholder="email" />
            </Form.Group>}

            {isMail === false && <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Phone no</Form.Label>
              <Form.Control onChange={(x) => {
                setPhone(x.target.value)
              }}
                value={phone}
                type="number" placeholder="phone no" />
            </Form.Group>}


            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(x) => {
                  setpassword(x.target.value)
                }}
                value={password}
                type="password" placeholder="password" />

            </Form.Group>

            <Form.Group>
              {shoerr && <Form.Text className="text-muted">
                {err}
              </Form.Text>}
            </Form.Group>
            <button className='lbtn' type="submit">
              Login
            </button>
            <Form.Group className='hylink'>
              <a className='href' onClick={goHome}>Continue without signing in</a>
              {isMail === false && <a className='href' onClick={() => { setMail(true) }}>Sign in with email</a>}
              {isMail === true && <a className='href' onClick={() => { setMail(false) }}>Sign in with phone</a>}
              <a className='href' onClick={goSignUp}>Dont have an account ?</a>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  )
}