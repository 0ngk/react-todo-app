'use client';

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Pencil, Plus, Trash } from 'lucide-react';

type SetTodos = Dispatch<SetStateAction<Todo[]>>;

export const TodoList = ({ todos, setTodos }: { todos: Todo[], setTodos: SetTodos }) => {
  return (
    <div>
      <TodoForm todos={todos} setTodos={setTodos}/>
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

const TodoForm = ({ todos, setTodos }: { todos: Todo[], setTodos: SetTodos }) => {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    due: new Date(),
    isCompleted: false,
  })
  const handleFormSubmission = () => {
    setTodos(todos.concat({
      ...todo,
      id: crypto.randomUUID(),
    }))
  }

  return (
    <form onSubmit={e => {
      e.preventDefault();
    }}>
      <div>
        <label>
          title:{" "}
            <input
              value={todo.title}
              onChange={e => {
                setTodo({...todo, title: e.target.value})
              }}
            />
        </label>
      </div>
      <div>
        <label>
          description:{" "}
            <input
              value={todo.description}
              onChange={e => {
                setTodo({...todo, description: e.target.value})
              }}
            />
        </label>
      </div>
      <div>
        <label>
          due:{" "}
            <input
              type="date"
              value={`${todo.due.getFullYear()}-${(todo.due.getMonth() + 1).toString().padStart(2, "0")}-${todo.due.getDate().toString().padStart(2, "0")}`}
              onChange={e => {
                setTodo({...todo, due: new Date(e.target.value)})
              }}
            />
        </label>
      </div>
      <div>
        <Button onClick={handleFormSubmission} disabled={todo.title === ""}>
          <Plus />
        </Button>
      </div>
    </form>
  );
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
