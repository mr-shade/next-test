'use client';

import { useState, useEffect } from 'react';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Function to fetch todos from API
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/todos');
      const data = await response.json();
      
      if (response.ok) {
        setTodos(data.todos || []);
      } else {
        setError(data.error || 'Failed to fetch todos');
      }
    } catch (error) {
      setError('Error connecting to the server');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to add a new todo
  const addTodo = async (e) => {
    e.preventDefault();
    
    if (!newTodo.trim()) return;
    
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTodo }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setTodos([data.todo, ...todos]);
        setNewTodo('');
      } else {
        setError(data.error || 'Failed to add todo');
      }
    } catch (error) {
      setError('Error connecting to the server');
      console.error(error);
    }
  };

  // Function to toggle todo completion status
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <p className="text-center">Loading todos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-3 rounded mb-4">
          {error}
        </div>
        <button
          onClick={fetchTodos}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <form onSubmit={addTodo} className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md"
          >
            Add
          </button>
        </div>
      </form>

      {todos.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No todos yet. Add one above!</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="mr-3 h-5 w-5 text-blue-500"
              />
              <span
                className={`flex-1 ${
                  todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
                }`}
              >
                {todo.title}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
