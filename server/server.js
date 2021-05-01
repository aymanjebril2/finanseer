import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";
import finance from "./api/finance.js";
import authenticate from "./api/authentication.js";

const app = express();
const port = process.env.PORT || 5000;

// in production on Heroku - re-route everything to https
if (process.env.NODE_ENV === "production") {
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https') {
            res.redirect('https://' + req.hostname + req.url);
        } else {
            next()
        }
    })
}

// client-side routes and assets
// this is sort-of a hacky workaround for how heroku behaves with react-router
app.use("/", express.static(path.resolve("../client/build")));
app.use("/signup", express.static(path.resolve("../client/build")));
app.use("/login", express.static(path.resolve("../client/build")));
app.use("/about", express.static(path.resolve("../client/build")));
app.use("/team", express.static(path.resolve("../client/build")));
app.use("/forgot-password", express.static(path.resolve("../client/build")));
app.use("/forgot-password-success", express.static(path.resolve("../client/build")));
app.use("/reset-password", express.static(path.resolve("../client/build")));

function removePortIfDev(url) {
    const portRegex = /:[0-9]*$/;
    return url.replace(portRegex, "");
}

app.use(cors({
    origin: (origin, callback) => {
        /*
         * Get rid of port number in dev environment to allow other local apps through. Also, sometimes the origin
         * comes in as the string "null"
        */
        const originToCheck = removePortIfDev(!origin || origin === "null" ? "" : origin);
        const allowlist = [
            ...(process.env.NODE_ENV !== "production" ? [ "http://localhost" ] : []),
            "https://finanseer.herokuapp.com"
        ];

        if (!originToCheck || allowlist.includes(originToCheck)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/finance', finance());
app.use('/api', authenticate());

app.use('*', (request, response) => response.status(302).redirect("/"));

app.listen(port, () => console.log(`Listening on port ${port}`));
