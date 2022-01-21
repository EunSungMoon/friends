import '../style/ArticleForm.scss';
import "react-datepicker/dist/react-datepicker.css";
import SelectBoxCom from '../Components/SelectBoxCom';
import NumberCountEditCom from '../Components/NumberCountEditCom';
import AddressCom from '../Components/AddressCom';
import DatePicker from 'react-datepicker'
import { useState, useEffect } from 'react';
import { ko } from 'date-fns/esm/locale'
import { useParams } from "react-router-dom";
import Authentication from '../Components/AuthenticationCom';
import axios from 'axios'

//수정하기 페이지
export default function EditArticle() {
  const { id } = useParams();
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [startDate, setStartDate] = useState(new Date());
  const today = new Date()

  let token = `Token ${localStorage.getItem('token')}`

  const handleDatePicker = value => {
    setStartDate(value)
    let stringToDate = value
    let year = stringToDate.getFullYear()
    let month = stringToDate.getMonth() + 1
    let day = stringToDate.getDate()
    let hour = stringToDate.getHours()
    let ampm = hour >= 12 ? '오후' : '오전'
    let minutes = stringToDate.getMinutes()

    lists.dday = `${year}년 0${month.toString().slice(-2, 1)}월 ${day.toString()}일 ${ampm} ${hour % 12 || 12}시 ${minutes}분`
    console.log(lists.dday)
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
    lists.authentication = v.value
    console.log(v.value)
  }

  const handleZipcode = () => {
    lists.zipcode = document.querySelector('.zipcode').value
    lists.roadAddress = document.querySelector('.road').value
    lists.jibunAddress = document.querySelector('.jibun').value
  }

  const handleCounter = () => {
    let membersValue = document.querySelector('.members').value
    lists.members = Number(membersValue) + 1
    console.log(lists.members)
  }

  const loadAxios = async () => {
    try {
      setError(null);
      setLists(null);
      setLoading(true);
      const loadData = await axios.get(`http://15.164.62.156:8888/api/board/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      setLists(loadData.data)
    }
    catch (error) {
      setError(error)
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadAxios()
    return lists;
  }, []);

  if (loading) return <div>로딩중...</div>
  if (error) return <div>에러가 발생했습니다.</div>
  if (!lists) return null;

  return (
    <main id="articleForm-main">
      <div className="container">
        <h2 className='h2'>게시글 수정하기</h2>
        <section className="section container">
          <form>
            <div className='article-title formWrap' key={lists.id}>
              <span>글 제목</span>
              <div className='inputWrap'>
                <input type='text' defaultValue={lists.title} className='article-input' placeholder='제목을 입력해주세요.' />
              </div>
            </div>
            <div className='article-date formWrap'>
              <span>봉사일</span>
              <div className='inputWrap datepicker'>
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
                <p className='dday'>{lists.dday}</p>
              </div>
            </div>
            <div className='article-number formWrap'>
              <span>봉사 인원</span>
              <div className='inputWrap'>
                <NumberCountEditCom value={lists.members} number={lists.members} event={handleCounter} />
              </div>
            </div>
            <div className='artivle-part formWrap'>
              <span>봉사 분야</span>
              <div className='inputWrap'>
                <SelectBoxCom options={OPTIONS} value={lists.part} />
              </div>
            </div>
            <div className='article-address formWrap'>
              <span>봉사 장소</span>
              <div className='inputWrap' onClick={handleZipcode}>
                <AddressCom
                  zipcodeValue={lists.zipcode}
                  roadValue={lists.roadAddress}
                  jibunValue={lists.jibunAddress}
                  detailValue={lists.detailAddress}
                />
              </div>
            </div>
            <div className='article-name formWrap'>
              <span>담당자 이름</span>
              <div className='inputWrap'>
                <input
                  type='text'
                  className='article-input'
                  placeholder='담당자 이름'
                  name='officialname'
                  defaultValue={lists.officialname}
                />
              </div>
            </div>
            <div className='article-belong formWrap'>
              <span>담당자 소속</span>
              <div className='inputWrap'>
                <input
                  type='text'
                  className='article-input'
                  placeholder='담당자 소속'
                  name='belong'
                  defaultValue={lists.belong}
                />
              </div>
            </div>
            <div className='article-authentication formWrap'>
              <span>인증유무</span>
              <div className='inputWrap' name='authentication'>
                <span onChange={Changed}>{lists.authentication}</span>
                <Authentication
                  btns={btns}
                  changeEvt={Changed}
                />
              </div>
            </div>
            <div className='article-detail formWrap'>
              <span>상세 내용</span>
              <div className='inputWrap'>
                <textarea
                  placeholder='상세내용'
                  className='textarea'
                  name='information'
                  defaultValue={lists.information}
                >
                </textarea>
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