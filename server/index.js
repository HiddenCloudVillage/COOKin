// express server
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const controllers = require('../controllers');

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// serve dist file
app.use(express.static(path.join(__dirname, '../client/dist')));
// serve index file

// route for user login
app.post('/login', (req, res) => {
  controllers.getUser(req).then((user) => {
    res.send(user);
  });
});

// listen on port
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
