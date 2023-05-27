const model = require('../models/users');
const dal = require('../helpers/dal');
const jwt = require('jsonwebtoken');
const helper = require("../helpers/generateId")
const mongoose = require("mongoose");


exports.createAdmin = async (body) => {
    body.password = await bcryptjs.hash(body.password, 10);
    
    const count = await dal.find(model, {}, { limit: 1 }, { userID: -1, email: -1, "profile.username": -1 }); 
    if(count.length > 0 && body.email == count[0].email) {
        return {err: "Email Already exist!"}
    }   
    if(count.length > 0 && body.profile.username == count[0].profile.username) {
        return {err: "Username Already taken!"}
    }
    body.userID = count[0] ? count[0].userID + 1 : 1;
    
    return await dal.create(model, body);
};

exports.createOrganisationAdmin = async (body) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        body.password = await bcryptjs.hash(body.password, 10)
        const count = await dal.find(model, {}, { limit: 1 }, { userID: -1, email: -1, "profile.username": -1 });
        console.log("count is ", count);
        if(count.length > 0 && body.email == count[0].email) {
            return {err: "Email Already exist!"}
        }
        if(count.length > 0 && body.profile.username == count[0].profile.username) {
            return {err: "Username Already taken!"}
        }
        body.userID = count?.length > 0 ? count[0].userID + 1 : 1;
        body.ID = helper.generateID('USR-OA', body.userID);
        // commit transactions .. 
        await session.commitTransaction();
        session.endSession();
        return await dal.create(model, body);
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.log("error is", err);
        throw err;
    }
};

exports.createEmployee = async (body) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        body.password = await bcryptjs.hash(body.password, 10)
        const count = await dal.find(model, {}, { limit: 1 }, { userID: -1, email: -1, "profile.username": -1 });
        console.log("count is ", count);
        if(count.length > 0 && body.email == count[0].email) {
            return {err: "Email Already exist!"}
        }
        if(count.length > 0 && body.profile.username == count[0].profile.username) {
            return {err: "Username Already taken!"}
        }
        body.userID = count?.length > 0 ? count[0].userID + 1 : 1;
        body.ID = helper.generateID('USR-E', body.userID);
        // commit transactions .. 
        await session.commitTransaction();
        session.endSession();
        return await dal.create(model, body);
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.log("error is", err);
        throw err;
    }
};

exports.createUser = async (body) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        body.password = await bcryptjs.hash(body.password, 10)
        const count = await dal.find(model, {}, { limit: 1 }, { userID: -1, email: -1, "profile.username": -1 });
        console.log("count is ", count);
        if(count.length > 0 && body.email == count[0].email) {
            return {err: "Email Already exist!"}
        }
        if(count.length > 0 && body.profile.username == count[0].profile.username) {
            return {err: "Username Already taken!"}
        }
        body.userID = count?.length > 0 ? count[0].userID + 1 : 1;
        body.ID = helper.generateID('USR-U', body.userID);
        // commit transactions .. 
        await session.commitTransaction();
        session.endSession();
        return await dal.create(model, body);
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.log("error is", err);
        throw err;
    }
};