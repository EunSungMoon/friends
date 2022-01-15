import PopupDom from './PopupDom';
import PostcodeCom from './PostcodeCom';
import { useState } from 'react';

export default function AddressCom(props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  // 팝업창 열기
  const openPostCode = () => {
    setIsPopupOpen(true)
  }

  // 팝업창 닫기
  const closePostCode = () => {
    setIsPopupOpen(false)
  }
  return (
    <>
      <input type="text" id="sample4_postcode" placeholder="우편번호" className='addressInput zipcode' name='zipcode' onChange={props.event} disabled />
      <input type="button" value="우편번호 찾기" onClick={openPostCode} className='codeFinder' /><br />
      <input type="text" id="sample4_roadAddress" placeholder="도로명주소" className='addressInput road' disabled/>
      <input type="text" id="sample4_jibunAddress" placeholder="지번주소" className='addressInput jibun' disabled/><br />
      <input type="text" id="sample4_detailAddress" placeholder="상세주소" className='addressInput detail' name='detailAddress' onChange={props.changEvent}/>

      <div id='popupDom'>
        {isPopupOpen && (
          <PopupDom>
            <PostcodeCom onClose={closePostCode} />
          </PopupDom>
        )}
      </div>
    </>
  )
}