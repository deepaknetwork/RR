import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './HouseCard.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { getBaseUrl } from '../../utils/api';
import { getId } from '../../utils/auth';
import Badge from 'react-bootstrap/Badge';

export default function HouseCard(prop) {
  var navigate = useNavigate()
  var [hoveredItem, setHoveredItem] = useState(null);
  var [showadd, setshowadd] = useState(false);
  var [showdlt, setshowdlt] = useState(0);
  var [roomno, setroomno] = useState();
  var [areaa, setarea] = useState();
  var [rentt, setrent] = useState();
  var [bed, setbeds] = useState();

  const handleMouseEnter = (index) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };
  function handleViewRoom(x) {
    navigate('/RR/editroom', { state: x });
  }

  async function handleaddroom() {
    await axios.post(`${getBaseUrl()}owner/room/${getId()}`, { houseNo: prop.data.id, roomNo: roomno, area: areaa, beds: bed, rent: rentt, bookings: [], amenities: [], images: [] })
      .then((res) => setshowadd(false))
      .catch((err) => console.log(err))

  }
  async function handledlt() {
    await axios.delete(`${getBaseUrl()}owner/house/${prop.data.id}`)
      .then((res) => { setshowdlt(3); navigate("/houses") })
      .catch((err) => setshowdlt(2))
  }
  return (
    <Card className='cardh' style={{ width: '18rem' }}>
      {!showdlt && <svg width="16" height="16" fill="currentColor" className="bi bi-trash3 homedlt" viewBox="0 0 16 16" onClick={() => setshowdlt(1)}>
        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
      </svg>}
      <Card.Body>
        {prop.data.rooms.length === 0 && <Badge bg="secondary">action needed</Badge>}<br />
        <span className='gray'>House Id</span>
        <Card.Title>{prop.data.id}</Card.Title>
        <span className='gray'>Address</span>
        <Card.Text>{prop.data.address}</Card.Text>
      </Card.Body>

      {showdlt === 1 && <ListGroup>
        <ListGroup.Item className='dltopsdiv'>
          <Card.Text>Are you sure to delete?</Card.Text>
          <div className='dltcon'>
            <svg width="20" height="20" fill="currentColor" className="bi bi-check-circle-fill dltopsicon" viewBox="0 0 16 16" onClick={handledlt}>
              < path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
            <svg width="20" height="20" fill="currentColor" className="bi bi-x-circle-fill dltopsicon" viewBox="0 0 16 16" onClick={() => setshowdlt(0)}>
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
            </svg>
          </div>
        </ListGroup.Item>
      </ListGroup>}
      {showdlt === 2 && <ListGroup>
        <ListGroup.Item>
          <Card.Text>Ensure to remove all rooms</Card.Text>
        </ListGroup.Item>
      </ListGroup>}
      {showdlt === 3 && <ListGroup>
        <ListGroup.Item>
          <Card.Text>this house is deleted</Card.Text>
        </ListGroup.Item>
      </ListGroup>}


      <div className='roomops'>
        <span className='gray'>Rooms</span>
        <svg width="16" height="16" fill="currentColor" className="bi bi-plus-circle roomadd" viewBox="0 0 16 16" onClick={() => setshowadd(true)}>
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
        </svg>
        <Modal show={showadd} onHide={() => setshowadd(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Adding room to House No: {prop.data.id} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            address to displayed: {prop.data.address} .Except the room Nubmer and area all can be changed later
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Room No</Form.Label>
                <Form.Control onChange={(x) => setroomno(x.target.value)} type="number" placeholder="Eg : 113 (1 for first floor and 13 is for room)" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Area</Form.Label>
                <Form.Control onChange={(x) => setarea(x.target.value)} type="number" placeholder="Eg : 1000 (in square feet)" />
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label>Rent</Form.Label>
                <Form.Control onChange={(x) => setrent(x.target.value)} type="number" placeholder="Eg : 1000 (rent per month)" />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Beds</Form.Label>
                <Form.Control onChange={(x) => setbeds(x.target.value)} type="number" placeholder="Enter number of beds" />
                <Form.Text className="text-muted">
                  Finish setup in room page
                </Form.Text>
              </Form.Group>

              <button onClick={handleaddroom}>
                Add
              </button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>

      <ListGroup className="list-group-flush">
        {prop.data.rooms.map((x, index) => {
          return <ListGroup.Item className='roomcol'
            onClick={() => handleViewRoom(x)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            key={x.roomNo}>
            <div>
              <span className='gray'>room no</span>
              <Card.Text>{x.roomNo}</Card.Text>
              {x.amenities.length === 0 && x.images.length === 0 && <Badge bg="secondary">Finsh setup</Badge>}
            </div>
            <svg width="20" height="20" fill="currentColor" className={`bi bi-arrow-right viewarr ${hoveredItem === index ? 'viewhovered' : ''}`} viewBox="0 0 16 16" >
              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
            </svg>
          </ListGroup.Item>
        })}
      </ListGroup>
    </Card>
  )
}