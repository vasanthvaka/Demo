const express=require('express')
const employeeRouter=express.Router()
//const empController = require('../../controllers/empController');
const verifyJWT = require('../../middleware/verifyJWT');
const verifyRoles= require('../../middleware/verifyRoles')

const{getAllEmployees,updateEmployee,createEmployee,deleteEmployee,getEmployee}=require('../../controllers/empController')
const ROLES_LIST = require('../../config/roles_list')

employeeRouter.use(verifyJWT);

employeeRouter.route('/')
    .get(getAllEmployees)
    .put(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),updateEmployee)
    .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),createEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin),deleteEmployee)

employeeRouter.route('/:id')
    .get(getEmployee)
    
module.exports=employeeRouter