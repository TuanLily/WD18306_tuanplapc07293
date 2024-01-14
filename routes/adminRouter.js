"use strict";


const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controller/adminController');

module.exports = adminRouter;


adminRouter.get('/', adminController.showDashboardPage);

adminRouter.get('/:page', adminController.showMorePageAdmin);

