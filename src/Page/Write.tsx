import styled from "styled-components";
import WriteHeader from "../Components/write/WriteHeader";
import { useEffect, useState } from "react";
import {
  AnswerSliceType,
  NewPageType,
  PreviewExplainType,
  PreviewTitleType,
} from "../types";
import { useParams } from "react-router-dom";
import TitleWrap from "../Components/preview/TitleWrap";
import Question from "../Components/preview/Question";
import { useDispatch } from "react-redux";
import { resetAnswer } from "../store/answerSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Container = styled.div`
  position: relative;
  z-index: 0;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: var(--background-color);
  display: flex;
  justify-content: center;
  padding-bottom: 80px;
  .wrap {
    position: relative;
    max-width: 800px;
    width: 100%;
    min-height: 100vh;
    padding: 90px 0 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .submit {
    position: relative;
    bottom: -30px;
    padding: 10px 20px;
    border-radius: 10px;
    background-color: var(--point-color);
    color: var(--box-color);
    cursor: pointer;
  }
`;

const Write = (): JSX.Element => {
  const id = useParams().id;
  const [question, setQuestion] = useState<NewPageType>();
  const [title, setTitle] = useState<PreviewTitleType>();
  const [titleType, setTitleType] = useState<string>("");
  const [explain, setExplain] = useState<PreviewExplainType>();
  const [explainType, setExplainType] = useState<string>("");
  const answerState = useSelector((state: RootState) => state.answer);
  const dispatch = useDispatch();

  const initialState: AnswerSliceType = {
    answers: [{ id: 1, question: "", value: "" }],
  };

  useEffect(() => {
    const survey = localStorage.getItem("posted_survey");
    if (survey) {
      setQuestion(
        JSON.parse(survey)?.find((data: any) => data.id === Number(id)).survey
      );
    }
  }, []);

  useEffect(() => {
    if (question) {
      setTitle(question.survey.title);
      setExplain(question.survey.titleExplain);
      if (JSON.stringify(answerState) === JSON.stringify(initialState)) {
        dispatch(resetAnswer(question.survey.question));
      }
    }
  }, [question]);

  useEffect(() => {
    if (title) {
      if (title.isBold) {
        setTitleType("bold");
      } else if (title.isItalic) {
        setTitleType("italic");
      } else if (title.isUnderLine) {
        setTitleType("underline");
      }
    }
  }, [title]);

  useEffect(() => {
    if (explain) {
      if (explain.isBold) {
        setExplainType("bold");
      } else if (explain.isItalic) {
        setExplainType("italic");
      } else if (explain.isUnderLine) {
        setExplainType("underline");
      }
    }
  }, [explain]);

  useEffect(() => {
    const savedAnswer = localStorage.getItem("saved_answer");
    if (
      savedAnswer &&
      JSON.parse(savedAnswer).find((data: any) => data.id === Number(id))
    ) {
      const updateAnswer = JSON.parse(savedAnswer).map((data: any) =>
        data.id === Number(id)
          ? { ...data, answers: answerState.answers }
          : data
      );
      localStorage.setItem("saved_answer", JSON.stringify(updateAnswer));
    } else if (
      savedAnswer &&
      !JSON.parse(savedAnswer).find((data: any) => data.id === Number(id))
    ) {
      const updateAnswer = [
        ...JSON.parse(savedAnswer),
        { id: Number(id), answers: answerState.answers },
      ];
      localStorage.setItem("saved_answer", JSON.stringify(updateAnswer));
    } else if (!savedAnswer) {
      localStorage.setItem(
        "saved_answer",
        JSON.stringify([{ id: Number(id), answers: answerState.answers }])
      );
    }
  }, [answerState]);

  return (
    <Container>
      <WriteHeader />
      <div className="wrap">
        {title && explain ? (
          <TitleWrap
            title={title.detail}
            explain={explain.detail}
            titleType={titleType}
            explainType={explainType}
          />
        ) : (
          <></>
        )}
        {question?.survey.question.map((data, index) => (
          <Question
            key={index}
            name={data.name}
            isBold={data.isBold}
            isItalic={data.isItalic}
            isUnderline={data.isUnderLine}
            isOther={data.isOther}
            isRequired={data.isRequired}
            type={data.type}
            option={data.option}
            id={data.number}
          />
        ))}
        <input type="submit" className="submit" />
      </div>
    </Container>
  );
};

export default Write;
