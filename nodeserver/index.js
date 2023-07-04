//node server which will handel socket io connections
const io= require('socket.io')(8000,{
    cors:{
        origin:"*"
    }
});


const users={};

io.on('connection', Socket=>{
    //if any new user joins let other user connected to server know
    Socket.on('new-user-joined', name =>{
        console.log("New user" , name);
        users[Socket.id]=name;
        Socket.broadcast.emit('user-joined', name);
    });
    // if someone send a message broadcast it to other people
    Socket.on('send',message=>{
        Socket.broadcast.emit('receive',{message:message, name: users[Socket.id]})
    });
     //if someone leaves the chat let other know
    Socket.on('disconnect',message=>{
        Socket.broadcast.emit('left',users[Socket.id]);
        // delete users[socket.id];
    });
})