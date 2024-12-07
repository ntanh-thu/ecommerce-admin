import { useState } from "react";
import OpenEyeIcon from "../icons/OpenEye";
import SlashEyeIcon from "../icons/CloseEye";
import styled from "styled-components";

const FieldsetStyle = styled.div``;

const FieldPassword = ({ onChange = () => {} }) => {
  const [show, setShow] = useState(false);
  return (
    <FieldsetStyle>
      <input type={show ? "text" : "password"} onChange={onChange} />
      {show ? (
        <OpenEyeIcon
          onClick={() => {
            setShow(!show);
          }}
        />
      ) : (
        <SlashEyeIcon
          onClick={() => {
            setShow(!show);
          }}
        />
      )}
    </FieldsetStyle>
  );
};

export default FieldPassword;
