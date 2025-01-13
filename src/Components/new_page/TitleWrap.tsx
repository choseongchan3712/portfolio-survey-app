import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import InputWrap from "./InputWrap";
import { useDispatch } from "react-redux";
import { wirteTitle, writeExplain } from "../../store/surveySlice";

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
  const [isClick, setIsClick] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState<string>();
  const [explainValue, setExplainValue] = useState<string>();
  const clickedName = useSelector(
    (state: RootState) => state.newPageClicked.name
  );
  const isWriting = useSelector(
    (state: RootState) => state.isWriting.isWriting
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
    }
  }, [titleValue]);

  useEffect(() => {
    if (explainValue) {
      dispatch(writeExplain(explainValue));
    }
  }, [explainValue]);

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
      />
      <InputWrap
        dataId="title"
        value=""
        size="var(--small-size)"
        color="var(--gray-4)"
        gap="0"
        holder="설문지 설명"
        bgColor=""
        changeValue={(data) => setExplainValue(data)}
      />
    </Container>
  );
};

export default TitleWrap;
