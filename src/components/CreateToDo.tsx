import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDostate } from "../atmos";

interface Ifrom {
  ToDo: string;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  margin-right: 10px;
  width: 20em;
  height: 2.5em;
  border-left: none;
  border-right: none;
  border-top: none;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  border-bottom: 3px solid ${(props) => props.theme.accentColor};
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  height: 2.5em;
  width: 5rem;
  padding: 10px;
  border: none;
  border-radius: 1rem;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.accentColor};
  cursor: pointer;
`;

function CreateToDo() {
  const setToDos = useSetRecoilState(toDostate);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<Ifrom>();
  const onSubmit = ({ ToDo }: Ifrom) => {
    setToDos((oldToDos) => [
      { text: ToDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("ToDo", "");
  };
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("ToDo", { required: "Plese Write to do" })}
          placeholder="Wirte a to do"
        />
        <Button>Add</Button>
      </form>
    </Container>
  );
}

export default CreateToDo;
