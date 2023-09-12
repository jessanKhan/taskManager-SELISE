import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Styles/CreateTaskModal.css';

const CreateTaskModal = ({ createTask, handleClose }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Low',
    startDate: null,
    endDate: null,
    status: 'To-do',
    assignedPerson: '',
    attachments: [],
    subTasks: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleDateChange = (date, name) => {
    setNewTask({ ...newTask, [name]: date });
  };

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Attachment = reader.result.split(',')[1];
        setNewTask({ ...newTask, attachments: [...newTask.attachments, base64Attachment] });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    createTask(newTask);
    handleClose();
  };

  return (
    <div className="create-task-modal">
      <h3>Create New Task</h3>
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          required
          maxLength="100"
        />
      </div>

      <div className="form-group">
        <label>Description:</label>
        <textarea
          className="form-control"
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          required
          maxLength="150"
        />
      </div>

      <div className="form-group">
        <label>Priority:</label>
        <div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              name="priority"
              value="Low"
              checked={newTask.priority === 'Low'}
              onChange={handleInputChange}
            />
            <label className="form-check-label">Low</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              name="priority"
              value="Medium"
              checked={newTask.priority === 'Medium'}
              onChange={handleInputChange}
            />
            <label className="form-check-label">Medium</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              name="priority"
              value="High"
              checked={newTask.priority === 'High'}
              onChange={handleInputChange}
            />
            <label className="form-check-label">High</label>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Start Date:</label>
        <DatePicker
          selected={newTask.startDate}
          onChange={(date) => handleDateChange(date, 'startDate')}
          dateFormat="dd/MM/yyyy"
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label>End Date:</label>
        <DatePicker
          selected={newTask.endDate}
          onChange={(date) => handleDateChange(date, 'endDate')}
          dateFormat="dd/MM/yyyy"
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label>Status:</label>
        <select
          name="status"
          value={newTask.status}
          onChange={handleInputChange}
          required
          className="form-control"
        >
          <option value="To-do">To-do</option>
          <option value="In progress">In progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <div className="form-group">
        <label>Assigned Person:</label>
        <select
          name="assignedPerson"
          value={newTask.assignedPerson}
          onChange={handleInputChange}
          required
          className="form-control"
        >
          <option value="Person1">Person1</option>
          <option value="Person2">Person2</option>
          <option value="Person3">Person3</option>
        </select>
      </div>

      <div className="form-group">
        <label>Attachments:</label>
        <input
          type="file"
          name="attachments"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleAttachmentChange}
          multiple
          className="form-control-file"
        />
      </div>

      {/* Display uploaded attachments (optional) */}
      <ul>
        {newTask.attachments.map((attachment, index) => (
          <li key={index}>
            Attachment {index + 1}
            <button
              onClick={() => {
                const updatedAttachments = [...newTask.attachments];
                updatedAttachments.splice(index, 1);
                setNewTask({ ...newTask, attachments: updatedAttachments });
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="button-container">
        <button className="btn btn-primary" onClick={handleSubmit}>Create</button>
        <button className="btn btn-secondary" onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default CreateTaskModal;
