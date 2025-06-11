import { Server  } from 'socket.io';
import http from 'http';
import express from 'express';
import cors from 'cors';
import { use } from 'react';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"], 
    }
});

//used to store online users 

const userSocketMap = {}
console.log("Socket server is running",userSocketMap);




io.on('connection',(socket)=>{
    const userId=socket.handshake.query.userId;
    console.log("User ID:", userId);
   
    if (userId) userSocketMap[userId] = socket.id;
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
});
})
export {io,app,server};

 