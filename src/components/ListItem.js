import { Draggable } from "react-beautiful-dnd";
import React, { useState } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import TaskModal from "./TaskModal";

const CardHeader = styled.div`
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 8px;
`;

const PriorityLabel = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  color: white;
  ${(props) => {
    switch (props.priority) {
      case "High":
        return `background-color: red;`;
      case "Medium":
        return `background-color: orange;`;
      case "Low":
        return `background-color: green;`;
      default:
        return ``;
    }
  }}
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DragItem = styled.div`
  padding: 16px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: #fff;
  margin: 0 0 16px 0;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ViewButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`;

const ListItem = ({ item, index, openTaskModal, deleteTask, updateTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function getDataById(id) {
    // Get the data from localStorage
    const storedData = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Find the item with the matching ID
    const matchingItem = storedData.find(item => item.id === id);
  
    return matchingItem;
  }
  
  const itemId = item.id; 
  const data = getDataById(itemId);
  

  return (
    <>
      <Draggable draggableId={item.id.toString()} index={index}>
        {(provided, snapshot) => {
          return (
            <DragItem
              ref={provided.innerRef}
              snapshot={snapshot}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <PriorityLabel priority={item.priority}>{item.priority}</PriorityLabel>
              <CardHeader>{item.title}</CardHeader>
              <CardFooter>
                <span className="task-end-date">
                  Due Date:{" "}
                  {item.endDate
                    ? format(new Date(item.endDate), "dd/MM/yyyy")
                    : "Not set"}
                </span>
                <ViewButton onClick={openModal}>View</ViewButton>
              </CardFooter>
            </DragItem>
          );
        }}
      </Draggable>

      {isModalOpen && (
        <TaskModal
          task={data}
          handleClose={closeModal}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      )}
    </>
  );
};

export default ListItem;
