const db = require('../db');

const user = db.User;
const recipes = db.Recipe;

module.exports.getUser = (req) => (
  user.findOneAndUpdate({ userId: req.body.uid }, {}, { upsert: true })
);

module.exports.addToFavorites = (req, res) => {
  user.findOneAndUpdate({});
};
module.exports.removeFromFavorites = (req, res) => {
  user.findOneAndUpdate({});
};
module.exports.addToGroceryList = (req, res) => {
  user.findOneAndUpdate({});
};
module.exports.removeFromGroceryList = (req, res) => {
  user.findOneAndUpdate({});
};

module.exports.removeFromPantry = (req, res) => {
  user.findOneAndUpdate({});
};

module.exports.addToPantry = (req, res) => {
  user.findOneAndUpdate({});
};

// RECIPE CONTROLLERS
module.exports.getRecipes = (req, res) => {
  recipes.find({});
};
