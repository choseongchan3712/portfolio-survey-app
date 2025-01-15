import styled from "styled-components";
import { PreviewQuestion } from "../../types";

interface Props {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
}

const Container = styled.div<Props>`
  position: relative;
  width: 100%;
  padding-top: 20px;
  .contens_wrap {
    width: 100%;
    padding: 0 20px;
    background-color: var(--box-color);
    border-radius: 10px;
    border: 1px solid var(--border-color);
    .name {
      color: var(--main-color);
      font-size: var(--normal-size);
      font-weight: ${(props) => (props.isBold ? "bold" : "normal")};
      font-style: ${(props) => (props.isItalic ? "italic" : "normal")};
      text-decoration: ${(props) => (props.isUnderline ? "underline" : "none")};
      padding: 20px 0;
    }
    .optionWrap {
      width: 100%;
      .short,
      .long,
      .choice,
      .check,
      .drop {
        width: 100%;
        display: flex;
        flex-direction: column;
        color: var(--main-color);
        font-size: var(--small-size);
        label {
          width: 100%;
          padding-bottom: 20px;
          display: flex;
          align-items: center;
        }
        .other {
          .other_input {
            margin-left: 10px;
            width: 80%;
            height: 100%;
            border-bottom: 2px solid var(--border-color);
            cursor: text;
            padding: 5px 0;
            &:focus {
              border-bottom: 2px solid var(--point-color);
            }
          }
        }
        input[type="radio"] {
          position: relative;
          z-index: 5;
          width: 15px;
          height: 15px;
          border-radius: 15px;
          border: 2px solid var(--main-color);
          margin-right: 10px;
          cursor: pointer;
          &::after {
            content: "";
            position: absolute;
            width: 10px;
            height: 10px;
            border-radius: 10px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: var(--point-color);
            opacity: 0;
            transition: 0.25s ease-in-out;
          }
          &:checked::after {
            opacity: 1;
          }
        }
        input[type="checkbox"] {
          -webkit-appearance: checkbox;
          -moz-appearance: checkbox;
          appearance: checkbox;
          width: 15px;
          height: 15px;
          border: 2px solid var(--main-color);
          margin: 0;
          margin-right: 10px;
          padding: 0;
          background-color: transparent;
        }
      }
      .drop,
      .short,
      .long {
        padding: 20px 0 40px 0;
      }
      .short {
        input {
          width: 50%;
          padding: 5px 0;
          border-bottom: 2px solid var(--border-color);
          transition: 0.25s ease-in-out;
          &:focus {
            border-bottom: 2px solid var(--point-color);
          }
        }
      }
      .long {
        input {
          width: 100%;
          padding: 5px 0;
          border-bottom: 2px solid var(--border-color);
          transition: 0.25s ease-in-out;
          &:focus {
            border-bottom: 2px solid var(--point-color);
          }
        }
      }
      select {
        padding: 10px;
        width: 50%;
        border: 1px solid var(--main-color);
      }
    }
  }
`;

const Question = ({
  name,
  isBold,
  isItalic,
  isOther,
  isRequired,
  isUnderline,
  option,
  type,
}: PreviewQuestion): JSX.Element => {
  return (
    <Container isBold={isBold} isItalic={isItalic} isUnderline={isUnderline}>
      <div className="contens_wrap">
        <div className="name">{name}</div>
        <div className="optionWrap">
          {type === "short" ? (
            <div className="short">
              <input type="text" placeholder="내 답변" />
            </div>
          ) : type === "long" ? (
            <div className="long">
              <input type="text" placeholder="내 답변" />
            </div>
          ) : type === "choice" ? (
            <div className="choice">
              {option?.map((data, index) => (
                <label key={index}>
                  <input type="radio" value={data.name} name="radio" />
                  {data.name}
                </label>
              ))}
              {isOther ? (
                <label className="other">
                  <input type="radio" value={"other"} name="radio" />
                  <span>기타:</span>
                  <input type="text" className="other_input" />
                </label>
              ) : (
                <></>
              )}
            </div>
          ) : type === "check" ? (
            <div className="check">
              {option?.map((data, index) => (
                <label key={index}>
                  <input type="checkbox" value={data.name} />
                  {data.name}
                </label>
              ))}
            </div>
          ) : type === "drop" ? (
            <div className="drop">
              <select>
                {option?.map((data, index) => (
                  <option value={data.name} key={index}>
                    {data.name}
                  </option>
                ))}
                {isOther ? (
                  <label className="other">
                    <input type="checkbox" value={"other"} />
                    <span>기타:</span>
                    <input type="text" className="other_input" />
                  </label>
                ) : (
                  <></>
                )}
              </select>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Question;
