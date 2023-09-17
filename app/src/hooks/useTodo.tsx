import { createWideHook } from "widehook";
import { TodoItem } from "../components/todo/Item";

export const useToDo = createWideHook({
  init: [{ id: 0, name: "first", isDone: false }] as TodoItem[],
});
