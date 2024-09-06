import { useEffect, useState } from 'react';
import { getBaseUrl } from '../../utils/api';
import './imgbox.css';

export default function ImgBox(prop) {
    var [imgurl, setimgurl] = useState(`${getBaseUrl()}common/image/${prop.data[0]}`)
    useEffect(() => {
        setimgurl(`${getBaseUrl()}common/image/${prop.data[0]}`)
    }, [prop])
    return (
        <div className='container'>
            <div className='imgDiv row'>
                <div className='mainImgDiv col-12 col-lg-7'>
                    <img className='mainImg' src={imgurl} alt='' />
                </div>
                <div className='subImgDiv col-12 col-lg-2'>
                    {prop.data.map((x, index) => {
                        const url = getBaseUrl() + "common/image/" + x
                        return <img key={index} className='subImg' src={url} onClick={(x) => setimgurl(x.target.src)}></img>
                    })}
                </div>
            </div>
        </div>
    )
}