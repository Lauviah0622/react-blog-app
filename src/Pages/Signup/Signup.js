import { useState } from "react";
import { register } from "../../WebAPI";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import { getMeData, clearUserData } from "../../redux/features/auth/authSlice";
import { fetchData } from "../../redux/features/fetch/fetchSlice";

import { FormWrapper, Input, ErrorMessage } from "../../components/Form";

import useErrorMessage from "../../hooks/useErrorMessage";
import useLoginRedirect from "../../hooks/useLoginRedirect";

export default function Signup() {
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const errMessage = useErrorMessage();
  const history = useHistory();
  const dispatch = useDispatch();

  useErrorMessage();
  // 如果登入狀態辦帳號，就會自動登出，只在第一次進入的時候驗證

  useLoginRedirect(null, () => {
    console.log("sign up login");
    dispatch(clearUserData());
  });

  const handleFormSubmit = () => {
    dispatch(fetchData(() => register(nickname, username, password))).then(
      () => {
        history.push("/");
        return dispatch(getMeData());
      }
    );
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <FormWrapper>
      <Input
            label="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        <Input
            label="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        <Input
            label="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
          />
        <button>submit</button>
        <ErrorMessage>{errMessage}</ErrorMessage>
      </FormWrapper>
    </form>
  );
}

// ame: "我是 user01"
// password: "Lidemy"
// username: "user01"
