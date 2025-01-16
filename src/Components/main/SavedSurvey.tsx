import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SavedSurveyType } from "../../types";
import { useState } from "react";

interface Props {
  isDelete: boolean;
}

const Container = styled.div<Props>`
  position: relative;
  z-index: 3;
  display: ${(props) => (props.isDelete ? "none" : "block")};
  .link {
    position: relative;
    z-index: 3;
    border-radius: 10px;
    width: 100%;
    border: 1px solid var(--border-color);
    overflow: hidden;
    transition: 0.25s;
    cursor: pointer;
    &:hover {
      border: 1px solid var(--point-color);
    }
    .box {
      background-color: var(--background-color);
      width: 100%;
      height: 200px;
    }
    .title_wrap {
      position: relative;
      z-index: 5;
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
    }
  }
  .delete {
    position: absolute;
    right: 10px;
    z-index: 10;
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
`;

const SavedSurvey = ({ link, title, id }: SavedSurveyType): JSX.Element => {
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const navigate = useNavigate();
  const deleteHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDelete(true);
    e.stopPropagation();
    const savedSurvey = localStorage.getItem("saved_survey");
    const postedSurvey = localStorage.getItem("posted_survey");

    if (savedSurvey && postedSurvey) {
      const deleteSaved = JSON.parse(savedSurvey).filter(
        (data: any) => data.id !== id
      );
      const updateSaved =
        deleteSaved.length > 0
          ? deleteSaved.map((data: any, index: number) => ({
              ...data,
              id: index + 1,
            }))
          : deleteSaved;

      const updateposted = updateSaved.filter(
        (data: any) => data.survey.survey.isPost === true
      );
      localStorage.setItem("saved_survey", JSON.stringify(updateSaved));
      localStorage.setItem("posted_survey", JSON.stringify(updateposted));
    } else if (savedSurvey && !postedSurvey) {
      const deleteSaved = JSON.parse(savedSurvey).filter(
        (data: any) => data.id !== id
      );
      const updateSaved =
        deleteSaved.length > 0
          ? deleteSaved.map((data: any, index: number) => ({
              ...data,
              id: index + 1,
            }))
          : deleteSaved;
      localStorage.setItem("saved_survey", JSON.stringify(updateSaved));
    }
  };

  const linkHandler = () => {
    navigate(link);
  };

  return (
    <Container isDelete={isDelete}>
      <div className="link" onClick={linkHandler}>
        <div className="box"></div>
        <div className="title_wrap">
          <div className="title">{title}</div>
          <div className="delete" onClick={deleteHandler}>
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SavedSurvey;
