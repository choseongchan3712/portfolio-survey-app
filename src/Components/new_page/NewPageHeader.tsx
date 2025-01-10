import { faEye, faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

interface Action {
  action: boolean;
  pageName: string;
}

const Container = styled.div<Action>`
  position: absolute;
  z-index: 990;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  padding: 0 20px;
  background-color: var(--box-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .top_wrap {
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title_wrap {
      display: flex;
      align-items: center;
      .img {
        position: relative;
        width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        &::before {
          content: "설문지 홈";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          font-size: 10px;
          background-color: var(--gray-4);
          color: var(--box-color);
          padding: 5px;
          width: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10%;
          transition: 0.25s ease-in-out;
          opacity: 0;
        }
        &:hover::before {
          opacity: 1;
          bottom: -25px;
        }
      }
      .title_box {
        position: relative;
        &::before {
          content: "";
          transition: 0.25s ease-in-out;
          transform-origin: center;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--point-color);
          transform: ${(props) => (props.action ? "scaleX(1)" : "scaleX(0)")};
        }
        .title {
          margin-left: 10px;
          padding: 10px 5px;
          font-size: var(--normal-size);
          color: var(--main-color);
          max-width: 200px;
        }
      }
    }
    .effect_wrap {
      display: flex;
      align-items: center;
      .icon_wrap {
        display: flex;
        align-items: center;
        div {
          position: relative;
          padding: 10px;
          font-size: 20px;
          border-radius: 50px;
          transition: 0.25s ease-in-out;
          cursor: pointer;
          color: var(--gray-4);
          &:hover {
            background-color: var(--gray-1);
          }
        }
        .theme {
          &::before {
            content: "테마";
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            font-size: 10px;
            background-color: var(--gray-4);
            color: var(--box-color);
            padding: 5px;
            width: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10%;
            transition: 0.25s ease-in-out;
            opacity: 0;
          }
          &:hover::before {
            opacity: 1;
            bottom: -25px;
          }
        }
        .preview {
          &::before {
            content: "미리보기";
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            font-size: 10px;
            background-color: var(--gray-4);
            color: var(--box-color);
            padding: 5px;
            width: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10%;
            transition: 0.25s ease-in-out;
            opacity: 0;
          }
          &:hover::before {
            opacity: 1;
            bottom: -25px;
          }
        }
      }
      .submit {
        margin-left: 20px;
        margin-right: 10px;
        padding: 10px 25px;
        border-radius: 5px;
        background-color: var(--point-color);
        color: var(--box-color);
        font-size: var(--normal-size);
        cursor: pointer;
        transition: 0.25s ease-in-out;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
  .bottom_wrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .menu_wrap {
      display: flex;
      a {
        position: relative;
        padding: 10px 0;
        width: 50px;
        color: var(--gray-4);
        font-size: var(--small-size);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .que {
        color: ${(props) =>
          props.pageName === "/new_page"
            ? "var(--point-color)"
            : "var(--gray-4))"};
        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          border-radius: 3px;
          background-color: var(--point-color);
          transform: ${(props) =>
            props.pageName === "/new_page" ? "scaleX(1)" : "scaleX(0)"};
          transform-origin: center;
        }
      }
      .ans {
        color: ${(props) =>
          props.pageName === "/answer"
            ? "var(--point-color)"
            : "var(--gray-4))"};
        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          border-radius: 3px;
          background-color: var(--point-color);
          transform: ${(props) =>
            props.pageName === "/answer" ? "scaleX(1)" : "scaleX(0)"};
          transform-origin: center;
        }
      }
    }
  }
`;

const NewPageHeader = (): JSX.Element => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const location = useLocation()?.pathname;

  console.log(location);

  const focusHandler = () => {
    setIsFocus(true);
  };

  const blurHandler = () => {
    setIsFocus(false);
  };

  return (
    <Container action={isFocus} pageName={location}>
      <div className="top_wrap">
        <div className="title_wrap">
          <Link to={"/"} className="img">
            <img
              src="https://www.gstatic.com/images/branding/product/1x/forms_2020q4_48dp.png"
              alt="main_img"
            />
          </Link>
          <div className="title_box">
            <input
              type="text"
              value={"제목 없는 설문지"}
              className="title"
              onFocus={focusHandler}
              onBlur={blurHandler}
            />
          </div>
        </div>

        <div className="effect_wrap">
          <div className="icon_wrap">
            <div className="theme">
              <FontAwesomeIcon icon={faPalette} />
            </div>
            <div className="preview">
              <FontAwesomeIcon icon={faEye} />
            </div>
          </div>
          <div className="submit">게시</div>
        </div>
      </div>
      <div className="bottom_wrap">
        <div className="menu_wrap">
          <Link to={"/new_page"} className="que">
            질문
          </Link>
          <Link to={"/answer"} className="ans">
            응답
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default NewPageHeader;
