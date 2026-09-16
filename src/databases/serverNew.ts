import express, { Application } from "express";
import EmployeeRoutes from "../routes/employer.routes";
import mongoose from "mongoose";
import "dotenv/config";

const PORT = Number(process.env.PORT);
const MONGO_URI = process.env.MONGO_URI;
class Server {
  private app: Application;
  constructor() {
    this.app = express();
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
  routes() {}
  listen() {}
}

const server = new Server();

server.dbConnect();
export default Server;
