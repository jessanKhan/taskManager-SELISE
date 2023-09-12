import React, { useState } from 'react';
import TaskModal from './TaskModal';
import './Styles/TaskList.css';

const TaskList = ({ tasks, status, updateTask, deleteTask }) => {
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

  return (
    <div>
      <h2>{status} Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div onClick={() => handleTaskClick(task)}>{task.title}</div>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {showModal && (
        <TaskModal
          task={selectedTask}
          handleClose={handleCloseModal}
          updateTask={updateTask}
        />
      )}
    </div>
  );
};

export default TaskList;
