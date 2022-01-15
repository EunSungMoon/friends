import '../style/ArticleForm.scss';
import SelectBoxCom from '../Components/SelectBoxCom';
import NumberCountCom from '../Components/NumberCountCom';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import { ko } from 'date-fns/esm/locale'
import useSubmit from '../Hooks/useSubmit'
import errorMessage from '../Components/errorMessage';

import AddressCom from '../Components/AddressCom';

export default function ArticleForm() {
  const [startDate, setStartDate] = useState(new Date());
  const OPTIONS = [
    { value: "haircut", name: '헤어컷트' },
    { value: "skin", name: '피부' },
    { value: "nail", name: '네일' },
    { value: "makeup", name: '메이크업' }
  ]

  const { values, errors, handleChange, handleSubmit } = useSubmit({
    initialValues: { title: '', members: '', part: 'haircut', zipcode: '', detailAddress: '', officialname: '', belong: '', information: '' },
    onSubmit: () => {
      console.log(JSON.stringify(values));
    },
    errorMessage
  })

  return (
    <main id="articleForm-main">
      <div className='container'>

        <h2 className='h2'>봉사 모집 등록</h2>

        <section className='section'>
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
              <div className='inputWrap' onChange={handleChange}>
                <NumberCountCom  />
              </div>
            </div>
            <div className='artivle-part formWrap'>
              <span>봉사 분야</span>
              <div className='inputWrap' onChange={handleChange}>
                <SelectBoxCom options={OPTIONS} defaultValue="haircut" />
              </div>
            </div>
            <div className='article-address formWrap'>
              <span>봉사 장소</span>
              <div className='inputWrap'>
                <AddressCom event={handleChange} changEvent={handleChange} />
                {errors.zipcode && <p style={{ color: 'red' }}>{errors.zipcode}</p>}
                {errors.detailAddress && <p style={{ color: 'red' }}>{errors.detailAddress}</p>}
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
                  value={values.officialname}
                  onChange={handleChange}
                />
                {errors.officialname && <p style={{ color: 'red' }}>{errors.officialname}</p>}
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
                  value={values.belong}
                  onChange={handleChange}
                />
                {errors.belong && <p style={{ color: 'red' }}>{errors.belong}</p>}
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
                {errors.information && <p style={{ color: 'red' }}>{errors.information}</p>}
                <textarea name='information' placeholder='상세내용' className='textarea' onChange={handleChange} ></textarea>
              </div>
            </div>
            <button type='submit' className='borderBtn'>등록하기</button>
          </form>
        </section>
      </div>
    </main>
  )
}