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

  return (
    <main id="articleForm-main">
      <div className='container'>
        <div className='titleWrap'>
          <h2 className='h2'>봉사 모집 등록</h2>
          <button className='borderBtn'>등록하기</button>
        </div>
        <section className='section'>
          <form>
            <div className='article-title formWrap'>
              <span>글 제목</span>
              <div className='inputWrap'>
                <input type='text' className='article-input' placeholder='제목을 입력해주세요.' />
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
            <div className='article-detail formWrap'>
              <span>상세 내용</span>
              <div className='inputWrap'>
                <textarea placeholder='상세내용' className='textarea'></textarea>
              </div>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}