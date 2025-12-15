const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const loginController = require('../controllers/loginController');
const auth = require("../middlewares/auth");


// login Register
router.post('/login',loginController.Login);
router.post('/register',loginController.Register);
// items
router.get('/items', auth.auth,itemController.listItems);
router.get('/item/:id',auth.auth, itemController.getItem);
router.post('/item', auth.auth,itemController.createItem);
router.put('/item/:id', auth.auth,itemController.updateItem);
router.delete('/item/:id', auth.auth,itemController.deleteItem);


module.exports = router;