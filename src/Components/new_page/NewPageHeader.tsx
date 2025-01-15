import { faEye, faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { wirteTitle } from "../../store/surveySlice";
import { writed, writing } from "../../store/IsWritingSlice";

interface Action {
  action: boolean;
  pageName: string;
}

const Container = styled.div<Action>`
  position: fixed;
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
        a {
          position: relative;
          text-decoration: none;
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
  const titleName = useSelector(
    (state: RootState) => state.survey.survey.title.detail
  );
  const isWriting = useSelector(
    (state: RootState) => state.isWriting.isWriting
  );
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation()?.pathname;
  const [title, setTitle] = useState<string>();
  const dispatch = useDispatch();
  const id = useParams().id;
  const [savedCount, setSavedCount] = useState<number>();

  useEffect(() => {
    if (localStorage.getItem("saved_survey")) {
      setSavedCount(JSON.parse(localStorage.getItem("saved_survey")!).length);
    }
  }, []);

  const focusHandler = () => {
    setIsFocus(true);
    dispatch(writing());
  };

  const blurHandler = () => {
    setIsFocus(false);
    dispatch(writed());
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    if (title) {
      dispatch(wirteTitle(title));
    }
  }, [title]);

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
              value={isWriting ? undefined : `${titleName}`}
              className="title"
              onFocus={focusHandler}
              onBlur={blurHandler}
              ref={inputRef}
              onChange={changeHandler}
            />
          </div>
        </div>

        <div className="effect_wrap">
          <div className="icon_wrap">
            <div className="theme">
              <FontAwesomeIcon icon={faPalette} />
            </div>
            <Link
              to={id === "new" ? `/preview/${savedCount}` : `/`}
              className="preview"
            >
              <FontAwesomeIcon icon={faEye} />
            </Link>
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
