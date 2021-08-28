import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { updateDeckArray, dealHand, deckInstance } from './stateSlice';
import './home.css';
import Card from './card';
import Deck from './deck';
import Bank from './bank';
import Pot from './pot';
function Home() {
    // defining selector to import user state from redux store
    const stateSelector = useSelector((state) => state.black);

    // defining dispatch to send updated user state to redux store
    const dispatch = useDispatch();
     
   
    let hand = stateSelector.hand;
    let deckArray = stateSelector.deckArray;
    
    function deal() {
        let cards = new Array(deckInstance.deal(true), deckInstance.deal(false), deckInstance.deal(true), deckInstance.deal(true));
        dispatch(dealHand(cards))

        //console.log(hand);
    }

    let deck = deckArray.map((card, index) => {
        let cardM = {...card, faceUp: true}
        return (
                <Card card={cardM} key={index+'card'} />
        )
    })
    let handP1 = hand.handP1.map((card, i) => {
        return (
            <Card card={card} key={i+'p0card'} />
        )
    })
    let handP2 = hand.handP2.map((card, i) => {
        return (
            <Card card={card} key={i+'p1card'} />
        )
    }) 
    let handH = hand.handH.map((card, i) => {
        return (
            <Card card={card} key={i+'p1card'} />
        )
    }) 
  
    return (
        <div className="home_container">
            <div className="deck-count row">
                <div className="total-number col-4">
                    {deckArray.length}
                </div>
                <div className="deck-pic col-4">
                    <img alt="deck dummy" width={25} height={35} src={"/images/dummy.png"}/>
                </div>
            </div>
            <button className="btn btn-info" onClick={deal}>Deal</button>
            <div className="potH">
                {handH}
            </div>
            <div className="potP">
                {handP1}
            </div>
            <Pot bank={stateSelector.bank} pot={stateSelector.pot} pArray={stateSelector.pArray}/>
            <Bank bank={stateSelector.bank} pot={stateSelector.pot} pArray={stateSelector.pArray}/>
        </div>
    )
}

export default Home;