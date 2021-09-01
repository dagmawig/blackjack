function Deck(){
    this.deck = newDeck();
    this.burn = [];
    this.shuffle = function(deck) {
        shuffle(deck);
    }
    function newDeck() {
        let suit = ["d", "c", "h", "s"];
        let value = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        let num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
        let deck = [];

        for (let i = 0; i < suit.length; i++) {
            for (let j = 0; j < value.length; j++) {
                let card = { value: value[j], suit: suit[i], num: num[j] };
                deck.push(card);
            }
        }
        let finalDeck = deck.concat(deck);
        shuffle(finalDeck);
        return finalDeck;
    }

    function shuffle(deck) {
        for (let i = 0; i < 1000; i++) {
            let position1 = Math.floor((Math.random() * deck.length));
            let position2 = Math.floor((Math.random() * deck.length));
            let temp = deck[position1];

            deck[position1] = deck[position2];
            deck[position2] = temp;
        }
    }

}

Deck.prototype.deal = function(faceUp) {
        if (this.deck.length) {
            let card = this.deck.pop();
            this.burn.push(card);

            return (faceUp)? {...card, faceUp: true} : {...card, faceUp: false};
        }
        else {
            this.shuffle(this.burn);
            this.deck = this.burn;
            this.burn = [];
            let card = this.deck.pop();
            this.burn.push(card);

            return (faceUp)? {...card, faceUp: true} : {...card, faceUp: false};
        }
    }

Deck.prototype.getDeck = function() {
        return this.deck; //this.deck;
    }
    

    


export default Deck;