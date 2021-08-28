import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
        let cardM = { ...card, faceUp: true }
        return (
            <Card card={cardM} key={index + 'card'} />
        )
    })
    let handP1 = hand.handP1.map((card, i) => {
        return (
            <Card card={card} key={i + 'p0card'} />
        )
    })
    let handP2 = hand.handP2.map((card, i) => {
        return (
            <Card card={card} key={i + 'p1card'} />
        )
    })
    let handH = hand.handH.map((card, i) => {
        return (
            <Card card={card} key={i + 'p1card'} />
        )
    })

    return (
        <div className="home container">
            <div className="home-items">
                <div className="deck-row row">
                    <div className="deck-pic col-2">
                        <img alt="deck dummy" width={30} height={35} src={"/images/dummy.png"} />
                    </div>
                    <div className="total-number col-3" style={{ color: "white" }}>
                        {deckArray.length}
                    </div>
                </div>
                <div className="dealer-hand-row row">
                    <div className="dealer-hand-title col-12">
                        DEALER'S HAND
                    </div>
                    <div className="dealer-hand-card col-12">
                        {handH}
                    </div>
                </div>
                <div className="player-hand-row row">
                    <div className="player-hand-title col-12">
                        PLAYER'S HAND
                    </div>
                    <div className="player-hand-card col-12">
                        {handP1}
                    </div>
                </div>
                <div className="action-row row">
                    <button className="btn btn-info" onClick={deal}>Deal</button>
                </div>
                <div className="pot-row row">
                    <Pot bank={stateSelector.bank} pot={stateSelector.pot} pArray={stateSelector.pArray} />
                </div>
            </div>
            <div className="footer row">
                <Bank bank={stateSelector.bank} pot={stateSelector.pot} pArray={stateSelector.pArray} />
            </div>
        </div>
    )
}

export default Home;