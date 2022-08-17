import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { categoryState, newCategoryState } from "../atmos";
import styled from "styled-components";

interface INewCategory {
  NewCategory: string;
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

function CreateCategory() {
  const setCurrentCategory = useSetRecoilState(categoryState);
  const setNewCategory = useSetRecoilState(newCategoryState);
  const { register, handleSubmit, setValue } = useForm<INewCategory>();
  const onsubmit = ({ NewCategory }: INewCategory) => {
    setCurrentCategory(NewCategory as any);
    setNewCategory((NewCategories) => [NewCategory, ...NewCategories] as any);
    setValue("NewCategory", "");
  };
  return (
    <Container>
      <form onSubmit={handleSubmit(onsubmit)}>
        <Input
          {...register("NewCategory", { required: "Plese Write category" })}
          placeholder="Wirte a category"
        />
        <Button>Add</Button>
      </form>
    </Container>
  );
}

export default CreateCategory;
