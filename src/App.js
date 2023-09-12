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

  return (
    <div>
      <h1>Task Management System</h1>
      <button onClick={() => setShowCreateTaskModal(true)}>Create Task</button>
      {showCreateTaskModal && (
        <CreateTaskModal
          createTask={(newTask) => {
            setTasks([...tasks, newTask]);
            setShowCreateTaskModal(false);
          }}
          handleClose={() => setShowCreateTaskModal(false)}
        />
      )}
      <TaskList
        tasks={tasks.filter((task) => task.status === 'To-do')}
        status="To-do"
        // Implement update and delete functions for tasks in this list
      />
      <TaskList
        tasks={tasks.filter((task) => task.status === 'In progress')}
        status="In Progress"
        // Implement update and delete functions for tasks in this list
      />
      <TaskList
        tasks={tasks.filter((task) => task.status === 'Done')}
        status="Done"
        // Implement update and delete functions for tasks in this list
      />
    </div>
  );
};

export default App;
