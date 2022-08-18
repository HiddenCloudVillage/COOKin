// express server
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const controllers = require('../controllers');

require('dotenv').config();

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
