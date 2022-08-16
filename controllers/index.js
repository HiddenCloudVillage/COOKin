const db = require('../db');

const user = db.User;
const recipes = db.Recipe;

module.exports.getUser = (req) => (
  user.findOneAndUpdate({ userId: req.body.uid }, {}, { upsert: true, new: true })
);

module.exports.updateFavorites = (favorites, userId) => (
  user.findOneAndUpdate({ userId }, { favorites }, { upsert: false, new: true })
);

module.exports.updateGrocery = (groceryList, userId) => (
  user.findOneAndUpdate({ userId }, { groceryList }, { upsert: false, new: true })
);

module.exports.updatePantry = (pantry, userId) => (
  user.findOneAndUpdate({ userId }, { pantry }, { upsert: false, new: true })
);

// RECIPE CONTROLLERS
module.exports.getRecipes = () => recipes.find({});
