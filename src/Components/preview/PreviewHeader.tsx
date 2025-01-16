import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  z-index: 990;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  background-color: var(--box-color);
  .detail_wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: var(--normal-size);
    color: var(--main-color);
    .icon {
      position: relative;
      text-decoration: none;
      color: var(--gray-3);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 40px;
      transition: 0.25s ease-in-out;
      &:hover {
        background-color: var(--gray-1);
      }
      &::after {
        content: "설문지 수정";
        position: absolute;
        font-size: 10px;
        color: var(--box-color);
        padding: 5px;
        border-radius: 5px;
        background-color: var(--gray-4);
        width: 50px;
        bottom: 0;
        transition: 0.25s ease-in-out;
        opacity: 0;
      }
      &:hover::after {
        bottom: -25px;
        opacity: 1;
      }
    }
    .detail {
      padding-left: 5px;
    }
  }
`;

const PreviewHeader = (): JSX.Element => {
  const id = useParams().id;
  return (
    <Container>
      <div className="detail_wrap">
        <Link to={`/saved_page/${id}`} className="icon">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <div className="detail">미리보기 모드</div>
      </div>
    </Container>
  );
};

export default PreviewHeader;
