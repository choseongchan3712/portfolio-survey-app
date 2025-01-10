import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  z-index: 990;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: var(--box-color);
  a {
    display: flex;
    text-decoration: none;
    color: var(--main-color);
    height: 100%;
    align-items: center;
    .img {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
    }
    .name {
      padding-left: 10px;
      font-size: var(--heading-size);
    }
  }
`;

const MainHeader = (): JSX.Element => {
  return (
    <Container>
      <Link to={"/"}>
        <div className="img">
          <img
            src="https://www.gstatic.com/images/branding/product/1x/forms_2020q4_48dp.png"
            alt="main_img"
          />
        </div>
        <div className="name">설문지</div>
      </Link>
    </Container>
  );
};

export default MainHeader;
