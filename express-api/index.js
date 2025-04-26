import app from './server.js';
import dotenv from "dotenv";
import LitterDAO from "./dao/litterDAO.js";
import UsersDAO from "./dao/usersDAO.js";
import { MongoClient } from "mongodb";

dotenv.config();

const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_DB_PASSWORD;
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.kutsdhw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const port = 8000;

console.log(`Username: ${mongo_username}`);
console.log(`Password: ${mongo_password}`);

MongoClient.connect(uri, {
    maxPoolSize: 50,
    wtimeoutMS: 2500
})
.catch(err => {
    console.error(err.stack);
    process.exit(1);
})
.then(async client => {
    console.log("Connected to MongoDB");
    await LitterDAO.injectDB(client);
    await UsersDAO.injectDB(client);
    app.listen(port, () => {
        console.log(`listening on port ${port} , localhost:${port}`);
    });
});