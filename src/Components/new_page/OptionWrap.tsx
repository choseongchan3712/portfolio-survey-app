import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";
import Option from "./Option";

const Container = styled.div`
  width: 100%;
`;

const OptionWrap = (): JSX.Element => {
  const [datas, setDatas] = useState<number[]>([1]);

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const updataDatas = [...datas];
    const [removed] = updataDatas.slice(dragIndex, 1);
    updataDatas.splice(hoverIndex, 0, removed);
    setDatas(updataDatas);
  };

  return (
    <Container>
      {/* <DndProvider backend={HTML5Backend}> */}
      {datas.map((data, index) => (
        <Option key={index} id={data} index={index} moveItem={moveItem} />
      ))}
      {/* </DndProvider> */}
    </Container>
  );
};

export default OptionWrap;
