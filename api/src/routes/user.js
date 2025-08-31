const router = require("express").Router();
const UserController = require("../controllers/user-controller");
const AuthMiddleware = require('../middlewares/auth-middleware');

router.get("/:userId", AuthMiddleware, UserController.getUserById);
router.post("/set-history", AuthMiddleware, UserController.setHistory);

module.exports = router;
