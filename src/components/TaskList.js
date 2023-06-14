import React, { useState, useEffect } from 'react';
import Task from './Task';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadTasks();
    }, []);

    function loadTasks() {
        const data = localStorage.getItem('tasks');
        setTasks(data ? JSON.parse(data) : []);
    }

    function saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function handleTitleChange(taskId, newTitle) {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (task.id === taskId) {
                    return { ...task, title: newTitle };
                }
                return task;
            })
        );
    }

    function handleDelete(taskId) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        deleteTask(taskId);
    }

    function handleNewTaskSubmit(taskText) {
        const task = {
            id: Date.now(),
            title: taskText,
            completed: false,
        };
        setTasks((prevTasks) => [...prevTasks, task]);
        createNewTask(taskText);
    }

    function markTaskComplete(taskId) {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (task.id === taskId) {
                    return { ...task, completed: true };
                }
                return task;
            })
        );
    }

    function markTaskIncomplete(taskId) {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (task.id === taskId) {
                    return { ...task, completed: false };
                }
                return task;
            })
        );
    }

    function clearCompletedTasks() {
        setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
    }

    function createNewTask(taskText) {
        // Here you would implement the code to create a new task and save it to your backend or database.
        // For simplicity, in this example, we'll just log the new task to the console.
        console.log(`Created new task: "${taskText}"`);
    }

    function deleteTask(taskId) {
        // Here you would implement the code to delete the task with the given ID from your backend or database.
        // For simplicity, in this example, we'll just log the deleted task ID to the console.
        console.log(`Deleted task with ID: ${taskId}`);
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
        // <div>
        //     <form onSubmit={(e) => e.preventDefault()}>
        //         <input type="text" id="new-task-input" />
        //         <button className="add" onClick={() => handleNewTaskSubmit(document.getElementById('new-task-input').value)}>
        //             Add
        //         </button>
        //     </form>
        //     <div id="tasks">
        //         {tasks.map((task) => (
        //             <Task key={task.id} task={task} onTitleChange={handleTitleChange} onDelete={handleDelete} onComplete={markTaskComplete} onIncomplete={markTaskIncomplete} />
        //         ))}
        //     </div>
        //     <button className="clear" onClick={clearCompletedTasks}>
        //         Clear Completed
        //     </button>
        // </div>

        <main className="main-container">
            <header>
                <div className="container">
                    <h1 className="todo-text">Today's To Do</h1>
                    <i className="fa fa-refresh"></i>
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
                            <input type="checkbox" checked={task.completed} onChange={() => task.completed ? markTaskIncomplete(task.id) : markTaskComplete(task.id)} />
                            <a href="#" className="title" contentEditable suppressContentEditableWarning onBlur={(e) => handleTitleChange(task.id, e.target.textContent)}>
                                {task.title}
                            </a>
                            <button className="del" onClick={() => handleDelete(task.id)}>
                                <i className="fa fa-trash">Delete</i>
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="actions">
                    <button className="clear" onClick={clearCompletedTasks}>
                        Clear all completed
                    </button>
                </div>
            </section>
        </main>
    );
}

export default TaskList;
