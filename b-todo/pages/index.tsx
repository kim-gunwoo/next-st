import type { NextPage } from "next";
import styled from "styled-components";

const Home: NextPage = () => {
  return (
    <div>
      Home
      <Styled>test</Styled>
    </div>
  );
};

const Styled = styled.div`
  background-color: red;
`;

export default Home;
