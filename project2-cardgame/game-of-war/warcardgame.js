//Create a card class with the possible properties of a card
class Card {
  constructor(suit, rank, score) {
    this.suit = suit;
    this.rank = rank;
    this.score = score;
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.dealtDeck = [];
    this.dealCards();
    this.length = 26;
  }
}

// let rank = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
// let score = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
// let suit = ['♦️', '♣️', '❤️', '♠️'];

//create a deck class that will have all the functions
class Deck {
  constructor() {
    this.cards = [];
    this.makeDeck();
    this.length = 52;
  }

  makeDeck() {
    let rank = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
    let score = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    let suit = ['♦️', '♣️', '❤️', '♠️'];
    for (let i = 0; i < suit.length; i++) {
      for (let j = 0; j < rank.length; j++) {
        let card = new Card(suit[i], rank[j], score[j]);
        this.cards.push(card);
      }
    }
  }
  //using Fisher-Yates shuffle method for the most efficient shuffle
  shuffleDeck(cards) {
    var randomCards = this.cards.length, randomCardIndex;

    // While there remain elements to shuffle…
    while (randomCards != 0) {

      //Pick an element at a random index then assigning it to the randomCardIndex while also removing the randomCards once done
      randomCardIndex = Math.floor(Math.random() * randomCards);
      randomCards--;

      // And swap it with the current element.
      [this.cards[randomCards], this.cards[randomCardIndex]] = [this.cards[randomCardIndex], this.cards[randomCards]];
    }
    return cards;
  }

  dealCards() {
    this.dealCards = this.cards[Math.floor(Math.random() * this.length)];
    return this.dealCards;
  }
}

let deck = new Deck();
deck.makeDeck();
//console.log(deck.cards);
//console.log(deck.drawCard());
deck.shuffleDeck();
console.log(deck.cards);
