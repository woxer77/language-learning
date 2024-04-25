const router = require("express").Router();
const UserController = require("../controllers/user-controller");
const AuthMiddleware = require('../middlewares/auth-middleware');

router.get("/:id", AuthMiddleware, UserController.getUserById);

module.exports = router;
