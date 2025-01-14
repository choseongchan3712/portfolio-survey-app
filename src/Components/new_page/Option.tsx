import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import styled from "styled-components";
import { OptionType } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { questionChange } from "../../store/surveySlice";
import { writed, writing } from "../../store/IsWritingSlice";

interface Props {
  isHover: boolean;
}

const Container = styled.div<Props>`
  padding: 15px 0;
  position: relative;
  display: flex;
  align-items: center;
  .constents {
    width: 100%;
    .choice {
      width: 100%;
      display: flex;
      align-items: center;
      .box {
        width: 20px;
        height: 20px;
        border: 2px solid var(--gray-2);
        border-radius: 20px;
        margin-right: 10px;
      }
      input {
        width: 70%;
        padding: 5px 0;
        color: var(--main-color);
        font-size: var(--normal-size);
        border-bottom: ${(props) =>
          props.isHover
            ? "2px solid var(--gray-2)"
            : "2px solid rgba(0, 0, 0, 0)"};
        &:focus {
          border-bottom: 2px solid var(--point-color);
        }
      }
    }
    .check {
      width: 100%;
      display: flex;
      align-items: center;
      .box {
        width: 20px;
        height: 20px;
        border: 2px solid var(--gray-2);
        margin-right: 10px;
      }
      input {
        width: 70%;
        padding: 5px 0;
        color: var(--main-color);
        font-size: var(--normal-size);
        border-bottom: ${(props) =>
          props.isHover
            ? "2px solid var(--gray-2)"
            : "2px solid rgba(0, 0, 0, 0)"};
        &:focus {
          border-bottom: 2px solid var(--point-color);
        }
      }
    }
    .drop {
      width: 100%;
      display: flex;
      align-items: center;
      .box {
        width: 20px;
        height: 20px;
        font-size: var(--normal-size);
        color: var(--main-color);
        margin-right: 10px;
      }
      input {
        width: 70%;
        padding: 5px 0;
        color: var(--main-color);
        font-size: var(--normal-size);
        border-bottom: ${(props) =>
          props.isHover
            ? "2px solid var(--gray-2)"
            : "2px solid rgba(0, 0, 0, 0)"};
        &:focus {
          border-bottom: 2px solid var(--point-color);
        }
      }
    }
  }
`;

const DragHandler = styled.div<Props>`
  position: absolute;
  left: -20px;
  height: 100%;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  color: var(--gray-2);
  opacity: ${(props) => (props.isHover ? "1" : "0")};
`;

const Option = ({
  id,
  index,
  moveItem,
  dataId,
  questionType,
  dataSubid,
}: OptionType): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [option, setOption] = useState<string | null>(null);
  const [optionValue, setOptionValue] = useState<string>();
  const dispatch = useDispatch();

  const isWriting = useSelector(
    (state: RootState) => state.isWriting.isWriting
  );

  const options = useSelector(
    (state: RootState) =>
      state.survey.survey.question.find(
        (data) => data.number === Number(dataId.match(/\d+/)?.[0])
      )?.option
  );

  const questions = useSelector(
    (state: RootState) => state.survey.survey.question
  );

  useEffect(() => {
    if (option) {
      const updataOptions = options?.map((data) =>
        data.number === dataSubid ? { ...data, name: option } : data
      );
      const updatedQuestions = questions.map((data) =>
        data.number === Number(dataId.match(/\d+/)?.[0])
          ? { ...data, option: updataOptions }
          : data
      );
      dispatch(questionChange(updatedQuestions));
    } else {
      const updataOptions = options?.map((data) =>
        data.number === dataSubid ? { ...data, name: `옵션${dataSubid}` } : data
      );
      const updatedQuestions = questions.map((data) =>
        data.number === Number(dataId.match(/\d+/)?.[0])
          ? { ...data, option: updataOptions }
          : data
      );
      dispatch(questionChange(updatedQuestions));
    }
  }, [option]);

  useEffect(() => {
    const nowName = options?.find((data) => data.number === dataSubid)?.name;
    if (nowName) {
      setOptionValue(nowName);
    } else {
      setOptionValue(`옵션${dataSubid}`);
    }
  }, [options]);

  const [{ isDragging }, drag] = useDrag({
    type: "OPTION",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "OPTION",
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

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setOption(e.target.value);
  };

  const focusHandler = () => {
    dispatch(writing());
  };

  const blurHandler = () => {
    dispatch(writed());
  };

  return (
    <Container
      ref={ref}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      isHover={isHover}
      data-id={dataId}
      data-subid={dataSubid}
    >
      <DragHandler ref={drag} isHover={isHover} data-id={dataId}>
        <FontAwesomeIcon icon={faGripVertical} data-id={dataId} />
      </DragHandler>
      <div className="constents" data-id={dataId}>
        {questionType === "choice" ? (
          <div className="choice" data-id={dataId}>
            <div className="box" data-id={dataId}></div>
            <input
              type="text"
              data-id={dataId}
              onChange={changeHandler}
              onFocus={focusHandler}
              onBlur={blurHandler}
              value={isWriting ? undefined : `${optionValue}`}
            />
          </div>
        ) : questionType === "check" ? (
          <div className="check" data-id={dataId}>
            <div className="box" data-id={dataId}></div>
            <input
              type="text"
              data-id={dataId}
              onChange={changeHandler}
              onFocus={focusHandler}
              onBlur={blurHandler}
              value={isWriting ? undefined : `${optionValue}`}
            />
          </div>
        ) : questionType === "drop" ? (
          <div className="drop" data-id={dataId}>
            <div className="box" data-id={dataId}>
              1
            </div>
            <input
              type="text"
              data-id={dataId}
              onChange={changeHandler}
              onFocus={focusHandler}
              onBlur={blurHandler}
              value={isWriting ? undefined : `${optionValue}`}
            />
          </div>
        ) : null}
      </div>
    </Container>
  );
};

export default Option;
