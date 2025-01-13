import { useCallback, useState } from "react";
import styled from "styled-components";
import Question from "./Question";

const Container = styled.div`
  width: 100%;
`;

const QuestionWrap = (): JSX.Element => {
  const [datas, setDatas] = useState<number[]>([1, 2]);

  const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
    setDatas((prevdatas) => {
      const updatedDatas = [...prevdatas];
      const [removed] = updatedDatas.splice(dragIndex, 1);
      updatedDatas.splice(hoverIndex, 0, removed);
      return updatedDatas;
    });
  }, []);

  return (
    <Container>
      {datas.map((data, index) => (
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
