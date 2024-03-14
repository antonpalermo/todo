"use client";

import { Task as _Task } from "@prisma/client";
import {
  Draggable,
  DragDropContext,
  DropResult,
  ResponderProvided,
  Droppable
} from "react-beautiful-dnd";

import Task from "@/components/tasks/task";

export default function Tasks({ tasks }: { tasks: _Task[] }) {
  async function handleOnDragEnd(
    result: DropResult,
    provided: ResponderProvided
  ) {}

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="tasks">
        {provided => (
          <div
            className="space-y-3"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task: _Task, i: number) => {
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
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
