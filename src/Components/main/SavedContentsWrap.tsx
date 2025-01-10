import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  min-height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--box-color);
  .no_contents {
    width: 100%;
    min-height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px var(--border-color);
    .heading {
      color: var(--main-color);
      font-size: var(--normal-size);
      padding-bottom: 15px;
      font-weight: 400;
    }
    .detail {
      color: var(--gray-4);
      font-size: var(--small-size);
    }
  }
`;

const SavedContentsWrap = (): JSX.Element => {
  return (
    <Container>
      <div className="no_contents">
        <div className="heading">설문지 없음</div>
        <div className="detail">
          위에서 새 설문지 작성을 클릭하여 시작하세요.
        </div>
      </div>
    </Container>
  );
};

export default SavedContentsWrap;
