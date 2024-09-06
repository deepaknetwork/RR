
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { getName, removeUserData } from '../../utils/auth';
import './menuguest.css';
import { getBaseUrl } from '../../utils/api';
import { Link, useNavigate } from 'react-router-dom';
export default function MenuGuest() {
  var nav=useNavigate();
  function handleLogout() {
    removeUserData();
    nav("/RR/login")
  }
  return (
    <Navbar key={false} expand={false} className="bg-body-tertiary mb-3">
      <Container fluid>
        <div className='mainicon'>
          <img className='iconimg' src={`${getBaseUrl()}common/roomireserve/image/rricon`} alt='' />
          <Navbar.Brand >RoomieReserve</Navbar.Brand>
        </div>
        <div className="main1">
          {<Navbar.Text className='navname' >{getName()}</Navbar.Text>}
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
        </div>
        <Navbar.Offcanvas className='nav'
          id={`offcanvasNavbar-expand-${false}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
          placement="end"
        >
          <Offcanvas.Header closeButton >
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
              Guest
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Link to="/RR/home">Home</Link>
              <Link to="/RR/booking">My Bookings</Link>
              <Link to="/RR/profile">Profile</Link>
              <button className='sbtn logoutbutton' onClick={handleLogout}>Logout</button>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>)
}