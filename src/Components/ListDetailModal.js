import { Modal } from 'react-bootstrap'

export default function ListDetailModal(props) {
  console.log(props)
  console.log(props.name)
  return (
    <Modal
      {...props}

      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    > <Modal.Header closeButton></Modal.Header>

      <div>df{props.name}</div>
    </Modal>
  );
}