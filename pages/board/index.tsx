import { useQuery } from '@apollo/client';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Row, Spinner } from 'react-bootstrap';
import { DragDropContext } from 'react-beautiful-dnd';
import BoardSection from '../../components/boardSection';
import Task from '../../components/task';
import tasksQuery from './tasks';

const Board = () => {
  const { data } = useQuery(tasksQuery, {
    onCompleted: (data) => console.log(data),
  });

  const sections: Array<string> = ['Backlog', 'In-progress', 'Review', 'Done'];

  const onDragEnd = (d) => {
    const { destination, source, draggableId } = d;
  };

  return (
    <div className="pt-3 h-100 d-flex flex-column">
      <Row>
        <h1>Project title</h1>
      </Row>
      <DragDropContext onDragEnd={onDragEnd}>
        {!data ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <div className="board-container d-flex flex-row flex-grow-1">
            {sections.map((section: string, index: number) => {
              let tasks: Array<Task> = data
                ? data.tasks.filter((task: Task) => task.status === section)
                : [];
              return <BoardSection key={index} title={section} tasks={tasks} />;
            })}
          </div>
        )}
      </DragDropContext>
    </div>
  );
};

export default Board;
