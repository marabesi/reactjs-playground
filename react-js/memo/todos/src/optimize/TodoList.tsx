import { filterTodos } from './utils-slow'
import {memo, useMemo} from "react";

export default memo(function TodoList({ todos, theme, tab }: { todos: any[], theme: string, tab: string }) {
  // const visibleTodos = filterTodos(todos, tab);
  const visibleTodos = useMemo(
    () => {
      console.log("optimized: i rerendered");
      return filterTodos(todos, tab);
    },
    [todos, tab]
  );
  return (
    <div className={theme}>
      <ul>
        <p><b>Note: <code>filterTodos</code> is artificially slowed down!</b></p>
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            {todo.completed ?
              <s>{todo.text}</s> :
              todo.text
            }
          </li>
        ))}
      </ul>
    </div>
  );
});
