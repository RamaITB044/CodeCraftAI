const express = require("express");
const aiRoute = require("./ai.route");
const authRoute = require("./auth.route");

const router = express.Router();

router.use("/ai", aiRoute);
router.use("/auth", authRoute);
// router.use("/users", userRoute);

module.exports = router;
