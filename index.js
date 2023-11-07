import express from 'express';
import {Server} from 'socket.io';
import http from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
let arrayMgs = [];
const typingUser = new Set();



const app = express();
const server = http.createServer(app);
const io = new Server(server)


//obtener la direccion del archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

io.on('connection', (socket) => {

    socket.emit('chat before', arrayMgs);
    socket.on('chat message', (data) => {
        const {username,msg} = data;
        if(!data.username){data.username = 'Anónimo';}
        arrayMgs.push(data);
        console.log(arrayMgs);
    io.emit('chat message', data);
    });

    socket.on('user typing', (username) => {
      socket.broadcast.emit('user typing',username);

  });

  socket.on('user stopped typing', (username) => {
      socket.broadcast.emit('user has stopped typing', username);
  })



});


  server.listen(3000, () => {
    console.log('listening on http://localhost:3000');
  });
