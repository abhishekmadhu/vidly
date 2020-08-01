const { func } = require("joi");

module.exports = function (req, res, next) {
    // req.user is set by auth middleware

    // 401 Unauthorized - The JSON token is not valid, please retry
    // 403 Forbidden - JSON token is valid but the person is not allowed to do this operation

    if (!req.user.isAdmin) return res.status(403).send('Access Denied, contact an Admin!');

    next();

}