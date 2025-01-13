import { useState } from "react";
import styled from "styled-components";
import Option from "./Option";
import { OptionWrapType } from "../../types";

interface Props {
  clicked:boolean;
}

const Container = styled.div<Props>`
  width: 100%;
  .plus_wrap {
    width: 100%;
    display: ${(props)=>(props.clicked ? "flex" : "none")};
    align-items: center;
    padding: 15px 0;
    .box {
      width: 20px;
      height: 20px;
      border: 2px solid var(--gray-2);
      border-radius: 20px;
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
`;

const OptionWrap = ({ dataId, questionType, clicked }: OptionWrapType): JSX.Element => {
  const [datas, setDatas] = useState<number[]>([1]);

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const updataDatas = [...datas];
    const [removed] = updataDatas.slice(dragIndex, 1);
    updataDatas.splice(hoverIndex, 0, removed);
    setDatas(updataDatas);
  };

  return (
    <Container data-id={dataId} clicked={clicked}>
      {datas.map((data, index) => (
        <Option
          key={index}
          id={data}
          index={index}
          moveItem={moveItem}
          dataId={dataId}
          questionType={questionType}
        />
      ))}
      <div className="plus_wrap" data-id={dataId}>
        <div className="box" data-id={dataId}></div>
        <div className="plus_contents" data-id={dataId}>
          <div className="plus" data-id={dataId}>옵션 추가</div>
          <div className="and" data-id={dataId}>또는</div>
          <div className="other" data-id={dataId}>'기타' 추가</div>
        </div>
      </div>
    </Container>
  );
};

export default OptionWrap;
