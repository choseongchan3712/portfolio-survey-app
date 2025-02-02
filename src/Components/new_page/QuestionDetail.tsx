import styled from "styled-components";
import InputWrap from "./InputWrap";
import Short from "./Short";
import Long from "./Long";
import OptionWrap from "./OptionWrap";
import { ChangeEvent, useEffect, useState } from "react";
import { QuestionDetailType, TextStyleType } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { questionChange } from "../../store/surveySlice";

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .title_wrap {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .input_wrap {
      width: 70%;
    }
    select {
      width: 20%;
      padding: 5px;
      font-size: var(--normal-size);
      color: var(--main-color);
      border: 1px solid var(--border-color);
    }
  }
`;

const QuestionDetail = ({
  dataId,
  clicked,
}: QuestionDetailType): JSX.Element => {
  const [question, setQuestion] = useState<string | null>(null);
  const [questionType, setQuestionType] = useState<string>("choice");
  const [questionValue, setQuestionvalue] = useState<string>();
  const [textStyle, setTextStyle] = useState<TextStyleType>({
    isBold: false,
    isItalic: false,
    isUnderLine: false,
  });

  const isWriting = useSelector(
    (state: RootState) => state.isWriting.isWriting
  );
  const questions = useSelector(
    (state: RootState) => state.survey.survey.question
  );
  const type = useSelector(
    (state: RootState) =>
      state.survey.survey.question.find(
        (data) => data.number === Number(dataId.match(/\d+/)?.[0])
      )?.type
  );

  const bold = useSelector((state: RootState) =>
    state.survey.survey.question.find(
      (data) => data.number === Number(dataId.match(/\d+/)?.[0])
    )
  )?.isBold ?? false;
  const italic = useSelector((state: RootState) =>
    state.survey.survey.question.find(
      (data) => data.number === Number(dataId.match(/\d+/)?.[0])
    )
  )?.isItalic ?? false;
  const underLine = useSelector((state: RootState) =>
    state.survey.survey.question.find(
      (data) => data.number === Number(dataId.match(/\d+/)?.[0])
    )
  )?.isUnderLine ?? false;

  const dispatch = useDispatch();

  useEffect(() => {
    if (question) {
      const updatedQuestions = questions.map((data) =>
        data.number === Number(dataId.match(/\d+/)?.[0])
          ? { ...data, name: question }
          : data
      );
      dispatch(questionChange(updatedQuestions));
    } else {
      const updatedQuestions = questions.map((data) =>
        data.number === Number(dataId.match(/\d+/)?.[0])
          ? { ...data, name: "" }
          : data
      );
      dispatch(questionChange(updatedQuestions));
    }
  }, [question]);

  useEffect(() => {
    const nowName = questions.find(
      (data) => data.number === Number(dataId.match(/\d+/)?.[0])
    )?.name;
    if (nowName) {
      setQuestionvalue(nowName);
    } else {
      setQuestionvalue("");
    }
  }, [questions]);

  const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setQuestionType(e.target.value);
  };

  useEffect(() => {
    if (questionType === "short") {
      const updatedQuestions = questions.map((data) =>
        data.number === Number(dataId.match(/\d+/)?.[0])
          ? { ...data, type: questionType, option: [] }
          : data
      );
      dispatch(questionChange(updatedQuestions));
    }
    if (questionType === "long") {
      const updatedQuestions = questions.map((data) =>
        data.number === Number(dataId.match(/\d+/)?.[0])
          ? { ...data, type: questionType, option: [] }
          : data
      );
      dispatch(questionChange(updatedQuestions));
    }
    if (questionType === "choice") {
      const updatedQuestions = questions.map((data) =>
        data.number === Number(dataId.match(/\d+/)?.[0])
          ? { ...data, type: questionType }
          : data
      );
      dispatch(questionChange(updatedQuestions));
    }

    if (questionType === "check") {
      const updatedQuestions = questions.map((data) =>
        data.number === Number(dataId.match(/\d+/)?.[0])
          ? { ...data, type: questionType }
          : data
      );
      dispatch(questionChange(updatedQuestions));
    }

    if (questionType === "drop") {
      const updatedQuestions = questions.map((data) =>
        data.number === Number(dataId.match(/\d+/)?.[0])
          ? { ...data, isOther: false, type: questionType }
          : data
      );
      dispatch(questionChange(updatedQuestions));
    }
  }, [questionType]);

  useEffect(() => {
    if (textStyle.isBold === true) {
      const updatedQuestions = questions.map((data) =>
        data.number === Number(dataId.match(/\d+/)?.[0])
          ? { ...data, isBold: true }
          : data
      );
      dispatch(questionChange(updatedQuestions));
    } else if (textStyle.isBold === false) {
      const updatedQuestions = questions.map((data) =>
        data.number === Number(dataId.match(/\d+/)?.[0])
          ? { ...data, isBold: false }
          : data
      );
      dispatch(questionChange(updatedQuestions));
    }
  }, [textStyle.isBold]);

  useEffect(() => {
    if (textStyle.isItalic === true) {
      const updatedQuestions = questions.map((data) =>
        data.number === Number(dataId.match(/\d+/)?.[0])
          ? { ...data, isItalic: true }
          : data
      );
      dispatch(questionChange(updatedQuestions));
    } else if (textStyle.isItalic === false) {
      const updatedQuestions = questions.map((data) =>
        data.number === Number(dataId.match(/\d+/)?.[0])
          ? { ...data, isItalic: false }
          : data
      );
      dispatch(questionChange(updatedQuestions));
    }
  }, [textStyle.isItalic]);

  useEffect(() => {
    if (textStyle.isUnderLine === true) {
      const updatedQuestions = questions.map((data) =>
        data.number === Number(dataId.match(/\d+/)?.[0])
          ? { ...data, isUnderLine: true }
          : data
      );
      dispatch(questionChange(updatedQuestions));
    } else if (textStyle.isUnderLine === false) {
      const updatedQuestions = questions.map((data) =>
        data.number === Number(dataId.match(/\d+/)?.[0])
          ? { ...data, isUnderLine: false }
          : data
      );
      dispatch(questionChange(updatedQuestions));
    }
  }, [textStyle.isUnderLine]);

  return (
    <Container data-id={dataId}>
      <div className="title_wrap" data-id={dataId}>
        <div className="input_wrap" data-id={dataId}>
          <InputWrap
            dataId={dataId}
            value={isWriting ? undefined : `${questionValue}`}
            size="var(--normal-size)"
            color="var(--main-color)"
            gap="0"
            holder="질문"
            bgColor="var(--gray-1)"
            changeValue={(data) => setQuestion(data)}
            isTextBold={(data) => setTextStyle({ ...textStyle, isBold: data })}
            isTextItalic={(data) =>
              setTextStyle({ ...textStyle, isItalic: data })
            }
            isTextUnderLine={(data) =>
              setTextStyle({ ...textStyle, isUnderLine: data })
            }
            bold = {bold}
            italic = {italic}
            underLine = {underLine}
          />
        </div>
        <select data-id={dataId} onChange={changeHandler} value={type}>
          <option value="short" data-id={dataId}>
            단답형
          </option>
          <option value="long" data-id={dataId}>
            장문형
          </option>
          <option value="choice" data-id={dataId}>
            객관식 질문
          </option>
          <option value="check" data-id={dataId}>
            체크박스
          </option>
          <option value="drop" data-id={dataId}>
            드롭다운
          </option>
        </select>
      </div>
      {type === "short" ? (
        <Short data-id={dataId} />
      ) : type === "long" ? (
        <Long data-id={dataId} />
      ) : (
        <OptionWrap
          dataId={dataId}
          questionType={questionType}
          clicked={clicked}
        />
      )}
    </Container>
  );
};

export default QuestionDetail;
