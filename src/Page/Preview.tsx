import styled from "styled-components";
import PreviewHeader from "../Components/preview/PreviewHeader";
import TitleWrap from "../Components/preview/TitleWrap";
import { NewPageType, PreviewExplainType, PreviewTitleType } from "../types";
import { useEffect, useState } from "react";
import Question from "../Components/preview/Question";

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
    background-color: var(--gray-2);
    color: var(--box-color);
    /* cursor: pointer; */
  }
`;

const Preview = (): JSX.Element => {
  const [question, setQuestion] = useState<NewPageType>();
  const [title, setTitle] = useState<PreviewTitleType>();
  const [titleType, setTitleType] = useState<string>("");
  const [explain, setExplain] = useState<PreviewExplainType>();
  const [explainType, setExplainType] = useState<string>("");

  useEffect(() => {
    const survey = localStorage.getItem("saved_survey");
    if (survey) {
      setQuestion(JSON.parse(survey)[JSON.parse(survey).length - 1].survey);
    }
  }, []);

  useEffect(() => {
    if (question) {
      setTitle(question.survey.title);
      setExplain(question.survey.titleExplain);
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

  return (
    <Container>
      <PreviewHeader />
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
          />
        ))}
        <div className="submit">제출</div>
      </div>
    </Container>
  );
};

export default Preview;
