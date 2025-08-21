'use client';

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Pencil, Plus, Save, Trash } from 'lucide-react';

type SetTodos = Dispatch<SetStateAction<Todo[]>>;
type SetTodoForEdit = Dispatch<SetStateAction<Todo>>;
type SetIsEditing = Dispatch<SetStateAction<boolean>>;

export const TodoList = ({ todos, setTodos }: { todos: Todo[], setTodos: SetTodos }) => {
  return (
    <div className="container mx-auto">
      <TodoForm todos={todos} setTodos={setTodos}/>
      <div className="px-6 grid gap-6">
        { todos.map(todo => <Todo key={todo.id} todo={todo} setTodos={setTodos} />) }
      </div>
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

const convertToIso8601 = (date: Date) => `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`

const TodoForm = ({ todos, setTodos }: { todos: Todo[], setTodos: SetTodos }) => {
  const emptyTodo: Todo = {
    id: "",
    title: "",
    description: "",
    isCompleted: false,
  }
  const [todo, setTodo] = useState(emptyTodo)
  const handleFormSubmission = () => {
    setTodos(todos.concat({
      ...todo,
      id: crypto.randomUUID(),
    }))
    setTodo(emptyTodo)
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
              value={todo.due && convertToIso8601(todo.due)}
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
  const [todoForEdit, SetTodoForEdit] = useState(todo)
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="flex items-center justify-between gap-4">
      <TodoCenter setTodos={setTodos} isEditing={isEditing} todo={todo} todoForEdit={todoForEdit} setTodoForEdit={SetTodoForEdit} />
      <TodoRight setTodos={setTodos} isEditing={isEditing} setIsEditing={setIsEditing} todoForEdit={todoForEdit} id={todo.id} />
    </div>
  );
}

const TodoCenter = (
  { setTodos, isEditing, todo, todoForEdit, setTodoForEdit }: { 
    setTodos: SetTodos, isEditing: boolean, todo: Todo, todoForEdit: Todo, setTodoForEdit: SetTodoForEdit
  }
) => {
  const handleCheck = () => {
    setTodos(todos_ => todos_.map(t_ => {
      return t_.id === todo.id ? {...t_, isCompleted: !t_.isCompleted}: t_;
    }))
  }
  
  return (
    <div className="flex items-center gap-4">
      <CheckBox onChange={handleCheck} isChecked={todo.isCompleted} />
      <div className="flex flex-col gap-0.5">
        { 
          isEditing
          ? <div><input onChange={(e) => {
              setTodoForEdit({...todoForEdit, title: e.target.value})
            }} value={todoForEdit.title}/></div>
          : <p className="font-medium">{todoForEdit.title}</p>
        }
        { 
          isEditing
          ? <div><input onChange={(e) => {
              setTodoForEdit({...todoForEdit, description: e.target.value})
            }} value={todoForEdit.description}/></div>
          : <p className="text-xs">{todoForEdit.description}</p>
        }
        { 
          isEditing
          ? <div><input onChange={(e) => {
              setTodoForEdit({...todoForEdit, due: new Date(e.target.value)})
            }} type="date" value={todoForEdit.due && convertToIso8601(todoForEdit.due)}/></div>
          : <p>{todoForEdit.due?.toString()}</p>
        }
      </div>
    </div>
  );
}

const TodoRight = (
  { setTodos, isEditing, setIsEditing, todoForEdit, id }: {
    setTodos: SetTodos, isEditing: boolean, setIsEditing: SetIsEditing, todoForEdit: Todo, id: string
  }
) => {
  const handleEdit = () => {
    setIsEditing(ie => !ie)
    if (!isEditing) return;
    setTodos(todos_ => todos_.map(t_ => t_.id === id ? todoForEdit : t_))
  }
  const handleDelete = () => {
    setTodos(todos_ => todos_.filter(t_ => t_.id !== id))
  }
  return (
    <div className="flex justify-center items-center gap-4">
      <Button onClick={handleEdit}>
        {
          isEditing ? <Save /> : <Pencil />
        }
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
