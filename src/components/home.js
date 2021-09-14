import React from 'react';
import './home.css';
import Card from './card';
import Deck from './deck';
import Bank from './bank';
import Pot from './pot';
import { getArray } from './bank';

// function that returns the Double button component.
function Double(props) {
    let pots = props.pots;
    let hand = props.hand;
    let status = props.gameStatus.hand;
    if (pots[status] <= props.bank && hand["handP" + status].length === 2) {
        return (
            <button className="btn btn-success col-4" onClick={props.double} >(2X)Double </button>
        )
    }
    else return null;
}

// function that returns the set of Hit, Double and Stand button components.
function Action(props) {
    if (props.deal) {
        return (
            <><button className="btn btn-success col-3" onClick={props.hit}><i className="fa fa-plus-square-o" aria-hidden="true"></i> Hit</button> <Double pots={props.pots} gameStatus={props.gameStatus} hand={props.hand} bank={props.bank} double={props.double} /> <button className="btn btn-success col-4" onClick={props.stand}><i className="fa fa-hand-paper-o" aria-hidden="true"></i> Stand </button></>
        )
    }
    else return null;
}

// initial state of the game.
let initialState = {
    deckInstance: new Deck(),
    hand: { handP1: [], handP2: [], handH: [] },
    bank: 900,
    pot1: 100,
    pot2: 0,
    lastBet: 100,
    pArray: [100],
    gameStatus: {
        deal: false,
        split: false,
        hand: 1,
        op1: 1,
        op2: 1,
    }
};

