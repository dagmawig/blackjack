import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateDeckArray, dealHand, deckInstance, updateStatus, updateSplit, updateHand, updatePot, updatePot2, resetState, updatePArray, flipCard } from './stateSlice';
import './home.css';
import Card from './card';
import Deck from './deck';
import Bank from './bank';
import Pot from './pot';
import { getArray } from './bank';

function Home() {
    // defining selector to import user state from redux store
    const stateSelector = useSelector((state) => state.black);

    // defining dispatch to send updated user state to redux store
    const dispatch = useDispatch();


    let hand = stateSelector.hand;
    let deckArray = stateSelector.deckArray;
    let gameStatus = stateSelector.gameStatus;


    function getVal(cardArr) {

        let hasAce = cardArr.some(card => {
            return card.num === 1;
        })
        console.log(hasAce)
        let minVal = cardArr.reduce((prev, curr) => {
            return { num: prev.num + curr.num };
        })

        if (!hasAce) return minVal.num;
        else {
            let seenAce = false;
            let maxVal = cardArr.reduce((prev, curr, index) => {
                if (index === 1 && prev.num === 1) {
                    seenAce = true;
                    return { num: 11 + curr.num };
                }
                if (curr.num !== 1 || seenAce) return { num: prev.num + curr.num };
                else {
                    seenAce = true;
                    return { num: prev.num + 11 };
                }
            });
            console.log(maxVal)
            return (maxVal.num <= 21) ? maxVal.num : minVal.num;
        }
    }

    function sameVal(hand) {
        return hand[0].num === hand[1].num;
    }
    function isSplit() {
        return gameStatus.deal && gameStatus.split === false && stateSelector.bank > stateSelector.pot && hand.handP1.length === 2 && hand.handP2.length === 0 /*&& sameVal(hand.handP1)*/;
    }

    function deal() {
        if (deckArray.length < 56) dispatch(updateDeckArray([...deckInstance.getDeck()]));

        let cards = new Array(deckInstance.deal(true), deckInstance.deal(false), deckInstance.deal(true), deckInstance.deal(true));
        dispatch(dealHand(cards));
        dispatch(updateStatus({ ...gameStatus, deal: true }));
        //console.log(hand);
    }

    function split() {
        let newHand = { ...hand, handP1: [hand.handP1[0]], handP2: [hand.handP1[1]] };
        let newBank = stateSelector.bank - stateSelector.pot;
        let newPot = stateSelector.pot;
        let newPArray = stateSelector.pArray.concat(getArray(stateSelector.pot));

        dispatch(updateSplit([newHand, newBank, newPot, newPArray]));
    }

    function revealHand() {
        dispatch(flipCard());
        
        let handVal = getVal(hand.handH);
        while(handVal<=21) {
            
        }
    }

    function hit() {
        if (gameStatus.split) {
            if (gameStatus.hand === 0) {
                let newHand = hand.handP1.concat([deckInstance.deal(true)]);
                dispatch(updateHand({ ...hand, handP1: newHand }));

                if (getVal(newHand) > 21) {
                    alert(`Hand 1 BUST! You lose $${stateSelector.pot}!`);
                    dispatch(updatePot(0));
                    dispatch(updateStatus({ ...gameStatus, hand: 1 }));
                }
                else if (getVal(newHand) === 21) {
                    alert(`You hit 21!`);
                    dispatch(updateStatus({ ...gameStatus, hand: 1 }));
                }

            }
            else if (gameStatus.hand === 1) {
                let newHand2 = hand.handP2.concat([deckInstance.deal(true)]);
                dispatch(updateHand({ ...hand, handP2: newHand2 }));

                if (getVal(newHand2) > 21) {
                    alert(`Hand 2 BUST! You lose $${stateSelector.pot2}!`);
                    dispatch(updatePot2(0));
                    if (stateSelector.pot) revealHand();
                    else {
                        if (stateSelector.bank === 0) {
                            alert("Game Over!!");
                            dispatch(resetState());
                        }
                        else {
                            dispatch(updateHand({ handP1: [], handP2: [], handH: [] }));
                            dispatch(updatePot(0));
                            dispatch(updatePot2(0));
                            dispatch(updatePArray([]));
                            dispatch(updateStatus({
                                deal: false,
                                split: false,
                                hand: 0,
                            }))
                        }
                    }
                }
                else if (getVal(newHand2) === 21) {
                    alert(`You hit 21!`);
                    revealHand();
                }
            }
        }

        else if (gameStatus.split === false) {
            let newHand = hand.handP1.concat([deckInstance.deal(true)]);
            dispatch(updateHand({ ...hand, handP1: newHand }));

            if (getVal(newHand) > 21) {
                alert(`Hand 1 BUST! You lose $${stateSelector.pot}!`);
                dispatch(updatePot(0));

                if (stateSelector.bank === 0) {
                    alert("Game Over!!");
                    dispatch(resetState());
                }
                else {
                    dispatch(updateHand({ handP1: [], handP2: [], handH: [] }));
                    dispatch(updatePot(0));
                    dispatch(updatePot2(0));
                    dispatch(updatePArray([]));
                    dispatch(updateStatus({
                        deal: false,
                        split: false,
                        hand: 0,
                    }));
                }
            }
            else if (getVal(newHand) === 21) {
                alert(`You hit 21!`);
                revealHand();
            }
        }

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
                    <div className="dealer-hand-card col-6">
                        <div className="dealer-cards" style={{ width: 61.5 + (hand.handH.length - 1) * 11.5 }}>{handH}</div>

                    </div>
                </div>
                <div className="player-hand-row row">
                    <div className="player-hand-title col-12">
                        PLAYER'S HAND
                    </div>
                    <div className="player-hand-card col-6">
                        {handP1}
                    </div>
                    <div className="player-hand-card col-6">
                        {handP2}
                    </div>
                </div>
                <div className="action-row row">
                    {(!gameStatus.deal) ? (<button className="btn btn-info col-3" onClick={deal}>Deal</button>) :
                        ((stateSelector.pot <= stateSelector.bank) ?
                            (<><button className="btn btn-success col-3" ><i className="fa fa-plus-square-o" aria-hidden="true"></i> Hit</button> <button className="btn btn-success col-4" >(2X)Double </button> <button className="btn btn-success col-4" ><i className="fa fa-hand-paper-o" aria-hidden="true"></i> Stand </button></>) :
                            <><button className="btn btn-success col-3" ><i className="fa fa-plus-square-o" aria-hidden="true"></i> Hit</button><button className="btn btn-success col-4" ><i className="fa fa-hand-paper-o" aria-hidden="true"></i> Stand </button></>)}
                    {(isSplit()) ? <button className="splt-btn btn btn-success col-7" onClick={split} >Split</button> : null}
                </div>
                <div className="pot-row row">
                    {(!gameStatus.deal) ? (<Pot bank={stateSelector.bank} pot={stateSelector.pot} pArray={stateSelector.pArray} />) :
                        <>
                            <div className="pot-title col-4">
                                <b>Pot:</b> ${stateSelector.pot + stateSelector.pot2}
                            </div>
                            <div className="bank-total-text col-4">
                                <b>Bank:</b> ${stateSelector.bank}
                            </div>
                        </>}
                </div>
            </div>
            <div className="footer row">
                {(!gameStatus.deal) ? (<Bank bank={stateSelector.bank} pot={stateSelector.pot} pArray={stateSelector.pArray} />) :
                    null}
            </div>
        </div>
    )
}

export default Home;