import React from 'react';

function Task({ task, onTitleChange, onDelete, onComplete, onIncomplete }) {
    function handleCheckboxChange(e) {
        if (e.target.checked) {
            onComplete(task.id);
        } else {
            onIncomplete(task.id);
        }
    }

    return (
        <div className={`task ${task.completed ? 'done' : ''}`} data-id={task.id}>
            <input type="checkbox" checked={task.completed} onChange={handleCheckboxChange} />
            <span className="title" contentEditable={true} onInput={(e) => onTitleChange(task.id, e.target.textContent)}>
                {task.title}
            </span>
            <span className="del" onClick={() => onDelete(task.id)}>
                Delete
            </span>
        </div>
    );
}

export default Task;
