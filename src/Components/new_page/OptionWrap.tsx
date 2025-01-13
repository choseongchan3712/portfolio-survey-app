import { useState } from "react";
import styled from "styled-components";
import Option from "./Option";
import { OptionWrapType } from "../../types";

const Container = styled.div`
  width: 100%;
`;

const OptionWrap = ({dataId}:OptionWrapType): JSX.Element => {
  const [datas, setDatas] = useState<number[]>([1]);

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const updataDatas = [...datas];
    const [removed] = updataDatas.slice(dragIndex, 1);
    updataDatas.splice(hoverIndex, 0, removed);
    setDatas(updataDatas);
  };

  return (
    <Container data-id={dataId}>
      {datas.map((data, index) => (
        <Option key={index} id={data} index={index} moveItem={moveItem} dataId={dataId}/>
      ))}
    </Container>
  );
};

export default OptionWrap;
