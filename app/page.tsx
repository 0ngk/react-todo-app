'use client';

import { Todo, TodoList } from "./TodoList";
import { Navigation } from "./Navigation";
import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([
    {
      id: "id-1",
      title: "水を2L飲む",
      description: "ミネラルウォーター",
      isCompleted: false,
    },
    {
      id: "id-2",
      title: "顔を洗う",
      description: "洗顔料を使う",
      isCompleted: true,
    },
    {
      id: "id-3",
      title: "トマトを買う",
      description: "スーパーで",
      due: new Date("2025-10-11"),
      isCompleted: false,
    },
  ]);
  return (
    <>
      <Navigation/>
      <TodoList todos={todos} setTodos={setTodos} />
    </>
  );
}
