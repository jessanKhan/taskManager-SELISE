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

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Attachment = reader.result.split(',')[1];
        setUpdatedTask({ ...updatedTask, attachments: [...updatedTask.attachments, base64Attachment] });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    updateTask(updatedTask);
    handleClose();
  };

  return (
    <div className='task-modal-overlay'>
    <div className='task-modal'>
      <button
        className='btn-close'
        onClick={handleClose}
        aria-label='Close'
      >

      </button>

      <h3 className='mt-3 mb-4'>Task Details</h3>

      <div className='form-group'>
        <label className='task-modal-title'>Title:</label>
        <input
          type="text"
          name="title"
          value={updatedTask.title}
          onChange={handleInputChange}
          className='form-control'
        />
      </div>

      <div className='form-group'>
        <label>Description:</label>
        <textarea
          name="description"
          value={updatedTask.description}
          onChange={handleInputChange}
          className='form-control'
          rows="3"
        />
      </div>

      <div className='form-group'>
        <label className='task-modal-title'>Priority:</label>
        <div>
          <div className='form-check form-check-inline'>
            <input
              type="radio"
              name="priority"
              value="Low"
              checked={updatedTask.priority === 'Low'}
              onChange={handleInputChange}
              className='form-check-input'
            />
            <label className='form-check-label'>Low</label>
          </div>
          <div className='form-check form-check-inline'>
            <input
              type="radio"
              name="priority"
              value="Medium"
              checked={updatedTask.priority === 'Medium'}
              onChange={handleInputChange}
              className='form-check-input'
            />
            <label className='form-check-label'>Medium</label>
          </div>
          <div className='form-check form-check-inline'>
            <input
              type="radio"
              name="priority"
              value="High"
              checked={updatedTask.priority === 'High'}
              onChange={handleInputChange}
              className='form-check-input'
            />
            <label className='form-check-label'>High</label>
          </div>
        </div>
      </div>

      <div className='form-group'>
        <label>Start Date:</label>
        <DatePicker
          selected={updatedTask.startDate}
          onChange={(date) => handleDateChange(date, 'startDate')}
          dateFormat="dd/MM/yyyy"
          className='form-control'
        />
      </div>

      <div className='form-group'>
        <label>End Date:</label>
        <DatePicker
          selected={updatedTask.endDate}
          onChange={(date) => handleDateChange(date, 'endDate')}
          dateFormat="dd/MM/yyyy"
          className='form-control'
        />
      </div>

      <div className='form-group'>
        <label>Status:</label>
        <select
          name="status"
          value={updatedTask.status}
          onChange={handleInputChange}
          className='form-control'
        >
          <option value="To-do">To-do</option>
          <option value="In progress">In progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <div className='form-group'>
        <label>Assigned Person:</label>
        <select
          name="assignedPerson"
          value={updatedTask.assignedPerson}
          onChange={handleInputChange}
          className='form-control'
        >
          <option value="Person1">Person1</option>
          <option value="Person2">Person2</option>
          <option value="Person3">Person3</option>
        </select>
      </div>

      <div className='form-group'>
        <label>Attachments:</label>
        <input
          type="file"
          name="attachments"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleAttachmentChange}
          multiple
          className='form-control-file'
        />
      </div>

      {/* Display uploaded attachments (optional) */}
      <ul>
        {updatedTask.attachments.map((attachment, index) => (
          <li key={index}>
            Attachment {index + 1}
            <button
              onClick={() => {
                const updatedAttachments = [...updatedTask.attachments];
                updatedAttachments.splice(index, 1);
                setUpdatedTask({ ...updatedTask, attachments: updatedAttachments });
              }}
              className='btn btn-danger btn-sm ml-2'
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className='button-container'>
        <button className='btn btn-primary' onClick={handleSubmit}>Update</button>
        <button className='btn btn-secondary' onClick={handleClose}>Close</button>
      </div>
    </div>
    </div>

  );
};

export default TaskModal;
