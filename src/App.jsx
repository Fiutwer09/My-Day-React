import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import TodoFooter from './components/TodoFooter';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);

  // Al cargar la aplicación, obtén las tareas desde LocalStorage
  useEffect(() => {
    try {
      const storedTodos = localStorage.getItem('mydayapp-reactjs');
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
      setTodos([]);
    }
  }, []);

  // Cada vez que las tareas cambian, guarda en LocalStorage
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('mydayapp-reactjs', JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = (title) => {
    const newTodo = {
      id: Date.now().toString(),
      title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const updateTodo = (id, title) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, title } : todo))
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const [filter, setFilter] = useState('all');

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <>
    <div className='Container'>
    <div className='Titles'>
    <h1>My Day</h1>
    <p className="subtitle">All my tasks in one place</p>
    </div>
    <div className="todoapp">
      <TodoForm addTodo={addTodo} />
    </div>
    {todos.length > 0 && (
        <>
        <div className="TodoList-container">
        <TodoList
            todos={filteredTodos}
            toggleTodo={toggleTodo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
          <TodoFooter
            todos={todos}
            clearCompleted={clearCompleted}
            filter={filter}
            setFilter={setFilter}
          />
        </div>
        </>
      )}
    </div>
    </>
  );
};

export default App;
