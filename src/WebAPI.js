import { getToken, setToken } from "./utils";
const baseURL = "https://jsonserver-api.lauviah.io/";

export const getPosts = () => {
  return fetch(baseURL + "posts?_sort=createdAt&_order=desc").then((res) =>
    res.json()
  );
};

export const getMyPosts = (userId) => {
  console.log('getMyPosts', userId);
  return fetch(baseURL + `posts?userId=${userId}&_sort=createdAt&_order=desc`).then((res) =>
    res.json()
  );
};




export const getPost = (id) => {
  return fetch(baseURL + "posts?id=" + id).then((res) => res.json());
};

export const login = (username, password) => {
  return fetch(baseURL + "login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      setToken(json.token);

      return json;
    });
};

export const getMe = () => {
  const token = getToken();
  console.log('getMe', token);
  if (!token) return Promise.reject({ ok: 0, message: "no token" });
  return fetch(baseURL + "me", {
    headers: {
      authorization: "Bearer " + token,
    },
  }).then((res) => res.json());
};

export const register = (nickname, username, password) => {
  return fetch(baseURL + "register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.ok !== 1) throw Error(json.message);
      console.log(json.token);
      setToken(json.token);
      return json;
    })
    .catch((err) => {
      return Promise.reject(err.message);
    });
};

export const createPost = async (title, body) => {
  try {
    const token = getToken();
    if (!token) return Error("no token");

    let postResponse = await fetch(baseURL + "posts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        title,
        body,
      }),
    });
    const postData = await postResponse.json();
    if (typeof postData.ok !== "undefined" && postData.ok === 0)
      throw Error(postData.message);
    return postData;
  } catch (err) {
    return Promise.reject(err.message);
  }
};

export const deletePost = async (id) => {
  try {
    const token = getToken();
    if (!token) return Error("no token");

    const deleteResponse = await fetch(baseURL + "posts/" + id, {
      method: "DELETE",
      headers: {
        authorization: "Bearer " + token,
      },
    });
    const data = await deleteResponse.json();
    return data;
  } catch (err) {
    return Promise.reject(err.message);
  }
};

export const updatePost = async (id, title, body) => {
  try {
    const token = getToken();
    if (!token) return Error("no token");

    if (title.length === 0) throw Error("no title");
    if (body.length === 0) throw Error("no body");
    const deleteResponse = await fetch(baseURL + "posts/" + id, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        title,
        body,
      }),
    });
    const data = await deleteResponse.json();
    return data;
  } catch (err) {
    return Promise.reject(err.message);
  }
};

// 僅刪除測資用
export const deletePosts = (start, end) => {
  const deletePost = async (id, callback) => {
    try {
      const token = getToken();
      if (!token) return Error("no token");

      await fetch(baseURL + "posts/" + id, {
        method: "DELETE",
        headers: {
          authorization: "Bearer " + token,
        },
      });
      callback();
    } catch (err) {
      console.log(err);
    }
  };
  let counter = start;

  const callback = () => {
    counter += 1;
    if (counter > end) return;
    deletePost(counter, callback);
  };
  deletePost(start, callback);
};

