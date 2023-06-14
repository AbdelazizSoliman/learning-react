/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Task from './Task';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  function loadTasks() {
    const data = localStorage.getItem('tasks');
    setTasks(data ? JSON.parse(data) : []);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function handleTitleChange(taskId, newTitle) {
    setTasks((prevTasks) => prevTasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, title: newTitle };
      }
      return task;
    }));
  }

  function handleDelete(taskId) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }

  function handleNewTaskSubmit(taskText) {
    const task = {
      id: Date.now(),
      title: taskText,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, task]);
  }

  function markTaskComplete(taskId) {
    setTasks((prevTasks) => prevTasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: true };
      }
      return task;
    }));
  }

  function markTaskIncomplete(taskId) {
    setTasks((prevTasks) => prevTasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: false };
      }
      return task;
    }));
  }

  function clearCompletedTasks() {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  }

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleNewTaskInputChange = (event) => {
    setNewTaskTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleNewTaskSubmit(newTaskTitle);
    setNewTaskTitle('');
  };

  return (

    <main className="main-container">
      <header>
        <div className="container">
          <h1 className="todo-text">Today To Do</h1>
          <i className="fa fa-refresh" />
        </div>
        <hr />
        <form onSubmit={handleSubmit} id="new-task-form">
          <input
            type="text"
            id="new-task-input"
            placeholder="Add to your list..."
            value={newTaskTitle}
            onChange={handleNewTaskInputChange}
          />
          <button className="add" type="submit">
            Add
          </button>
        </form>
      </header>
      <section className="task-list">
        <hr />
        <ul id="tasks">
          {tasks.map((task) => (
            <li key={task.id} className={`task ${task.completed ? 'done' : ''}`}>
              <input type="checkbox" checked={task.completed} onChange={() => (task.completed ? markTaskIncomplete(task.id) : markTaskComplete(task.id))} />
              <a className="title" contentEditable suppressContentEditableWarning onBlur={(e) => handleTitleChange(task.id, e.target.textContent)}>
                {task.title}
              </a>
              <button className="del" type="submit" onClick={() => handleDelete(task.id)}>
                <i className="fa fa-trash">Delete</i>
              </button>
            </li>
          ))}
        </ul>
        <div className="actions">
          <button className="clear" type="submit" onClick={clearCompletedTasks}>
            Clear all completed
          </button>
        </div>
      </section>
    </main>
  );
}

export default TaskList;
