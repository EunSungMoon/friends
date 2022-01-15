import '../style/ArticleForm.scss';
import SelectBoxCom from '../Components/SelectBoxCom';
import NumberCountCom from '../Components/NumberCountCom';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import { ko } from 'date-fns/esm/locale'
import AddressCom from '../Components/AddressCom';

export default function ArticleForm() {
  const [startDate, setStartDate] = useState(new Date());
  const OPTIONS = [
    { value: "haircut", name: '헤어컷트' },
    { value: "skin", name: '피부' },
    { value: "nail", name: '네일' },
    { value: "makeup", name: '메이크업' }
  ]

  const [inputs, setInputs] = useState({
    title: '',
    officialname:'',
    belong:'',
    // state: 'apply-state apply-ing',
    // dday: '',
    // members: '',
    // part: '',
    // postcode: '',
    // roadAddress: '',
    // jibunAddress: '',
    // detailAddress: '',
    detail: ''
  })
  const { title, officialname, belong, detail } = inputs

  const onChange = e => {
    const { name, value } = e.target
    const nextInputs = {
      ...inputs,
      [name]: value,
    }
    setInputs(nextInputs)
    console.log(nextInputs)
  }

  const handleSubmit = e => {
    let token = `Token ${localStorage.getItem('token')}`
    e.preventDefault();
    fetch('http://15.164.62.156:8888/api/board/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        title: title,
        officialname: officialname,
        belong:belong,
        detail: detail
      }),
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        console.log(token)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <main id="articleForm-main">
      <div className='container'>

          <h2 className='h2'>봉사 모집 등록</h2>

        <section className='section'>
          <form>
            <div className='article-title formWrap'>
              <span onClick={handleSubmit}>글 제목</span>
              <div className='inputWrap'>
                <input
                  type='text'
                  className='article-input'
                  placeholder='제목을 입력해주세요.'
                  name='title'
                  value={title}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className='article-date formWrap'>
              <span>봉사일</span>
              <div className='inputWrap'>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  locale={ko}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeCaption='time'
                  dateFormat='yyyy년 MM월 dd일 aa h시 mm분'
                />
              </div>
            </div>
            <div className='article-number formWrap'>
              <span>봉사 인원</span>
              <div className='inputWrap'>
                <NumberCountCom />
              </div>
            </div>
            <div className='artivle-part formWrap'>
              <span>봉사 분야</span>
              <div className='inputWrap'>
                <SelectBoxCom options={OPTIONS} defaultValue="haircut" />
              </div>
            </div>
            <div className='article-address formWrap'>
              <span>봉사 장소</span>
              <div className='inputWrap'>
                <AddressCom />
              </div>
            </div>
            <div className='article-title formWrap'>
              <span onClick={handleSubmit}>담당자 이름</span>
              <div className='inputWrap'>
                <input
                  type='text'
                  className='article-input'
                  placeholder='담당자 이름'
                  name='officialname'
                  value={officialname}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className='article-title formWrap'>
              <span onClick={handleSubmit}>담당자 소속</span>
              <div className='inputWrap'>
                <input
                  type='text'
                  className='article-input'
                  placeholder='담당자 소속'
                  name='belong'
                  value={belong}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className='article-title formWrap'>
              <span onClick={handleSubmit}>인증유무</span>
              <div className='inputWrap'>
                <button type='button' className='authentication'>VMS</button>
                <button type='button' className='authentication'>1365</button>
                <button type='button' className='authentication'>없음</button>
              </div>
            </div>
            <div className='article-detail formWrap'>
              <span>상세 내용</span>
              <div className='inputWrap'>
                <textarea name='detail' placeholder='상세내용' className='textarea' onChange={onChange}></textarea>
              </div>
            </div>
            <button type='submit' className='borderBtn'>등록하기</button>
          </form>
        </section>
      </div>
    </main>
  )
}