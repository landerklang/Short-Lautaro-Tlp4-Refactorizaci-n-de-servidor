import mongoose from "mongoose";
import { env } from "../config/envConfig.ts";

const MONGO_URI = env.MONGO_URI;

class Server {

async dbConnect() {
    try{
        await mongoose.connect(MONGO_URI)
        console.log("MongoDB conectado");
    }catch(error){
            console.error("No se pudo conectar a MongoDB", error);
            process.exit(1);
        }
    }
}
export default Server