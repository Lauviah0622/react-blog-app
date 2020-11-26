import styled from 'styled-components';


const setToken = (token) => localStorage.setItem("token", token);

const getToken = () => localStorage.getItem("token");

const ErrorMessage = styled.div`
  color: red;
`;
export {
    setToken,
    getToken,
    ErrorMessage
}