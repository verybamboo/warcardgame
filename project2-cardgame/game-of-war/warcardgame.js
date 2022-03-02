//Create a card class with the possible properties of a card
class Card {
  constructor(suit, rank, score) {
    this.suit = suit;
    this.rank = rank;
    this.score = score;
  }
}

class Player {
  constructor(name, deck) {
    this.name = name;
    this.deck = deck;
  }
}

const rank = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
const score = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const suit = ['♦️', '♣️', '❤️', '♠️'];

//create a deck class that will have all the functions
class Deck {
  constructor() {
    this.cards = [];
    this.makeDeck();
  }

  get fullDeck() {
    return this.cards.length;
  }

  //make a deck consisting of 52 cards of 4 different suits, 13 different scores and ranks
  makeDeck() {
    // let rank = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
    // let score = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    // let suit = ['♦️', '♣️', '❤️', '♠️'];
    for (let i = 0; i < suit.length; i++) {
      for (let j = 0; j < rank.length; j++) {
        let card = new Card(suit[i], rank[j], score[j]);
        this.cards.push(card);
      }
    }
    return this.cards;
  }

  //using Fisher-Yates shuffle method for the most efficient shuffle
  shuffleDeck() {
    var randomCards = this.cards.length, randomCardIndex;

    // While there remain elements to shuffle…
    while (randomCards != 0) {

      //Pick an element at a random index then assigning it to the randomCardIndex while also removing the randomCards once done
      randomCardIndex = Math.floor(Math.random() * randomCards);
      randomCards--;

      // And swap it with the current element.
      [this.cards[randomCards], this.cards[randomCardIndex]] = [this.cards[randomCardIndex], this.cards[randomCards]];
    }
    return this.cards;
  }
}

//Starts game off by making a 52 card deck, shuffles it and then gives equal halves to the two players.
//Runs the games by comparing the score value of the cards and also dealing with declaring war when two of
//same cards are played



playGame();
function playGame() {
  const deck = new Deck();
  deck.shuffleDeck();

  //Split the randomly generated deck into 2 equal halves for the players
  // const halfDeck = Math.ceil(deck.fullDeck / 2);
  let p1Deck = new Player("PlayerOne", deck.cards.slice(0, 26));
  let p2Deck = new Player("PlayerTwo", deck.cards.slice(26, 52));

  //console.log(deck.cards);
  console.log(p1Deck.name);
  console.log(p1Deck.deck);
  //console.log(p2Deck);
}

//let deck = new Deck();
//deck.makeDeck();
//console.log(deck.cards);
//console.log(deck.drawCard());
//deck.shuffleDeck();
//console.log(deck.cards);
