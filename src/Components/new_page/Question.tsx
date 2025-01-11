import styled from "styled-components";
import { QuestionType } from "../../types";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const Container = styled.div<{ isDragging: boolean }>`
  position: relative;
  margin-top: 20px;
  width: 100%;
  height: 200px;
  padding: 20px;
  border-radius: 10px;
  background-color: var(--box-color);
  opacity: ${(props) => (props.isDragging ? "0.8" : "1")};
`;
const DragHandle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10px;
  background-color: gray;
  cursor: grab;
  border-radius: 10px 10px 0 0;
`;

const Question = ({ id, index, moveItem }: QuestionType): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag, preview] = useDrag({
    type: "QUESTION",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "QUESTION",
    hover(item: { index: number }, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(preview(ref));

  return (
    <Container ref={drop} isDragging={isDragging}>
      <DragHandle ref={drag} />
    </Container>
  );
};

export default Question;
