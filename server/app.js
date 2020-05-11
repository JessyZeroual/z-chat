const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const path = require('path');

const { EVENTS, eventEmitter } = require('./events');
const routes = require('./routes/index');
const { setUser } = require('./middleware');

const app = express();

app.use(cookieParser());
app.use(
  fileupload({
    limits: {
      fileSize: 5000000,
    },
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(setUser);

app.use('/api', routes);
app.use(express.static(path.join(__dirname, '../webapp', 'build')));
app.use(express.static('uploads'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../webapp', 'build', 'index.html'));
});

const server = http.createServer(app);

const wsserver = new WebSocket.Server({ server });

wsserver.on('connection', ws => {
  eventEmitter.on(EVENTS.MESSAGE_CREATED, result => {
    ws.send(JSON.stringify({ type: EVENTS.MESSAGE_CREATED, payload: result }));
  });

  eventEmitter.on(EVENTS.AVATAR_URL_UPDATED, result => {
    ws.send(
      JSON.stringify({ type: EVENTS.AVATAR_URL_UPDATED, payload: result })
    );
  });
});

module.exports = server;
