import { Modal } from 'react-bootstrap'

export default function logInModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    > <Modal.Header closeButton></Modal.Header>
      <div>this is loginModal</div>
    </Modal>
  )
}