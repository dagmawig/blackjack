import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { addDeck, updateDeckArray, updatePot } from './stateSlice';
import './home.css';
import Card from './card';
import Deck from './deck';

function Home() {
    // defining selector to import user state from redux store
    const stateSelector = useSelector((state) => state.black);

    // defining dispatch to send updated user state to redux store
    const dispatch = useDispatch();
     
   
    let deckInstance = new Deck()
    //dispatch(addDeck(new Deck()));
    
    //let deckArray = stateSelector.deckArray;
    //dispatch(updateDeckArray(deckInstance.getDeck))
    let pot = stateSelector.pot;
    let deckArray = stateSelector.deckArray;
    //dispatch(updateDeckArray(deckInstance.getDeck()));
    
    function deal() {
        //pot[0].push(deckInstance.deal());
        dispatch(updatePot({ ...pot, pot0: pot.pot0.concat( [deckInstance.deal()] ) }))
        console.log(pot);
    }

    let deck = deckArray.map((card, index) => {
        return (
                <Card card={card} key={index+'card'} />
        )
    })
    //console.log(deckInstance.getDeck())
    let pot0 = pot.pot0.map((card, i) => {
        return (
            <Card card={card} key={i+'p0card'} />
        )
    })
    let pot1 = pot.pot1.map((card, i) => {
        return (
            <Card card={card} key={i+'p1card'} />
        )
    }) 

  
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