import styled from "styled-components";
import { InputWrapType } from "../../types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  clicked: boolean;
  size: string;
  color: string;
  gap: string;
  focus: boolean;
  bold: boolean;
  italic: boolean;
  underline: boolean;
}

const Container = styled.div<Props>`
  position: relative;
  z-index: 4;
  width: 100%;

  padding-bottom: ${(props) => props.gap};
  input {
    position: relative;
    z-index: 5;
    width: 100%;
    padding: 10px 0;
    color: ${(props) => props.color};
    font-size: ${(props) => props.size};
    border-bottom: ${(props) =>
      props.focus
        ? "2px solid var(--point-color)"
        : props.clicked
        ? "1px solid var(--border-color)"
        : "unset"};
    font-weight: ${(props) => (props.bold ? "bold" : "normal")};
    font-style: ${(props) => (props.italic ? "italic" : "normal")};
    text-decoration: ${(props) => (props.underline ? "underline" : "none")};
  }
  .text_menu {
    padding-top: 5px;
    display: ${(props) => (props.focus ? "flex" : "none")};
    div {
      font-size: 16px;
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--gray-4);
      border-radius: 10%;
      cursor: pointer;
      transition: 0.25s ease-in-out;
      &:hover {
        color: var(--main-color);
        background-color: var(--border-color);
      }
    }
    .bold {
      color: ${(props) => (props.bold ? "var(--main-color)" : "var(--gray-4)")};
      background-color: ${(props) =>
        props.bold ? "var(--border-color)" : "unset"};
    }
    .italic {
      color: ${(props) =>
        props.italic ? "var(--main-color)" : "var(--gray-4)"};
      background-color: ${(props) =>
        props.italic ? "var(--border-color)" : "unset"};
    }
    .underline {
      color: ${(props) =>
        props.underline ? "var(--main-color)" : "var(--gray-4)"};
      background-color: ${(props) =>
        props.underline ? "var(--border-color)" : "unset"};
    }
  }
`;

const InputWrap = ({
  dataId,
  value,
  size,
  color,
  gap,
}: InputWrapType): JSX.Element => {
  const [isClick, setIsClick] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [isUnderline, setIsUnderline] = useState<boolean>(false);
  const [paClick, setPaClick] = useState<boolean>(false);

  const clickedName = useSelector(
    (state: RootState) => state.newPageClicked.name
  );

  useEffect(() => {
    if (clickedName === `${dataId}`) {
      setIsClick(true);
    } else {
      setIsClick(false);
    }
  }, [clickedName]);

  const focusHandler = () => {
    setIsFocus(true);
  };

  const blurHandler = () => {
    setIsFocus(false);
  };

  const boldHandler = () => {
    if (isBold === false) {
      setIsBold(true);
    } else {
      setIsBold(false);
    }
  };

  const italicHandler = () => {
    if (isItalic === false) {
      setIsItalic(true);
    } else {
      setIsItalic(false);
    }
  };

  const underlineHandler = () => {
    if (isUnderline === false) {
      setIsUnderline(true);
    } else {
      setIsUnderline(false);
    }
  };

  const mouseDownHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <Container
      clicked={isClick}
      size={size}
      color={color}
      gap={gap}
      focus={isFocus}
      bold={isBold}
      italic={isItalic}
      underline={isUnderline}
      data-id={dataId}
    >
      <input
        type="text"
        value={value}
        data-id={dataId}
        onFocus={focusHandler}
        onBlur={blurHandler}
      />
      <div
        className="text_menu"
        onMouseDown={mouseDownHandler}
        data-id={dataId}
      >
        <div onClick={boldHandler} className="bold" data-id={dataId}>
          <FontAwesomeIcon icon={faBold} data-id={dataId} />
        </div>
        <div onClick={italicHandler} className="italic" data-id={dataId}>
          <FontAwesomeIcon icon={faItalic} data-id={dataId} />
        </div>
        <div onClick={underlineHandler} className="underline" data-id={dataId}>
          <FontAwesomeIcon icon={faUnderline} data-id={dataId} />
        </div>
      </div>
    </Container>
  );
};

export default InputWrap;
