require('dotenv').config();

const server = require('./app');

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`App listening on port ${port} 🚀!`);
});
