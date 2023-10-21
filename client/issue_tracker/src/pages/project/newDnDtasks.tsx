import React, { useEffect, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import { useDroppable } from "@dnd-kit/core";
import { Task } from "./interface";
import TaskBox from "./taskBox";
import axios from "axios";
import { apis } from "../../const/api-const";
import { getToken } from "../../services/auth";

function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? "cornflowerblue" : undefined,
    "background-color": isOver ? "rgb(200, 200, 200,0.2)" : undefined,
    height: "100%",
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
    data: props.data,
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
  const [taskStateList, setTaskStateList] = useState<Task[]>(tasks);
  useEffect(() => {
    console.log({ taskStateList });
  }, [taskStateList]);
  useEffect(()=>{
    setTaskStateList(tasks) // important state update since were are managing internal list state here 
  },[tasks])
  const [loading, setLoading] = useState<boolean>(false);

  async function handleDragEnd(event: any) {
    if (event.over) {
      console.log({ event });
      switch (event.over.id) {
        case "planning":
          await changeStatus(event.active.data.current, "planning");
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
          await changeStatus(event.active.data.current, "inprogress");
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
          await changeStatus(event.active.data.current, "completed");
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

  const changeStatus = async (
    task: Task,
    type: "inprogress" | "completed" | "planning"
  ): Promise<void> => {
    setLoading(true);
    try {
      const res = await axios.put(
        `${apis.SET_TO_INPROGRESS}${type}/${task.ID}`,{
          headers:{
            "Authorization" : "Bearer " + getToken()
          }
        }
      );
      console.log({ res });
      if (res.statusText === "ok") {
        console.log({ res });
      } else throw "error occured during the operation";
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  
  return (
    /**
     * need to have an multi droppables
     * need to add state for multi draggables for all the respective droppables
     *
     */
    <>
      {loading && (
        <div className="loading-task">
          <h1>Loading</h1>
        </div>
      )}
      <div className="dnd-container">
        <DndContext onDragEnd={handleDragEnd}>
          {/* {!isDropped.one ? draggableMarkup : null}
      {!isDropped.two ? draggableMarkup_two : null} */}

          <div className="droppable-container">
            <div className="droppable-elements">
              <h1 >New Tasks</h1>
              {taskStateList.map((task) => {
                return (
                  <>
                    {task.status === "" ? (
                      <Draggable id={task.ID} data={task}>
                        <TaskBox task={task} />
                      </Draggable>
                    ) : (
                      ""
                    )}
                  </>
                );
              })}
            </div>
            {/* {dragMarker} */}
            <div className="droppable-elements">
              <Droppable id={"planning"} key={"planning"}>
                <h1 style={{color:'rgb(  0, 158, 206 )'}}>Planning</h1>
                {taskStateList.map((task) => {
                  return (
                    <>
                      {task.status === "planning" ? (
                        <Draggable id={task.ID} data={task}>
                          <TaskBox task={task} />
                        </Draggable>
                      ) : (
                        ""
                      )}
                    </>
                  );
                })}
              </Droppable>
            </div>
            <div className="droppable-elements">
              <Droppable id={"inprogress"} key={"inprogress"}>
                <h1 style={{color:'rgb( 247, 215, 8 )'}}>In Progress</h1>
                {taskStateList.map((task) => {
                  return (
                    <>
                      {task.status === "inprogress" ? (
                        <Draggable id={task.ID} data={task}>
                          <TaskBox task={task} />
                        </Draggable>
                      ) : (
                        ""
                      )}
                    </>
                  );
                })}
              </Droppable>
            </div>
            <div className="droppable-elements">
              <Droppable id={"completed"} key={"completed"}>
                <h1 style={{color:'rgb( 	156, 207, 49  )'}}>Completed</h1>
                {/* {isDropped.one ? draggableMarkup : "drop here"}
            {isDropped.two ? draggableMarkup_two : "drop here"} */}
                {taskStateList.map((task) => {
                  return (
                    <>
                      {task.status === "completed" ? (
                        <Draggable id={task.ID} data={task}>
                          <TaskBox task={task} />
                        </Draggable>
                      ) : (
                        ""
                      )}
                    </>
                  );
                })}
              </Droppable>
            </div>
          </div>
        </DndContext>
      </div>
    </>
  );
}
