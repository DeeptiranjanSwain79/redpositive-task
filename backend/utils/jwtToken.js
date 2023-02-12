//Creating token and sending in cookie
const sendToken = (user, statusCode, res) => {

    const token = user.getJWTToken();

    //Options for cookie
    const options = {
        expires: new Date(
            Date.now() + (5 * (24 * 60 * 60 * 1000))      //Converting the added time in terms of milliseconds
        ),
        httpOnly: true
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token,
    })
};

module.exports = sendToken;