import { primary } from "@/lib/colors";
import styled, { css } from "styled-components";

export const ButtonStyle = css`
  border: 0;
  padding: 5px ;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-weight: 400; 
  svg {
    height: 16px;
    margin-right: 5px;
  }
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function ButtonIcon({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
