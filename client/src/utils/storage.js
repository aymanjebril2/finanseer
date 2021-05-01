function setAuthTokens(userId, userToken, remember = false) {
    localStorage.setItem("user-id", JSON.stringify({ value: userId, remember, timestamp: new Date().getTime() }));
    localStorage.setItem("user-token", userToken);
}

function setUserInfo(email, firstName, lastName) {
    localStorage.setItem("user-info", JSON.stringify({ email, firstName, lastName }));
}

function checkForLoggedInUser() {
    const storedId = localStorage.getItem("user-id");

    if (!storedId) {
        localStorage.removeItem("user-token");
        localStorage.removeItem("user-info");

        return;
    }

    const { remember, timestamp } = JSON.parse(storedId);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (!remember && timestamp < yesterday.getTime()) {
        localStorage.removeItem("user-id");
        localStorage.removeItem("user-token");
        localStorage.removeItem("user-info");
    }
}

function getUserId() {
    const storedId = localStorage.getItem("user-id");

    if (!storedId) {
        return;
    }

    return JSON.parse(storedId).value;
}

function getUserToken() {
    return localStorage.getItem("user-token");
}

function getUserInfo() {
    const storedInfo = localStorage.getItem("user-info");

    if (!storedInfo) {
        return;
    }

    return JSON.parse(storedInfo);
}

const storage = {
    setAuthTokens,
    setUserInfo,
    checkForLoggedInUser,
    getUserId,
    getUserToken,
    getUserInfo
};

export default storage;
