import { Col, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Task from '../task';

interface BoardSectionProps {
  title: string;
  tasks: Array<Task>;
}

const BoardSection: React.FC<BoardSectionProps> = ({ title, tasks }) => {
  return (
    <Col md={3} className="d-flex flex-column p-2">
      <div className="board-section-header d-flex flex-row align-items-center">
        <h3 className="me-auto">{title}</h3>
        <FontAwesomeIcon icon={faPlus} style={{ color: '#6f7782' }} />
      </div>
      <Container className="p-0 d-flex flex-column h-100">
        {tasks &&
          tasks.map((task) => {
            return <Task {...task} key={task.id} />;
          })}
      </Container>
    </Col>
  );
};

export default BoardSection;
