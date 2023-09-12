import React, { useState } from 'react';
import TaskModal from './TaskModal';
import './Styles/TaskList.css';
import { format } from 'date-fns';



const TaskList = ({ tasks, status, updateTask, deleteTask,onDragEnd }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setShowModal(false);
  };

  const handleDeleteClick = (taskId) => {
    // Call the deleteTask function passed from the parent component
    deleteTask(taskId);
  };

  const handleUpdateTask = (updatedTask) => {
    // Call the updateTask function passed from the parent component
    updateTask(updatedTask);
    handleCloseModal();
  };

  return (
    <div>
      <h2>{status} Tasks</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <div onClick={() => handleTaskClick(task)}>
              <div className="task-title">{task.title}</div>
              <div className="task-details">
                <span className={`task-priority priority-${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
                <span className="task-end-date">End Date: {format(task.endDate, 'dd/MM/yyyy')}</span>
              </div>
            </div>
            <button onClick={() => handleDeleteClick(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {showModal && (
        <TaskModal
          task={selectedTask}
          handleClose={handleCloseModal}
          updateTask={handleUpdateTask}
        />
      )}
    </div>
  );
};

export default TaskList;
