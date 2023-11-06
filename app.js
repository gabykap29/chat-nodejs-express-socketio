var socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
const username = document.getElementById('username');
var input = document.getElementById('input');
const btnCargar = document.getElementById('btnCargar');
let usernameValue;

btnCargar.addEventListener('click',(e)=>{
  e.preventDefault();
   usernameValue = username.value;
  console.log(usernameValue);
});


form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    let msg = input.value
    socket.emit('chat message', {msg: msg, username: usernameValue});
    input.value = '';
  }
});

socket.on('chat message', function({username,msg}) {
  // var item = document.createElement('li');
  messages.innerHTML +=`<div class="alert alert-success chats" role="alert">
      <span>${username} dice: </span>
      <p>${msg}</p>
  </div>`
  // item.textContent = msg;

  window.scrollTo(0, document.body.scrollHeight);
});


document.addEventListener('DOMContentLoaded', () => {
    socket.on('chat before', function(data) {
        // var item = document.createElement('li');
        for(let i = 0; i<data.length;i++){
            let username = data[i].username;
            let msg = data[i].msg;
            messages.innerHTML +=`<div class="alert alert-success chats" role="alert">
            <span>${username} dice: </span>
            <p>${msg}</p>
        </div>`
        }
        // item.textContent = msg;
    
        window.scrollTo(0, document.body.scrollHeight);
      });
})