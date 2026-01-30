const express = require("express");
const {
  registerWorker,
  loginWorker
} = require("../controllers/workerAuthController");

const router = express.Router();

router.post("/register", registerWorker);
router.post("/login", loginWorker);

module.exports = router;
