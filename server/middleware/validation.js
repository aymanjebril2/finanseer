function email(request, response, next) {
    const {
        email
    } = request.body;

    if (!email) {
        response.status(400).json({ success: false, message: "Missing required field 'email'" });

        return;
    }

    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        response.status(400).json({ success: false, message: "Required field 'email' is invalid" });

        return;
    }

    next();
}

function registrationPassword(request, response, next) {
    const {
        password
    } = request.body;

    if (!password) {
        response.status(400).json({ success: false, message: "Missing required field 'password'" });

        return;
    }

    if (password.length < 16) {
        response.status(400).json({ success: false, message: "Required field 'password' must be at least 16 characters" });

        return;
    }

    next();
}

function signInPassword(request, response, next) {
    const {
        password
    } = request.body;

    if (!password) {
        response.status(400).json({ success: false, message: "Missing required field 'password'" });

        return;
    }

    next();
}

function firstName(request, response, next) {
    const {
        firstName
    } = request.body;

    if (!firstName) {
        response.status(400).json({ success: false, message: "Missing required field 'firstName'" });

        return;
    }

    next();
}

function lastName(request, response, next) {
    const {
        lastName
    } = request.body;

    if (!lastName) {
        response.status(400).json({ success: false, message: "Missing required field 'lastName'" });

        return;
    }

    next();
}

const validation = {
    email,
    firstName,
    lastName,
    registrationPassword,
    signInPassword
};

export default validation;
