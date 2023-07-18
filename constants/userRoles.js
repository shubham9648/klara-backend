const roles = {
    user: 'user',
    superAdmin: 'superAdmin',
    employee: 'employee',
    organisationAdmin: 'organisationAdmin'
};


const user = {
    roles,
    handlers: {
        create: [roles.superAdmin],
        // get: [roles.branchAdmin, roles.]
    }
};


const masterService = {
    handlers: {
        create: [user.roles.superAdmin]
    }
};

const notification = {
    handlers: {
        create: [user.roles.superAdmin, user.roles.organisationAdmin, user.roles.employee],
        update: [user.roles.superAdmin, user.roles.organisationAdmin, user.roles.employee]
    }
};

const userDetail = {
    handlers: {
        create: [user.roles.superAdmin],
        update: [user.roles.superAdmin, user.roles.organisationAdmin, user.roles.employee],
        search: [user.roles.superAdmin, user.roles.organisationAdmin, user.roles.employee]
    }
};

module.exports = {
    user,
    masterService,
    notification,
    userDetail
}