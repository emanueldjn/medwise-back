const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middlewares/upload');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.delete('/user/:email', userController.delete);
router.put('/user/:id', upload.single('foto_perfil'), userController.updateUser);

module.exports = router;
