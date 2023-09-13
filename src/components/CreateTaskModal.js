import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Styles/CreateTaskModal.css';
import {toast} from 'react-toastify'

const CreateTaskModal = ({ createTask, handleClose }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Low',
    startDate: null,
    endDate: null,
    status: 'todo',
    assignedPerson: '',
    attachments: [],
    subTasks: [], // Add an empty array for subtasks
    id: Math.floor(Math.random() * 9999),
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

  const handleSubtaskChange = (e, index) => {
    const updatedSubtasks = [...newTask.subTasks];
    updatedSubtasks[index] = { ...updatedSubtasks[index], [e.target.name]: e.target.value };
    setNewTask({ ...newTask, subTasks: updatedSubtasks });
  };

  const addSubtask = () => {
    setNewTask({
      ...newTask,
      subTasks: [...newTask.subTasks, { title: '', description: '' }],
    });
    toast.success(`Subtask added`);
  };

  const removeSubtask = (index) => {
    const updatedSubtasks = [...newTask.subTasks];
    updatedSubtasks.splice(index, 1);
    setNewTask({ ...newTask, subTasks: updatedSubtasks });
    toast.error(`Subtask removed`);

  };
  const handleSubmit = () => {
    // Check if required fields are empty
    if (
      !newTask.title ||
      !newTask.description ||
      !newTask.startDate ||
      !newTask.endDate||
      !newTask.assignedPerson
    ) {
      toast.error("Please fill in all required fields.");
      return; // Prevent form submission
    }
  
    createTask(newTask);
    toast.success("Task added");
    handleClose();
  };

  return (
    <div className="creat-task-modal-overlay">
      <div className="create-task-modal">
        <h3>Create New Task</h3>
        <div className="form-group required mb-3">
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

        <div className="form-group required mb-3">
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

        <div className="form-group required mb-3">
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
            <div className="form-check form-check-inline required mb-3">
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
            <div className="form-check form-check-inline required mb-3">
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

        <div className="form-group required mb-3">
          <label>Start Date:</label>
          <DatePicker
            selected={newTask.startDate}
            onChange={(date) => handleDateChange(date, 'startDate')}
            dateFormat="dd/MM/yyyy"
            required
            className="form-control"
          />
        </div>

        <div className="form-group required mb-3">
          <label>End Date:</label>
          <DatePicker
            selected={newTask.endDate}
            onChange={(date) => handleDateChange(date, 'endDate')}
            dateFormat="dd/MM/yyyy"
            required
            className="form-control"
          />
        </div>

        <div className="form-group required mb-3">
          <label>Status:</label>
          <select
            name="status"
            value={newTask.status}
            onChange={handleInputChange}
            required
            className="form-control"
          >
            <option value="todo">To-do</option>
            <option value="inProgress">In progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="form-group required mb-3">
  <label>Assigned Person:</label>
  <select
    name="assignedPerson"
    value={newTask.assignedPerson}
    onChange={handleInputChange}
    required
    className="form-control"
  >
    <option value="" disabled hidden>
      Select Assignee
    </option>
    <option value="Person1">Person1</option>
    <option value="Person2">Person2</option>
    <option value="Person3">Person3</option>
  </select>
</div>

        <div className="form-group mb-3">
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

        <div className="form-group mb-3">
          <label>Subtasks:</label>
          {newTask.subTasks.map((subtask, index) => (
            <div key={index} className="subtask-container">
              <input
                type="text"
                className="form-control"
                name="title"
                value={subtask.title}
                onChange={(e) => handleSubtaskChange(e, index)}
                placeholder="Subtask Title"
              />
              <textarea
                className="form-control"
                name="description"
                value={subtask.description}
                onChange={(e) => handleSubtaskChange(e, index)}
                placeholder="Subtask Description"
              />
              <button onClick={() => removeSubtask(index)}>Remove</button>
            </div>
          ))}
          <button onClick={addSubtask}>Add Subtask</button>
        </div>

        <div className="button-container mb-3">
          <button className="btn btn-primary " onClick={handleSubmit}>
            Create
          </button>
          <button className="btn btn-secondary " onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
