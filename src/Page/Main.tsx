import styled from "styled-components";
import MainHeader from "../Components/MainHeader";

const Container = styled.div`
  position: relative;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  .wrap {
    width: 100%;
    min-height: 100vh;
    height: 100%;
    position: relative;
    z-index: 0;
    top: 0;
    left: 0;
    background-color: gray;
  }
`;

const Main = (): JSX.Element => {
  return (
    <Container>
      <MainHeader />
      <div className="wrap"></div>
    </Container>
  );
};

export default Main;
