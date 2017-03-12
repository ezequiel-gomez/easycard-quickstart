'use strict';

var Card = require('./card');

var Deck = function () {
  const default_deck = {
    hierarchy: {},
    numbers: [],
    suits: []
  };

  var cards = [],
      deckInfo = Object.assign(default_deck, easyCard.getSettings().deckInfo);

  /*
  [
      En el caso de crear un juego en donde las cartas tienen una jerarquía,
      se tienen que agregar de la siguiente manera:

      {name: '[número_suit]', priority: 1},
      {name: '[número_suit]', priority: 2},
      {name: '[número_suit]', priority: 3}

      Primero va el número de la carta y luego el tipo, separados por un guión bajo.

  ];
  */

  this.newCards = function () {
    var s,
        n;

    for (s = 0; s < deckInfo.suits.length; s++) {
      for (n = 0; n < deckInfo.numbers.length; n++) {
        cards.push(new Card(deckInfo.numbers[n], deckInfo.suits[s], getPriority(deckInfo.numbers[n], deckInfo.suits[s])));
      }
    }
  }

  var getPriority = function (number, suit) {
    var name = number + '_' + suit;

    for (var i in deckInfo.hierarchy) {
      if (deckInfo.hierarchy[i].name == name) {
        return deckInfo.hierarchy[i].priority;
      }
    }
  }

  this.shuffle = function () {
    for (var j, x, i = cards.length; i; j = parseInt(Math.random() * i), x = cards[--i], cards[i] = cards[j], cards[j] = x);
  }

  this.getCards = function () {
    return cards;
  }

  this.deal = function () {
    if (!cards.length) {
        console.log("Ran out of cards, new deck");
        newCards();
        this.shuffle();
    }
    return cards.pop();
  }
}

module.exports = Deck;
