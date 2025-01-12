import styled from "styled-components";

const Container = styled.div`
  padding: 10px 0;
  .detail {
    width: 30%;
    font-size: var(--small-size);
    padding: 10px 0;
    color: var(--gray-4);
    border-bottom: 1px dotted var(--gray-4);
  }
`;

const Short = (): JSX.Element => {
  return (
    <Container>
      <div className="detail">단답형 택스트</div>
    </Container>
  );
};

export default Short;
