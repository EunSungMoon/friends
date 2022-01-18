import '../style/ArticleForm.scss';
import "react-datepicker/dist/react-datepicker.css";
import SelectBoxCom from '../Components/SelectBoxCom';
import NumberCountEditCom from '../Components/NumberCountEditCom';
import AddressCom from '../Components/AddressCom';
import DatePicker from 'react-datepicker'
import { useState } from 'react';
import { ko } from 'date-fns/esm/locale'
import useEdit from '../Hooks/useEdit'
import errorMessage from '../Components/errorMessage';
import Authentication from '../Components/AuthenticationCom';

//수정하기 페이지
export default function EditArticle() {

  const [startDate, setStartDate] = useState(new Date());

  const handleDatePicker = (date) => {
    values.dday = document.querySelector('input[name="dday"]').value
    setStartDate(date)
  }

  const OPTIONS = [
    { value: "헤어컷트", name: '헤어컷트' },
    { value: "피부", name: '피부' },
    { value: "네일", name: '네일' },
    { value: "메이크업", name: '메이크업' }
  ]

  const [lists, setLists] = useState([])

  const { values, errors, handleChange, handleSubmit, handleZipcode } = useEdit({
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
    onSubmit: () => {
      console.log(values)
    },
    errorMessage
  })

  if (!lists) return null;

  return (
    <main id="articleForm-main">
      <div className="container">
        <h2 className='h2'>게시글 수정하기</h2>
        <section className="section container">
          <form onSubmit={handleSubmit}>
            <div className='article-title formWrap' key={lists.id}>
              <span>글 제목</span>
              <div className='inputWrap'>
                <input
                  type='text'
                  name='title'
                  defaultValue={lists.title}
                  className='article-input'
                  placeholder='제목을 입력해주세요.'
                  onChange={handleChange}
                />
                {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
              </div>
            </div>
            <div className='article-date formWrap'>
              <span>봉사일</span>
              <div className='inputWrap'>
                <DatePicker
                  selected={startDate}
                  locale={ko}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeCaption='time'
                  dateFormat='yyyy년 MM월 dd일 aa h시 mm분'
                  value={lists.dday}
                  onChange={handleDatePicker}
                />
                {errors.dday && <p style={{ color: 'red' }}>{errors.dday}</p>}
              </div>
            </div>
            <div className='article-number formWrap'>
              <span>봉사 인원</span>
              <div className='inputWrap'>
                <NumberCountEditCom value={lists.members} number={lists.members} />
              </div>
            </div>

            <div className='artivle-part formWrap'>
              <span>봉사 분야</span>
              <div className='inputWrap' onChange={handleChange}>
                <SelectBoxCom options={OPTIONS} defaultValue={lists.part} />
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
                  pClass='vmsText'
                  value='VMS'
                  icon='VMS'
                />
                <Authentication
                  pClass='goText'
                  value='1365'
                  icon='1365'
                />
                <Authentication
                  pClass='noText clicked'
                  value='없음'
                  icon='없음'
                  checked='checked'
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
            <div className='editBtnWrap'>
              <button type='submit' className='borderBtn editBtn'>수정하기</button>
              <button type='button' className='borderBtn editBtn'>삭제하기</button>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}