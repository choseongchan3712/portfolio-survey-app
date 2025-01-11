import styled from "styled-components";
import NewPageHeader from "../Components/new_page/NewPageHeader";
import TitleWrap from "../Components/new_page/TitleWrap";
import { useDispatch } from "react-redux";
import {
  answerClicked,
  spaceClicked,
  titleClicked,
} from "../store/newPageClickedSlice";
import QuestionWrap from "../Components/new_page/QuestionWrap";

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
    align-items: flex-start;
    justify-content: center;
    .contents {
      max-width: 800px;
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
`;

const NewPage = (): JSX.Element => {
  const dispatch = useDispatch();

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (target.dataset.id === "title") {
      dispatch(titleClicked());
    } else if (target.dataset.id?.includes("answer_")) {
      dispatch(answerClicked(`answer_${1}`));
    } else {
      dispatch(spaceClicked());
    }

    console.log(target.dataset.id);
  };

  return (
    <Container onClick={clickHandler}>
      <NewPageHeader />
      <div className="wrap">
        <div className="contents">
          <TitleWrap />
          <QuestionWrap />
        </div>
      </div>
    </Container>
  );
};

export default NewPage;
