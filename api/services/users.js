const model = require("../models/users");
const dal = require("../helpers/dal");
const jwt = require("jsonwebtoken");
const helper = require("../helpers/generateId");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

exports.createAdmin = async (body) => {
  body.password = await bcryptjs.hash(body.password, 10);

  const count = await dal.find(
    model,
    {},
    { limit: 1 },
    { userID: -1, email: -1, "profile.username": -1 }
  );
  if (count.length > 0 && body.email == count[0].email) {
    return { err: "Email Already exist!" };
  }
  if (count.length > 0 && body.profile.username == count[0].profile.username) {
    return { err: "Username Already taken!" };
  }
  body.userID = count[0] ? count[0].userID + 1 : 1;

  return await dal.create(model, body);
};

exports.createOrganisationAdmin = async (body) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    body.password = await bcryptjs.hash(body.password, 10);
    const count = await dal.find(
      model,
      {},
      { limit: 1 },
      { userID: -1, email: -1, "profile.username": -1 }
    );
    console.log("count is ", count);
    if (count.length > 0 && body.email == count[0].email) {
      return { err: "Email Already exist!" };
    }
    if (
      count.length > 0 &&
      body.profile.username == count[0]?.profile?.username
    ) {
      return { err: "Username Already taken!" };
    }
    body.userID = count?.length > 0 ? count[0].userID + 1 : 1;
    body.ID = helper.generateID("USR-OA", body.userID);
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
    body.password = await bcryptjs.hash(body.password, 10);
    const count = await dal.find(
      model,
      {},
      { limit: 1 },
      { userID: -1, email: -1, "profile.username": -1 }
    );
    console.log("count is ", count);
    if (count.length > 0 && body.email == count[0].email) {
      return { err: "Email Already exist!" };
    }
    if (
      count.length > 0 &&
      body.profile.username == count[0].profile.username
    ) {
      return { err: "Username Already taken!" };
    }
    body.userID = count?.length > 0 ? count[0].userID + 1 : 1;
    body.ID = helper.generateID("USR-E", body.userID);
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
    body.password = await bcryptjs.hash(body.password, 10);
    const count = await dal.find(
      model,
      {},
      { limit: 1 },
      { userID: -1, email: -1, "profile.username": -1 }
    );
    console.log("count is ", count);
    if (count.length > 0 && body.email == count[0].email) {
      return { err: "Email Already exist!" };
    }
    if (
      count.length > 0 &&
      body.profile.username == count[0].profile.username
    ) {
      return { err: "Username Already taken!" };
    }
    body.userID = count?.length > 0 ? count[0].userID + 1 : 1;
    body.ID = helper.generateID("USR-U", body.userID);
    // commit transactions ..
    await session.commitTransaction();
    session.endSession();
    const user =  await dal.create(model, body);
    const userData = {
      userId: user._id,
      email: user.email,
      phone: user?.phone,
      roles: user.roles,
      fullName: user?.fullName,
    };
    const token = await getToken(userData);
    return {userData, token}
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.log("error is", err);
    throw err;
  }
};

let getToken = async (body) => {
  return await jwt.sign(body, process.env.JWT_SECRET, {
    expiresIn: "365d",
  });
};

exports.loginUser = async ({ email, password }) => {
  const projection = {
    phone: 1,
    email: 1,
    password: 1,
    fullName: 1,
    roles: 1,
  };
  var token;
  const user = await dal.findOne(model, { email }, projection);
  if (!user) {
    return { userData: null, token };
  }
  console.log("user is ", user);
  const userData = {
    userId: user._id,
    email: user.email,
    phone: user?.phone,
    roles: user.roles,
    fullName: user?.fullName,
  };

  const result = await bcryptjs.compare(password, user.password);

  if (!result) {
    return { userData, token };
  };

  token = await getToken(userData);

//   console.log({ userData, token });
  return { userData, token };
};
