import generateToken from "../../helpers/generateToken.js";

export const refreshTokenService = async (user) => {

    const payloadToken = {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email
    };

    return {
        access_token: generateToken(payloadToken),
        refresh_token: generateToken(payloadToken, '2d')
    };
}