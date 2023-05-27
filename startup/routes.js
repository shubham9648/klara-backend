const express = require("express");
const cookieParser = require("cookie-parser");
const { useErrorHandler } = require("../middleware/error-handler");


const user = require('../api/routes/user');


module.exports.default = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use('/api/v1/user', user);


    app.use('/success',(req,res)=>{
        console.log("req.body",req.body),
        console.log("req.query",req.query),
        res.send(200)
        
      })
      app.use('/health',(req,res)=>{res.send("OK")})
      
      app.use(useErrorHandler);
}
