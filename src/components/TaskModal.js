import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Styles/TaskModal.css';

const TaskModal = ({ task, handleClose, updateTask }) => {
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  const handleDateChange = (date, name) => {
    setUpdatedTask({ ...updatedTask, [name]: date });
  };

  const handleSubmit = () => {
    updateTask(updatedTask);
    handleClose();
  };

  return (
    <div className='task-modal'>
      <h3>Task Details</h3>
      <label className='task-modal-title'>Title:</label>
      <input
        type="text"
        name="title"
        value={updatedTask.title}
        onChange={handleInputChange}
        className='input-field'
      />
      {/* Add other input fields and components for the task details */}
      <button onClick={handleSubmit}>Update</button>
      <button onClick={handleClose}>Close</button>
    </div>
  );
};

export default TaskModal;
