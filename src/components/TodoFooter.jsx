import React from 'react';

const TodoFooter = ({ todos, clearCompleted, filter, setFilter }) => {
  const activeTodoCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeTodoCount;

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeTodoCount}</strong> {activeTodoCount === 1 ? 'item' : 'items'} left
      </span>
      <ul className="filters">
        <li>
          <a href="#/" className={filter === 'all' ? 'selected' : ''} onClick={() => setFilter('all')}>
            All
          </a>
        </li>
        <li>
          <a href="#/active" className={filter === 'active' ? 'selected' : ''} onClick={() => setFilter('active')}>
            Pending
          </a>
        </li>
        <li>
          <a href="#/completed" className={filter === 'completed' ? 'selected' : ''} onClick={() => setFilter('completed')}>
            Completed
          </a>
        </li>
      </ul>
      {completedCount > 0 && (
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default TodoFooter;