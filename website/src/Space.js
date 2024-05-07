import { useEffect, useState } from "react";

const Curtain = () => {

    const [stars, setStars] = useState();
    
    useEffect(() => {
        var createStars = []
        for(let i = 0; i < 180; i++){
            const size = Math.ceil(Math.random() * 3) + 2
            const x = Math.ceil(Math.random() * window.innerWidth);
            const y = Math.ceil(Math.random() * window.innerHeight);
            createStars.push({x: x, y: y, size: `${size}px`})
        }
        setStars(createStars)
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