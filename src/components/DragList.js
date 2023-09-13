// DragList.js
import React, { useEffect } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";

const DragDropContextContainer = styled.div`
  padding: 20px;
  border: 1px solid black;
  border-radius: 6px;
  margin-top:20px;
`;

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
`;

function DragList({ deleteTask, updateTask, tasks, openTaskModal }) {
  const removeFromList = (list, index) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  const addToList = (list, index, element) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  };

  const generateLists = (tasks) => {
    const categorizedTasks = {
      todo: tasks.filter((task) => task.status === "todo"),
      inProgress: tasks.filter((task) => task.status === "inProgress"),
      done: tasks.filter((task) => task.status === "done"),
    };

    return categorizedTasks;
  };

  const [elements, setElements] = React.useState(generateLists(tasks));

  useEffect(() => {
    setElements(generateLists(tasks));
  }, [tasks]);


const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
  
    const listCopy = { ...elements };
  
    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );
  
    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;
  
    console.log("Dragging task with ID:", taskId);
    console.log("New status:", newStatus);
  
    // Check if the task ID matches any task
    const updatedTasks = tasks.map((task) => {
  
      if (task.id === parseInt(taskId) ) {
        console.log("Updating task with ID:", taskId);
        const updatedTask = { ...task, status: newStatus };
        console.log("Updated task:", updatedTask); // Ensure that status is updated here
        return updatedTask;
      }
      return task;
    });
  
    console.log("Updated tasks:", updatedTasks);
  
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setElements(listCopy);
  };
  

  return (
    <DragDropContextContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListGrid>
          {Object.keys(elements).map((listKey) => (
            <DraggableElement
              elements={elements[listKey]}
              key={listKey}
              prefix={listKey}
              openTaskModal={openTaskModal} // Pass the openTaskModal function
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          ))}
        </ListGrid>
      </DragDropContext>
    </DragDropContextContainer>
  );
}

export default DragList;
