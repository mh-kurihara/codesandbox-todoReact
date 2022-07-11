import React from "react";

export const IncompleteTodos = (props) => {
  const { todos, onClickComplete, onClickDelete } = props;
  return (
    <div className="incomplete-area">
      <p>未完了のTODO</p>
      <ul>
        {/* 第二引数indexには０から順番に数値が入る */}
        {todos.map((todo, index) => {
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
  );
};
