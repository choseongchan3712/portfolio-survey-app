import styled from "styled-components";
import InputWrap from "./InputWrap";
import Short from "./Short";
import Long from "./Long";
import OptionWrap from "./OptionWrap";
import { useState } from "react";
import { QuestionDetailType } from "../../types";

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .title_wrap {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .input_wrap {
      width: 70%;
    }
    select {
      width: 20%;
      padding: 5px;
      font-size: var(--normal-size);
      color: var(--main-color);
      border: 1px solid var(--border-color);
    }
  }
`;

const QuestionDetail = ({dataId}:QuestionDetailType): JSX.Element => {
  const [question, setQuestion] = useState<string>();

  return (
    <Container data-id = {dataId}>
      <div className="title_wrap" data-id = {dataId}>
        <div className="input_wrap" data-id = {dataId}>
          <InputWrap
            dataId={dataId}
            value=""
            size="var(--normal-size)"
            color="var(--main-color)"
            gap="0"
            holder="질문"
            bgColor="var(--gray-1)"
            changeValue={(data) => setQuestion(data)}
          />
        </div>
        <select data-id = {dataId}>
          <option value="short" data-id = {dataId}>단답형</option>
          <option value="long" data-id = {dataId}>장문형</option>
          <option value="choice" data-id = {dataId}>객관식 질문</option>
          <option value="check" data-id = {dataId}>체크박스</option>
          <option value="drop" data-id = {dataId}>드롭다운</option>
        </select>
      </div>
      {/* <Short data-id = {dataId} /> */}
      {/* <Long data-id = {dataId}/> */}
      <OptionWrap dataId={dataId}/>
    </Container>
  );
};

export default QuestionDetail;
