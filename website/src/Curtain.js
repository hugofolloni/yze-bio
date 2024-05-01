import { useEffect, useState } from "react";
import styled, {keyframes} from "styled-components";

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

    const CurtainKeyframe = keyframes`
        0% { 
            background-color: #090015;
            opacity: 1;
            z-index: 4;
        }     
        50% {
            background-color: #090015;
            opacity: 1;
            z-index: 4;
        }
        100% {
            opacity: 0;  
            z-index: -2;
        }
    `
    const Curtain = styled.div`
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
        animation: ${CurtainKeyframe} 5s ease forwards;
    `
    const starKeyframe = keyframes`
        0% { 
            background-color: #2f2f2f;
        } 
        100% {
            display: none;
        }
    `
    const Star = styled.div`
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0; 
        animation: ${starKeyframe} 5s ease forwards;
    `
    const StarWrapper = styled.div`
        position: relative;
        width: 100%;
        height: 100%;
    `
    const RocketDivKeyframe = keyframes`
        to { 
            transform: translateY(60px);
        }
    `
    const RocketDiv = styled.div`
        width: 150px;
        heigth: 150px;
        position: absolute;
        top: 0;
        margin-top: calc(50vh - 100px);
        left: 0;
        animation: ${RocketDivKeyframe} 0.5s alternate infinite ease-in-out;
    `
    const RocketKeyframe = keyframes`
        0% {
            transform: translateX(-20vw);
        }
        30%, 50% {
            transform: translateX(calc(50vw - 75px))
        }
        100% {
            transform: translateX(120vw);
        }
    `
    const Rocket = styled.img`
        width: 100%;
        height: 100%;
        animation: ${RocketKeyframe} 4s infinite forwards ease-in-out;
    `

    return ( 
        <Curtain>
            <StarWrapper>
                {stars && stars.map((item) => (
                    <Star style={{  marginLeft: item.x + 'px',  marginTop: item.y + "px",  width: item.size,  height: item.size }} />
                ))}
            </StarWrapper>
            <RocketDiv>
                <Rocket src="https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/1f680.svg" />
            </RocketDiv>
        </Curtain>
     );
}
 
export default Curtain;