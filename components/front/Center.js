import styled from "styled-components";

const StyleDiv = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export default function Center({ children }) {
  return <StyleDiv>{children}</StyleDiv>;
}
