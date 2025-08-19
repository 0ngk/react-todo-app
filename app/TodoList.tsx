'use client';

import { Dispatch, SetStateAction } from "react";

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
      <TodoLeft setTodos={setTodos} isCompleted={todo.isCompleted} />
      <TodoCenter setTodos={setTodos} title={todo.title} description={todo.description} due={todo.due} />
      <TodoRight setTodos={setTodos} />
    </div>
  );
}

const TodoLeft = ({ setTodos, id, isCompleted }: { setTodos: SetTodos, id: string, isCompleted: boolean }) => {
  const handleOnChange = () => {}
  
  return (
    <CheckBox onChange={handleOnChange} isChecked={isCompleted} />
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
      <Button onClick={handleEdit} value="Edit" />
      <Button onClick={handleDelete} value="Delete" />
    </div>
  );
}

const CheckBox = ({ onChange, isChecked }: { onChange: () => void, isChecked: boolean }) => {
  return (
    <input type="checkbox" onChange={onChange} checked={isChecked} />
  )
}

const Button = ({ onClick, value }: { onClick: () => void, value: string }) => {
  return (
    <button onClick={onClick}>{value}</button>
  );
}
