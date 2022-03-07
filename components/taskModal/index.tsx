import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import allUsersQuery from './allUsers';
import createTaskMutation from './createTask';

interface Props {
  showModal: boolean;
  handleClose: () => void;
  boardCategory: string;
}

const TaskModal: React.FC<Props> = ({
  showModal,
  handleClose,
  boardCategory,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignTo, setAssignTo] = useState('');

  const { data: usersData } = useQuery(allUsersQuery);
  const [createTask, {}] = useMutation(createTaskMutation, {
    onCompleted: () => {
      setTitle('');
      setDescription('');
      setAssignTo('');
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    let userId = '';
    if (!assignTo) {
      userId = usersData?.users[0].id;
    } else {
      userId = assignTo;
    }
    createTask({
      variables: {
        title: title,
        description: description,
        status: boardCategory,
        userId: userId,
      },
    });

    handleClose();
  };
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Assigned To</Form.Label>
            <Form.Select
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
            >
              {usersData &&
                usersData.users.map((user: any) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
          <Button type="submit" variant="primary">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TaskModal;
