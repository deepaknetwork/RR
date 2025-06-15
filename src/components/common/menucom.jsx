import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './menucom.css';
import { Link, useNavigate } from 'react-router-dom';
import { getBaseUrl } from '../../utils/api';
export default function MenuCommon() {
  var navigate = useNavigate();
  function handleSignin() {
    navigate('/RR/login')
  }
  function handleSignup() {
    navigate('/RR/signup')
  }
  return (
    <Navbar key={false} expand={false} className="bg-body-tertiary">
      <Container fluid>
        <div className='mainicon'>
          <img className='iconimg' src={`${getBaseUrl()}common/roomireserve/image/rricon`} alt='' />
          <Navbar.Brand>RoomieReserve</Navbar.Brand>
        </div>
        <div className="main1">
          {<Link className='signa' to="/RR/login">signin</Link>}
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
        </div>
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${false}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
              Get started
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3 navguest">
              <img src="images/menusign.png" alt='' />
              <button className='sbtn' onClick={handleSignin}>Signin</button>
              <button className='sbtn' onClick={handleSignup}>Signup</button>
            </Nav>

          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>)
}