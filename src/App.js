import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import CreateTaskModal from './components/CreateTaskModal';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);

  // Load tasks from local storage on initial render
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Implement functions for updating, deleting, and creating tasks
  const deleteTask = (taskId) => {
    // Filter out the task with the specified taskId from the state
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  
    // Update localStorage with the updated task list
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };
  

  const updateTask = (updatedTask) => {
    // Find the index of the task to update in the tasks array
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
  
    // Update the tasks state with the updatedTasks array
    setTasks(updatedTasks);
  
    // Update localStorage with the updated task list
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };
  const onDragEnd = (result) => {
    if (!result.destination) {
      return; // Item was not dropped into a valid drop target
    }
  
    const sourceStatus = result.source.droppableId;
    const destinationStatus = result.destination.droppableId;
    const taskId = result.draggableId;
  
    // Update the task's status based on source and destination
    // You can implement your logic to update the task status here
  
    // Example: Move the task from sourceStatus to destinationStatus
    const updatedTask = tasks.find((task) => task.id.toString() === taskId);
    updatedTask.status = destinationStatus;
  
    // Call the updateTask function passed from the parent component to update the task in the state
    updateTask(updatedTask);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Task Management System</h1>
      <div className="text-center">
        <button className="btn btn-primary" onClick={() => setShowCreateTaskModal(true)}>
          Create Task
        </button>
      </div>
      {showCreateTaskModal && (
        <CreateTaskModal
          createTask={(newTask) => {
            setTasks([...tasks, newTask]);
            setShowCreateTaskModal(false);
          }}
          handleClose={() => setShowCreateTaskModal(false)}
        />
      )}
      <div className="row mt-4">
        <div className="col">
          <TaskList
            tasks={tasks.filter((task) => task.status === 'To-do')}
            status="To-do"
            deleteTask={deleteTask}
            updateTask={updateTask}
            onDragEnd={onDragEnd} 
          />
        </div>
        <div className="col">
          <TaskList
            tasks={tasks.filter((task) => task.status === 'In progress')}
            status="In Progress"
            deleteTask={deleteTask}
            updateTask={updateTask}
            onDragEnd={onDragEnd} 
          />
        </div>
        <div className="col">

          <TaskList
            tasks={tasks.filter((task) => task.status === 'Done')}
            status="Done"
            deleteTask={deleteTask}
            updateTask={updateTask}
            onDragEnd={onDragEnd} 
          />
        </div>
      </div>
    </div>
  );
};

export default App;
