import cors from 'cors';
import express from 'express';
import * as http from 'http';
import mongoose from 'mongoose';
import requireDir from 'require-dir';
import { Routes } from './routes/api-routing';

class Server {
  app: express.Application = express();

  routesPlanet = new Routes();
  constructor() {
    mongoose.connect('mongodb://localhost:27017/nodeapi', { useNewUrlParser: true });
    requireDir('./model');
    this.app.use(cors());
    this.app.use(express.json());
    this.routesPlanet.routes(this.app);
    this.app.options('*', cors());
    this.config();
  }

  config() {

    this.app.use('/', this.routesPlanet.routes);

  }
}

http.createServer(new Server().app).listen(3001);

