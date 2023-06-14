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

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <input type="text" id="new-task-input" />
                <button className="add" onClick={() => handleNewTaskSubmit(document.getElementById('new-task-input').value)}>
                    Add
                </button>
            </form>
            <div id="tasks">
                {tasks.map((task) => (
                    <Task key={task.id} task={task} onTitleChange={handleTitleChange} onDelete={handleDelete} onComplete={markTaskComplete} onIncomplete={markTaskIncomplete} />
                ))}
            </div>
            <button className="clear" onClick={clearCompletedTasks}>
                Clear Completed
            </button>
        </div>
    );
}

export default TaskList;
