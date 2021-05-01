import storage from "./storage.js";

const BACKEND_URL = "http://localhost:5000";

async function post(relativePath, requestBody) {
    const response = await (await window.fetch(`${ BACKEND_URL }${ relativePath }`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-User-Id": storage.getUserId(),
        "X-User-Token": storage.getUserToken()
      },
      credentials: "same-origin",
      body: JSON.stringify(requestBody)
    })).json();
  
    if (!response.success) {
      console.error("Registration Error");
    }

    return response;
}

async function get(relativePath) {
    const response = await (await window.fetch(`${ BACKEND_URL }${ relativePath }`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "X-User-Id": storage.getUserId(),
        "X-User-Token": storage.getUserToken()
      },
      credentials: "same-origin"
    })).json();
  
    if (!response.success) {
      console.error("Registration Error");
    }

    return response;
}

async function del(relativePath, requestBody) {
    const response = await (await window.fetch(`${ BACKEND_URL }${ relativePath }`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "X-User-Id": storage.getUserId(),
        "X-User-Token": storage.getUserToken()
      },
      credentials: "same-origin",
      body: JSON.stringify(requestBody)
    })).json();
  
    if (!response.success) {
      console.error("Registration Error");
    }

    return response;
}

const backend = {
    post,
    get,
    delete: del
};

export default backend;