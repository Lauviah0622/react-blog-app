import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/auth/authSlice";

import { FormWrapper, Input, ErrorMessage } from "../../components/Form";

import useErrorMessage from "../../hooks/useErrorMessage";
import useLoginRedirect from "../../hooks/useLoginRedirect";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errMessage = useErrorMessage();

  const history = useHistory();
  const dispatch = useDispatch();
  useLoginRedirect(null, () => {
    history.push("/");
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password)).then((resolve) => {
      history.push("/");
    });
  };

  console.log(username, password);
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <FormWrapper>
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
        </FormWrapper>
      </form>
      <ErrorMessage>{errMessage}</ErrorMessage>
    </>
  );
}
