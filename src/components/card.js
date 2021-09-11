import './card.css'
import React from 'react';

function Card(props) {
    let id = props.card.value + props.card.suit;
    let faceUp = props.card.faceUp;
    let opacity = props.opacity;
    return (faceUp)? (
        <img alt='card' className="play-card" width={61.5} height={87.8} src={"/images/"+id+".png"} style={{opacity: opacity}} ></img>
    ) : (
    <img alt='card' className="play-card" width={61.5} height={87.8} src={"/images/back.png"} ></img>
    );
};

export default Card;