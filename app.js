import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from 'body-parser'


// import route files from
import productsRoutes from './routes/products.js';
import categoryRoutes from './routes/category.js';

const app = express();
dotenv.config();
app.use(cors());
app.options('*', cors())

// middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

const api = process.env.APP_URL;

// routes
app.use(`${api}/product`, productsRoutes)
app.use(`${api}/category`, categoryRoutes)



//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useUnifiedTopology:true,
    useNewUrlParser: true,
    dbName: 'eshop-database'
})
.then(()=>{
    console.log('Database Connection is ready...')
})

app.listen(5000, ()=> {
    console.log('server is running http://localhost:5000');
})