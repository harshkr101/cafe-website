const authControllers  = require('../controllers/auth.js');
const express = require('express');
const router = express.Router();

router.get('/auth',authControllers.auth);
router.get('/login/:email/:password/:remember',authControllers.login);
router.get('/logout',authControllers.logout);

router.post('/signup',authControllers.signup);
router.delete('/:email/:password',authControllers.deleteUser);

module.exports = router;