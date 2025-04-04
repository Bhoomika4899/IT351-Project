const express = require("express");
const router = express.Router();

const { getGameProgress, updateGameProgress } = require('../controllers/gameProgressController');

router.get("/:gameName", getGameProgress);
router.post("/:gameName", updateGameProgress);

module.exports = router;
