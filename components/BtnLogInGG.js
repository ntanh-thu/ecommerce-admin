import styled from "styled-components";
import GoogleIcon from "./icons/Google";

const ButtonStyle = styled.button`
  display: flex;
  align-items: center;
`;

export default function BtnLogInGG() {
  return (
    <ButtonStyle>
      <GoogleIcon height={24} width={24} />
    </ButtonStyle>
  );
}
