import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Option from "./Option";
import { OptionWrapType } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { questionChange, reorderOption } from "../../store/surveySlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface Props {
  clicked: boolean;
  isOther: boolean;
  optionType: string;
}

const Container = styled.div<Props>`
  width: 100%;
  .plus_wrap {
    width: 100%;
    display: ${(props) => (props.clicked ? "flex" : "none")};
    align-items: center;
    padding: 15px 0;
    .box {
      width: 20px;
      height: 20px;
      border: ${(props) =>
        props.optionType === "drop" ? "unset" : "2px solid var(--gray-2)"};
      border-radius: ${(props) =>
        props.optionType === "choice"
          ? "20px"
          : props.optionType === "check"
          ? "0"
          : "unset"};
      margin-right: 10px;
    }
    .plus_contents {
      display: flex;
      align-items: center;
      font-size: var(--small-size);
      .plus {
        cursor: pointer;
        color: var(--gray-3);
        padding: 5px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0);
        &:hover {
          border-bottom: 1px solid var(--gray-3);
        }
      }
      .and {
        padding: 5px 0 5px 5px;
        border-bottom: 1px solid rgba(0, 0, 0, 0);
      }
      .other {
        cursor: pointer;
        padding: 5px;
        border-bottom: 1px solid rgba(0, 0, 0, 0);
        color: var(--sub-color);
        border-radius: 5px;
        &:hover {
          background-color: #eaf2ff;
        }
      }
    }
  }
  .other_wrap {
    width: 100%;
    display: ${(props) => (props.isOther ? "flex" : "none")};
    align-items: center;
    padding: 15px 0;
    .box {
      width: 20px;
      height: 20px;
      border: 2px solid var(--gray-2);
      border-radius: 20px;
      margin-right: 10px;
    }
    .other_contents {
      display: flex;
      align-items: center;
      font-size: var(--normal-size);
      color: var(--gray-3);
    }
    .delete_box {
      position: absolute;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 35px;
      height: 35px;
      border-radius: 35px;
      cursor: pointer;
      font-size: 20px;
      color: var(--gray-3);
      &:hover {
        background-color: var(--gray-1);
      }
    }
  }
`;

const OptionWrap = ({
  dataId,
  questionType,
  clicked,
}: OptionWrapType): JSX.Element => {
  const dispatch = useDispatch();
  const option = useSelector(
    (state: RootState) =>
      state.survey.survey.question.find(
        (data) => data.number === Number(dataId.match(/\d+/)?.[0])
      )?.option
  );
  const question = useSelector(
    (state: RootState) => state.survey.survey.question
  );

  const [optionCount, setOptionCount] = useState<number[]>([1]);
  const [isOther, setIsOther] = useState<boolean>(false);
  const [isDrop, setIsDrop] = useState<boolean>(false);
  const [optionType, setOptionType] = useState<string>("choice");

  const pathRef = useRef<SVGSVGElement>(null);

  const path = pathRef.current?.querySelector("path");
  path?.setAttribute("data-id", `${dataId}`);

  useEffect(() => {
    if (option) {
      setOptionCount(option.map((data) => data.number ?? 0));
    }
  }, [option]);

  const moveItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setOptionCount((prevDatas) => {
        const updatedDatas = [...prevDatas];
        const [removed] = updatedDatas.splice(dragIndex, 1);
        updatedDatas.splice(hoverIndex, 0, removed);
        return updatedDatas;
      });
      dispatch(reorderOption({ dragIndex, hoverIndex, dataId }));
    },
    [dispatch, dataId]
  );

  const plusHandler = () => {
    if (option) {
      const updateOption = [
        ...option,
        { number: option.length + 1, name: `옵션${option.length + 1}` },
      ];
      const updataQuestion = question.map((data) =>
        data.number === Number(dataId.match(/\d+/)?.[0])
          ? { ...data, option: updateOption }
          : data
      );
      dispatch(questionChange(updataQuestion));
    }
  };

  const otherHandler = () => {
    const updataQuestion = question.map((data) =>
      data.number === Number(dataId.match(/\d+/)?.[0])
        ? { ...data, isOther: true }
        : data
    );
    dispatch(questionChange(updataQuestion));
  };

  const otherDelete = () => {
    setIsOther(false);
    const updataQuestion = question.map((data) =>
      data.number === Number(dataId.match(/\d+/)?.[0])
        ? { ...data, isOther: false }
        : data
    );
    dispatch(questionChange(updataQuestion));
  };

  useEffect(() => {
    if (
      question.find((data) => data.number === Number(dataId.match(/\d+/)?.[0]))
        ?.isOther === true
    ) {
      setIsOther(true);
    } else if (
      question.find((data) => data.number === Number(dataId.match(/\d+/)?.[0]))
        ?.isOther === false
    ) {
      setIsOther(false);
    }

    if (
      question.find((data) => data.number === Number(dataId.match(/\d+/)?.[0]))
        ?.type === "drop"
    ) {
      setIsDrop(true);
    } else if (
      question.find((data) => data.number === Number(dataId.match(/\d+/)?.[0]))
        ?.type !== "drop"
    ) {
      setIsDrop(false);
    }

    if (
      question.find((data) => data.number === Number(dataId.match(/\d+/)?.[0]))
        ?.type === "choice"
    ) {
      setOptionType("choice");
    } else if (
      question.find((data) => data.number === Number(dataId.match(/\d+/)?.[0]))
        ?.type === "check"
    ) {
      setOptionType("check");
    } else if (
      question.find((data) => data.number === Number(dataId.match(/\d+/)?.[0]))
        ?.type === "drop"
    ) {
      setOptionType("drop");
    }
  }, [question]);

  return (
    <Container
      data-id={dataId}
      clicked={clicked}
      isOther={isOther}
      optionType={optionType}
    >
      {optionCount.map((data, index) => (
        <Option
          key={index}
          id={data}
          index={index}
          moveItem={moveItem}
          dataId={dataId}
          questionType={questionType}
          dataSubid={index + 1}
        />
      ))}
      <div className="other_wrap" data-id={dataId}>
        <div className="box" data-id={dataId}></div>
        <div className="other_contents" data-id={dataId}>
          기타...
        </div>
        <div className="delete_box" data-id={dataId} onClick={otherDelete}>
          <FontAwesomeIcon icon={faXmark} data-id={dataId} ref={pathRef} />
        </div>
      </div>
      <div className="plus_wrap" data-id={dataId}>
        <div className="box" data-id={dataId}>
          {optionType === "drop" ? `${optionCount.length + 1}` : ""}
        </div>
        <div className="plus_contents" data-id={dataId}>
          <div className="plus" data-id={dataId} onClick={plusHandler}>
            옵션 추가
          </div>
          <div
            className="and"
            data-id={dataId}
            style={{ display: isDrop || isOther ? "none" : "block" }}
          >
            또는
          </div>
          <div
            className="other"
            data-id={dataId}
            onClick={otherHandler}
            style={{ display: isDrop || isOther ? "none" : "block" }}
          >
            '기타' 추가
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OptionWrap;
