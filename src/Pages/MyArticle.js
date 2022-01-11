import '../style/ArticleForm.scss';
import SelectBoxCom from '../Components/SelectBoxCom';
import NumberCountCom from '../Components/NumberCountCom';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';
import { ko } from 'date-fns/esm/locale'
import AddressCom from '../Components/AddressCom';
import { useParams } from "react-router-dom";

export default function MyArticle() {
  const [startDate, setStartDate] = useState(new Date());
  const OPTIONS = [
    { value: "haircut", name: '헤어컷트' },
    { value: "skin", name: '피부' },
    { value: "nail", name: '네일' },
    { value: "makeup", name: '메이크업' }
  ]

  const { id } = useParams();
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadFetch = () => {
    let token = `Token ${localStorage.getItem('token')}`
    fetch(`http://15.164.62.156:8888/api/board/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
    })
      .then((response) => {
        return response.json()
      })
      .then(data => {
        setLists(data)
      })
      .catch(error => {
        setError(error)
      })
    setLoading(false);
  }

  useEffect(() => {
    loadFetch()
    return lists;
  }, []);


  if (loading) return <div>로딩중...</div>
  if (error) return <div>에러가 발생했습니다.</div>
  if (!lists) return null;

  return (
    <main id="articleForm-main">
      <div className="container">
        <div className='titleWrap'>
          <h2 className='h2'>게시글 수정하기</h2>
          <button className='borderBtn'>수정하기</button>
        </div>
        <section className="section">
          <form>
            <div className='article-title formWrap' key={lists.id}>
              <span>글 제목</span>
              <div className='inputWrap'>
                <input type='text' defaultValue={lists.title} className='article-input' placeholder='제목을 입력해주세요.' />
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
                  value={lists.dday}
                />
              </div>
            </div>
            <div className='article-number formWrap'>
              <span>봉사 인원</span>
              <div className='inputWrap'>
                <NumberCountCom value={lists.members} number={lists.members} isEdit={true}/>
              </div>
            </div>

            <div className='artivle-part formWrap'>
              <span>봉사 분야</span>
              <div className='inputWrap'>
                <SelectBoxCom options={OPTIONS} defaultValue={lists.part} />
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
                <textarea placeholder='상세내용' className='textarea' defaultValue={lists.detail}></textarea>
              </div>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}