const sendToken = (user, statusCode, res, msg) => {
    const token = user.getJWTToken();

    res.status(statusCode).json({
        statusCode: statusCode,
        status: true,
        message: msg,
        payload: {
            user,
            token
        }
    })
}

module.exports = sendToken;
