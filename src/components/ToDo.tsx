import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, IToDo, newCategoryState, toDostate } from "../atmos";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Li = styled.li`
  list-style: none;
  span {
    display: block;
    text-align: center;
    padding-bottom: 0.5rem;
  }
`;

const Button = styled.button`
  margin-left: 0.3rem;
  height: 1.5rem;
  width: 5rem;
  border: none;
  border-radius: 1rem;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.accentColor};
`;

function ToDo({ text, category, id }: IToDo) {
  const NewCategories = useRecoilValue(newCategoryState);
  //기존에 있던 카테고리랑 새로만든 카테고리 합치기
  const CATEGORIES = [...Object.keys(Categories), ...NewCategories];
  const setToDos = useSetRecoilState(toDostate);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id == id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <Container>
      <Li>
        <span>{text}</span>
        {CATEGORIES.map(
          (key: any) =>
            category !== key && (
              <Button name={key} onClick={onClick}>
                {key}
              </Button>
            )
        )}
      </Li>
    </Container>
  );
}

export default ToDo;
