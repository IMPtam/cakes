const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./authRoutes"));
router.use("/cakes", require("./cakeRoutes"));
router.use("/user", require("./userRoutes"));

module.exports = router;
