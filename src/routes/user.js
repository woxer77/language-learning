const router = require("express").Router();
const UserController = require("../controllers/user-controller");

router.get("/user/:id", UserController.getUserById);

module.exports = router;
