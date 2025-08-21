'use client';

import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Pencil, Trash } from 'lucide-react';

type SetTodos = Dispatch<SetStateAction<Todo[]>>;

export const TodoList = ({ todos, setTodos }: { todos: Todo[], setTodos: SetTodos }) => {
  return (
    <div>
      { todos.map(todo => <Todo key={todo.id} todo={todo} setTodos={setTodos} />) }
    </div>
  );
}

export type Todo = {
  id: string,
  title: string,
  description: string,
  due?: Date,
  isCompleted: boolean,
}

const Todo = ({todo, setTodos }: { todo: Todo, setTodos: SetTodos }) => {
  return (
    <div>
      <TodoLeft setTodos={setTodos} id={todo.id} isCompleted={todo.isCompleted} />
      <TodoCenter setTodos={setTodos} title={todo.title} description={todo.description} due={todo.due} />
      <TodoRight setTodos={setTodos} id={todo.id} />
    </div>
  );
}

const TodoLeft = ({ setTodos, id, isCompleted }: { setTodos: SetTodos, id: string, isCompleted: boolean }) => {
  const handleCheck = () => {
    setTodos(todos_ => todos_.map(t_ => {
      return t_.id === id ? {...t_, isCompleted: !t_.isCompleted}: t_;
    }))
  }
  
  return (
    <CheckBox onChange={handleCheck} isChecked={isCompleted} />
  );
}

const TodoCenter = (
  { setTodos, title, description, due }: { setTodos: SetTodos, title: string, description: string, due?: Date }
) => {
  return (
    <div>
      <p>{title}</p>
      <p>{description}</p>
      <p>{due?.toString()}</p>
    </div>
  );
}

const TodoRight = ({ setTodos, id }: { setTodos: SetTodos, id: string }) => {
  const handleEdit = () => {}
  const handleDelete = () => {
    setTodos(todos_ => todos_.filter(t_ => t_.id !== id))
  }
  return (
    <div>
      <Button onClick={handleEdit}>
        <Pencil />
      </Button>
      <Button onClick={handleDelete} value="Delete" variant="destructive">
        <Trash />
      </Button>
    </div>
  );
}

const CheckBox = ({ onChange, isChecked }: { onChange: () => void, isChecked: boolean }) => {
  return (
    <Checkbox />
  )
}
