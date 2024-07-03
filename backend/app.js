require("dotenv").config() //libera acesso no arquivo .env

const express = require("express");
const path = require("path")
const cors = require("cors")

const port = process.env.PORT;

const app = express();

//config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//solve cors
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET","POST", "PUT", "DELETE"]
}
))
app.use(cors({credentials: true, origin: "http://localhost:5001"}))

//
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    next();
});


//upload directory 
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

//DB connection
require("./config/db.js")

//routes 
const router  = require("./routes/Router.js")

app.use(router);

app.listen(port,() => {
    console.log(`App rodando na porta ${port}`);
})
