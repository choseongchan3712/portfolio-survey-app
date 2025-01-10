import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 350px;
  padding-top: 70px;
  background-color: var(--gray-1);
  display: flex;
  justify-content: center;
  .contents {
    max-width: 1200px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      width: 100%;
      padding: 20px 0;
      color: var(--main-color);
      font-size: var(--normal-size);
      font-weight: 400;
    }
    a {
      height: 200px;
      width: 40%;
      background-color: var(--box-color);
      border: 1px solid var(--border-color);
      border-radius: 5px;
      font-size: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--main-color);
      transition: 0.25s;
      &:hover {
        border: 1px solid var(--point-color);
        color: var(--point-color);
      }
    }
  }
`;

const NewPageWrap = (): JSX.Element => {
  return (
    <Container>
      <div className="contents">
        <div className="title">새 설문지 작성</div>
        <Link to={"/new_page"}>
          <FontAwesomeIcon icon={faPlus} />
        </Link>
      </div>
    </Container>
  );
};

export default NewPageWrap;
