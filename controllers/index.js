const db = require('../db');

const user = db.User;
const recipes = db.Recipe;

module.exports.getUser = (req) => (
  user.findOneAndUpdate({ userId: req.body.uid }, {}, { upsert: true })
);

module.exports.updateFavorites = (favorites, userId) => (
  user.findOneAndUpdate({ userId }, { favorites }, { upsert: false })
);

module.exports.updateGrocery = (groceryList, userId) => (
  user.findOneAndUpdate({ userId }, { groceryList }, { upsert: false })
);

module.exports.updatePantry = (pantry, userId) => (
  user.findOneAndUpdate({ userId }, { pantry }, { upsert: false })
);

// RECIPE CONTROLLERS
module.exports.getRecipes = () => recipes.find({});
