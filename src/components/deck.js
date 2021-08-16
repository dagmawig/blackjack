class Deck {
    constructor() {
        this.deck = newDeck();
        this.burn = [];
        this.deal = function() {
            if(this.deck.length) {
                return this.deck.pop();
            }
            else {
                shuffle(this.burn);
                this.deck = this.burn;
                this.burn = [];
                return this.deck.pop();
            }
        }
    }

    suit = ["d", "c", "h", "s"];
    value = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

    newDeck = function() {
        let deck = [];

        for(let i=0; i<suit.length; i++) {
            for(let j=0; j<value.length; j++) {
                let card = {val: value[j], suit: suit[i]};
                deck.push(card);
            }
        }

        return shuffle(deck);
    }

    shuffle = function(deck) {
        for (let i=0; i<5000; i++) {
            let position1 = Math.floor((Math.random() * deck.length));
            let position2 = Math.floor((Math.random() * deck.length));
            let temp = deck[position1];
    
            deck[position1] = deck[position2];
            deck[position2] = temp;
        }
    }
}