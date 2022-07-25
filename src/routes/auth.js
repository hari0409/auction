const router = require("express").Router();
const { login, create } = require("../controllers/auth");

router.post("/login", login);
router.post("/create", create);

module.exports = router;
