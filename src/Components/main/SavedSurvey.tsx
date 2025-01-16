import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SavedSurveyType } from "../../types";

const Container = styled.div`
  a {
    border-radius: 10px;
    width: 100%;
    border: 1px solid var(--border-color);
    overflow: hidden;
    transition: 0.25s;
    &:hover {
      border: 1px solid var(--point-color);
    }
    .box {
      background-color: var(--background-color);
      width: 100%;
      height: 200px;
    }
    .title_wrap {
      width: 100%;
      height: 70px;
      border-top: 1px solid var(--border-color);
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: var(--small-size);
        color: var(--main-color);
      }
      .delete {
        width: 30px;
        height: 30px;
        border-radius: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--small-size);
        color: var(--gray-4);
        &:hover {
          background-color: var(--gray-1);
        }
      }
    }
  }
`;

const SavedSurvey = ({link, title}: SavedSurveyType): JSX.Element => {
  return (
    <Container>
      <Link to={link}>
        <div className="box"></div>
        <div className="title_wrap">
          <div className="title">{title}</div>
          <div className="delete">
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
      </Link>
    </Container>
  );
};

export default SavedSurvey;
