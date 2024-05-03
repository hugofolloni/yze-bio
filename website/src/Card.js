import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Curtain from './Curtain';
import { Basic } from "./Layout"

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: ${props => props.pageBackgroundColor};
    position: relative;
    z-index: 1;
`

const CardDiv = styled.div`
    display: flex;
    width: 700px;
    height: 400px;
    z-index: 2;
`

const Card = () => {

    const username = window.location.href.split('3000/')[1]

    const [data, setData] = useState({status: 999})
    const [pageBackgroundColor, setPageBackgroundColor] = useState("#eaeaea")

    useEffect(() => {
        fetch(`https://localhost:7041/api/User/user-with-layout?nickname=${username}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.status !== 404){
                console.log(data.title)
                setPageBackgroundColor(data.layout.pageBackgroundColor)
                setData(data);
                console.log(data)
            }
        });
    }, [username])


    return ( 
        <Wrapper pageBackgroundColor={pageBackgroundColor}>
            <Curtain />
            {(data.status !== 404 && data.status !== 999 && 
                <CardDiv>
                    <Basic data={data}/>
                </CardDiv>) || 
                <div className="sorry">
                    <span>Sorry, this card does not exist.</span>
                </div>
            }
        </Wrapper>
     );
}
 
export default Card;