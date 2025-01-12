import styled from "styled-components";

const Container = styled.div`
  padding: 10px 0;
  .detail {
    width: 80%;
    font-size: var(--small-size);
    padding: 10px 0;
    color: var(--gray-4);
    border-bottom: 1px dotted var(--gray-4);
  }
`;

const Long = (): JSX.Element => {
  return (
    <Container>
      <div className="detail">장문형 택스트</div>
    </Container>
  );
};

export default Long;
