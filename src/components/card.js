import './card.css'
import React from 'react';


// function that returns a playing card component.
function Card(props) {
    let id = props.card.value + props.card.suit;
    let faceUp = props.card.faceUp;
    let opacity = props.opacity;
    return (faceUp)? (
        <img alt='card' className="play-card" width={61.5} height={87.8} src={process.env.PUBLIC_URL +"/images/"+id+".png"} style={{opacity: opacity}} ></img>
    ) : (
    <img alt='card' className="play-card" width={61.5} height={87.8} src={process.env.PUBLIC_URL +"/images/back.png"} ></img>
    );
};

export default Card;