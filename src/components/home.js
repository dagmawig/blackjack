import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateDeckArray, dealHand, deckInstance, updateStatus, updateSplit, updateHand, updatePot1, updatePot2, resetState, updatePArray, flipCard, updateBank } from './stateSlice';
import './home.css';
import Card from './card';
import Deck from './deck';
import Bank from './bank';
import Pot from './pot';
import { getArray } from './bank';

function Double(props) {
    let pots = props.pots;
    if(pots[props.hand] <= props.bank) {
        return (
            <button className="btn btn-success col-4" >(2X)Double </button> 
        )
    }
    else return null;
}
function Action(props) {
    if(props.deal) {
        return (
            <><button className="btn btn-success col-3" ><i className="fa fa-plus-square-o" aria-hidden="true"></i> Hit</button> <Double pots={props.pots} hand={props.hand} bank={props.bank} /> <button className="btn btn-success col-4" ><i className="fa fa-hand-paper-o" aria-hidden="true"></i> Stand </button></>
        )
    }
    else return null;
}

function Home() {
    // defining selector to import user state from redux store
    const stateSelector = useSelector((state) => state.black);

    // defining dispatch to send updated user state to redux store
    const dispatch = useDispatch();

    let { deckArray, hand, bank, pot1, pot2, pArray, gameStatus } = stateSelector;


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
        return gameStatus.deal && gameStatus.split === false && bank >= pot1 && hand.handP1.length === 2 && hand.handP2.length === 0 /*&& sameVal(hand.handP1)*/;
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
        let newBank = bank - pot1;
        let newPot = pot1;
        let newPArray = pArray.concat(getArray(pot1));

        dispatch(updateSplit([newHand, newBank, newPot, newPArray]));
    }

    function nextRound() {
        if (bank === 0) {
            alert("Game Over!!");
            dispatch(resetState());
        }
        else {
            dispatch(updateHand({ handP1: [], handP2: [], handH: [] }));
            dispatch(updatePot1(0));
            dispatch(updatePot2(0));
            dispatch(updatePArray([]));
            dispatch(updateStatus({
                deal: false,
                split: false,
                hand: 1,
            }))
        }
    }

    function compareHand(playerVal, dealerVal, handNum) {
        let pots = { 1: pot1, 2: pot2 };
        let actions = { 1: updatePot1, 2: updatePot2 };

        if (dealerVal > playerVal) {
            alert(`Hand ${handNum} BUST! You lose $${pots[handNum]}!`)
            dispatch(actions[handNum](0));
        }
        else {
            if (dealerVal < 17) {
                let newHand = hand.handH.concat([deckInstance.deal(true)]);
                dispatch(updateHand({ ...hand, handH: newHand }));
                let newDealerVal = getVal(newHand);
                if (newDealerVal > 21) {
                    alert(`Dealer BUST! You win $${pots[handNum]} for Hand ${handNum}!`);
                    let newBank = bank + (2 * pots[handNum]);
                    dispatch(updateBank(newBank));
                    dispatch(actions[handNum](0));
                }
                else {
                    compareHand(playerVal, getVal(newHand), handNum);
                }
            }
            else if (dealerVal === playerVal) {
                alert(`It's a push/tie for Hand ${handNum}! You keep $${pots[handNum]}!`);
                let newBank = bank + pots[handNum];
                dispatch(updateBank(newBank));
                dispatch(actions[handNum](0));
            }
            else {
                alert(`You win $${pots[handNum]} for Hand ${handNum}!`);
                let newBank = bank + (2 * pots[handNum]);
                dispatch(updateBank(newBank));
                dispatch(actions[handNum](0));
            }
        }
    }

    function revealHand() {
        dispatch(flipCard());
        let handHVal = getVal(hand.handH);
        let handP1Val = getVal(hand.handP1);
        let handP2Val = getVal(hand.handP2);

        if (gameStatus.split) {
            if (pot1 === 0) {
                compareHand(handP2Val, handHVal, 2);
            }
            else if (pot2 === 0) {
                compareHand(handP1Val, handHVal, 1);
            }
            else {
                compareHand(handP2Val, handHVal, 2);
                handHVal = getVal(hand.handH);
                compareHand(handP1Val, handHVal, 1);
            }
        }
        else {
            compareHand(handP1Val, handHVal, 1);
        }
        nextRound();
    }

    function hit() {
        if (gameStatus.split) {
            if (gameStatus.hand === 1) {
                let newHand = hand.handP1.concat([deckInstance.deal(true)]);
                dispatch(updateHand({ ...hand, handP1: newHand }));

                if (getVal(newHand) > 21) {
                    alert(`Hand 1 BUST! You lose $${pot1}!`);
                    dispatch(updatePot1(0));
                    dispatch(updateStatus({ ...gameStatus, hand: 2 }));
                }
                else if (getVal(newHand) === 21) {
                    alert(`You hit 21!`);
                    dispatch(updateStatus({ ...gameStatus, hand: 2 }));
                }

            }
            else if (gameStatus.hand === 2) {
                let newHand2 = hand.handP2.concat([deckInstance.deal(true)]);
                dispatch(updateHand({ ...hand, handP2: newHand2 }));

                if (getVal(newHand2) > 21) {
                    alert(`Hand 2 BUST! You lose $${pot2}!`);
                    dispatch(updatePot2(0));
                    if (pot1) revealHand();
                    else {
                        nextRound();
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
                alert(`Hand 1 BUST! You lose $${pot1}!`);
                dispatch(updatePot1(0));

                nextRound();
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
                    {(!gameStatus.deal && pot1) ? (<button className="btn btn-info col-3" onClick={deal}>Deal</button>) : null}
                    <Action pots={{1: pot1, 2: pot2}} hand={gameStatus.hand} bank={bank} deal={gameStatus.deal} />
                    {(isSplit()) ? <button className="splt-btn btn btn-success col-7" onClick={split} >Split</button> : null}
                </div>
                <div className="pot-row row">
                    {(!gameStatus.deal) ? (<Pot bank={bank} pot={pot1} pArray={pArray} />) :
                        <>
                            <div className="pot-title col-4">
                                <b>Pot:</b> ${pot1 + pot2}
                            </div>
                            <div className="bank-total-text col-4">
                                <b>Bank:</b> ${bank}
                            </div>
                        </>}
                </div>
            </div>
            <div className="footer row">
                {(!gameStatus.deal) ? (<Bank bank={bank} pot={pot1} pArray={pArray} />) :
                    null}
            </div>
        </div>
    )
}

export default Home;