import React from 'react'
import { Modal } from 'react-bootstrap';
import DaumPostcode from 'react-daum-postcode'

export default function PostCodeCom(props) {

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    console.log(fullAddress);
  }

  const postCodeStyle = {
    height: "500px",
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <DaumPostcode
          style={postCodeStyle}
          onComplete={handleComplete}
        />
      </Modal.Body>
    </Modal>
  )
}