import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../store/store";
import { useEffect, useRef, useState } from "react";
import InputWrap from "./InputWrap";
import { useDispatch } from "react-redux";
import {
  explainBold,
  explainItalic,
  explainNotBold,
  explainNotItalic,
  explainNotUnderLine,
  explainUnderLine,
  titleBold,
  titleItalic,
  titleNotBold,
  titleNotItalic,
  titleNotUnderLine,
  titleUnderLine,
  wirteTitle,
  writeExplain,
} from "../../store/surveySlice";
import { TextStyleType } from "../../types";

interface IsClicked {
  clicked: boolean;
}

const Container = styled.div<IsClicked>`
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  background-color: var(--box-color);
  border-bottom: 1px solid var(--border-color);
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 3;
    border-radius: 10px;
    box-sizing: border-box;
    transition: 0.25s ease-in-out;
    border: ${(props) =>
      props.clicked
        ? "3px solid var(--sub-color)"
        : "3px solid rgba(0, 0, 0, 0)"};
  }
  &::after {
    content: "";
    position: absolute;
    box-sizing: border-box;
    z-index: 2;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 10px;
    border-top: 10px solid var(--point-color);
  }
  input {
    position: relative;
    z-index: 4;
  }
`;

const TitleWrap = (): JSX.Element => {
  const titleName = useSelector(
    (state: RootState) => state.survey.survey.title.detail
  );
  const explainName = useSelector(
    (state: RootState) => state.survey.survey.titleExplain.detail
  );
  const [isClick, setIsClick] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState<string | null>(null);
  const [explainValue, setExplainValue] = useState<string | null>(null);
  const [titleText, setTitleText] = useState<TextStyleType>({
    isBold: false,
    isItalic: false,
    isUnderLine: false,
  });
  const [explainText, setExplainText] = useState<TextStyleType>({
    isBold: false,
    isItalic: false,
    isUnderLine: false,
  });
  const clickedName = useSelector(
    (state: RootState) => state.newPageClicked.name
  );
  const isWriting = useSelector(
    (state: RootState) => state.isWriting.isWriting
  );

  const tBold = useSelector(
    (state: RootState) => state.survey.survey.title.isBold
  );

  const tItalic = useSelector(
    (state: RootState) => state.survey.survey.title.isItalic
  );

  const tUnderLine = useSelector(
    (state: RootState) => state.survey.survey.title.isUnderLine
  );

  const eBold = useSelector(
    (state: RootState) => state.survey.survey.titleExplain.isBold
  );
  const eItalic = useSelector(
    (state: RootState) => state.survey.survey.titleExplain.isItalic
  );
  const eUnderLine = useSelector(
    (state: RootState) => state.survey.survey.titleExplain.isUnderLine
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (clickedName === "title") {
      setIsClick(true);
    } else {
      setIsClick(false);
    }
  }, [clickedName]);

  useEffect(() => {
    if (titleValue) {
      dispatch(wirteTitle(titleValue));
    } else {
      dispatch(wirteTitle("제목 없는 설문지"));
    }
  }, [titleValue]);

  useEffect(() => {
    if (explainValue) {
      dispatch(writeExplain(explainValue));
    } else {
      dispatch(writeExplain(""));
    }
  }, [explainValue]);

  useEffect(() => {
    if (titleText.isBold === true) {
      dispatch(titleBold());
    } else if (titleText.isBold === false) {
      dispatch(titleNotBold());
    }
  }, [titleText.isBold]);
  useEffect(() => {
    if (titleText.isItalic === true) {
      dispatch(titleItalic());
    } else if (titleText.isItalic === false) {
      dispatch(titleNotItalic());
    }
  }, [titleText.isItalic]);

  useEffect(() => {
    if (titleText.isUnderLine === true) {
      dispatch(titleUnderLine());
    } else if (titleText.isUnderLine === false) {
      dispatch(titleNotUnderLine());
    }
  }, [titleText.isUnderLine]);

  useEffect(() => {
    if (explainText.isBold === true) {
      dispatch(explainBold());
    } else if (explainText.isBold === false) {
      dispatch(explainNotBold());
    }
  }, [explainText.isBold]);
  useEffect(() => {
    if (explainText.isItalic === true) {
      dispatch(explainItalic());
    } else if (explainText.isItalic === false) {
      dispatch(explainNotItalic());
    }
  }, [explainText.isItalic]);

  useEffect(() => {
    if (explainText.isUnderLine === true) {
      dispatch(explainUnderLine());
    } else if (explainText.isUnderLine === false) {
      dispatch(explainNotUnderLine());
    }
  }, [explainText.isUnderLine]);

  return (
    <Container clicked={isClick} className="new_page_title" data-id="title">
      <InputWrap
        dataId="title"
        value={isWriting ? undefined : `${titleName}`}
        size="30px"
        color="var(--main-color)"
        gap="10px"
        holder=""
        bgColor=""
        changeValue={(data) => setTitleValue(data)}
        isTextBold={(data) => setTitleText({ ...titleText, isBold: data })}
        isTextItalic={(data) => setTitleText({ ...titleText, isItalic: data })}
        isTextUnderLine={(data) =>
          setTitleText({ ...titleText, isUnderLine: data })
        }
        bold={tBold}
        italic={tItalic}
        underLine={tUnderLine}
      />
      <InputWrap
        dataId="title"
        value={isWriting ? undefined : `${explainName}`}
        size="var(--small-size)"
        color="var(--gray-4)"
        gap="0"
        holder="설문지 설명"
        bgColor=""
        changeValue={(data) => setExplainValue(data)}
        isTextBold={(data) => setExplainText({ ...explainText, isBold: data })}
        isTextItalic={(data) =>
          setExplainText({ ...explainText, isItalic: data })
        }
        isTextUnderLine={(data) =>
          setExplainText({ ...explainText, isUnderLine: data })
        }
        bold = {eBold}
        italic = {eItalic}
        underLine = {eUnderLine}
      />
    </Container>
  );
};

export default TitleWrap;
