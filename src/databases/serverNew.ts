import express, { Application } from "express";
import EmployeeRoutes from "../routes/employer.routes";
import mongoose from "mongoose";

import { env } from "./envConfig.ts";

const PORT = Number(env.PORT);
const MONGO_URI = env.MONGO_URI;

class Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.routes();
  }

  dbConnect() {
    mongoose
      .connect(MONGO_URI)
      .then(() => {
        console.log("MongoDB conectado");
        this.app.listen(PORT, () => {
          console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
      })
      .catch((error) => {
        console.error("No se pudo conectar a MongoDB", error);
        process.exit(1);
      });
  }
  midlewarer() {
    this.app.use(express.json());
  }
  private routes() {
    const employeeroutes = new EmployeeRoutes();
    this.app.use("/api", employeeroutes.router);
  }
  listen() {}
}

const server = new Server();

server.dbConnect();
export default Server;
