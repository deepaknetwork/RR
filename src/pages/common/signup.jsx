import Form from 'react-bootstrap/Form';
import './login.css'
import { useState } from 'react';
import { loginUser } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getBaseUrl } from '../../utils/api';
import Carousel from 'react-bootstrap/Carousel';
import LoadingPage from '../../components/common/loading';

export default function Signup() {

  var [load, setLoad] = useState(false)
  var [uphone, setPhone] = useState();
  var [uname, setName] = useState();
  var [uemail, setEmail] = useState();
  var [role, setRole] = useState(0);
  var [upassword, setpassword] = useState();
  var [err, seterr] = useState('');
  var [shoerr, setshowerr] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    
    if(upassword.length<8){
      seterr("password should contain atleast 8 digit")
      setshowerr(true)
    
    }
    if (role === 0) {
      seterr("please fill all the above feilds")
      setshowerr(true)
      setTimeout(() => {
        setshowerr(false)
      }, 3000);
    }
    
    if (parseInt(role) === 1) {
      setLoad(true)
      axios.post(`${getBaseUrl()}customer/signup`, { phone: uphone, email: uemail, name: uname, password: upassword })
        .then((res) => {
          console.log(res)
          // alert("clicked")
          const error = loginUser(uphone, upassword);
          setTimeout(() => {
            navigate('/RR/');
          }, 1000);

        }).catch((err) => {
          console.log(err)
          setLoad(false)
          seterr(err.response.data.message)
          setshowerr(true)
          setTimeout(() => {
            setshowerr(false)
          }, 3000);
        })
    }
    if (parseInt(role) === 2) {
      setLoad(true)
      axios.post(`${getBaseUrl()}owner/signup`, { phone: uphone, email: uemail, name: uname, password: upassword })
        .then((res) => {
          console.log(res)
          const error = loginUser(uphone, upassword);
          window.location.href = "https://deepaknetwork.github.io/RR/";
        }).catch((err) => {
          console.log(err)
          setLoad(false)
          seterr(err.response.data.message)
          setshowerr(true)
          setTimeout(() => {
            setshowerr(false)
          }, 3000);
        })
    }

  }
  function goHome() {
    navigate("/RR/")
  }
  function goLogin(){
    navigate("/RR/login")
  }

  return (
    <div className='app row'>
      {load && <LoadingPage />}
      <div className='loginl col-6'>
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
      <div className='loginr col-6'>
        <div className='loginr1'>
          <span className='lheadings'>Welcome to RoomieReserve</span>
        </div>
        <div className='loginr2'>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" >
              <Form.Label>Phone no</Form.Label>
              <Form.Control onChange={(x) => {
                setPhone(x.target.value)
              }}
                value={uphone}
                type="number" placeholder="phone no" />
            </Form.Group>


            <Form.Group className="mb-3" >
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={(x) => {
                setEmail(x.target.value)
              }}
                value={uemail}
                type="email" placeholder="email" />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Name</Form.Label>
              <Form.Control onChange={(x) => {
                setName(x.target.value)
              }}
                value={uname}
                type="text" placeholder="name" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Im a</Form.Label>
              <Form.Select aria-label="Default select example" onChange={(x) => {
                setRole(x.target.value)
              }}>
                <option>select</option>
                <option value="1">House Needer</option>
                <option value="2">House Owner</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(x) => {
                  setpassword(x.target.value)
                }}
                value={upassword}
                type="password" placeholder="password" />
            </Form.Group>

            <Form.Group>
              {shoerr && <Form.Text className="text-muted">
                {err}
              </Form.Text>}
            </Form.Group>
            <button className='lbtn' type="submit">
              Signup
            </button>
            <Form.Group className='hylink'>
              <a className='href' onClick={goHome}>Continue without signing in</a>
              <a className='href' onClick={goLogin}>Already have an account ?</a>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  )
}