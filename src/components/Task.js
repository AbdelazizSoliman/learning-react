// /* eslint-disable jsx-a11y/no-static-element-interactions */
// /* eslint-disable react/prop-types */
// import React from 'react';

// function Task({
//   task, onTitleChange, onDelete, onComplete, onIncomplete,
// }) {
//   function handleCheckboxChange(e) {
//     if (e.target.checked) {
//       onComplete(task.id);
//     } else {
//       onIncomplete(task.id);
//     }
//   }

//   return (
//     <div className={`task ${task.completed ? 'done' : ''}`} data-id={task.id}>
//       <input type="checkbox" checked={task.completed} onChange={handleCheckboxChange} />
//         {task.title}
//       </span>
//       <span className="del" onClick={() => onDelete(task.id)}>
//         Delete
//       </span>
//     </div>
//   );
// }

// export default Task;
