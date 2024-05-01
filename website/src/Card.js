import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Curtain from './Curtain';

const Card = () => {

    const [borderRadius, setBorderRadius] = useState('0')
    const [backgroundColor, setBackgroundColor] = useState('black')

    useEffect(() => {
        fetch('https://localhost:7041/api/Layout')
        .then(res => res.json())
        .then(data => {
            const item = data[0]
            setBorderRadius(item.borderRadius);
            setBackgroundColor(item.backgroundColor);
        });
    })

    const Wrapper = styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        background-color: #eaeaea;
        position: relative;
        z-index: 1;
    `

    const CardDiv = styled.div`
        display: flex;
        align-items: center;
        width: 700px;
        height: 400px;
        background-color: ${backgroundColor};
        border-radius: ${borderRadius}px;
        z-index: 2;
    `

    return ( 
        <Wrapper className="card-wrapper">
            <Curtain />
            <CardDiv className='card-div'>
                <a href="https://hugofolloni.netlify.app" target='_blank' rel='noreferrer'>Hugo</a>
                🚀
            </CardDiv>
        </Wrapper>
     );
}
 
export default Card;