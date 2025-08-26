const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.delete('/user/:email', userController.delete);
// router.put('/user/:id', userController.updateUser);

module.exports = router;