// main component of the game
class Home extends React.Component {
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
        this.double = this.double.bind(this);
    }

    // method used to bet money from the bank.
    bet(e) {
        let betMoney = parseInt(e.currentTarget.value);
        this.setState((state, props) => ({ ...state, bank: (state.bank - betMoney), pot1: (state.pot1 + betMoney), pArray: [...state.pArray, betMoney] }));
    }

    // method used to bet all money in the bank.
    allIn() {
        this.setState((state, props) => ({ ...state, bank: 0, pot1: (state.pot1 + state.bank), pArray: getArray(state.pot1 + state.bank) }));
    }

    // method used to put all money from the pot in the bank.
    clearBet() {
        this.setState((state, props) => ({ ...state, bank: (state.pot1 + state.bank), pot1: 0, pArray: [] }));
    }

    // method used to remove individual chip from the pot and into bank.
    remove() {
        let chip = this.state.pArray[this.state.pArray.length - 1];
        this.setState((state, props) => ({ ...state, bank: (chip + state.bank), pot1: (state.pot1 - chip), pArray: state.pArray.slice(0, -1) }));
    }

    // method used to calculate the total of a give hand array.
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

    // method used to check if a pair of cards have equal value.
    sameVal(hand) {
        return hand[0].num === hand[1].num;
    }

    // method used to check id split hand exists or not.
    isSplit() {
        return this.state.gameStatus.deal && this.state.gameStatus.split === false && this.state.bank >= this.state.pot1 && this.state.hand.handP1.length === 2 && this.state.hand.handP2.length === 0 && this.sameVal(this.state.hand.handP1);
    }

    // method used to deal cards at the beginning of a round.
    deal() {
        if (this.state.deckInstance.getDeck().length < 56) {
            this.setState((state, props) => ({ ...state, deckInstance: new Deck() }), () => {
                let cards = new Array(this.state.deckInstance.deal(true), this.state.deckInstance.deal(false), this.state.deckInstance.deal(true), this.state.deckInstance.deal(true));

                this.setState((state, props) => ({ ...state, hand: { ...state.hand, handP1: [cards[0], cards[2]], handH: [cards[1], cards[3]] }, gameStatus: { ...state.gameStatus, deal: true }, lastBet: state.pot1 }), () => {
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

            this.setState((state, props) => ({ ...state, hand: { ...state.hand, handP1: [cards[0], cards[2]], handH: [cards[1], cards[3]] }, gameStatus: { ...state.gameStatus, deal: true }, lastBet: state.pot1 }), () => {
                if (this.getVal([cards[0], cards[2]]) === 21) {
                    setTimeout(() => {
                        alert("BLACKJACK!!");
                        this.revealHand();
                    }, 500)
                }
            })

        }


    }

    // method used to split hands when a pair of cards in a hand have the same value.
    split() {

        let newHand = { ...this.state.hand, handP1: [this.state.hand.handP1[0]], handP2: [this.state.hand.handP1[1]] };
        let newBank = this.state.bank - this.state.pot1;
        let newPot = this.state.pot1;
        let newPArray = this.state.pArray.concat(getArray(this.state.pot1));

        this.setState((state, props) => ({ ...state, hand: newHand, bank: newBank, pot2: newPot, pArray: newPArray, gameStatus: { ...state.gameStatus, split: true, op2: 0.5 } }), () => {
            setTimeout(() => {
                let newCard = this.state.deckInstance.deal(true);
                this.setState((state, props) => ({ ...state, hand: { ...state.hand, handP1: [...state.hand.handP1, newCard] } }), () => {
                    if (this.getVal(this.state.hand.handP1) === 21) {
                        setTimeout(() => {
                            alert("BLACKJACK!!");
                            let newCard = this.state.deckInstance.deal(true);
                            this.setState((state, props) => ({ ...state, gameStatus: { ...state.gameStatus, hand: 2, op1: 0.5, op2: 1 }, hand: { ...state.hand, handP2: [...state.hand.handP2, newCard] } }), () => {
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

    // method used to go to the next round.
    nextRound() {
        if (this.state.bank === 0) {
            alert("Game Over!!");
            this.setState({ ...initialState, deckInstance: new Deck() });
        }
        else {

            let newBet = (this.state.lastBet <= this.state.bank) ? this.state.lastBet : this.state.bank;
            let pArray = getArray(newBet);
            let newBank = this.state.bank - newBet;
            this.setState((state, props) => ({ ...state, hand: { ...initialState.hand }, pot1: newBet, pot2: 0, bank: newBank, pArray: pArray, gameStatus: { ...initialState.gameStatus } }))
        }
    }

    // method used to compare a pair of hands.
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
    }

    // method used to trigger the revealing of dealers hands followed by hand comparison.
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
                                this.nextRound();
                            });
                        }
                        else if (this.state.pot2 === 0) {
                            this.setState((state, props) => ({ ...state, gameStatus: { ...state.gameStatus, op2: 0.5, op1: 1 } }), () => {
                                this.compareHand(handP1Val, handHVal, 1).then((resp) => {
                                    this.nextRound();
                                });
                            })
                        }
                        else {
                            this.compareHand(handP2Val, handHVal, 2).then(() => {
                                handHVal = this.getVal(this.state.hand.handH);
                                this.setState((state, props) => ({ ...state, gameStatus: { ...state.gameStatus, op2: 0.5, op1: 1 } }), () => {
                                    setTimeout(() => {
                                        this.compareHand(handP1Val, handHVal, 1).then((resp) => {
                                            this.nextRound();
                                        });
                                    }, 500)
                                })
                            });
                        }
                    }
                    else {
                        this.compareHand(handP1Val, handHVal, 1).then((resp) => {
                            this.nextRound();
                        });
                    }
                }, 500)
            });
    }

    // method used to hit a palyer's hand with a card.
    hit() {
        if (this.state.gameStatus.split) {
            if (this.state.gameStatus.hand === 1) {
                let newHand = this.state.hand.handP1.concat([this.state.deckInstance.deal(true)]);
                this.setState((state, props) => ({ ...state, hand: { ...state.hand, handP1: newHand } }), () => {
                    if (this.getVal(newHand) > 21) {
                        setTimeout(() => {
                            alert(`Hand 1 BUST! You lose $${this.state.pot1}!`);
                            let newCard = this.state.deckInstance.deal(true);
                            this.setState((state, props) => ({ ...state, pot1: 0, gameStatus: { ...state.gameStatus, hand: 2, op1: 0.5, op2: 1 }, hand: { ...state.hand, handP2: [...state.hand.handP2, newCard] } }), () => {
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
                            this.setState((state, props) => ({ ...state, gameStatus: { ...state.gameStatus, hand: 2, op1: 0.5, op2: 1 }, hand: { ...state.hand, handP2: [...state.hand.handP2, newCard] } }), () => {
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
                                if (this.state.pot1) {
                                    this.setState((state, props) => ({ ...state, gameStatus: { ...state.gameStatus, op1: 1, op2: 0.5 } }), () => {
                                        this.revealHand();
                                    })
                                }
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

    // method used to end addition of a card to a hand.
    stand() {
        if (!this.state.gameStatus.split) {
            this.revealHand();
        }
        else {
            if (this.state.gameStatus.hand === 2) this.revealHand();
            else {
                let newCard = this.state.deckInstance.deal(true);
                this.setState((state, props) => ({ ...state, gameStatus: { ...state.gameStatus, hand: 2, op1: 0.5, op2: 1 }, hand: { ...state.hand, handP2: [...state.hand.handP2, newCard] } }), () => {
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

    // method used to double down on a hand.
    double() {
        if (this.state.gameStatus.split) {
            if (this.state.gameStatus.hand === 1) {
                let newCard = this.state.deckInstance.deal(true);
                let newPot = 2 * this.state.pot1;
                let newBank = this.state.bank - this.state.pot1;
                this.setState((state, props) => ({ ...state, pot1: newPot, bank: newBank, hand: { ...state.hand, handP1: [...state.hand.handP1, newCard] } }), () => {
                    if (this.getVal(this.state.hand.handP1) >= 21) {
                        setTimeout(() => {
                            if (this.getVal(this.state.hand.handP1) > 21) {
                                alert(`Hand 1 BUST! You lose $${this.state.pot1}!`);
                                let newCard = this.state.deckInstance.deal(true);
                                this.setState((state, props) => ({ ...state, pot1: 0, gameStatus: { ...state.gameStatus, hand: 2, op1: 0.5, op2: 1 }, hand: { ...state.hand, handP2: [...state.hand.handP2, newCard] } }), () => {
                                    if (this.getVal(this.state.hand.handP2) === 21) {
                                        setTimeout(() => {
                                            alert("BLACKJACK!!");
                                            this.revealHand();
                                        }, 500)
                                    }
                                })
                            }
                            else if (this.getVal(this.state.hand.handP1) === 21) {
                                alert(`You hit 21!`);
                                let newCard = this.state.deckInstance.deal(true);
                                this.setState((state, props) => ({ ...state, gameStatus: { ...state.gameStatus, hand: 2, op1: 0.5, op2: 1 }, hand: { ...state.hand, handP2: [...state.hand.handP2, newCard] } }), () => {
                                    if (this.getVal(this.state.hand.handP2) === 21) {
                                        setTimeout(() => {
                                            alert("BLACKJACK!!");
                                            this.revealHand();
                                        }, 500)
                                    }
                                })
                            }
                        }, 500)
                    }
                    else {
                        let newCard = this.state.deckInstance.deal(true);
                        this.setState((state, props) => ({ ...state, gameStatus: { ...state.gameStatus, hand: 2, op1: 0.5, op2: 1 }, hand: { ...state.hand, handP2: [...state.hand.handP2, newCard] } }), () => {
                            if (this.getVal(this.state.hand.handP2) === 21) {
                                setTimeout(() => {
                                    alert("BLACKJACK!!");
                                    this.revealHand();
                                }, 500)
                            }
                        })
                    }
                })
            }
            else if (this.state.gameStatus.hand === 2) {
                let newCard = this.state.deckInstance.deal(true);
                let newPot = 2 * this.state.pot2;
                let newBank = this.state.bank - this.state.pot2;
                this.setState((state, props) => ({ ...state, pot2: newPot, bank: newBank, hand: { ...state.hand, handP2: [...state.hand.handP2, newCard] } }), () => {
                    if (this.getVal(this.state.hand.handP2) >= 21) {
                        setTimeout(() => {
                            if (this.getVal(this.state.hand.handP2) > 21) {
                                alert(`Hand 2 BUST! You lose $${this.state.pot2}!`);
                                this.setState((state, props) => ({ ...state, pot2: 0 }), () => {
                                    if (this.state.pot1) {
                                        this.setState((state, props) => ({ ...state, gameStatus: { ...state.gameStatus, op1: 1, op2: 0.5 } }), () => {
                                            this.revealHand();
                                        })
                                    }
                                    else {
                                        this.nextRound();
                                    }
                                })
                            }
                            else if (this.getVal(this.state.hand.handP2) === 21) {
                                alert(`You hit 21!`);
                                this.revealHand();
                            }
                        }, 500)
                    }
                    else {
                        setTimeout(() => {
                            this.revealHand();
                        }, 500)
                    }
                })
            }
        }
        else if (!this.state.gameStatus.split) {
            let newCard = this.state.deckInstance.deal(true);
            let newPot = 2 * this.state.pot1;
            let newBank = this.state.bank - this.state.pot1;
            this.setState((state, props) => ({ ...state, pot1: newPot, bank: newBank, hand: { ...state.hand, handP1: [...state.hand.handP1, newCard] } }), () => {
                if (this.getVal(this.state.hand.handP1) >= 21) {
                    setTimeout(() => {
                        if (this.getVal(this.state.hand.handP1) > 21) {
                            alert(`Hand 1 BUST! You lose $${this.state.pot1}!`);
                            this.setState((state, props) => ({ ...state, pot1: 0 }), () => {
                                this.nextRound();
                            })
                        }
                        else if (this.getVal(this.state.hand.handP1) === 21) {
                            alert(`You hit 21!`);
                            this.revealHand();
                        }
                    }, 500)
                }
                else {
                    setTimeout(() => {
                        this.revealHand();
                    }, 500)
                }
            })
        }
    }

    render() {

        // methods that return a set of cards for player's hands and dealers hand given hand arrays.
        let handP1 = this.state.hand.handP1.map((card, i) => {
            return (
                <Card card={card} key={i + 'p0card'} opacity={this.state.gameStatus.op1} />
            )
        });
        let handP2 = this.state.hand.handP2.map((card, i) => {
            return (
                <Card card={card} key={i + 'p1card'} opacity={this.state.gameStatus.op2} />
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
                        <div className="game-banner col-7">
                            <img alt="game banner" height={35} width={180} src={process.env.PUBLIC_URL + "/images/banner.png"} />
                        </div>
                        <div className="deck-pic col-2">
                            <img alt="deck dummy" width={30} height={35} src={process.env.PUBLIC_URL + "/images/dummy.png"} />
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
                                VALUE: {(this.getVal(this.state.hand.handP1) <= 21) ? <span>${this.state.pot1}</span> : <span>BUST!</span>}
                            </div>) : null}
                        </div>
                        <div className="player-hand-card col-6">
                            {handP2}
                            {(this.state.hand.handP2.length) ? (<div className="player-hand-total">
                                TOTAL: {this.getVal(this.state.hand.handP2)}
                            </div>) : null}
                            {(this.state.hand.handP2.length) ? (<div className="player-hand-value">
                                VALUE: {(this.getVal(this.state.hand.handP2) <= 21) ? <span>${this.state.pot2}</span> : <span>BUST!</span>}
                            </div>) : null}
                        </div>
                    </div>
                    <div className="action-row row">
                        {(!this.state.gameStatus.deal && this.state.pot1) ? (<button className="btn btn-info col-3" onClick={this.deal}>Deal</button>) : null}
                        <Action pots={{ 1: this.state.pot1, 2: this.state.pot2 }} gameStatus={this.state.gameStatus} hand={this.state.hand} bank={this.state.bank} deal={this.state.gameStatus.deal} hit={this.hit} stand={this.stand} double={this.double} />
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

export default Home;