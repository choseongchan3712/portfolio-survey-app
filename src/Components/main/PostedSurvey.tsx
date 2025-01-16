import { useState } from "react";
import styled from "styled-components";
import { PostedSurveyType, SavedSurveyType } from "../../types";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: relative;
  z-index: 3;
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
`;

const PostedSurvey = ({ link, title }: PostedSurveyType): JSX.Element => {
  const navigate = useNavigate();
  const linkHandler = () => {
    navigate(link);
  };
  return (
    <Container>
      <div className="link" onClick={linkHandler}>
        <div className="box"></div>
        <div className="title_wrap">
          <div className="title">{title}</div>
        </div>
      </div>
    </Container>
  );
};

export default PostedSurvey;
