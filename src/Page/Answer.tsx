import styled from "styled-components";
import NewPageHeader from "../Components/new_page/NewPageHeader";

const Container = styled.div`
  position: relative;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  background-color: var(--background-color);
`;

const Answer = (): JSX.Element => {
  return (
    <Container>
      <NewPageHeader />
    </Container>
  );
};

export default Answer;
