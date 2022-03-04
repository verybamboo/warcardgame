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
    this.hand = [];
    this.playedCards = [];
  }
}

// const rank = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
// const score = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
// const suit = ['♦️', '♣️', '❤️', '♠️'];

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
    this.rank = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
    this.score = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    this.suit = ['♦️', '♣️', '❤️', '♠️'];
    this.cards = [];
    this.length = 52;
    for (let i = 0; i < this.suit.length; i++) {
      for (let j = 0; j < this.rank.length; j++) {
        let card = new Card(this.suit[i], this.rank[j], this.score[j]);
        this.cards.push(card);
      }
    }
    return this.cards;
  }

  //using Fisher-Yates shuffle method for the most efficient shuffle, I read documentation on it and it runs better than what I
  //I was trying to write
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

//Cleaner to put the play game function into a class that encompasses the whole game, it made it much easier to run all the
//functions instead of in tandem. However, apparently in JS, it's better to just have more functions so it was harder for me
//to visualize what is happening in order
class War {
  constructor(round, pile, players, deck) {
    this.pile = [];
    this.players = [new Player("Fast Draw McGee"), new Player("Wild Wile West")];
    this.round = 0;
    this.deck = new Deck();
    this.deck.shuffleDeck();
  }

  //deal cards to both players in sequence using unshift to put the dealt card on the top of the pile each time
  //a card is dealt, i is divided by 2, if it's even, first player gets 1 card and if odd player 2 gets 1, since i always goes down
  //1 at a time in sequence, it will always aternate between odd and even 
  dealCards() {
    for (let i = 0; i < this.deck.length; i++) {
      if (i % 2 === 0) {
        this.players[0].hand.unshift(this.deck.cards[i])
      } else {
        this.players[1].hand.unshift(this.deck.cards[i])
      }
    }
    this.deck = [];
    this.playCard();
  }

  //starts game, adds 1 to the round counter and displays current round
  playGame() {
    this.round += 1;
    console.log(`Round ${this.round} start!`)
    this.playCard();
  }

  //each player plays a card from the top of their hand (an array) into a new array called played cards(which each player has one) so they can
  //be compared to each other, the played card is then removed from the hands of both players, I console logged to show what they are
  playCard() {
    this.players[0].playedCards.unshift(this.players[0].hand[0]);
    this.players[0].hand.shift();
    this.players[1].playedCards.unshift(this.players[1].hand[0]);
    this.players[1].hand.shift();
    console.log(`${this.players[0].name} played ${this.players[0].playedCards[0].rank} of ${this.players[0].playedCards[0].suit}`);
    console.log(`${this.players[1].name} played ${this.players[1].playedCards[0].rank} of ${this.players[1].playedCards[0].suit}`);
    this.roundWinner();
  }

  //compare both players cards and their scores, the winner with the higher score wins both cards, the method also checks for ties in
  //which case a war will be declared. at the end of the method, it checks for the length of the hand of each player and the moment
  //a player gets to 52, the game declares them a winner
  roundWinner() {
    if (this.players[0].playedCards[0].score > this.players[1].playedCards[0].score) {
      this.winCard(0, 1);
      //  console.log(`${this.players[0].name} played the bigger card! They win this battle!`)
    } else if (this.players[0].playedCards[0].score < this.players[1].playedCards[0].score) {
      this.winCard(1, 0);
      //  console.log(`${this.players[1].name} played the bigger card! They win this battle!`)
    } else {
      if (this.players[0].hand.length === 0) {
        this.winner(players[1].name);
      } else if (this.players[1].length === 0) {
        this.winner(players[0].name);
      } else {
        console.log(`${this.players[0].name} and ${this.players[1].name} both played the same card. It's a tie! Time for war!`)
        this.declareWar();
      }
    }
  }

  //winner has both cards put back into the bottom of their hand and the game declares the winner of the round. I have put a bunch of messages
  //to map out who is winning and why. The two arguments are w = winner, l = loser
  winCard(w, l) {
    this.players[w].hand.push(...this.players[w].playedCards, ...this.players[l].playedCards);
    this.players[w].hand.push(...this.pile);
    this.pile = [];
    this.players[w].playedCards = [];
    this.players[l].playedCards = [];
    console.log(`${this.players[w].name} played the bigger card while ${this.players[l].name} played the smaller card. ${this.players[w].name} wins this battle!`)
    console.log(`${this.players[w].name} won this round! They have ${this.players[w].hand.length} cards now. ${this.players[l].name} lost this round! They have ${this.players[l].hand.length} cards now.`);
    this.whoWon();
  }

  //if statement to check when either player hits 52, then determine them as the winner. while the condition is not met, continue looping and
  //playing the game.
  whoWon() {
    if (this.players[0].hand.length === 0) {
      this.winner(this.players[1].name)
    } else if (this.players[1].hand.length === 0) {
      this.winner(this.players[0].name)
    }

    //as long as neither player has 52 cards in their, the game continues playing
    while (this.players[0].hand.length !== 52 && this.players[1].hand.length !== 52) {
      this.playGame();
    }
  }

  //logging the winner into console
  winner(player) {
    console.log(`${player} HAS WON THE WAR!. 💥🎉🎊`);
  }

  //the game crashes when the last cards being played are a tie, since the program wants to declare war and
  //there aren't any cards left to play for one player
  //If a tie happens, it triggers this function to declare a war, both players will play their top 3 cards, I used a for loop to
  //If the player has less than 4 cards, then they automatically lose
  declareWar() {
    if (this.players[0].hand >= 4 && this.players[1].hand >= 4) {
      for (let i = 0; i < 3; i++) {
        this.pile.unshift(this.players[0].hand[0]);
        this.players[0].hand.shift();
      }
      for (let i = 0; i < 3; i++) {
        this.pile.unshift(this.players[1].hand[0]);
        this.players[1].hand.shift();
      }
    }

    console.log("💥WE DECLARE WAR!!!💥");
    //console.log(`${players[0].name} has ${this.players[0].hand.length} cards left.`);
    //console.log(`${players[1].name} has ${this.players[1].hand.length} cards left.`);
    this.playCard();
  }
}


//Starts game off by making a 52 card deck, shuffles it and then gives equal halves to the two players.
//Runs the games by comparing the score value of the cards and also dealing with declaring war when two of
//same cards are played
let war = new War();
war.dealCards();