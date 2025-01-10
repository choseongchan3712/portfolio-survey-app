import styled from "styled-components";
import MainHeader from "../Components/main/MainHeader";
import NewPageWrap from "../Components/main/NewPageWrap";
import SavedPageWrap from "../Components/main/SavedPageWrap";

const Container = styled.div`
  position: relative;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  background-color: var(--box-color);
  .wrap {
    width: 100%;
    min-height: 100vh;
    height: 100%;
    position: relative;
    z-index: 0;
    top: 0;
    left: 0;
  }
`;

const Main = (): JSX.Element => {
  return (
    <Container>
      <MainHeader />
      <div className="wrap">
        <NewPageWrap />
        <SavedPageWrap />
      </div>
    </Container>
  );
};

export default Main;
