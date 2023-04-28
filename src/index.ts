import 'reflect-metadata';
import http from 'http';

import { mongoUri, port } from "./config/app.config";
import Bootstrap from "./bootstrap/bootstrap";
import mongoose from 'mongoose';
import './helpers/cron-runner-helpers';
import queueService from './core/service/queue-service';
import socketService from './core/service/socket-service';

const server = http.createServer(Bootstrap.instance);

//Database Connection URL
//mongoose.Promise = global.Promise;
//mongoose.set("strictQuery", false);
//console.log(mongoUri);
mongoose.connect(mongoUri);

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

// Init Queue Service
queueService.init().catch(() => {
  throw new Error( `Unable to connect to redis` );
});

socketService.init(server);

server.listen(port, () => {
  console.log(`Server is listening on :${port}`);
});