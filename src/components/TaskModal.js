import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Styles/TaskModal.css';
import { toast } from 'react-toastify';


const TaskModal = ({ task, handleClose, updateTask, deleteTask }) => {
  const [updatedTask, setUpdatedTask] = useState({
    ...task,
    startDate: task.startDate || null,
    endDate: task.endDate || null,
  });
//   const notify = () => toast("Wow so easy!");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  const handleDateChange = (date, name) => {
    // Set the time component to midnight (00:00:00)
    const dateWithoutTime = new Date(date);
    dateWithoutTime.setHours(0, 0, 0, 0);
    setUpdatedTask({ ...updatedTask, [name]: dateWithoutTime });
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

  const handleSubtaskChange = (e, index) => {
    const updatedSubtasks = [...updatedTask.subTasks];
    updatedSubtasks[index] = { ...updatedSubtasks[index], [e.target.name]: e.target.value };
    setUpdatedTask({ ...updatedTask, subTasks: updatedSubtasks });
  };

  const addSubtask = () => {
    setUpdatedTask({
      ...updatedTask,
      subTasks: [...updatedTask.subTasks, { title: '', description: '' }],
    });
    toast.success(`Added subtask`)
  };

  const removeSubtask = (index) => {
    const updatedSubtasks = [...updatedTask.subTasks];
    updatedSubtasks.splice(index, 1);
    setUpdatedTask({ ...updatedTask, subTasks: updatedSubtasks });
    toast.error(`Removed subtask`)
  };

  const startDate= new Date(updatedTask.startDate )
  const endDate= new Date(updatedTask.endDate)

  const handleSubmit = () => {
    updateTask(updatedTask);
    handleClose();
    toast.success(`Updated ${updatedTask.title}`);
  };

  const handleDelete = () => {
    deleteTask(updatedTask.id);
    handleClose();
    toast.error(`Deleted ${updatedTask.title}`)
  };

  return (
    <div className='task-modal-overlay'>
      <div className='task-modal'>
        <div className='task-modal-content'>
        <button className='btn-close' onClick={handleClose} aria-label='Close'></button>

        <h3 className='mt-3 mb-4'>Task Details</h3>

        <div className='form-group'>
          <label className='task-modal-title'>Title:</label>
          <input
            type='text'
            name='title'
            value={updatedTask.title}
            onChange={handleInputChange}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label>Description:</label>
          <textarea
            name='description'
            value={updatedTask.description}
            onChange={handleInputChange}
            className='form-control'
            rows='3'
          />
        </div>

        <div className='form-group'>
          <label className='task-modal-title'>Priority:</label>
          <div>
            <div className='form-check form-check-inline'>
              <input
                type='radio'
                name='priority'
                value='Low'
                checked={updatedTask.priority === 'Low'}
                onChange={handleInputChange}
                className='form-check-input'
              />
              <label className='form-check-label'>Low</label>
            </div>
            <div className='form-check form-check-inline'>
              <input
                type='radio'
                name='priority'
                value='Medium'
                checked={updatedTask.priority === 'Medium'}
                onChange={handleInputChange}
                className='form-check-input'
              />
              <label className='form-check-label'>Medium</label>
            </div>
            <div className='form-check form-check-inline'>
              <input
                type='radio'
                name='priority'
                value='High'
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
            selected={ startDate}
            onChange={(date) => handleDateChange(date, 'startDate')}
            dateFormat="yyyy-MM-dd" // Adjust the format
            className='form-control'
            dateFormatCalendar="dd/MM/yyyy"
          />
        </div>

        <div className='form-group'>
          <label>End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => handleDateChange(date, 'endDate')}
            dateFormat="yyyy-MM-dd" // Adjust the format
            className='form-control'
            dateFormatCalendar="dd/MM/yyyy"
          />
        </div>

        <div className='form-group'>
          <label>Status:</label>
          <select
            name='status'
            value={updatedTask.status}
            onChange={handleInputChange}
            className='form-control'
          >
            <option value='To-do'>To-do</option>
            <option value='In progress'>In progress</option>
            <option value='Done'>Done</option>
          </select>
        </div>

        <div className='form-group'>
          <label>Assigned Person:</label>
          <select
            name='assignedPerson'
            value={updatedTask.assignedPerson}
            onChange={handleInputChange}
            className='form-control'
          >
            <option value='Person1'>Person1</option>
            <option value='Person2'>Person2</option>
            <option value='Person3'>Person3</option>
          </select>
        </div>

        <div className='form-group'>
          <label>Attachments:</label>
          <input
            type='file'
            name='attachments'
            accept='.pdf,.jpg,.jpeg,.png'
            onChange={handleAttachmentChange}
            multiple
            className='form-control-file'
          />
        </div>

        <div className='form-group'>
          <label>Subtasks:</label>
          {updatedTask.subTasks.map((subtask, index) => (
            <div key={index} className='subtask-container'>
              <input
                type='text'
                className='form-control'
                name='title'
                value={subtask.title}
                onChange={(e) => handleSubtaskChange(e, index)}
                placeholder='Subtask Title'
              />
              <textarea
                className='form-control'
                name='description'
                value={subtask.description}
                onChange={(e) => handleSubtaskChange(e, index)}
                placeholder='Subtask Description'
              />
              <button onClick={() => removeSubtask(index)}>Remove</button>
            </div>
          ))}
          <button onClick={addSubtask}>Add Subtask</button>
        </div>

        <div className='button-container mx-auto'>
          <button className='btn btn-primary' onClick={handleSubmit}>
            Update
          </button>
          <button className='btn btn-danger' onClick={handleDelete}>
            Delete
          </button>
          <button className='btn btn-secondary' onClick={handleClose}>
            Close
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
