//Create a card class with the possible properties of a card
class Card {
  constructor(suit, rank, score) {
    this.suit = suit;
    this.rank = rank;
    this.score = score;
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

  shuffleDeck() {
    this.cards[Math.floor(Math.random() * this.length)];
  }
}
