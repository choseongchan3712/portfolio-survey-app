import { useEffect, useState } from "react";
import styled from "styled-components";
import SavedSurvey from "./SavedSurvey";

const Container = styled.div`
  width: 100%;
  min-height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--box-color);
  .contents {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    row-gap: 10px;
    column-gap: 20px;
  }
  .no_contents {
    width: 100%;
    min-height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px var(--border-color);
    .heading {
      color: var(--main-color);
      font-size: var(--normal-size);
      padding-bottom: 15px;
      font-weight: 400;
    }
    .detail {
      color: var(--gray-4);
      font-size: var(--small-size);
    }
  }
`;

const SavedContentsWrap = (): JSX.Element => {
  const [surveys, setSurveys] = useState<any>();
  useEffect(() => {
    const savedSurvey = localStorage.getItem("saved_survey");
    if (savedSurvey) {
      setSurveys(JSON.parse(savedSurvey));
    }
  }, []);

  return (
    <Container>
      {surveys ? (
        <div className="contents">
          {surveys.map((data: any, index: number) => (
            <SavedSurvey
              key={index}
              link={`/saved_page/${data.id}`}
              title={data.survey.survey.title.detail}
            />
          ))}
        </div>
      ) : (
        <div className="no_contents">
          <div className="heading">설문지 없음</div>
          <div className="survey_detail"></div>
          <div className="detail">
            위에서 새 설문지 작성을 클릭하여 시작하세요.
          </div>
        </div>
      )}
    </Container>
  );
};

export default SavedContentsWrap;
