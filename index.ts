import express, { Application } from "express";
import EmployeeRoutes from "./src/routes/employer.routes.ts";
import { env } from "./src/config/envConfig.ts";
import { ErrorHandler } from "./src/middleware/errorHandle.ts";
import Server from "./src/databases/database.ts"

const PORT = Number(env.PORT);
const errorHandler = new ErrorHandler();

class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.app.use(errorHandler.handle.bind(errorHandler));
  }
  private middlewares() {
    this.app.use(express.json());
  }
  private routes() {
    const employeeRoutes = new EmployeeRoutes();
    this.app.use("/api", employeeRoutes.router);
  }
  private async conectar(){
    const servidor =new Server()
    await servidor.dbConnect()
  }
  async listen(){
    await this.conectar()
    this.app.listen(PORT,()=>{
        console.log(`Servidor escuchando en http://localhost:${PORT}`)
    })
  }
}

const app = new App();

app.listen()
