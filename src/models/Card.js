const _ = require('lodash');
const Promise = require('bluebird');

const Card = {
  create(listId, cardData) {},

  getColors(cardId) {},

  addColor(cardId, colorId) {},

  removeColor(cardId, colorId) {},

  update(cardId, data) {},

  drop(cardId) {},

  findById(cardId) {},

  move(sourceList, targetList) {}
};

module.exports = Card;