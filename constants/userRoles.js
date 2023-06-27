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


module.exports = {
    user,
    masterService
}