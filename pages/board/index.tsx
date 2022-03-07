import { useQuery } from '@apollo/client';
import { Row } from 'react-bootstrap';
import BoardSection from '../../components/boardSection';
import Task from '../../components/task';
import tasksQuery from './tasks';

const Board = () => {
  const { data, loading } = useQuery(tasksQuery, {
    onCompleted: (data) => console.log(data),
  });

  const sections: Array<string> = ['Backlog', 'In-progress', 'Review', 'Done'];

  return (
    <div className="pt-3 h-100 d-flex flex-column">
      <Row>
        <h1>Project title</h1>
      </Row>
      <div className="board-container d-flex flex-row flex-grow-1">
        {sections.map((section: string, index: number) => {
          let tasks: Array<Task> = data
            ? data.tasks.filter((task: Task) => task.status === section)
            : [];
          return <BoardSection key={index} title={section} tasks={tasks} />;
        })}
      </div>
    </div>
  );
};

export default Board;
