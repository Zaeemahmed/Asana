import { Button, Col, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Task from '../task';
import { useState } from 'react';
import TaskModal from '../taskModal';
import { Droppable } from 'react-beautiful-dnd';

interface BoardSectionProps {
  title: string;
  tasks: Array<Task>;
}

const BoardSection: React.FC<BoardSectionProps> = ({ title, tasks }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  const handleShow = () => setShowModal(true);

  return (
    <Col md={3} className="d-flex flex-column p-2">
      <div className="board-section-header d-flex flex-row align-items-center">
        <h3 className="me-auto">{title}</h3>
        <FontAwesomeIcon icon={faPlus} style={{ color: '#6f7782' }} />
      </div>
      <Droppable droppableId={title}>
        {(provided) => (
          <Container
            className="p-0 d-flex flex-column h-100"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks &&
              tasks.map((task, index) => {
                return (
                  <Task
                    {...task}
                    key={task.id}
                    boardCategory={title}
                    index={index}
                  />
                );
              })}

            <Button
              className={tasks.length > 0 ? 'mt-4' : ''}
              onClick={handleShow}
            >
              <FontAwesomeIcon icon={faPlus} />
              Add task
            </Button>
            <TaskModal
              showModal={showModal}
              handleClose={handleClose}
              boardCategory={title}
            />
          </Container>
        )}
      </Droppable>
    </Col>
  );
};

export default BoardSection;
