import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Question from "./Question";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { reorderQuestion } from "../../store/surveySlice";

const Container = styled.div`
  width: 100%;
`;

const QuestionWrap = (): JSX.Element => {
  const dispatch = useDispatch();
  const question = useSelector(
    (state: RootState) => state.survey.survey.question
  );

  const [questionCount, setQuestionCount] = useState<number[]>([1]);

  useEffect(() => {
    setQuestionCount(question.map((data) => data.number));
  }, [question]);

  const moveItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setQuestionCount((prevdatas) => {
        const updatedDatas = [...prevdatas];
        const [removed] = updatedDatas.splice(dragIndex, 1);
        updatedDatas.splice(hoverIndex, 0, removed);
        return updatedDatas;
      });
      dispatch(reorderQuestion({ dragIndex, hoverIndex }));
    },
    [dispatch]
  );

  return (
    <Container>
      {questionCount.map((data, index) => (
        <Question
          key={data}
          id={data}
          index={index}
          moveItem={moveItem}
          dataId={index + 1}
        />
      ))}
    </Container>
  );
};

export default QuestionWrap;
