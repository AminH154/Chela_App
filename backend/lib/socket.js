import {Server} from 'socket.io';
import http from 'http';
import express from 'express';
import { cors } from 'cors';


const app = express();
const Server= http.createServer(app);
const io=new Server(Server, {
    cors :{
        origin:"http://localhost:5173",
    }
});
io.on('connection',(socket)=>{
    console.log("A user connected",socket.id);
    
    socket.on('disconnect', () => {
    console.log('A user disconnected', socket.id);
});
})
export {io,app,Server};

 