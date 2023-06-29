import React from 'react';
import {DndContext} from '@dnd-kit/core';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';

export default function NewDnD(){
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: 'unique-id',
      });
      const style = {
        transform: CSS.Translate.toString(transform),
      };
    return (
        <DndContext>
   <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <ul>
        <li>one</li>
        <li>two</li>
      </ul>
    </button>
        </DndContext>
      )
}