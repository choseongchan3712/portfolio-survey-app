import styled from "styled-components";
import { PreTitleWrapType } from "../../types";

interface Props {
  titleType: string;
  explainType: string;
}

const Container = styled.div<Props>`
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background-color: var(--box-color);
  &::after {
    content: "";
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border-top: 10px solid var(--point-color);
  }
  .title {
    position: relative;
    z-index: 3;
    color: var(--main-color);
    font-size: 30px;
    font-weight: ${(props) => (props.titleType === "bold" ? "bold" : "normal")};
    font-style: ${(props) =>
      props.titleType === "italic" ? "italic" : "normal"};
    text-decoration: ${(props) =>
      props.titleType === "underline" ? "underline" : "none"};
    padding-bottom: 20px;
  }
  .explain {
    position: relative;
    z-index: 3;
    color: var(--main-color);
    font-size: var(--normal-size);
    font-weight: ${(props) =>
      props.explainType === "bold" ? "bold" : "normal"};
    font-style: ${(props) =>
      props.explainType === "italic" ? "italic" : "normal"};
    text-decoration: ${(props) =>
      props.explainType === "underline" ? "underline" : "none"};
  }
`;

const TitleWrap = ({
  title,
  explain,
  titleType,
  explainType,
}: PreTitleWrapType): JSX.Element => {
  return (
    <Container titleType={titleType} explainType={explainType}>
      <div className="title">{title}</div>
      <div className="explain">{explain}</div>
    </Container>
  );
};

export default TitleWrap;
