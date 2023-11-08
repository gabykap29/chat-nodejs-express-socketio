let socket = io();
let messages = document.getElementById('messages');
let form = document.getElementById('form');
let input = document.getElementById('input');
let escribir = document.getElementById('escribir');
const divChats = document.getElementById('divChats')
const messagesUser = document.getElementById('messagesUser');
let usernameValue;

input.addEventListener('input',()=>{
  socket.emit('user typing',usernameValue)
});

// Función para desplazar el contenedor hacia abajo
function scrollDivChatsToBottom() {
  divChats.scrollTop = divChats.scrollHeight;
};




document.addEventListener('DOMContentLoaded', () => {
//eliminar el aside si el usuario se conecta desde un celular
const aside = document.getElementById('aside');
const main = document.getElementById('main'); // Reemplaza 'main' con el ID o clase correcta

const adjustLayout = () => {
  try {
    if (window.innerWidth <= 876) {
      aside.style.display = 'none';
      main.classList.remove('col-10');
      main.classList.add('col-12');
    } else {
      aside.style.display = 'block';
      main.classList.remove('col-12');
      main.classList.add('col-10');
    }
  } catch (error) {
    console.log(error);
  }
};

adjustLayout();

// También, asegúrate de agregar un evento 'resize' para manejar cambios en el tamaño de la ventana.
window.addEventListener('resize', adjustLayout);

  usernameValue = prompt('ingresa tu nombre o apodo');
    socket.on('chat before', function(data) {
        for(let i = 0; i<data.length;i++){
            let username = data[i].username;
            let msg = data[i].msg;
            messages.innerHTML +=`<div class=" d-flex justify-content-center aling-items-center  chats" role="alert">
            <div> 
              <span>${username} dice: </span>
              <p>${msg}</p>  
            </div>
        </div>` 
        }
        scrollDivChatsToBottom();
        window.scrollTo(0, document.body.scrollHeight);
      });

  socket.on('user typing',function(username){

      escribir.innerHTML = `${username} esta escribiendo...`;
      setTimeout(() => {
        escribir.innerHTML = ''
      },1000)
    });
form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    let msg = input.value
    socket.emit('chat message', {msg: msg, username: usernameValue});
    input.value = '';
  }
});

socket.on('chat message', function(data) {
    if(data.username == usernameValue){
        messages.innerHTML +=`
        <div class=" d-flex justify-content-end aling-items-end   style="width: 100%;">
              <div class="d-flex justify-content-center aling-items-center alert alert-primary chatsUsers" role="alert">
              <span>${data.username} dice: </span>
              <p>  ${data.msg}</p>
            </div>
        </div>`
  window.scrollTo(0, document.body.scrollHeight);
  scrollDivChatsToBottom();
    }else{
        messages.innerHTML +=`<div class="alert alert-success chats" role="alert">
        <span>${data.username} dice: </span>
        <p>${data.msg}</p>
      </div>`
      window.scrollTo(0, document.body.scrollHeight);
      scrollDivChatsToBottom();
    }

  window.scrollTo(0, document.body.scrollHeight);
});

})