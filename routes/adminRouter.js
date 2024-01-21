

const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controller/adminController');



adminRouter.get('/', adminController.showDashboardPage);

adminRouter.get('/:page', adminController.showMorePageAdmin);

adminRouter.get('/404', adminController.showAdmin404Page);


module.exports = adminRouter;
