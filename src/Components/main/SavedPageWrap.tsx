import styled from "styled-components";
import SavedContentsWrap from "./SavedContentsWrap";

const Container = styled.div`
position: relative;
width: 100%;
display: flex;
justify-content: center;
.contents {
  max-width: 1200px;
  width: 100%;
  .title {
    font-size: var(--normal-size);
    color: var(--main-color);
    padding: 20px 0;
  }
}
`;

const SavedPageWrap = ():JSX.Element => {
  return <Container>
    <div className="contents">
      <div className="title">최근 설문지</div>
      <SavedContentsWrap />
    </div>
  </Container>;
};

export default SavedPageWrap;