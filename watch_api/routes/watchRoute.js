const express = require("express");
const { getAllWatches, createWatch, updateWatch, getWatchDetails } = require("../controllers/watchController");
const { isAuthenticatedUser } = require("../middlewares/auth");

const router = express.Router();


//create new watch
router.route("/watch/new").post(isAuthenticatedUser, createWatch);

//get all watches
router.route("/watches").get(getAllWatches);


//update watches
router.route("/watch/:id").put( updateWatch).get(getWatchDetails)

module.exports = router