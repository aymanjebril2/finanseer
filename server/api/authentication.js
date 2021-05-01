import { Router } from "express";
import crypto from "crypto";
import db from "../db/fileDB.js";
import { USER_ID_COOKIE_NAME, USER_TOKEN_COOKIE_NAME } from "../constants/cookies.js";
import requireUser from "../middleware/requireUser.js";

const signin = (request, response) => {
    const {
        email,
        password,
        remember
    } = request.body;

    if (!email || !password) {
        response.status(400).json({ success: false, message: "Missing email or password" });
    }

    try {
        const user = db.authenticateUser(email, password);

        const userToken = crypto.createHash("sha256").update(user.id).digest("hex");

        const options = remember ? { maxAge: 604800 } : {};
    
        response.cookie(USER_ID_COOKIE_NAME, user.id, options);
        response.cookie(USER_TOKEN_COOKIE_NAME, userToken, { ...options, httpOnly: true });
    
        response.status(200).json({ success: true, firstName: user.firstName, lastName: user.lastName, email: user.email, id: user.id, token: userToken });
    } catch (error) {
        console.error(error);

        response.status(401).json({ success: false, message: "Invalid username/password combination" });
    }
};

const register = (request, response) => {
    const {
        email,
        password
    } = request.body;

    if (!email || !password) {
        response.status(400).json({ success: false, message: "invalid params" });
    }

    db.addUser(request.body);

    response.status(200).json({ success: true });
};

const verify = (request, response) => {
    // requireUser middleware handles failure case
    response.status(200).json({ success: true });
};

export default () => {
    const router = Router();

    router.post('/signin', signin);
    router.post('/verify', requireUser, verify);
    router.post('/register', register);

    return router;
};