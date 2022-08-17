import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

//recoil-persist로 local storage에 저장하기
const { persistAtom } = recoilPersist({
  key: "ToDoLocal",
  storage: localStorage,
});

//따로 지정하지 않으면 숫자로 지정됨
// "TO_DO" -> 0 이렇게
export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
  "DELETE" = "DELETE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export interface ICategory {
  newCategory: string;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const newCategoryState = atom<ICategory[]>({
  key: "newCategory",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDostate = atom<IToDo[]>({
  key: "ToDos",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDostate);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
