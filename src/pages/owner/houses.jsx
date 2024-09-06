import './houses.css';
import { useEffect, useState } from "react";
import MenuOwner from "../../components/owner/menuowner";
import axios from "axios";
import { getBaseUrl } from "../../utils/api";
import { getId } from "../../utils/auth";
import HouseCard from "../../components/owner/HouseCard";
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Carousel from 'react-bootstrap/Carousel';
import LoadingPage from "../../components/common/loading";


export default function Houses() {

  const [houses, setHouses] = useState([]);
  var [load, setLoad] = useState(true);
  var [line1, sline1] = useState();
  var [line2, sline2] = useState();
  var [city, scity] = useState();
  var [state, sstate] = useState();
  var [pincode, spin] = useState();
  var [country, scountry] = useState();

  useEffect(() => {
    axios.get(getBaseUrl() + "owner/house/" + getId())
      .then((res) => {
        setHouses(res.data);
        setLoad(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(true);
  }
  function handlesubmit() {
    setLoad(true)
    var addr = line1 + ", " + line2 + ", " + city + ", " + state + ", " + pincode + ", " + country
    axios.post(getBaseUrl() + "owner/house/" + getId(), { address: addr })
      .then((res) => {
        window.location.reload()
      })
      .catch((err) => {
        // setLoad(false)
      })
  }
  return (
    <div className="body">
      {load && <LoadingPage />}
      <MenuOwner />
      <div className="homebody row">
        <div>
          <Card>
            <Card.Header as="h5">Hey!</Card.Header>
            <Card.Body>
              <Card.Title>Start earning with your houses</Card.Title>
              <Card.Text>
                add your houses respect to every rooms to earn on every days, why are you waiting, add your house now
              </Card.Text>
              <button key={true} className="hbtn" onClick={() => handleShow()}>
                Add
              </button>
              <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Add House</Modal.Title>
                </Modal.Header>
                <Modal.Body className="addbody row">
                  <Carousel className="col-12 col-lg-5 col-xl-5" controls={false} indicators={false}>
                    <Carousel.Item>
                      <img className="addhomeimg" src="images/addhouse1.png" alt="" srcSet="" />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img className="addhomeimg" src="images/addhome2.png" alt="" srcSet="" />
                    </Carousel.Item>
                  </Carousel>
                  <div className="col-10 col-lg-5 col-xl-5">
                    <h3>Address</h3>
                    <Form>
                      <Form.Group className="mb-3" >
                        <Form.Label>Address Line 1</Form.Label>
                        <Form.Control type="text" onChange={(x) => { sline1(x.target.value) }} />
                      </Form.Group>
                      <Form.Group className="mb-3" >
                        <Form.Label>Address Line 2</Form.Label>
                        <Form.Control type="text" onChange={(x) => { sline2(x.target.value) }} />
                      </Form.Group>
                      <Form.Group className="mb-3" >
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" onChange={(x) => { scity(x.target.value) }} />
                      </Form.Group>
                      <Form.Group className="mb-3" >
                        <Form.Label>State</Form.Label>
                        <Form.Control type="text" onChange={(x) => { sstate(x.target.value) }} />
                      </Form.Group>
                      <Form.Group className="mb-3" >
                        <Form.Label>Pincode</Form.Label>
                        <Form.Control type="number" onChange={(x) => { spin(x.target.value) }} />
                      </Form.Group>
                      <Form.Group className="mb-3" >
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" onChange={(x) => { scountry(x.target.value) }} />
                      </Form.Group>
                      <button className="hbtn" onClick={handlesubmit}>
                        Add
                      </button>
                    </Form>
                  </div>
                </Modal.Body>
              </Modal>
            </Card.Body>
          </Card>
        </div>
        {houses.map((room, index) => {
          return <HouseCard key={index} data={room} />
        })}
      </div>
    </div>
  )
}