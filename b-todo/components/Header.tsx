import React from "react";
import styled from "styled-components";

const Header: React.FC = () => {
  return (
    <Container>
      <h1>TodoList</h1>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 52px;
  padding: 0 12px;
  border-bottom: 1px solid ${({ theme }) => theme.gray};

  h1 {
    font-size: 21px;
  }
`;

export default Header;
