import { Server,IncomingMessage,ServerResponse } from "http";
import { Request, Response } from "express";
import socketIO, { ServerOptions } from "socket.io";

class SocketService {


    private _io:any;

    constructor(){   
    }

    init(server:any) {
        this._io =  socketIO( server );
        this._io.on('connection', (socket:any) => {
            console.log('a user connected');
            socket.on('disconnect', () => {
              console.log('user disconnected');
            });
        });
    }

    broadcast(key:string,message:any){
        this._io.emit(key,message);
    }
}

const socketService = new SocketService();
export default socketService;