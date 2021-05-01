import fs from "fs";
import path from "path";
import crypto from "crypto";

const USERS_DB = path.resolve("db/__mock__/users.json");
const ITEMS_DB = path.resolve("db/__mock__/items.json");

if (!fs.existsSync(USERS_DB)) {
    fs.writeFileSync(USERS_DB, JSON.stringify({}));
}

if (!fs.existsSync(ITEMS_DB)) {
    fs.writeFileSync(ITEMS_DB, JSON.stringify({}));
}

function addUser({ email, password, firstName, lastName }) {
    const rawData = fs.readFileSync(USERS_DB);
    const usersTable = JSON.parse(rawData);

    let id = crypto.randomBytes(8).toString("hex");

    while (!!usersTable[id]) {
        id = crypto.randomBytes(8).toString("hex");
    }

    const salt = crypto.randomBytes(8).toString("hex");

    const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    const saltedPassword = hash.digest('hex');

    usersTable[id] = {
        id,
        email,
        firstName,
        lastName,
        salt,
        password: saltedPassword
    };

    fs.writeFileSync(USERS_DB, JSON.stringify(usersTable));
}

function authenticateUser(email, password) {
    const rawData = fs.readFileSync(USERS_DB);
    const userTable = JSON.parse(rawData);

    const userCandidate = Object.values(userTable).find(({ email: userEmail }) => email === userEmail);

    if (!userCandidate) {
        throw new Error("user not found");
    }

    const {
        salt,
        password: storedPassword
    } = userCandidate;

    const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    const saltedPassword = hash.digest('hex');

    if (saltedPassword !== storedPassword) {
        throw new Error("password mismatch");
    }

    return {
        id: userCandidate.id,
        email,
        firstName: userCandidate.firstName,
        lastName: userCandidate.lastName
    };
}

function getUserByEmail(email) {
    const rawData = fs.readFileSync(USERS_DB);
    const userTable = JSON.parse(rawData);

    const userCandidate = Object.values(userTable).find(({ email: userEmail }) => email === userEmail);

    if (!userCandidate) {
        throw new Error("user not found");
    }

    return userCandidate;
}

function resetUserPassword(email, password, token) {
    const rawData = fs.readFileSync(USERS_DB);
    const userTable = JSON.parse(rawData);

    const userCandidate = Object.values(userTable).find(({ email: userEmail }) => email === userEmail);

    if (!userCandidate) {
        throw new Error("user not found");
    }

    if (token !== userCandidate.salt) {
        throw new Error("reset password token is invalid");
    }

    const salt = crypto.randomBytes(8).toString("hex");
    const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    const saltedPassword = hash.digest('hex');

    userTable[userCandidate.id] = {
        ...userCandidate,
        salt,
        password: saltedPassword
    };

    fs.writeFileSync(USERS_DB, JSON.stringify(userTable));
}

function addItem(userId, { name, amount, timestamp, category }) {
    const rawData = fs.readFileSync(ITEMS_DB);
    const itemsTable = JSON.parse(rawData);

    let id = crypto.randomBytes(8).toString("hex");

    while (!!itemsTable[id]) {
        id = crypto.randomBytes(8).toString("hex");
    }

    itemsTable[id] = {
        id,
        userId,
        name,
        amount,
        timestamp,
        category
    };

    fs.writeFileSync(ITEMS_DB, JSON.stringify(itemsTable));
}

function getItems(userId) {
    const rawData = fs.readFileSync(ITEMS_DB);
    const itemsTable = JSON.parse(rawData);

    return Object.values(itemsTable).filter(({ userId: itemUserId }) => itemUserId === userId);
}

function getMonthlyItems(userId, month, year) {
    const rawData = fs.readFileSync(ITEMS_DB);
    const itemsTable = JSON.parse(rawData);

    return Object.values(itemsTable).filter(({ userId: itemUserId, timestamp }) => {
        const itemDate = new Date(timestamp);

        return itemUserId === userId
            && itemDate.getFullYear() === year
            && itemDate.getMonth() === month;
    });
}

function deleteItem(userId, itemId) {
    const rawData = fs.readFileSync(ITEMS_DB);
    const itemsTable = JSON.parse(rawData);

    const item = Object.values(itemsTable).find((item) => item.id === itemId && item.userId === userId);

    if (!item) {
        throw new Error("Item to delete not found");
    }

    delete itemsTable[itemId];

    fs.writeFileSync(ITEMS_DB, JSON.stringify(itemsTable));
}

export default {
    addUser,
    authenticateUser,
    getUserByEmail,
    resetUserPassword,
    addItem,
    getItems,
    getMonthlyItems,
    deleteItem
};
