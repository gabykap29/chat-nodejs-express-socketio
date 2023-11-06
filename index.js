import express from 'express';
import {Server} from 'socket.io';
import http from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
let arrayMgs = [];



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
    arrayMgs.push({username:'servidor',msg:'BIENVENIDO!'})
    socket.emit('chat before', arrayMgs);
    socket.on('chat message', (data) => {
        const {username,msg} = data;
        arrayMgs.push(data);
        console.log(arrayMgs);
    io.emit('chat message', data);
    });
});


  server.listen(3000, () => {
    console.log('listening on http://localhost:3000');
  });
