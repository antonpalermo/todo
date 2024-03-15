"use client";

import { Task as _Task } from "@prisma/client";
import {
  Draggable,
  DragDropContext,
  DropResult,
  ResponderProvided,
  Droppable
} from "@hello-pangea/dnd";

import Task from "@/components/tasks/task";
import { useState } from "react";

export default function Tasks({ tasks }: { tasks: _Task[] }) {
  const [localTaskState, setLocalTaskState] = useState(tasks);

  async function handleOnDragEnd(
    result: DropResult,
    provided: ResponderProvided
  ) {
    if (!result.destination) {
      return;
    }

    // create new array from existing one.
    const reorderedTasks = Array.from(localTaskState);
    // get the updated items.
    const [item] = reorderedTasks.splice(result.source.index, 1);
    // splice the items and add the updated item
    reorderedTasks.splice(result.destination.index, 0, item);
    // update local state.
    setLocalTaskState(reorderedTasks);

    // update prisma
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="tasks">
        {provided => (
          <div
            className="space-y-3"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {localTaskState.map((task: _Task, i: number) => {
              return (
                <Draggable key={task.id} draggableId={task.id} index={i}>
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Task task={task} />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
