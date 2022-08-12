// mongoose database connection
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

// create a RECIPE schema
const { Schema } = mongoose;
const RecipeSchema = new Schema({
  mealId: String,
  name: String,
  ingredients: [{ ingredientName: String, ingredientQuantity: String }],
  thumbnail: String,
  instructions: String,
  video: String,
  source: String,
  category: String,
});
// create a model
const Recipe = mongoose.model('Recipe', RecipeSchema);

/// ///////////////////////////////////////////////////////////////////////////////////////////

// create user schema
const UserSchema = new Schema({
  userId: String,
  pantry: { type: [Object], default: [] },
  groceryList: { type: [Object], default: [] },
  favorites: { type: [String], default: [] },
});
// User model
const User = mongoose.model('User', UserSchema);

// export the models
module.exports = { Recipe, User };
