import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
config();

const app = express();
const PORT = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes
app.use(routes);


app.get("/", (req, res) =>{
    res.send("Dwaipayan");
});


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});