import React from 'react';
import './home.css';
import Card from './card';
import Deck from './deck';
import Bank from './bank';
import Pot from './pot';
import { getArray } from './bank';


function Double(props) {
    let pots = props.pots;
    if (pots[props.hand] <= props.bank) {
        return (
            <button className="btn btn-success col-4" >(2X)Double </button>
        )
    }
    else return null;
}
function Action(props) {
    if (props.deal) {
        return (
            <><button className="btn btn-success col-3" onClick={props.hit}><i className="fa fa-plus-square-o" aria-hidden="true"></i> Hit</button> <Double pots={props.pots} hand={props.hand} bank={props.bank} /> <button className="btn btn-success col-4" onClick={props.stand}><i className="fa fa-hand-paper-o" aria-hidden="true"></i> Stand </button></>
        )
    }
    else return null;
}

let initialState = {
    deckInstance: new Deck(),
    hand: { handP1: [], handP2: [], handH: [] },
    bank: 900,
    pot1: 100,
    pot2: 0,
    pArray: [100],
    gameStatus: {
        deal: false,
        split: false,
        hand: 1,
    }
};

class Home2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = initialState;
        this.deal = this.deal.bind(this);
        this.getVal = this.getVal.bind(this);
        this.sameVal = this.sameVal.bind(this);
        this.isSplit = this.isSplit.bind(this);
        this.split = this.split.bind(this);
        this.nextRound = this.nextRound.bind(this);
        this.compareHand = this.compareHand.bind(this);
        this.revealHand = this.revealHand.bind(this);
        this.hit = this.hit.bind(this);
        this.bet = this.bet.bind(this);
        this.allIn = this.allIn.bind(this);
        this.clearBet = this.clearBet.bind(this);
        this.remove = this.remove.bind(this);
        this.stand = this.stand.bind(this);
    }

    bet(e) {
        let betMoney = parseInt(e.currentTarget.value);
        this.setState((state, props) => ({ ...state, bank: (state.bank - betMoney), pot1: (state.pot1 + betMoney), pArray: [...state.pArray, betMoney] }));
    }
    allIn() {
        this.setState((state, props) => ({ ...state, bank: 0, pot1: (state.pot1 + state.bank), pArray: getArray(state.pot1 + state.bank) }));
    }
    clearBet() {
        this.setState((state, props) => ({ ...state, bank: (state.pot1 + state.bank), pot1: 0, pArray: [] }));
    }
    remove() {
        let chip = this.state.pArray[this.state.pArray.length - 1];
        this.setState((state, props) => ({ ...state, bank: (chip + state.bank), pot1: (state.pot1 - chip), pArray: state.pArray.slice(0, -1) }));
    }

    getVal(cardArr) {

        let hasAce = cardArr.some(card => {
            return card.num === 1;
        })
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
            return (maxVal.num <= 21) ? maxVal.num : minVal.num;
        }
    }

    sameVal(hand) {
        return hand[0].num === hand[1].num;
    }

    isSplit() {
        return this.state.gameStatus.deal && this.state.gameStatus.split === false && this.state.bank >= this.state.pot1 && this.state.hand.handP1.length === 2 && this.state.hand.handP2.length === 0 && this.sameVal(this.state.hand.handP1);
    }

    deal() {
        if (this.state.deckInstance.getDeck().length < 56) {
            this.setState((state, props) => ({ ...state, deckInstance: new Deck() }), () => {
                let cards = new Array(this.state.deckInstance.deal(true), this.state.deckInstance.deal(false), this.state.deckInstance.deal(true), this.state.deckInstance.deal(true));

                this.setState((state, props) => ({ ...state, hand: { ...state.hand, handP1: [cards[0], cards[2]], handH: [cards[1], cards[3]] }, gameStatus: { ...state.gameStatus, deal: true } }), () => {
                    if (this.getVal([cards[0], cards[2]]) === 21) {
                        setTimeout(() => {
                            alert("BLACKJACK!!");
                            this.revealHand();
                        }, 500)
                    }
                })
            })
        }
        else {
            let cards = new Array(this.state.deckInstance.deal(true), this.state.deckInstance.deal(false), this.state.deckInstance.deal(true), this.state.deckInstance.deal(true));

            this.setState((state, props) => ({ ...state, hand: { ...state.hand, handP1: [cards[0], cards[2]], handH: [cards[1], cards[3]] }, gameStatus: { ...state.gameStatus, deal: true } }), () => {
                if (this.getVal([cards[0], cards[2]]) === 21) {
                    setTimeout(() => {
                        alert("BLACKJACK!!");
                        this.revealHand();
                    }, 500)
                }
            })

        }


    }

    split() {

        let newHand = { ...this.state.hand, handP1: [this.state.hand.handP1[0]], handP2: [this.state.hand.handP1[1]] };
        let newBank = this.state.bank - this.state.pot1;
        let newPot = this.state.pot1;
        let newPArray = this.state.pArray.concat(getArray(this.state.pot1));

        this.setState((state, props) => ({ ...state, hand: newHand, bank: newBank, pot2: newPot, pArray: newPArray, gameStatus: { ...state.gameStatus, split: true } }), () => {
            setTimeout(() => {
                let newCard = this.state.deckInstance.deal(true);
                this.setState((state, props) => ({ ...state, hand: { ...state.hand, handP1: [...state.hand.handP1, newCard] } }), () => {
                    if (this.getVal(this.state.hand.handP1) === 21) {
                        setTimeout(() => {
                            alert("BLACKJACK!!");
                            let newCard = this.state.deckInstance.deal(true);
                            this.setState((state, props) => ({ ...state, gameStatus: { ...state.gameStatus, hand: 2 }, hand: {...state.hand, handP2: [...state.hand.handP2, newCard]} }), () => {
                                if (this.getVal(this.state.hand.handP2) === 21) {
                                    alert("BLACKJACK!!");
                                    this.revealHand();
                                }
                            });
                        }, 500)
                    }
                })
            }, 500)
        })
    }

    nextRound() {
        if (this.state.bank === 0) {
            alert("Game Over!!");
            this.setState({ ...initialState });
        }
        else {
            this.setState((state, props) => ({ ...state, hand: { ...initialState.hand }, pot1: 0, pot2: 0, pArray: [], gameStatus: { ...initialState.gameStatus } }))
        }
    }

    async compareHand(playerVal, dealerVal, handNum) {
        let pots = { 1: this.state.pot1, 2: this.state.pot2 };
        let actions = { 1: "1", 2: "2" };
        let P = await new Promise((resolve) => {
            if (dealerVal > playerVal) {
                if (dealerVal <= 21) {
                    alert(`Dealer wins against Hand${handNum}! You lose $${pots[handNum]}!`);
                    this.setState((state, props) => ({ ...state, ["pot" + actions[handNum]]: 0 }));

                    return resolve("loss");
                }
                else {
                    alert(`Dealer BUST! You win $${pots[handNum]} for Hand ${handNum}!`);
                    let newBank = this.state.bank + (2 * pots[handNum]);
                    this.setState((state, props) => ({ ...state, bank: newBank, ["pot" + actions[handNum]]: 0 }));

                    return resolve("dealer bust you win");
                }

            }
            else {
                if (dealerVal < 17) {
                    let newHand = this.state.hand.handH.concat([this.state.deckInstance.deal(true)]);
                    this.setState((state, props) => ({ ...state, hand: { ...state.hand, handH: newHand } }), () => {
                        setTimeout(() => {
                            let newDealerVal = this.getVal(newHand);
                            if (newDealerVal > 21) {
                                alert(`Dealer BUST! You win $${pots[handNum]} for Hand ${handNum}!`);
                                let newBank = this.state.bank + (2 * pots[handNum]);
                                this.setState((state, props) => ({ ...state, bank: newBank, ["pot" + actions[handNum]]: 0 }));

                                return resolve("dealer bust you win");
                            }
                            else {
                                return resolve(this.compareHand(playerVal, newDealerVal, handNum));
                            }
                        }, 500)

                    });

                }
                else if (dealerVal === playerVal) {
                    alert(`It's a push/tie for Hand ${handNum}! You keep $${pots[handNum]}!`);
                    let newBank = this.state.bank + pots[handNum];
                    this.setState((state, props) => ({ ...state, bank: newBank, ["pot" + actions[handNum]]: 0 }));

                    return resolve("tie");
                }
                else {
                    alert(`You win $${pots[handNum]} for Hand ${handNum}!`);
                    let newBank = this.state.bank + (2 * pots[handNum]);
                    this.setState((state, props) => ({ ...state, bank: newBank, ["pot" + actions[handNum]]: 0 }));

                    return resolve("win");

                }
            }
        })

        return P;

        // await new Promise(resolve => {
        //     setTimeout(resolve, 0)
        // })
    }

    revealHand() {
        this.setState((state, props) =>
            ({ ...state, hand: { ...state.hand, handH: [{ ...state.hand.handH[0], faceUp: true }, state.hand.handH[1]] } }), () => {

                let handHVal = this.getVal(this.state.hand.handH);
                let handP1Val = this.getVal(this.state.hand.handP1);
                let handP2Val = (this.state.hand.handP2.length) ? this.getVal(this.state.hand.handP2) : 0;

                setTimeout(() => {
                    if (this.state.gameStatus.split) {
                        if (this.state.pot1 === 0) {
                            this.compareHand(handP2Val, handHVal, 2).then((resp) => {
                                console.log(resp)
                                this.nextRound();
                            });
                        }
                        else if (this.state.pot2 === 0) {
                            this.compareHand(handP1Val, handHVal, 1).then((resp) => {
                                console.log(resp)
                                this.nextRound();
                            });
                        }
                        else {
                            this.compareHand(handP2Val, handHVal, 2).then(() => {
                                handHVal = this.getVal(this.state.hand.handH);
                                this.compareHand(handP1Val, handHVal, 1).then((resp) => {
                                    console.log(resp)
                                    this.nextRound();
                                });
                            });
                        }
                    }
                    else {
                        this.compareHand(handP1Val, handHVal, 1).then((resp) => {
                            console.log(resp)
                            this.nextRound();
                        });
                    }

                }, 500)
            });
    }

    hit() {
        if (this.state.gameStatus.split) {
            if (this.state.gameStatus.hand === 1) {
                let newHand = this.state.hand.handP1.concat([this.state.deckInstance.deal(true)]);
                this.setState((state, props) => ({ ...state, hand: { ...state.hand, handP1: newHand } }), () => {
                    console.log(this.state.hand.handP1)
                    if (this.getVal(newHand) > 21) {
                        setTimeout(() => {
                            alert(`Hand 1 BUST! You lose $${this.state.pot1}!`);
                            let newCard = this.state.deckInstance.deal(true);
                            this.setState((state, props) => ({ ...state, pot1: 0, gameStatus: { ...state.gameStatus, hand: 2 }, hand: { ...state.hand, handP2: [...state.hand.handP2, newCard] } }), () => {
                                if (this.getVal(this.state.hand.handP2) === 21) {
                                    setTimeout(() => {
                                        alert("BLACKJACK!!");
                                        this.revealHand();
                                    }, 500)
                                }
                            })
                        }, 500)

                    }
                    else if (this.getVal(newHand) === 21) {
                        setTimeout(() => {
                            alert(`You hit 21!`);
                            let newCard = this.state.deckInstance.deal(true);
                            this.setState((state, props) => ({ ...state, gameStatus: { ...state.gameStatus, hand: 2 }, hand: { ...state.hand, handP2: [...state.hand.handP2, newCard] } }), () => {
                                if (this.getVal(this.state.hand.handP2) === 21) {
                                    setTimeout(() => {
                                        alert("BLACKJACK!!");
                                        this.revealHand();
                                    }, 500)
                                }
                            })
                        }, 500)
                    }
                });

            }
            else if (this.state.gameStatus.hand === 2) {
                let newHand2 = this.state.hand.handP2.concat([this.state.deckInstance.deal(true)]);
                this.setState((state, props) => ({ ...state, hand: { ...state.hand, handP2: newHand2 } }), () => {
                    if (this.getVal(newHand2) > 21) {
                        setTimeout(() => {
                            alert(`Hand 2 BUST! You lose $${this.state.pot2}!`);
                            this.setState((state, props) => ({ ...state, pot2: 0 }), () => {
                                if (this.state.pot1) this.revealHand();
                                else {
                                    this.nextRound();
                                }
                            })
                        }, 500)

                    }
                    else if (this.getVal(newHand2) === 21) {
                        setTimeout(() => {
                            alert(`You hit 21!`);
                            this.revealHand();
                        }, 500)
                    }
                })
            }
        }
        else if (this.state.gameStatus.split === false) {
            let newHand = this.state.hand.handP1.concat([this.state.deckInstance.deal(true)]);
            this.setState((state, props) => ({ ...state, hand: { ...state.hand, handP1: newHand } }), () => {
                if (this.getVal(newHand) > 21) {
                    setTimeout(() => {
                        alert(`Hand 1 BUST! You lose $${this.state.pot1}!`);
                        this.setState((state, props) => ({ ...state, pot1: 0 }), () => {
                            this.nextRound();
                        });
                    }, 500)
                }
                else if (this.getVal(newHand) === 21) {
                    setTimeout(() => {
                        alert(`You hit 21!`);
                        this.revealHand();
                    }, 500)
                }
            });
        }
    }

    stand() {
        if (!this.state.gameStatus.split) {
            this.revealHand();
        }
        else {
            if (this.state.gameStatus.hand === 2) this.revealHand();
            else {
                let newCard = this.state.deckInstance.deal(true);
                this.setState((state, props) => ({ ...state, gameStatus: { ...state.gameStatus, hand: 2 }, hand: { ...state.hand, handP2: [...state.hand.handP2, newCard] } }), () => {
                    if (this.getVal(this.state.hand.handP2) === 21) {
                        setTimeout(() => {
                            alert("BLACKJACK!!");
                            this.revealHand();
                        }, 500)
                    }
                });
            }
        }
    }

    render() {

        let handP1 = this.state.hand.handP1.map((card, i) => {
            return (
                <Card card={card} key={i + 'p0card'} />
            )
        });
        let handP2 = this.state.hand.handP2.map((card, i) => {
            return (
                <Card card={card} key={i + 'p1card'} />
            )
        });
        let handH = this.state.hand.handH.map((card, i) => {
            return (
                <Card card={card} key={i + 'p1card'} />
            )
        });

        return (
            <div className="home container">
                <div className="home-items">
                    <div className="deck-row row">
                        <div className="deck-pic col-2">
                            <img alt="deck dummy" width={30} height={35} src={"/images/dummy.png"} />
                        </div>
                        <div className="total-number col-3" style={{ color: "white" }}>
                            {this.state.deckInstance.getDeck().length}
                        </div>
                    </div>
                    <div className="dealer-hand-row row">
                        <div className="dealer-hand-title col-12">
                            DEALER'S HAND
                        </div>
                        <div className="dealer-hand-card col-6">
                            <div className="dealer-cards" style={{ width: 61.5 + (this.state.hand.handH.length - 1) * 11.5 }}>{handH}</div>
                            {(this.state.hand.handH.length && this.state.hand.handH[0].faceUp) ? (<div className="dealer-hand-total">
                                TOTAL: {this.getVal(this.state.hand.handH)}
                            </div>) : null}
                        </div>
                    </div>
                    <div className="player-hand-row row">
                        <div className="player-hand-title col-12">
                            PLAYER'S HAND
                        </div>
                        <div className="player-hand-card col-6">
                            {handP1}
                            {(this.state.hand.handP1.length) ? (<div className="player-hand-total">
                                TOTAL: {this.getVal(this.state.hand.handP1)}
                            </div>) : null}
                            {(this.state.hand.handP1.length) ? (<div className="player-hand-value">
                                VALUE: {(this.getVal(this.state.hand.handP1)<=21)? <span>${this.state.pot1}</span> : <span>BUST!</span>}
                            </div>) : null}
                        </div>
                        <div className="player-hand-card col-6">
                            {handP2}
                            {(this.state.hand.handP2.length) ? (<div className="player-hand-total">
                                TOTAL: {this.getVal(this.state.hand.handP2)}
                            </div>) : null}
                            {(this.state.hand.handP2.length) ? (<div className="player-hand-value">
                                VALUE: {(this.getVal(this.state.hand.handP2)<=21)? <span>${this.state.pot2}</span> : <span>BUST!</span>}
                            </div>) : null}
                        </div>
                    </div>
                    <div className="action-row row">
                        {(!this.state.gameStatus.deal && this.state.pot1) ? (<button className="btn btn-info col-3" onClick={this.deal}>Deal</button>) : null}
                        <Action pots={{ 1: this.state.pot1, 2: this.state.pot2 }} hand={this.state.gameStatus.hand} bank={this.state.bank} deal={this.state.gameStatus.deal} hit={this.hit} stand={this.stand} />
                        {(this.isSplit()) ? <button className="splt-btn btn btn-success col-7" onClick={this.split} >Split</button> : null}
                    </div>
                    <div className="pot-row row">
                        {(!this.state.gameStatus.deal) ? (<Pot bank={this.state.bank} pot={this.state.pot1} pArray={this.state.pArray} remove={this.remove} />) :
                            <>
                                <div className="pot-title col-4">
                                    <b>Pot:</b> ${this.state.pot1 + this.state.pot2}
                                </div>
                                <div className="bank-total-text col-4">
                                    <b>Bank:</b> ${this.state.bank}
                                </div>
                            </>}
                    </div>
                </div>
                <div className="footer row">
                    {(!this.state.gameStatus.deal) ? (<Bank bank={this.state.bank} pot={this.state.pot1} pArray={this.state.pArray} allIn={this.allIn} clearBet={this.clearBet} bet={this.bet} />) :
                        null}
                </div>
            </div>
        )
    }
}

export default Home2;