import React, { useState } from "react";
import { InputTodo } from "./components/inputTodo";
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
      />
      <div className="incomplete-area">
        <p>未完了のTODO</p>
        <ul>
          {/* 第二引数indexには０から順番に数値が入る */}
          {incompleteTodos.map((todo, index) => {
            return (
              <li key={index}>
                {/* keyは一意である必要がある */}
                <div className="list-row">
                  <p>{todo}</p>
                  <button onClick={() => onClickComplete(index)}>完了</button>
                  {/* onClickDlete(index)だけだと何もしなくても実行されてしまうのでアロー関数にする*/}
                  <button onClick={() => onClickDelete(index)}>削除</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p>完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <li key={index}>
                <div className="list-row">
                  <p>{todo}</p>
                  <button onClick={() => onClickBack(index)}>戻す</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
