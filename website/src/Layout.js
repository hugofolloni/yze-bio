import styled from 'styled-components';

const LayoutStyled = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 20px;
    background-color: ${props => props.layout.cardBackgroundColor};
    border-radius: ${props => props.layout.borderRadius}px;
`

const Title = styled.span`
    font-size: 32px;
    font-family: ${props => props.layout.fontFamily};
    color: ${props => props.layout.titleColor};
    font-weight: 700;
    margin-bottom: 10px;
`

const Subtitle = styled.span`
    margin-bottom: 20px;
    font-weight: 600;
    color: ${props => props.layout.fontColor};
`

const Description = styled.span`
    color: ${props => props.layout.fontColor};
`

const Basic = (props) => {

    console.log(props.data.links)
    return (  
        <LayoutStyled layout={props.data.layout}>
            <Title layout={props.data.layout}>{props.data.title}</Title>
            <Subtitle layout={props.data.layout}>{props.data.subtitle}</Subtitle>
            <Description layout={props.data.layout}>{props.data.description}</Description>
            {
               props.data.links.map(item => (
                    <a href={item.value} target="_blank" rel='noreferrer'>{item.type}</a>
               ))
            }
            {
                props.data.interests !== null && (
                    props.data.interests.map(item => (
                        <span className="interest">{item.emoji} {item.interest}</span>
                    ))
                )
            }
        </LayoutStyled>
        );
}
 
export { Basic };