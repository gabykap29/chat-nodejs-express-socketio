import {Server} from 'socket.io';
let arrayMgs = [];
export const socketio = async(server)=>{
    const io = new Server(server)
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
}