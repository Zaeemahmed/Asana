import { Button, Form, Modal } from 'react-bootstrap';

interface modalProps {
  showModal: boolean;
  handleClose: () => void;
  onSubmit: (e) => void;
}

const UpdateTaskModal: React.FC<modalProps> = ({
  showModal,
  handleClose,
  children,
  onSubmit,
}) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          {children}
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateTaskModal;
