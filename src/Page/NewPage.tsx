import styled from "styled-components";
import NewPageHeader from "../Components/new_page/NewPageHeader";

const Container = styled.div`
  position: relative;
  z-index: 0;
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  background-color: var(--background-color);
  .wrap {
    width: 100%;
    min-height: 100vh;
    height: 100%;
    padding-top: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const NewPage = (): JSX.Element => {
  return (
    <Container>
      <NewPageHeader />
      <div className="wrap"></div>
    </Container>
  );
};

export default NewPage;
