const socket = io('http://localhost:8000');

//get dom element in respective js variable
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
//audio that will play on receving message
var audio=new Audio('Messenger - Notification.mp3');
//function which will append event info to the container
  const append =(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){ 
    audio.play();
    }
}

//ask new user for his or her name and let serever know
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);
//if new user join recieve his or her name from server
 socket.on('user-joined', name=>{
    append(`${name} joined the chat`,'right')
})
//if server sends a message receive it
socket.on('receive', data=>{
    append(`${data.name}: ${data.message}`,'left')
})
//if user leave the chat append the info to container
socket.on('left', name=>{
    append(`${name}:left the chat`,'right')
})
//if the form gets submitted send it to server
form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const message=messageInput.value;
  append(`You:${message}`,'right');
  socket.emit('send',message);
  messageInput.value=''
})