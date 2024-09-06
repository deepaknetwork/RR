import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './roomcardsm.css';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
import { getBaseUrl } from '../../utils/api';
export default function RoomCardSm(prop) {
  const nav = useNavigate()
  var imglist = []
  prop.data.images.map((img) => {
    imglist.push(`${getBaseUrl()}common/image/${img}`)
    return null
  })
  function handlereserve1() {
    nav(`/RR/room/${prop.data.houseNo}/${prop.data.roomNo}`)
  }
  return (
    <Card className='card1s' style={{ width: '18rem' }}>
      <Carousel controls={false} indicators={false} >
        {imglist.map((x, index) => {
          return <Carousel.Item key={index}>
            <Card.Img variant="top" src={x} className='imgs' />
          </Carousel.Item>
        })}
      </Carousel>
      <Card.Body>
        <div className='prices'><span>RS.</span><Card.Title>{prop.data.rent}</Card.Title><span>per day</span></div>
        <button className='btnn' onClick={handlereserve1}>check out </button>
      </Card.Body>
    </Card>
  )

}