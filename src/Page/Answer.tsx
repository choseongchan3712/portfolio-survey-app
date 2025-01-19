import styled from "styled-components";
import NewPageHeader from "../Components/new_page/NewPageHeader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Container = styled.div`
  position: relative;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: var(--background-color);
  display: flex;
  justify-content: center;
  .wrap {
    position: relative;
    z-index: 0;
    top: 0;
    left: 0;
    max-width: 1000px;
    width: 100%;
    height: 100%;
    padding: 120px 0 40px 0;
    .result_wrap {
      width: 100%;
      padding: 20px;
      background-color: var(--box-color);
      margin-bottom: 20px;
      border-radius: 10px;
      border: 1px solid var(--border-color);
      color: var(--main-color);
      .title {
        padding: 0 0 15px 0;
        font-size: var(--heading-size);
      }
      .answer_wrap {
        width: 100%;
        .answer {
          width: 100%;
          padding: 10px 0;
          display: flex;
          align-items: center;
          .value {
            padding-right: 20px;
            font-size: var(--normal-size);
          }
          .bar {
            position: relative;
            width: 50%;
            height: 5px;
            border-radius: 5px;
            background-color: var(--border-color);
            display: flex;
            align-items: center;
            .value_bar {
              position: absolute;
              left: 0;
              height: 100%;
              border-radius: 5px;
              background-color: var(--point-color);
            }
          }
          .count {
            padding-left: 20px;
            font-weight: 600;
            .value_count {
              color: var(--point-color);
            }
          }
        }
      }
    }
  }
`;

const Answer = (): JSX.Element => {
  const savedAnswers = localStorage.getItem("posted_answer");
  const id = useParams().id;
  const [answers, setAnswers] = useState<any>();

  useEffect(() => {
    if (savedAnswers) {
      const answers = JSON.parse(savedAnswers);
      const needAnswers = answers.filter((data: any) => data.id === Number(id));
      if (JSON.stringify(needAnswers) !== JSON.stringify([])) {
        const result = needAnswers[0].answers.map((question: any) => {
          return {
            question: question.question,
            answers: needAnswers
              .map((user: any) => {
                return user.answers.find((ans: any) => ans.id === question.id)
                  .value;
              })
              .flat()
              .reduce((acc: any, value: any) => {
                const group = acc.find((arr: any) => arr[0] === value);
                if (group) {
                  group.push(value);
                } else {
                  acc.push([value]);
                }
                return acc;
              }, []),
          };
        });
        setAnswers(result);
      }
    }
  }, []);

  return (
    <Container>
      <NewPageHeader />
      <div className="wrap">
        {answers ? (
          answers.map((value: any, index: number) => (
            <div key={index} className="result_wrap">
              <div className="title">{value.question}</div>
              <div className="answer_wrap">
                {value.answers.map((data: any, index: number) => (
                  <div key={index} className="answer">
                    <div className="value">{data[0]}</div>
                    <div className="bar">
                      <div className="value_bar" style={{width: `calc((${data.length / value.answers.flat().length}) * 100%)`}}></div>
                    </div>
                    <div className="count">
                      <span className="value_count">{data.length}</span> /{" "}
                      <span>{value.answers.flat().length}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </Container>
  );
};

export default Answer;
