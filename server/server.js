import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import finance from "./api/finance.js";
import authenticate from "./api/authentication.js";

const app = express();
const port = process.env.PORT || 5000;

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
            "http://localhost"
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

app.use('*', (request, response) => response.status(404).json({ message: "invalid API route" }));

app.listen(port, () => console.log(`Listening on port ${port}`));