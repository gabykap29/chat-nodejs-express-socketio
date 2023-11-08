import express from 'express';
import http from 'http';
import { socketio } from './helpers/socket.js';
import router from './routes/router.js';

const app = express();
const server = http.createServer(app);


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(router);

//helpers de socket io
socketio(server); 

  server.listen(3000, () => {
    console.log('listening on http://localhost:3000');
  });
