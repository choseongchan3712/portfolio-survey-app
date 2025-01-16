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
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { NewPageType } from "../types";
import { pushSurvey } from "../store/surveySlice";
import { useParams } from "react-router-dom";

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
    padding-bottom: 50px;
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

const SavedPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const survey = useSelector((state: RootState) => state.survey);
  const [isReload, setIsReload] = useState<boolean>();
  const id = useParams().id;
  const initialState: NewPageType = {
    survey: {
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
    const saved = localStorage.getItem("saved_survey");
    if (saved) {
      const needSurvey = JSON.parse(saved).find(
        (data: any) => data.id === Number(id)
      );
      dispatch(pushSurvey(needSurvey.survey));
    }

    if (!sessionStorage.getItem("reload")) {
      setIsReload(false);
    } else if (sessionStorage.getItem("reload")) {
      setIsReload(true);
    }
  }, []);

  useEffect(() => {
    if (JSON.stringify(survey) !== JSON.stringify(initialState)) {
      localStorage.setItem("new_survey", JSON.stringify(survey));
    }

    const saved = localStorage.getItem("saved_survey");

    if (isReload === true) {
      if (saved) {
        const updateData = JSON.parse(saved).map((data: any) =>
          data.id === Number(id) ? { ...data, survey } : data
        );
        localStorage.setItem("saved_survey", JSON.stringify(updateData));
      }
    } else if (isReload === false) {
      if (saved && JSON.stringify(survey) !== JSON.stringify(initialState)) {
        const updateData = JSON.parse(saved).map((data: any) =>
          data.id === Number(id) ? { ...data, survey } : data
        );
        localStorage.setItem("saved_survey", JSON.stringify(updateData));
        console.log(updateData);
      }
    }
  }, [survey]);

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (target.dataset.id === "title") {
      dispatch(titleClicked());
    } else if (target.dataset.id?.includes("question_")) {
      dispatch(answerClicked(`${target.dataset.id}`));
    } else {
      dispatch(spaceClicked());
    }
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

export default SavedPage;
