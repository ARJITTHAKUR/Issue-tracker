import { StrictModeDroppable } from "./dropable";
import "./style.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function DragNDropTasks() {
  const list = [
    {
      name: "one",
      id: 'one',
    },
    {
      name: "two",
      id: 'two',
    },
    {
      name: "three",
      id: 'three',
    },
  ];
  return (
    <>
      <div className="dndContainer">
        <div className="dndStatusContainers">
          <h1>Create Task</h1>
          <DragDropContext onDragEnd={()=>{}}>
            <StrictModeDroppable droppableId="items">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef} className="items">
                  {list.map(({ name, id },index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                       {(provided)=>(
                          <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
