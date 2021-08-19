function Deck(){
    this.deck = newDeck();
    this.burn = [];

    function newDeck() {
        let suit = ["d", "c", "h", "s"];
        let value = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

        let deck = [];

        for (let i = 0; i < suit.length; i++) {
            for (let j = 0; j < value.length; j++) {
                let card = { value: value[j], suit: suit[i] };
                deck.push(card);
            }
        }
        
        shuffle(deck);
        return deck;
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

Deck.prototype.deal = function() {
        if (this.deck.length) {
            return this.deck.pop();
        }
        else {
            this.shuffle(this.burn);
            this.deck = this.burn;
            this.burn = [];
            return this.deck.pop();
        }
    }

Deck.prototype.getDeck = function() {
        return this.deck; //this.deck;
    }
    

    


export default Deck;