import React, { useState, useEffect } from 'react';

import CreateTaskModal from './components/CreateTaskModal';
import TaskModal from './components/TaskModal'; // Import the TaskModal component
import { DragDropContext } from 'react-beautiful-dnd';
import './App.css';
import DragList from './components/DragList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); // Track the selected task
  const [showTaskModal, setShowTaskModal] = useState(false); // Control the visibility of the TaskModal

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const openTaskModal = (task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const closeTaskModal = () => {
    setSelectedTask(null);
    setShowTaskModal(false);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(sourceIndex, 1);
    updatedTasks.splice(destinationIndex, 0, movedTask);

    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container mt-4">
        <h1 className="text-center">Task Management System</h1>
        <div className="text-center">
          <button
            className="btn btn-primary"
            onClick={() => setShowCreateTaskModal(true)}
          >
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
        <DragList
          tasks={tasks}
          deleteTask={deleteTask}
          updateTask={updateTask}
          openTaskModal={openTaskModal} // Pass the openTaskModal function
        />
        {selectedTask && showTaskModal && ( // Render TaskModal when selectedTask is truthy and showTaskModal is true
          <TaskModal
            task={selectedTask}
            handleClose={closeTaskModal}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        )}
      </div>
      <ToastContainer/>
    </DragDropContext>
  );
};

export default App;
