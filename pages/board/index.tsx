import { useQuery } from '@apollo/client';
import { Row } from 'react-bootstrap';
import tasksQuery from './tasks';

const Board = () => {
  const { data, loading } = useQuery(tasksQuery, {
    onCompleted: (data) => console.log(data),
  });
  return (
    <div className="pt-3 h-100 d-flex flex-column">
      <Row>
        <h1>Project title</h1>
      </Row>
      <div className="board-container d-flex flex-row flex-grow-1">
        {data &&
          data.tasks.map((task: any) => {
            return <div key={task.id}>{task.title}</div>;
          })}
      </div>
    </div>
  );
};

export default Board;
