import styled from "styled-components";

const FormWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  > * {
    margin-bottom: 16px;
    
  }

  > div {
    min-width: 300px;

    label {
      display: inline-block;
      min-width: 100px;
      vertical-align:top;
    }

    textarea {
      height: 20em;
    }
  }
`;

const Input = ({ label, value, onChange, type }) => {
  return (
    <div>
      <label for={label}>{label}: </label>
        <input id={label} value={value} onChange={onChange} type={type}/>
    </div>
  );
};

const ErrorMessage = styled.div`
  color: red;
`;

export { FormWrapper, Input, ErrorMessage };
