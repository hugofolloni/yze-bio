import { useEffect, useState } from "react";
import { createStars } from './Utils'

const Curtain = () => {

    const [stars, setStars] = useState();
    
    useEffect(() => {
        setStars(createStars())
    }, [])

    return ( 
        <div className='background-wrapper'>
            <div className="star-wrapper">
                {stars && stars.map((item) => (
                    <div className='star' style={{  marginLeft: item.x + 'px',  marginTop: item.y + "px",  width: item.size,  height: item.size }} />
                ))}
            </div>
            <div className='rocket-div'>
                <img alt='Background rocket' className='background-rocket' src="https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/1f680.svg" />
            </div>
        </div>
     );
}
 
export default Curtain;