import DaumPostcode from "react-daum-postcode";


export default function PostcodeCom(props) {
  const handlePostCode = (data) => {
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

    props.onClose()
    document.getElementById('sample4_postcode').value = data.zonecode
    document.getElementById('sample4_roadAddress').value = data.address
    document.getElementById('sample4_jibunAddress').value = data.jibunAddress
  }

  const postCodeStyle = {
    display: "block",
    width: "510px",
    height: "560px",
    padding: "7px",
  };

  return (
    <div className="postCodeDom">
      <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
      <button type='button' onClick={() => { props.onClose() }} className='postCode_btn'>닫기</button>
    </div>
  )
}