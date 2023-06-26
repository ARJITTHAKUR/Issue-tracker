import { useState } from "react";
import Button from "../../components/UI/button/button";
import DialogForm from "../../components/UI/dialog/dialog";
import { StrictModeDroppable } from "./dropable";
import "./style.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskForm from "./taskForm";

export default function DragNDropTasks() {
  const list = [
    {
      name: "one",
      id: "one",
    },
    {
      name: "two",
      id: "two",
    },
    {
      name: "three",
      id: "three",
    },
  ];
  const [taskList, setTaskList] = useState(list);
  const [inprogressList, setInProgressList] = useState([]);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const items = Array.from(taskList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTaskList(items);
  }
  return (
    <>
      <div className="dndContainer">
        <div className="dndStatusContainers">
          <h1>Create Task</h1>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <StrictModeDroppable droppableId="items">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="items"
                >
                  {taskList.map(({ name, id }, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {name}
                          </li>
                        )}
                      </Draggable>
                    );
                  })}

                  {/* new list */}

                  {inprogressList.map(({ name, id }, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {name}
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </StrictModeDroppable>
          </DragDropContext>
         
        </div>
        <div className="dndStatusContainers">
          <h1>In Progress</h1>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <StrictModeDroppable droppableId="items">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="items"
                >
                  {provided.placeholder}
                </ul>
              )}
            </StrictModeDroppable>
          </DragDropContext>
        </div>
        <div className="dndStatusContainers">
          <h1>Planning</h1>
        </div>
        <div className="dndStatusContainers">
          <h1>Completed</h1>
        </div>
      </div>
    </>
  );
}
