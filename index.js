const express = require('express');
const app = express();
var path = require('path');
const port = process.env.PORT || 8000;
require('dotenv').config();

const routes = require('./routes');

app.use('/api', routes);
app.use(express.static(path.join(__dirname, 'webapp', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'webapp', 'build', 'index.html'));
});

app.listen(port, function() {
  console.log(`App listening on port ${port}!`);
});
