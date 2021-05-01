import { Router } from "express";
import crypto from "crypto";
import db from "../db/fileDB.js";
import { USER_ID_COOKIE_NAME, USER_TOKEN_COOKIE_NAME } from "../constants/cookies.js";
import requireUser from "../middleware/requireUser.js";
import validate from "../middleware/validation.js";

const signin = (request, response) => {
    const {
        email,
        password,
        remember
    } = request.body;

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

const forgotPassword = (request, response) => {
    const {
        email
    } = request.body;

    let token = crypto.randomBytes(8).toString("hex");

    try {
        //TODO: email the user with a link to reset password page with some sort of key
        token = db.getUserByEmail(email).salt;
        // sendEmail(email, token);

        console.info("Reset password token", token);
    } catch (error) {
        // We don't return the error to the user as that indicates an account does not exist
    }

    response.status(200).json({ success: true, token });
};

const resetPassword = (request, response) => {
    const {
        email,
        password,
        token
    } = request.body;

    try {
        db.resetUserPassword(email, password, token);

        response.status(200).json({ success: true });
    } catch (error) {
        console.error(error);

        response.status(400).json({ success: false, message: error.message });
    }
};

const logout = (request, response) => {
    response.clearCookie(USER_ID_COOKIE_NAME);
    response.clearCookie(USER_TOKEN_COOKIE_NAME);
    response.status(200).send({ success: true });
};

export default () => {
    const router = Router();

    router.post('/signin', validate.email, validate.signInPassword, signin);
    router.post('/register', validate.email, validate.registrationPassword, validate.firstName, validate.lastName, register);
    router.post('/verify', requireUser, verify);
    router.delete('/logout', logout);
    router.post('/forgot-password', validate.email, forgotPassword);
    router.post('/reset-password', validate.email, validate.registrationPassword, resetPassword);

    router.use('*', (request, response) => response.status(404).json({ message: "invalid API route" }));

    return router;
};
