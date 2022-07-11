import React, { useState } from "react";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";
import "./styles.css";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState(["あああ", "いいい"]);
  const [completeTodos, setCompleteTodos] = useState(["ううう"]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  // 追加ボタンが押されたとき
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  // 削除ボタンが押されたとき
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    // 配列の中から何番目（index）を〇行数分削除するメソッド
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  // 完了ボタンが押されたとき
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    // 配列の中から何番目（index）を〇行数分削除するメソッド
    newIncompleteTodos.splice(index, 1);
    // 完了リストに追加
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];

    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  // 戻すボタンが押されたとき
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    // 配列の中から何番目（index）を〇行数分削除するメソッド
    newCompleteTodos.splice(index, 1);
    // 未完了リストに追加
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];

    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {/* 配列が5個以上になったら＝TRUEなら　&&の右辺を出力 */}
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるTODOは5個までです！</p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
