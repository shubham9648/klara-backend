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


// const diagnostic = {
//     handlers: {
//         create: [user.roles.superAdmin, user.roles.hospitalAdmin, user.roles.branchAdmin],
//         update: [user.roles.superAdmin, user.roles.hospitalAdmin, user.roles.branchAdmin],
//         deleteHospital: [user.roles.superAdmin, user.roles.hospitalAdmin, user.roles.branchAdmin]
//     }
// };


module.exports = {
    user,
    // diagnostic
}