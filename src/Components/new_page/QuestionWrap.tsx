import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";
import Question from "./Question";

const Container = styled.div`
  width: 100%;
`;

const QuestionWrap = (): JSX.Element => {
  const [datas, setDatas] = useState<number[]>([1]);

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const updatedDatas = [...datas];
    const [removed] = updatedDatas.slice(dragIndex, 1);
    updatedDatas.splice(hoverIndex, 0, removed);
    setDatas(updatedDatas);
  };

  return (
    <Container>
      <DndProvider backend={HTML5Backend}>
        {datas.map((data, index) => (
          <Question key={index} id={data} index={index} moveItem={moveItem} />
        ))}
      </DndProvider>
    </Container>
  );
};

export default QuestionWrap;
