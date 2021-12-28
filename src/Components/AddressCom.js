import { useState } from "react"
import PostCodeCom from "./PostCodeCom"

export default function AddressCom() {
  const [addressPopup, setAddressPopup] = useState(false)

  return (
    <>
      <input type="text" id="sample4_postcode" placeholder="우편번호" />
      <input type="button" value="우편번호 찾기" onClick={() => setAddressPopup(true)} />
      <input type="text" id="sample4_roadAddress" placeholder="도로명주소" />
      <input type="text" id="sample4_jibunAddress" placeholder="지번주소" />
      <input type="text" id="sample4_detailAddress" placeholder="상세주소" />
      <input type="text" id="sample4_extraAddress" placeholder="참고항목" />

      <PostCodeCom
        show={addressPopup}
        onHide={() => setAddressPopup(false)}
      />
    </>
  )
}