const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");


exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer")) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403))
        }
        next()
    }
}