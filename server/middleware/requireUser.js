import crypto from "crypto";
import { USER_ID_COOKIE_NAME, USER_TOKEN_COOKIE_NAME } from "../constants/cookies.js";

const requireUser = (request, response, next) => {
    const {
        "user-id": userIdCookie,
        "user-token": userTokenCookie
    } = request.cookies;

    const {
        "x-user-id": userIdHeader,
        "x-user-token": userTokenHeader
    } = request.headers;

    const userId = userIdCookie || userIdHeader;
    const userToken = userTokenCookie || userTokenHeader;

    if (!userId || !userToken) {
        response.clearCookie(USER_ID_COOKIE_NAME);
        response.clearCookie(USER_TOKEN_COOKIE_NAME);
        response.status(401).send({ success: false, message: "unauthorized" });

        return;
    }

    const token = crypto.createHash("sha256").update(userId).digest("hex");

    if (token !== userToken) {
        response.clearCookie(USER_ID_COOKIE_NAME);
        response.clearCookie(USER_TOKEN_COOKIE_NAME);
        response.status(401).send({ success: false, message: "unauthorized" });

        return;
    }

    request.userId = userId;

    next();
};

export default requireUser;
