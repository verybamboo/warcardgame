import Deck from "./warcardgame.js"

playGame();

function playGame() {
  const deck = new Deck();
  deck.shuffleDeck();
}