const { verifyToken } = require('../utils/helper')
const userService = require('../services/user.service')

module.exports = validator = async (request, h) => {
    const accessToken = request.headers['x-access-token'];
    if (!accessToken) {
        throw new Error('Missing access token');
    } else {
        try {
            const details = await verifyToken(accessToken)
            const userDetails = await userService.findUserByFilter({ email: details?.email })
            if (!userDetails) {
                throw new Error('User not authorized');
            }
            h.continue;
        } catch (err) {
            throw new Error('User not authorized');
        }
    }
}

