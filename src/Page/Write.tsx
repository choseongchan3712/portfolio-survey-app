import styled from "styled-components";
import WriteHeader from "../Components/write/WriteHeader";
import { useEffect, useState } from "react";
import {
  AnswerSliceType,
  NewPageType,
  PreviewExplainType,
  PreviewTitleType,
} from "../types";
import { useNavigate, useParams } from "react-router-dom";
import TitleWrap from "../Components/preview/TitleWrap";
import Question from "../Components/preview/Question";
import { useDispatch } from "react-redux";
import { deleteAnswer, resetAnswer } from "../store/answerSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface Props {
  arl: boolean;
  submit: boolean;
}

const Container = styled.div<Props>`
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
  .arl {
    position: fixed;
    z-index: 999;
    top: ${(props) => (props.arl ? "50px" : "0")};
    opacity: ${(props) => (props.arl ? "1" : "0")};
    padding: 25px 20px;
    border-radius: 10px;
    color: red;
    background-color: #ffaaaa;
    border: 1px solid #ff5d5d;
    transition: 0.25s ease-in-out;
    font-size: var(--small-size);
  }
  .submit_success {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: ${(props) => (props.submit ? "flex" : "none")};
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.2);
    .success {
      padding: 25px 20px;
      border-radius: 10px;
      color: #0077ff;
      background-color: #aae7ff;
      border: 1px solid #5d96ff;
    }
  }
`;

const Write = (): JSX.Element => {
  const id = useParams().id;
  const [question, setQuestion] = useState<NewPageType>();
  const [title, setTitle] = useState<PreviewTitleType>();
  const [titleType, setTitleType] = useState<string>("");
  const [submit, setSubmit] = useState<boolean>(false);
  const [explain, setExplain] = useState<PreviewExplainType>();
  const [explainType, setExplainType] = useState<string>("");
  const [arl, setArl] = useState<boolean>(false);
  const answerState = useSelector((state: RootState) => state.answer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState: AnswerSliceType = {
    answers: [{ id: 1, question: "", value: "", isRequired: false }],
  };

  useEffect(() => {
    dispatch(deleteAnswer(initialState));
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

  const submitHandler = () => {
    const postedAnswer = localStorage.getItem("posted_answer");
    const savedAnswer = localStorage.getItem("saved_answer");
    const state = answerState.answers
      .filter((data) => data.isRequired === true)
      .map((data) => data.value)
      .includes("");
    if (state) {
      setArl(true);
    } else if (!state) {
      if (!postedAnswer && savedAnswer) {
        const local = JSON.parse(savedAnswer);
        localStorage.setItem("posted_answer", JSON.stringify(local));
      } else if (postedAnswer && savedAnswer) {
        const saved = JSON.parse(postedAnswer);
        const local = JSON.parse(savedAnswer);
        const update = [...saved, local[0]];
        localStorage.setItem("posted_answer", JSON.stringify(update));
        setSubmit(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    }
  };

  useEffect(() => {
    if (arl === true) {
      setTimeout(() => {
        setArl(false);
      }, 3000);
    }
  }, [arl]);

  return (
    <Container arl={arl} submit={submit}>
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
        <input type="submit" className="submit" onClick={submitHandler} />
        <div className="arl">
          *보라색 박스는 필수 항목입니다. 필수항목을 작성해 주세요
        </div>
        <div className="submit_success">
          <div className="success">
            제출이 성공적으로 완료되었습니다. 홈 화면으로 이동합니다.
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Write;
