import React, { useEffect, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import { useDroppable } from "@dnd-kit/core";
import { Task } from "./interface";
import TaskBox from "./taskBox";

function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

function Draggable(props: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <li
      key={props.ID}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </li>
  );
}
interface props {
  tasks: Task[];
}
export default function NewDnD({ tasks }: props) {
  const [isDropped, setIsDropped] = useState({
    one: false,
    two: false,
  });
  const [taskStateList, setTaskStateList] = useState<Task[]>(tasks);
  const [container, setContainer] = useState({});
  const containerId = ["planning", "inprogress", "complete"];
  useEffect(() => {
    console.log({ taskStateList });
  }, [taskStateList]);
  const draggableMarkup = <Draggable id={"one"}>Drag me</Draggable>;
  const draggableMarkup_two = <Draggable id={"two"}>another drag me</Draggable>;
  function handleDragEnd(event: any) {
    // if (event.over) {
    //   console.log({ event });
    //   switch (event.active.id) {
    //     case "one":
    //       setIsDropped((prev: any) => {
    //         return { ...prev, one: true };
    //       });
    //       break;
    //     case "two":
    //       setIsDropped((prev) => {
    //         return { ...prev, two: true };
    //       });
    //       break;
    //     default:
    //       throw "unknown element";
    //   }
    // }
    if (event.over) {
      console.log({ event });
      switch (event.over.id) {
        case "planning":
          setTaskStateList((prev) => {
            return prev.map((task) => {
              if (event.active.id === task.ID) {
                return { ...task, status: event.over.id };
              } else {
                return task;
              }
            });
          });
          break;
        case "inprogress":
          setTaskStateList((prev) => {
            return prev.map((task) => {
              if (event.active.id === task.ID) {
                return { ...task, status: event.over.id };
              } else {
                return task;
              }
            });
          });
          break;
        case "completed":
          setTaskStateList((prev) => {
            return prev.map((task) => {
              if (event.active.id === task.ID) {
                return { ...task, status: event.over.id };
              } else {
                return task;
              }
            });
          });
          break;
        case "":
          setTaskStateList((prev) => {
            return prev.map((task) => {
              if (event.active.id === task.ID) {
                return { ...task, status: event.over.id };
              } else {
                return task;
              }
            });
          });
          break;
        default:
          throw "unknown element";
      }
    }
  }
  const dragMarker = tasks.map((task) => (
    <Draggable id={task.ID}>{task.description}</Draggable>
  ));
  function makeDraggableMarkers() {}
  return (
    /**
     * need to have an multi droppables
     * need to add state for multi draggables for all the respective droppables
     *
     */
    <DndContext onDragEnd={handleDragEnd}>
      {/* {!isDropped.one ? draggableMarkup : null}
      {!isDropped.two ? draggableMarkup_two : null} */}
      {taskStateList.map((task) => {
        return (
          <>
            {task.status === "" ? (
              <Draggable id={task.ID}>
                <TaskBox task={task} />
              </Draggable>
            ) : (
              ""
            )}
          </>
        );
      })}
      {/* {dragMarker} */}
      <div className="flex">
        <Droppable id={"planning"} key={"planning"}>
          <div
            style={{ width: "200px", height: "200px", border: "1px solid red" }}
          >
            <h1>Planning</h1>
            {taskStateList.map((task) => {
              return (
                <>
                  {task.status === "planning" ? (
                    <Draggable id={task.ID}>
                      <TaskBox task={task} />
                    </Draggable>
                  ) : (
                    ""
                  )}
                </>
              );
            })}
          </div>
        </Droppable>
        <Droppable id={"inprogress"} key={"inprogress"}>
          <div
            style={{ width: "200px", height: "200px", border: "1px solid red" }}
          >
            <h1>In Progress</h1>
            {taskStateList.map((task) => {
              return (
                <>
                  {task.status === "inprogress" ? (
                    <Draggable id={task.ID}>
                      <TaskBox task={task} />
                    </Draggable>
                  ) : (
                    ""
                  )}
                </>
              );
            })}
          </div>
        </Droppable>
        <Droppable id={"completed"} key={"completed"}>
          <div
            style={{ width: "200px", height: "200px", border: "1px solid red" }}
          >
            <h1>Completed</h1>
            {/* {isDropped.one ? draggableMarkup : "drop here"}
            {isDropped.two ? draggableMarkup_two : "drop here"} */}
            {taskStateList.map((task) => {
              return (
                <>
                  {task.status === "completed" ? (
                    <Draggable id={task.ID}>
                      <TaskBox task={task} />
                    </Draggable>
                  ) : (
                    ""
                  )}
                </>
              );
            })}
          </div>
        </Droppable>
      </div>
    </DndContext>
  );
}
