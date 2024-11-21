import Link from "next/link";
import styled from "styled-components";
import { ButtonStyle } from "./Button";

const StyledLink = styled(Link)`
  ${ButtonStyle}
`;

export function ButtonLink({ children, className, ...rest }) {
  return (
    <StyledLink className={className} {...rest}>
      {children}
    </StyledLink>
  );
}
