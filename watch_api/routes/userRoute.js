const express = require("express");
const { registerUser, loginUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middlewares/auth");

const router = express.Router()



router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)

router.route("/me").get(isAuthenticatedUser, getUserDetails)
router.route("/password/update").put(isAuthenticatedUser, updatePassword)
router.route("/me/update").put(isAuthenticatedUser, updateProfile)

router.route("/admin/users").get(isAuthenticatedUser, getAllUser)

module.exports = router