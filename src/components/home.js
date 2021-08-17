import React, { useState, useEffect } from 'react';
import './home.css';
import Card from './card';
import Deck from './deck';

function Home() {

    let deckInstance = new Deck();
    const [deckArray, setArray] = useState(deckInstance.getDeck);
    const [pot, setPot] = useState([ [], [] ]);

    function deal() {
        pot[0].push(deckInstance.deal());
        
        console.log(pot);
    }

    let deck = deckArray.map((card, index) => {
        return (
                <Card card={card} key={index+'card'} />
        )
    })
    let pot0 = pot[0].map((card, i) => {
        return (
            <Card card={card} key={i+'p0card'} />
        )
    })
    let pot1 = pot[1].map((card, i) => {
        return (
            <Card card={card} key={i+'p1card'} />
        )
    }) 

    useEffect(()=> {
        console.log(deckInstance.getDeck);
    }, [deckArray])
    return (
        <div className="home_container">
            {deck}
            <button onClick={deal}>Deal</button>
            <div className="pot">
                {pot0}
            </div>
        </div>
    )
}

export default Home;