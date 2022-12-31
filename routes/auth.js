const express = require('express');
const router = express.Router();
const { login, signup} = require('../controllers/userController')
const verifyToken = require('../middleware/verifyToken');


router
    .get("/endpoint", verifyToken, (request, response) => {
      response.json({ user: request.user,});
    });
router
    .post('/login/', login)
    .post('/register/', signup)


module.exports = router;
