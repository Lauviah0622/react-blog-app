import styled from 'styled-components';

const setToken = (token) => localStorage.setItem("token", token);

const getToken = () => {
  console.log(localStorage['token']);
  return localStorage.getItem("token")
};

export {
    setToken,
    getToken
}