import '../style/ArticleForm.scss';
import SelectBoxCom from '../Components/SelectBoxCom';
import NumberCountCom from '../Components/NumberCountCom';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import { ko } from 'date-fns/esm/locale'
import useSubmit from '../Hooks/useSubmit'
import errorMessage from '../Components/errorMessage';
import Authentication from '../Components/AuthenticationCom';
import AddressCom from '../Components/AddressCom';

export default function ArticleForm() {
  const [startDate, setStartDate] = useState(new Date());
  const today = new Date()

  const handleDatePicker = value => {
    setStartDate(value)
    let stringToDate = value
    let year = stringToDate.getFullYear()
    let month = stringToDate.getMonth() + 1
    let day = stringToDate.getDate()
    let hour = stringToDate.getHours()
    let ampm = hour >= 12 ? '오후' : '오전'
    let minutes = stringToDate.getMinutes()

    values.dday = `${year}년 0${month.toString().slice(-2, 1)}월 ${day.toString()}일 ${ampm} ${hour % 12 || 12}시 ${minutes}분`
  }

  const handleCounter = () => {
    let membersValue = document.querySelector('.members').value
    values.members = Number(membersValue) + 1
  }

  const handleZipcode = () => {
    values.zipcode = document.querySelector('.zipcode').value
    values.roadAddress = document.querySelector('.road').value
    values.jibunAddress = document.querySelector('.jibun').value
  }

  const OPTIONS = [
    { value: "헤어컷트", name: '헤어컷트' },
    { value: "피부", name: '피부' },
    { value: "네일", name: '네일' },
    { value: "메이크업", name: '메이크업' }
  ]
  let btns = [
    { id: 1, value: '없음' },
    { id: 2, value: 'VMS' },
    { id: 3, value: '1365' },
  ];

  const Changed = v => {
    values.authentication = v.value
  }
  const { values, errors, handleChange, handleSubmit } = useSubmit({
    initialValues: {
      title: '',
      dday: '',
      members: '1',
      part: '헤어컷트',
      zipcode: '',
      roadAddress: '',
      jibunAddress: '',
      detailAddress: '',
      officialname: '',
      belong: '',
      authentication: '없음',
      information: '',
      state: 'apply-state apply-ing'
    },
    onSubmit: () => {},
    errorMessage
  })

  return (
    <main id="articleForm-main">
      <div className='container'>
        <h2 className='h2'>봉사 모집 등록</h2>
        <section className='section container'>
          <form onSubmit={handleSubmit}>
            <div className='article-title formWrap'>
              <span>글 제목</span>
              <div className='inputWrap'>
                <input
                  type='text'
                  className='article-input'
                  placeholder='제목을 입력해주세요.'
                  name='title'
                  value={values.title}
                  onChange={handleChange}
                />
                {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
              </div>
            </div>
            <div className='article-date formWrap'>
              <span>봉사일</span>
              <div className='inputWrap' onChange={handleChange} value={values.dday}>
                <DatePicker
                  className='dday-input'
                  name='dday'
                  selected={startDate}
                  onChange={value => handleDatePicker(value)}
                  locale={ko}
                  minDate={today}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeCaption='time'
                  dateFormat='yyyy년 MM월 dd일 aa h시 mm분'
                />
                {errors.dday && <p style={{ color: 'red' }}>{errors.dday}</p>}
              </div>
            </div>
            <div className='article-number formWrap' >
              <span>봉사 인원</span>
              <div className='inputWrap' onChange={handleChange} value={values.members}>
                <NumberCountCom event={handleCounter} />
              </div>
            </div>
            <div className='artivle-part formWrap'>
              <span>봉사 분야</span>
              <div className='inputWrap' onChange={handleChange}>
                <SelectBoxCom options={OPTIONS} />
              </div>
            </div>
            <div className='article-address formWrap'>
              <span>봉사 장소</span>
              <div className='inputWrap' onClick={handleZipcode}>
                <AddressCom event={handleChange} changEvent={handleChange} />
                {errors.zipcode && <p style={{ color: 'red' }}>{errors.zipcode}</p>}
                {errors.detailAddress && <p style={{ color: 'red' }}>{errors.detailAddress}</p>}
              </div>
            </div>
            <div className='article-name formWrap'>
              <span onClick={handleSubmit}>담당자 이름</span>
              <div className='inputWrap'>
                <input
                  type='text'
                  className='article-input'
                  placeholder='담당자 이름'
                  name='officialname'
                  value={values.officialname}
                  onChange={handleChange}
                />
                {errors.officialname && <p style={{ color: 'red' }}>{errors.officialname}</p>}
              </div>
            </div>
            <div className='article-belong formWrap'>
              <span onClick={handleSubmit}>담당자 소속</span>
              <div className='inputWrap'>
                <input
                  type='text'
                  className='article-input'
                  placeholder='담당자 소속'
                  name='belong'
                  value={values.belong}
                  onChange={handleChange}
                />
                {errors.belong && <p style={{ color: 'red' }}>{errors.belong}</p>}
              </div>
            </div>
            <div className='article-authentication formWrap'>
              <span>인증유무</span>
              <div className='inputWrap' name='authentication' onChange={handleChange}>
                <Authentication
                  btns={btns}
                  changeEvt={Changed}
                />
              </div>
            </div>
            <div className='article-detail formWrap'>
              <span>상세 내용</span>
              <div className='inputWrap'>
                {errors.information && <p style={{ color: 'red' }}>{errors.information}</p>}
                <textarea name='information' placeholder='상세내용' className='textarea' onChange={handleChange} ></textarea>
              </div>
            </div>
            <button type='submit' className='borderBtn enrollBtn'>등록하기</button>
          </form>
        </section>
      </div>
    </main>
  )
}