import { useQuery } from '@apollo/client';
import tasksQuery from './tasks';

const Board = () => {
  const { data, loading } = useQuery(tasksQuery, {
    onCompleted: (data) => console.log(data),
  });
  return <div>Board</div>;
};

export default Board;
