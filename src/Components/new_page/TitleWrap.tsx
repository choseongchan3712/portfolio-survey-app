import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import InputWrap from "./InputWrap";

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
  const [isClick, setIsClick] = useState<boolean>(false);
  const clickedName = useSelector(
    (state: RootState) => state.newPageClicked.name
  );

  useEffect(() => {
    if (clickedName === "title") {
      setIsClick(true);
    } else {
      setIsClick(false);
    }
  }, [clickedName]);

  return (
    <Container clicked={isClick} className="new_page_title" data-id="title">
      <InputWrap
        dataId="title"
        value="제목 없는 설문지"
        size="30px"
        color="var(--main-color)"
        gap="10px"
      />
      <InputWrap
        dataId="title"
        value="설문지 설명"
        size="var(--small-size)"
        color="var(--gray-4)"
        gap="0"
      />
    </Container>
  );
};

export default TitleWrap;
