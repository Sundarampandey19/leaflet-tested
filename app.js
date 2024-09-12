const express = require("express");         
const app = express();
const http = require('http');
const socketio = require("socket.io");
const path  = require("path");
const server = http.createServer(app);
const io = socketio(server);

// Socket.IO connection event
io.on('connection', (socket) => {
    console.log("connected");

    socket.on('send-location' , (data)=>{
        io.emit('receive-location' , {id:socket.id , ...data})
    })
    socket.on('disconnect',()=>console.log("Disconnected"))
});

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.render("index");  // Render index.ejs from the views folder
});

// Start the server
server.listen(3000, () => {
    console.log("Server is listening on 3000");
});


