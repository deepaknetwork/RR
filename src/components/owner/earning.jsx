import { useState } from 'react';
import './earning.css';

export default function Earning(prop) {
    var [month, setMonth] = useState(new Date().getMonth())
    var total = 0
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var earn = []
    prop.data.map((x) => {
        total = total + x.rent
    })
    for (var i = 0; i <= new Date().getMonth(); i++) {
        var val = 0;
        prop.data.map((x) => {
            if (new Date().getFullYear() === new Date(x.date).getFullYear()) {
                if (new Date(x.date).getMonth() === i) {
                    val = val + x.rent
                }
            }
        })
        earn.push(val);
    }

    return (
        <div className='earn row'>
            <div className='earn1 col-10 col-lg-4'>
                <span className='earnlab'>Total</span>
                <span className='earnval'>{total}</span>
            </div >
            <div className='earn2 col-10 col-lg-4'>
                <div className='larr' onClick={() => {
                    if (month > 0) {
                        setMonth(month - 1)
                    }
                }}>
                    <svg width="16" height="16" fill="currentColor" className="bi bi-chevron-compact-left arr" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223" />
                    </svg>
                </div>
                <div className='earn211'>
                    <span className='earnlab'>{months[month]}</span>
                    <span className='earnval'>{earn[month]}</span>
                </div>
                <div className='rarr'
                    onClick={() => {
                        if (month <= new Date().getMonth() - 1) {
                            setMonth(month + 1)
                        }
                    }}>
                    <svg width="16" height="16" fill="currentColor" className="bi bi-chevron-compact-right arr" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671" />
                    </svg>
                </div>
            </div>
        </div>
    )
}