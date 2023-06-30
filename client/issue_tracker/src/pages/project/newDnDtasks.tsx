import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import { useDroppable } from "@dnd-kit/core";

function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
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
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}
export default function NewDnD() {
  const [isDropped, setIsDropped] = useState({
    one : false,
    two : false
  });
  const draggableMarkup = <Draggable id={"one"}>Drag me</Draggable>;
  const draggableMarkup_two = <Draggable id={"two"}>another drag me</Draggable>
  function handleDragEnd(event: any) {
    if (event.over ) {
    
    switch(event.over.id){
      case 'one':
         setIsDropped((prev: any)=>{return{...prev, one : true}})
         break;
      case 'two' :
         setIsDropped(prev=>{return{...prev , two: true}})
         break;
        default : throw('unknown element') 
    }
  }
  }
  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!isDropped.one ? draggableMarkup : null}
      {!isDropped.two ? draggableMarkup_two : null}
      <Droppable>
        <div
          style={{ width: "200px", height: "200px", border: "1px solid red" }}
        >
          {isDropped.one ? draggableMarkup : "drop here"}
          {isDropped.two ? draggableMarkup_two : "drop here"}
        </div>
      </Droppable>
    </DndContext>
  );
}
