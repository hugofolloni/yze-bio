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
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
`

const Card = () => {

    const username = window.location.href.split('3000/')[1]

    const [data, setData] = useState({status: 999})
    const [pageBackgroundColor, setPageBackgroundColor] = useState("#eaeaea")

    useEffect(() => {
        fetch(`https://localhost:7041/api/Nickname?nickname=${username}`)
        .then(res => res.json())
        .then(data => {
            if(data.status !== 400 && data.status !== 404){
                setPageBackgroundColor(data.layout.pageBackgroundColor)
                setData(data);  
            }   
            else{
                console.log("NOT FOUND")
            }
        })
    }, [username])


    return ( 
        <Wrapper pageBackgroundColor={pageBackgroundColor}>
            <Curtain />
            {(
                data.layout
                    && 
                <CardDiv>
                    <Basic data={data}/>
                </CardDiv>) 
                    || 
                <div className="sorry">
                    <span style={{color:'#1c1c1c'}}>Sorry, this card does not exist. You can create this page right <a href="/create">here.</a></span>
                </div>
            }
            <div className="footer">
                <span>Created with <a href="/">yze.bio</a></span>
            </div>
        </Wrapper>
     );
}
 
export default Card;