import styled from "styled-components";
import { QuestionType } from "../../types";
import { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import QuestionDetail from "./QuestionDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faGrip,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { questionChange } from "../../store/surveySlice";

interface Props {
  required: boolean;
  isDragging: boolean;
  clicked: boolean;
}

const Container = styled.div<Props>`
  position: relative;
  z-index: 1;
  margin-top: 20px;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  background-color: var(--box-color);
  opacity: ${(props) => (props.isDragging ? "0.8" : "1")};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &::before {
    content: "";
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 10px;
    box-sizing: border-box;
    transition: 0.25s ease-in-out;
    border: ${(props) =>
      props.clicked
        ? "3px solid var(--sub-color)"
        : "3px solid rgba(0, 0, 0, 0)"};
  }
  .drag {
    position: absolute;
    top: 2px;
    left: 50%;
    transform: translateX(-50%);
    color: var(--gray-2);
  }
  .bottom_wrap {
    width: 100%;
    display: ${(props) => (props.clicked ? "flex" : "none")};
    align-items: center;
    justify-content: flex-end;
    padding: 10px 0 0 0;
    border-top: 1px solid var(--border-color);
    .menu_wrap {
      padding-right: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: var(--normal-size);
      color: var(--gray-4);
      border-right: 1px solid var(--border-color);
      div {
        position: relative;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 30px;
        transition: 0.25s ease-in-out;
        cursor: pointer;
        &:hover {
          background-color: var(--gray-1);
        }
      }
      .copy {
        margin-right: 10px;
        &::after {
          content: "복사하기";
          position: absolute;
          font-size: 10px;
          left: 50%;
          bottom: -10px;
          transform: translateX(-50%);
          display: flex;
          padding: 5px;
          align-items: center;
          justify-content: center;
          width: 40px;
          background-color: var(--gray-4);
          color: var(--box-color);
          border-radius: 10%;
          transition: 0.25s ease-in-out;
          opacity: 0;
        }
        &:hover::after {
          opacity: 1;
          bottom: -23px;
        }
      }
      .delete {
        margin-right: 10px;
        &::after {
          content: "삭제하기";
          position: absolute;
          font-size: 10px;
          left: 50%;
          bottom: -10px;
          transform: translateX(-50%);
          display: flex;
          padding: 5px;
          align-items: center;
          justify-content: center;
          width: 40px;
          background-color: var(--gray-4);
          color: var(--box-color);
          border-radius: 10%;
          transition: 0.25s ease-in-out;
          opacity: 0;
        }
        &:hover::after {
          opacity: 1;
          bottom: -23px;
        }
      }
    }
    .required {
      font-size: var(--normal-size);
      color: var(--gray-4);
      display: flex;
      align-items: center;
      justify-content: space-between;
      .text {
        padding: 0 10px 0 20px;
      }
      .toggle {
        position: relative;
        width: 40px;
        height: 13px;
        border-radius: 13px;
        background-color: ${(props) =>
          props.required ? "var(--background-color)" : "var(--gray-2)"};
        .button {
          cursor: pointer;
          position: absolute;
          width: 20px;
          height: 20px;
          left: 0;
          top: 50%;
          transform: ${(props) =>
            props.required
              ? "translateY(-50%) translateX(100%)"
              : "translateY(-50%) translateX(0)"};
          background-color: ${(props) =>
            props.required ? "var(--point-color)" : "var(--box-color)"};
          border-radius: 15px;
          box-shadow: 0 0 2px 1px;
          transition: 0.25s ease-in-out;
        }
      }
    }
  }
  .plus_box {
    position: absolute;
    top: 0;
    right: -55px;
    width: 45px;
    height: 200px;
    display: ${(props) => (props.clicked ? "flex" : "none")};
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: var(--box-color);
    border: 1px solid var(--border-color);
    cursor: pointer;
    transition: 0.25s ease-in-out;
    &::after {
      content: "추가하기";
      position: absolute;
      right: 0;
      font-size: 10px;
      color: var(--box-color);
      padding: 5px;
      background-color: var(--gray-4);
      border-radius: 5px;
      transition: 0.25s ease-in-out;
      opacity: 0;
    }
    &:hover {
      background-color: var(--gray-1);
    }
    &:hover::after {
      right: -50px;
      opacity: 1;
    }
    .plus_button {
      width: 30px;
      height: 30px;
      border-radius: 30px;
      border: 2px solid var(--gray-4);
      color: var(--gray-4);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
const DragHandle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  border-radius: 10px 10px 0 0;
`;

const Question = ({
  id,
  index,
  moveItem,
  dataId,
}: QuestionType): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const copyRef = useRef<SVGSVGElement>(null);
  const deleteRef = useRef<SVGSVGElement>(null);
  const [isrequired, setIsrequired] = useState<boolean>(false);
  const [isClick, setIsClick] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const clickedName = useSelector(
    (state: RootState) => state.newPageClicked.name
  );
  const questions = useSelector(
    (state: RootState) => state.survey.survey.question
  );

  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: "QUESTION",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "QUESTION",
    hover(item: { index: number }) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drop(ref);

  const toggleHandler = () => {
    if (isrequired === false) {
      setIsrequired(true);
    } else {
      setIsrequired(false);
    }
  };

  useEffect(() => {
    if (clickedName === ref.current?.dataset.id) {
      setIsClick(true);
    } else {
      setIsClick(false);
    }
  }, [clickedName]);

  const onHandler = () => {
    setIsHover(true);
  };

  const outHandler = () => {
    setIsHover(false);
  };

  const plusHandler = () => {
    if (questions.length === dataId) {
      dispatch(
        questionChange([
          ...questions,
          {
            number: questions.length + 1,
            name: "질문",
            type: "choice",
            option: [{ number: 1, name: "옵션1" }],
            isRequired: false,
          },
        ])
      );
    } else {
      const updateQuestion = [
        ...questions.slice(0, dataId),
        {
          number: questions.length + 1,
          name: "질문",
          type: "choice",
          option: [{ number: 1, name: "옵션1" }],
          isRequired: false,
        },
        ...questions.slice(dataId),
      ];
      const reNumber = updateQuestion.map((data, index) => ({
        ...data,
        number: index + 1,
      }));
      dispatch(questionChange(reNumber));
    }
  };

  const copy = copyRef.current?.querySelector("path");
  copy?.setAttribute("data-id", `question_${dataId}`);
  const deletePath = deleteRef.current?.querySelector("path");
  deletePath?.setAttribute("data-id", `question_${dataId}`);

  return (
    <Container
      ref={ref}
      isDragging={isDragging}
      required={isrequired}
      data-id={`question_${dataId}`}
      clicked={isClick}
      onMouseEnter={onHandler}
      onMouseLeave={outHandler}
    >
      <FontAwesomeIcon
        icon={faGrip}
        className="drag"
        data-id={`question_${dataId}`}
        style={{ opacity: isClick ? "1" : isHover ? "1" : "0" }}
      />
      <DragHandle ref={drag} data-id={`question_${dataId}`} />
      <QuestionDetail dataId={`question_${dataId}`} clicked={isClick} />

      <div className="bottom_wrap" data-id={`question_${dataId}`}>
        <div className="menu_wrap" data-id={`question_${dataId}`}>
          <div className="copy" data-id={`question_${dataId}`}>
            <FontAwesomeIcon
              icon={faCopy}
              data-id={`question_${dataId}`}
              ref={copyRef}
            />
          </div>
          <div className="delete" data-id={`question_${dataId}`}>
            <FontAwesomeIcon
              icon={faTrash}
              data-id={`question_${dataId}`}
              ref={deleteRef}
            />
          </div>
        </div>
        <div className="required" data-id={`question_${dataId}`}>
          <div className="text" data-id={`question_${dataId}`}>
            필수
          </div>
          <div className="toggle" data-id={`question_${dataId}`}>
            <div
              className="button"
              onClick={toggleHandler}
              data-id={`question_${dataId}`}
            ></div>
          </div>
        </div>
      </div>
      <div
        className="plus_box"
        onClick={plusHandler}
        data-id={`question_${dataId}`}
      >
        <div className="plus_button" data-id={`question_${dataId}`}>
          <FontAwesomeIcon icon={faPlus} data-id={`question_${dataId}`} />
        </div>
      </div>
    </Container>
  );
};

export default Question;
