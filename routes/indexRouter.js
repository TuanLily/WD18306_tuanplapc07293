"use strict";

const express = require('express');
const router = express.Router();
const controller = require('../controller/indexController');

module.exports = router;


router.get('/', controller.showHomePage);

router.get('/sign-in', (ren, res) => {
    res.render('pages/signIn');
})
router.get('/sign-up', (ren, res) => {
    res.render('pages/signUp');
})

router.get('/:page', controller.showMorePage);

router.get('/404', controller.show404Page);
