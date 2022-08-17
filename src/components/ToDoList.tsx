import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Categories,
  categoryState,
  newCategoryState,
  toDoSelector,
} from "../atmos";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px 10px;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  margin: 20px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 800;
  color: ${(props) => props.theme.accentColor};
`;

const Form = styled.form`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Select = styled.select`
  height: 2.5em;
  width: 5.5rem;
  padding: 10px;
  margin-right: 10px;
  border: none;
  border-radius: 1rem;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.accentColor};
  &:focus {
    outline: none;
  }
`;

function ToDoList() {
  const NewCategories = useRecoilValue(newCategoryState);
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    //option의 value가 categortie 타입과 같다는 걸 인지 하지 못 해서 as any
    setCategory(event.currentTarget.value as any);
  };
  return (
    <Container>
      <Header>
        <Title>To Dos</Title>
      </Header>
      <CreateCategory />
      <Form>
        <Select onInput={onInput}>
          <option value={Categories.TO_DO}>TO DO</option>
          <option value={Categories.DOING}>DOING</option>
          <option value={Categories.DONE}>DONE</option>
          {NewCategories.map((cate) => (
            <option key={cate as any}>{cate as any}</option>
          ))}
        </Select>
      </Form>

      <CreateToDo />
      {toDos.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Container>
  );
}

export default ToDoList;
