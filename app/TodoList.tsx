'use client';

export const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <div>
      { todos.map(todo => <Todo key={todo.id} todo={todo}/>) }
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

const Todo = ({todo}: { todo: Todo }) => {
  return (
    <div>
      <TodoLeft isCompleted={todo.isCompleted} />
      <TodoCenter title={todo.title} description={todo.description} due={todo.due} />
      <TodoRight/>
    </div>
  );
}

const TodoLeft = ({ isCompleted }: { isCompleted: boolean }) => {
  const handleOnChange = () => {}
  
  return (
    <CheckBox onChange={handleOnChange} isChecked={isCompleted} />
  );
}

const TodoCenter = (
  { title, description, due }: { title: string, description: string, due?: Date }
) => {
  return (
    <div>
      <p>{title}</p>
      <p>{description}</p>
      <p>{due?.toString()}</p>
    </div>
  );
}

const TodoRight = () => {
  const handleEdit = () => {}
  const handleDelete = () => {}
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
