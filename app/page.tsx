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
  ]);
  return (
    <>
      <Navigation/>
      <TodoList todos={todos} setTodos={setTodos} />
    </>
  );
}
