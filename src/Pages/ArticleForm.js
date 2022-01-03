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
          <table>
            <colgroup>
              <col style={{ width: '150px' }}></col>
              <col></col>
            </colgroup>
            <tbody>
              <tr>
                <th>글 제목</th>
                <td><input type='text' className='article-input' placeholder='제목을 입력해주세요.' /></td>
              </tr>
              <tr>
                <th>봉사 일</th>
                <td>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    locale={ko}
                    showTimeSelect
                    timeFormat='HH:mm'
                    timeCaption='time'
                    dateFormat='yyyy년 MM월 dd일 aa h시 mm분'
                  />
                </td>
              </tr>
              <tr>
                <th>봉사 인원</th>
                <td><NumberCountCom /></td>
              </tr>
              <tr>
                <th>봉사분야</th>
                <td>
                  <SelectBoxCom options={OPTIONS} defaultValue="haircut"/>
                </td>
              </tr>
              <tr>
                <th>봉사 장소</th>
                <td><AddressCom /></td>
              </tr>
              <tr>
                <th>상세내용</th>
                <td><textarea placeholder='상세내용' className='textarea'></textarea></td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </main>
  )
}