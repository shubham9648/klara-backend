const jwt = require('jsonwebtoken');
const { responseHandler } = require("../middleware/response-handler");

exports.verifyToken = function (req, res, next) {
    //get the token from the header if present
    token = req.headers.authorization;
    //if no token found, return response (without going to the next middelware)
    if (!token) {
      return responseHandler(null, res, 'Unauthorized!', 401);
    }
    try {
      if (token.includes("Bearer")) {
        token = token.substr(7);
      }
      //if can verify the token, set req.user and pass to next middleware
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if(!decoded) {
        return responseHandler(null, res, 'Invalid Token!', 400);
      }
      req.user = decoded;
      next();
    } catch (ex) {
        console.log(ex+ 'test')
        responseHandler(null, res, res, ex.message, 500);
    }
};

exports.allowEitherRole = (roles) => {
  console.log("roles is ==>",roles)
  return (req, res, next) => {
    let permitted = false;
    if(req.user.roles) {
      for(let i = 0; i<req.user.roles.length; i++) {
        const role = req.user.roles[i];
        console.log("roles is ", role, roles[0]);
        if(roles.includes(role) || roles[0].includes(role)) {
          console.log("roles is ", role);
          req.user[role] = true;
          permitted = true;
        };
      }
      if(!permitted) return responseHandler(null, res, 'Unauthorized!!', 401);
      next();
    } else {
      responseHandler(null, res, 'Unauthorized!!', 401);
    }
  }
};

exports.handleRole = (req, res, next) => {
  try {
    if (req.body.roles) {
      req.body.roles =  Array.isArray(req.body.roles)?req.body.roles:[req.body.roles]
      console.log(req.body.roles)
    }
    // no role in body
    if (!req.body.roles) {
      next();
    }
    
    // super-admin role in body => only super-admins can create
    else if (req.body.roles.indexOf("superAdmin") !== -1) {
      if (req.user.roles.indexOf("superAdmin") !== -1) {
        next();
      } else {
        throw new error.Unauthorized("Unauthorzied");
      }
    }

    // organisationAdmin role in body => only SuperAdmin can create
    else if (req.body.roles.indexOf("organisationAdmin") !== -1) {
      if (req.user.roles.indexOf("superAdmin") !== -1) {
        next();
      } else {
        throw new error.Unauthorized("Unauthorzied");
      }
    }

    // employee role in body => super- admin and organisationAdmin can create
    else if (req.body.roles.indexOf("employee") !== -1) {
      if (req.user.roles.indexOf("superAdmin") !== -1 || req.user.roles.indexOf("organisationAdmin") !== -1) {
        next();
      } else {
        throw new error.Unauthorized("Unauthorzied");
      }
    }

    // user role in body => super Admin can create
    else if (req.body.roles.indexOf("user") !== -1) {
      if (req.user.roles.indexOf("superAdmin") !== -1 ) {
        next();
      } else {
        throw new error.Unauthorized("Unauthorzied");
      }
    }

    else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

exports.isSuperAdmin =  (req, res, next) => {
  try {
    if (req.user.roles.indexOf("superAdmin") !== -1) {
      next();
    } else {
      throw new error.Unauthorized("Unauthorzied");
    }
  } catch (ex) {
    throw new error.BadRequest(ex);
  }
};

exports.organisationAdmin = (req, res, next) => {
  try {
    if (req.user.roles.indexOf("organisationAdmin") !== -1) {
      next();
    } else {
      throw new error.Unauthorized("Unauthorzied");
    }
  } catch (ex) {
    throw new error.BadRequest(ex);
  }
};

exports.isEmployee =  (req, res, next) => {
  try {
    if (req.user.roles.indexOf("employee") !== -1) {
      next();
    } else {
      throw new error.Unauthorized("Unauthorzied");
    }
  } catch (ex) {
    throw new error.BadRequest(ex);
  }
};

exports.isUser =  (req, res, next) => {
  try {
    if (req.user.roles.indexOf("doctor") !== -1) {
      next();
    } else {
      throw new error.Unauthorized("Unauthorzied");
    }
  } catch (ex) {
    throw new error.BadRequest(ex);
  }
};


exports.ifToken = (req, res, next) => {
  req = verifyToken(req, res);
  next();
};