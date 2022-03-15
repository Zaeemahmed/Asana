import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Button, Card, Form, Modal } from 'react-bootstrap';
import tasks from '../../pages/board/tasks';
import allUsersQuery from '../createTaskModal/allUsers';
import deleteTaskMutation from './deleteTask';
import updateTaskMutation from './updateTask';
import UpdateTaskModal from './updateTaskModal';

const Task: React.FC<Task> = ({ title, description, status, id, index }) => {
  const [showModal, setShowModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);
  const [taskAssignTo, setTaskAssignTo] = useState('');

  const { data: usersData } = useQuery(allUsersQuery);
  const [updateTask] = useMutation(updateTaskMutation);
  const [deleteTask] = useMutation(deleteTaskMutation);

  const handleClose = () => setShowModal(false);

  const handleShow = () => setShowModal(true);

  const onSubmit = (e) => {
    e.preventDefault();
    updateTask({
      variables: {
        id: id,
        title: taskTitle,
        description: taskDescription,
      },
      update: () => {},
    });

    handleClose();
  };

  const handleDelete = () => {
    deleteTask({
      variables: {
        id: id,
      },
    });

    handleClose();
  };
  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <Card
            className="task-container"
            onClick={handleShow}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card.Body>{title}</Card.Body>
          </Card>
        )}
      </Draggable>
      <UpdateTaskModal
        showModal={showModal}
        onSubmit={onSubmit}
        handleClose={handleClose}
      >
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Assigned To</Form.Label>
          <Form.Select
            value={taskAssignTo}
            onChange={(e) => setTaskAssignTo(e.target.value)}
          >
            {usersData &&
              usersData.users.map((user: any) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
      </UpdateTaskModal>
    </>
  );
};

export default Task;
