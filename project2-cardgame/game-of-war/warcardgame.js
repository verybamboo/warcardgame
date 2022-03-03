//Create a card class with the possible properties of a card
class Card {
  constructor(suit, rank, score) {
    this.suit = suit;
    this.rank = rank;
    this.score = score;
  }
}

class Player {
  constructor(name, deck, lastPlayed) {
    this.name = name;
    this.deck = deck;
    this.hand = [];
    this.lastPlayed = lastPlayed;
    this.playedCards = [];
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

  //was used to find the amount of cards in the array of cards as opposed to hard coding a length
  //couldn't get it to work so I hard coded instead
  // get fullDeck() {
  //   return this.cards.length;
  // }

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

//Cleaner to put the play game function into a class
class Game {
  constructor(round, pile, players, deck) {
    this.round = 0;
    this.pile = [];
    this.players = [new Player("Fast Draw McGee"), new Player("Wild Wild West")];
    this.deck = new Deck();
    this.deck.shuffleDeck();
  }

  //deal cards to both players in sequence using shift to put the dealt card on the top of the pile each time
  //a card is dealt
  dealCards() {
    for (let i = 0; i < this.deck.length; i++) {
      if (i % 2 === 0) {
        this.players[0].hand.unshift(this.deck.cards[i])
      } else {
        this.players[i].hand.unshift(this.cards.cards[i])
      }
    }
    this.deck = [];
  }

  //each player plays a card from the top of their hand (an array) into a new array called played cards so they can
  //be compared, the played card is then removed from the hands of both players and logged to show what they are
  playCard() {
    this.lastPlayed = this.deck[this.deck.length - 1]
    this.players[0].playedCards.unshift(this.players[0].hand[0]);
    this.players[1].playedCards.unshift(this.players[1].hand[0]]);
    this.players[0].hand.shift();
    this.players[1].hand.shift();
    console.log(`${this.players[0].name} played ${this.players[0].playedCards[0].rank} of ${this.players[0].playedCards[0].suit}`);
    console.log(`${this.players[1].name} played ${this.players[1].playedCards[0].rank} of ${this.players[1].playedCards[0].suit}`);
    this.whoWon();
  }

  //compare both players cards and their scores, the winner with the higher score wins both cards, the method also checks for ties in
  //which case a war will be declared. at the end of the method, it checks for the length of the hand of each player and the moment
  //a player gets to 52, the game declares them a winner
  whoWon() {
    if (this.players[0].playedCards[0].score > this.players[1].playedCards[0].score) {
      this.winCard(0, 1);
    } else if (this.players[0].playedCards[0].score < this.players[1].playedCards[0].score) {
      this.winCard(1, 0);
    } else if (this.players[0].playedCards[0].score == this.players[1].playedCards[0].score) {
      this.declareWar();
    } else {
      if (this.players[0].hand.length === 52) {
        this.winner(this.players[0].name)
      } else if (this.players[1].hand.length === 52) {
        this.winner(this.players[1].name)
      }
    }
  }

  //winner has both cards put back into the bottom of their hand
  winCard(card) {

  }

  //starts game and adds 1 to the round counter
  playGame() {
    this.round += 1;
    this.playCard();
  }

  //winner has both cards put back into the bottom of the deck
  winCard(card) {
    return this.deck.push(card);
  }
}

//Starts game off by making a 52 card deck, shuffles it and then gives equal halves to the two players.
//Runs the games by comparing the score value of the cards and also dealing with declaring war when two of
//same cards are played
playGame();

// function playGame() {
//   const deck = new Deck();
//   deck.shuffleDeck();

//   //Split the randomly generated deck into 2 equal halves for the players
//   // const halfDeck = Math.ceil(deck.fullDeck / 2);
//   let p1Deck = new Player("PlayerOne", deck.cards.slice(0, 26));
//   let p2Deck = new Player("PlayerTwo", deck.cards.slice(26, 52));
//   p1Deck.playCard()
//   console.log(p2Deck.deck.length);
//   console.log(p1Deck.lastPlayed)
//   //console.log(p1Deck.name, p1Deck.deck);
//   //console.log(p2Deck.name, p2Deck.deck);
//   console.log(deck.cards);
// }

//each player plays 1 card
//function playingRound(playerOne, playerTwo) {
//
//}

//function whoWon() {
//pseudocode
//  if p1Deck.lastplayed.score > p2deck.lastplayed.score;
//}
//let deck = new Deck();
//deck.makeDeck();
//console.log(deck.cards);
//console.log(deck.drawCard());
//deck.shuffleDeck();
//console.log(deck.cards);
