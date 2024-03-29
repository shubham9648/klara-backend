const { responseHandler } = require('../../middleware/response-handler');
const Error = require('../../middleware/error-handler');
const service = require('../services/users');
const { user } = require("../../constants/userRoles")
const { ObjectId } = require("mongodb")

exports.logIn = async (req, res, next) => {
    try {

        const value = req.value;

        const {userData, token} = await service.loginUser(value);

        if(!userData) {
            return responseHandler(null, res, 'No User!', 400);
        };

        if(!token) {
            return responseHandler(null, res, 'Invalid Email OR password', 400)
        };

        const data = {
            data: userData,
            Authorization: token
        };

        responseHandler(data, res);

    } catch (err) {
        console.log("error is ", err);
        next(err);
    }
};

exports.createAdmin = async (req, res, next) => {
    try {
        const value = req.value;
        
        value.addedBy = req.user.userId ? req.user.userId : req.user.id;

        var response;

        //Conditions required

        if(value.roles.indexOf("organisationAdmin") !== -1) {
          response = await service.createOrganisationAdmin(value);
        }

        else if(value.roles.indexOf("employee") !== -1) {
          response = await service.createEmployee(value)
        }

        else if(value.roles.indexOf("doctor") !== -1) {
            response = await service.createUser(value);
        }

        else {
            return responseHandler(null, res, "Invalid Role type!!", 400);
        };
        
        responseHandler(response, res);

    } catch (err) {
        console.log("error is ", err);
        next(err);
    }
};

exports.createSuperAdmin = async (req, res, next) => {
    try{
        const value = req.value;
        value.roles = [user.roles.superAdmin];

        const data = await service.createAdmin(value);

        responseHandler(data, res); 
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const value = req.value;

        if(!value.isNewsLetter || !value.isAggrement || !value.isInformation) {
            return responseHandler(null, res, "Please check all fields!!", 400);
        };

        value.roles = ["user"];

        const response = await service.createUser(value);

        if(response.err) {
            return responseHandler(null, res, response.err, 400);
        }
        responseHandler(response, res);

    } catch (err) {
        console.log("error is ", err);
        next(err);
    }
};


exports.search = async (req, res, next) => {
    try {

        const reqQuery = req.query;
        const pagination = { skip: 0, limit: 30 };
        if (reqQuery.pageNo && reqQuery.pageSize) {
            pagination.skip = parseInt((reqQuery.pageNo - 1) * reqQuery.pageSize);
            pagination.limit = parseInt(reqQuery.pageSize);
        }
        
        const filter = {}
        if(reqQuery.refrenceId) filter.name = new ObjectId(reqQuery.refrenceId);
        if(reqQuery.id) filter['_id'] = new xObjectId(reqQuery.id);
        if(reqQuery.status) filter['status'] = reqQuery.status;
        if(reqQuery.role) filter['roles'] = reqQuery.role

        const result =  service.find(filter, pagination);
        const document = service.countDocument(filter);

        const [response, count] = await Promise.allSettled([result, document]);

        responseHandler({response: response.value, count: count.value}, res);



    } catch (err) {
        console.log("error is ", err);
        next(err);
    }
}