import styled from "styled-components";
import MainHeader from "../Components/main/MainHeader";
import NewPageWrap from "../Components/main/NewPageWrap";
import SavedPageWrap from "../Components/main/SavedPageWrap";
import { useEffect } from "react";
import { NewPageType } from "../types";
import { useDispatch } from "react-redux";
import { pushSurvey } from "../store/surveySlice";

const Container = styled.div`
  position: relative;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  height: 100%;
  background-color: var(--box-color);
  padding-bottom: 40px;
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
  const dispatch = useDispatch();
  const initialState: NewPageType = {
    survey: {
      isPost: false,
      title: {
        detail: "제목 없는 설문지",
        isItalic: false,
        isBold: false,
        isUnderLine: false,
      },
      titleExplain: {
        detail: "",
        isItalic: false,
        isBold: false,
        isUnderLine: false,
      },
      question: [
        {
          number: 1,
          name: "",
          isItalic: false,
          isBold: false,
          isUnderLine: false,
          type: "choice",
          option: [{ number: 1, name: "옵션1" }],
          isOther: false,
          isRequired: false,
        },
      ],
    },
  };
  useEffect(() => {
    sessionStorage.removeItem("reload");
    localStorage.setItem("new_survey", JSON.stringify(initialState));
    dispatch(pushSurvey(initialState));
  }, []);

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
