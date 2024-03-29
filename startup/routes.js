const express = require("express");
const cookieParser = require("cookie-parser");
const { useErrorHandler } = require("../middleware/error-handler");


const user = require('../api/routes/user');
const contactUs = require("../api/routes/contactUs");
const order = require("../api/routes/order");
const masterService = require("../api/routes/masterService");
const notification = require("../api/routes/notification");
const review = require("../api/routes/review");

module.exports.default = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
      // JSON (Javascri)
    
    // localhost:3000/api/v1/user/superAdmin
    // get: "data chaiye to get"
    // post: "data dalte hai"
    // Put: "."
    app.use('/api/v1/user', user);
    app.use('/api/v1/contactUs', contactUs);
    app.use('/api/v1/order', order);
    app.use('/api/v1/masterService', masterService);
    app.use('/api/v1/notification', notification);
    app.use('/api/v1/review', review);

    app.use('/success',(req,res)=>{
        console.log("req.body",req.body),
        console.log("req.query",req.query),
        res.send(200)
        
      })
      app.use('/health',(req,res)=>{res.send("OK")})
      
      app.use(useErrorHandler);
}
