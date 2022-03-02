import { Card } from 'react-bootstrap';

const Task: React.FC<Task> = ({ title, description, status, id }) => {
  return (
    <Card className="task-container">
      <Card.Body>{title}</Card.Body>
    </Card>
  );
};

export default Task;
