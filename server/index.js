// express server
const express = require('express');
const compression = require('compression');

const app = express();
const port = process.env.PORT || 3000;
const apiBaseUrl = process.env.API_BASE_URL;
const oauth2BaseUrl = process.env.OAUTH2_BASE_URL;
const clientId = process.env.CLIENT_ID;
const redirectUrl = process.env.REDIRECT_URL;
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const controllers = require('../controllers');

require('dotenv').config();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// serve dist file
app.use(express.static(path.join(__dirname, '../client/dist')));
// serve index file


// route for user login ### find one and update may not return anything on first login
app.post('/login', (req, res) => {
  controllers.getUser(req).then((user) => {
    res.send(user);
  });
});

// Kroger Search

// edit pantry
app.put('/pantry', (req, res) => {
  const newPantry = req.body.pantry;
  const { userId } = req.body;
  controllers
    .updatePantry(newPantry, userId)
    .then((response) => res.send(response));
});

// edit favorites
app.put('/favorites', (req, res) => {
  const { userId } = req.body;
  const newFavorites = req.body.favorites;
  controllers
    .updateFavorites(newFavorites, userId)
    .then((response) => res.send(response));
});

app.put('/getStores', (req, res) => {
  axios
    .get(req.body.url)
    .then((data) => res.send(data.data))
    .catch((err) => console.log(err));
});

// edit grocery list
app.put('/grocery', (req, res) => {
  const { userId } = req.body;
  const newGrocery = req.body.grocery;
  controllers
    .updateGrocery(newGrocery, userId)
    .then((response) => res.send(response));
});
// get all recipes from database
app.get('/recipes', (req, res) => {
  controllers
    .getRecipes()
    .then((recipes) => {
      res.send(recipes);
    })
    .catch((err) => {
      res.send(err);
    });
});

// listen on port
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
