import styled from "styled-components";
import InputWrap from "./InputWrap";
import Short from "./Short";
import Long from "./Long";
import OptionWrap from "./OptionWrap";

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

const QuestionDetail = (): JSX.Element => {
  return (
    <Container>
      <div className="title_wrap">
        <div className="input_wrap">
          <InputWrap
            dataId="question_1"
            value=""
            size="var(--normal-size)"
            color="var(--main-color)"
            gap="0"
            holder="질문"
            bgColor="var(--gray-1)"
          />
        </div>
        <select>
          <option value="short">단답형</option>
          <option value="long">장문형</option>
          <option value="choice">객관식 질문</option>
          <option value="check">체크박스</option>
          <option value="drop">드롭다운</option>
        </select>
      </div>
      {/* <Short /> */}
      {/* <Long /> */}
      <OptionWrap />
    </Container>
  );
};

export default QuestionDetail;
