import { useMutation, useQuery } from '@apollo/client';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Row, Spinner } from 'react-bootstrap';
import { DragDropContext } from 'react-beautiful-dnd';
import BoardSection from '../../components/boardSection';
import Task from '../../components/task';
import tasksQuery from './tasks';
import updateTaskMutation from '../../components/task/updateTask';
import tasks from './tasks';
import { useState } from 'react';

const Board = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { data } = useQuery(tasksQuery, {
    onCompleted: (data) => {
      setTasks(data.tasks);
    },
  });

  const [updateTask] = useMutation(updateTaskMutation);
  const sections: Array<string> = ['Backlog', 'In-progress', 'Review', 'Done'];

  const onDragEnd = (d) => {
    const { destination, source, draggableId } = d;
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      return;
    }

    updateTask({
      variables: {
        id: draggableId,
        status: destination.droppableId,
      },
    });

    const updatedTaskList: Task[] =
      tasks &&
      tasks.map((t: Task) => {
        if (t.id === draggableId) {
          return {
            ...t,
            status: destination.droppableId,
          };
        }
        return t;
      });
    setTasks(updatedTaskList);
  };

  return (
    <div className="pt-3 h-100 d-flex flex-column">
      <Row>
        <h1>Project title</h1>
      </Row>
      <DragDropContext onDragEnd={onDragEnd}>
        {!tasks ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <div className="board-container d-flex flex-row flex-grow-1">
            {sections.map((section: string, index: number) => {
              let filteredTasks: Array<Task> = data
                ? tasks.filter((task: Task) => task.status === section)
                : [];
              return (
                <BoardSection
                  key={index}
                  title={section}
                  tasks={filteredTasks}
                />
              );
            })}
          </div>
        )}
      </DragDropContext>
    </div>
  );
};

export default Board;
