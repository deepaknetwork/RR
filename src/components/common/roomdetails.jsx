import { getId } from '../../utils/auth';
import './roomdetails.css';

export default function RoomDetail(prop) {
    return (
        <div className='container details'>
            {prop.data.owner.phone == getId() && <div className='roomown'>
                <span className='headings'>Its your room</span>
            </div>}
            <div className='row pricehead'>
                <div className='col-10 price1'>
                    <span className='renttag'>Rs </span>
                    <span className='rentvalue'>{prop.data.room.rent}</span>
                    <span className='renttag'>/day</span>
                </div>
            </div>

            <div>
                <div className='row condiv'>
                    <span className='col-5 label'>Address </span>
                    <span className='col-5 value'>{prop.data.house.address}</span>
                </div>
                <div className='row condiv'>
                    <span className='col-5 label'>Room No</span>
                    <span className='col-5 value'>{prop.data.room.roomNo}</span>
                </div>
                <div className='row condiv'>
                    <span className='col-5 label'>Area</span>
                    <span className='col-5 value'>{prop.data.room.area} Sq.feet</span>
                </div>
                <div className='row condiv'>
                    <span className='col-5 label'>Beds</span>
                    <span className='col-5 value'>{prop.data.room.beds}</span>
                </div>

            </div>
            <div>
                <span className='headings'>Aminites</span>
                {prop.data.room.amenities.map((x, index) => {
                    return (<div className='row condiv' key={index}>
                        <span className='col-5 label'>{x.name}</span>
                        <span className='col-5 value '>{x.count}</span>
                    </div>)
                })}
            </div>

            {prop.data.owner.phone != getId() && <div>
                <span className='headings'>Owner Details</span>
                <div className='row condiv'>
                    <span className='col-5 label' >Name</span>
                    <span className='col-5 value'>{prop.data.owner.name}</span>
                </div>
                <div className='row condiv'>
                    <span className='col-5 label' >Email</span>
                    <span className='col-5 value'>{prop.data.owner.email}</span>
                </div>
                <div className='row condiv'>
                    <span className='col-5 label' >Phone</span>
                    <span className='col-5 value'>{prop.data.owner.phone}</span>
                </div>
            </div>}
        </div>
    )
}