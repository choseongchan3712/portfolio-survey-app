import styled from "styled-components";
import PostedContentsWrap from "./PostedContentsWrap";

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

const PostedPageWrap = (): JSX.Element => {
  return (
    <Container>
      <div className="contents">
        <div className="title">개시된 설문지 작성</div>
        <PostedContentsWrap />
      </div>
    </Container>
  );
};

export default PostedPageWrap;
