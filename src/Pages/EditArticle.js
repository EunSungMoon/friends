/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import '../style/ArticleForm.scss';
import "react-datepicker/dist/react-datepicker.css";
import SelectBoxCom from '../Components/SelectBoxCom';
import NumberCountEditCom from '../Components/NumberCountEditCom';
import AddressCom from '../Components/AddressCom';
import Authentication from '../Components/AuthenticationCom';
import useRevise from '../Hooks/useRevise';
import errorMessage from '../Components/errorMessage';
import DatePicker from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import axios from 'axios'
import apiSwagger from '../apiSwagger/apiSwagger.json'

//수정하기 페이지
export default function EditArticle() {
  const history = useHistory();
  const { id } = useParams();
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [startDate, setStartDate] = useState(new Date());
  const today = new Date()

  const [complete, setComplete] = useState(true)
  const [changeDatepicker, setChangeDatepicker] = useState('')
  const [changeAuthen, setChangeAuthen] = useState('')

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

    values.dday = `${year}년 0${month.toString().slice(-2, 1)}월 ${day.toString()}일 ${ampm} ${hour % 12 || 12}시 ${minutes}분`
    setChangeDatepicker(values.dday)
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
    setChangeAuthen(values.authentication)
  }

  const handleZipcode = () => {
    values.zipcode = document.querySelector('.zipcode').value
    values.roadAddress = document.querySelector('.road').value
    values.jibunAddress = document.querySelector('.jibun').value
  }

  const handleCounter = () => {
    let membersValue = document.querySelector('.members').value
    values.members = Number(membersValue) + 1
  }
  
  const handleCheckbox = (e) => {
    setComplete(!complete)
  }

  const loadAxios = async () => {
    try {
      setError(null);
      setLists(null);
      setLoading(true);
      const loadData = await axios.get(`${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/board/${id}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      setLists(loadData.data)
    }
    catch (error) {
      setError(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadAxios()
    return lists;
  }, []);

  const handleDelete = async () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      await axios.delete(`${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/board/${id}/`, {
        headers: {
          'Authorization': token
        },
      });
      alert('삭제되었습니다.')
      history.push('/boards')
    }
  }

  const { values, handleChange, handleSubmit } = useRevise({
    initialValues: {
      title: '',
      dday: '',
      members: '',
      part: '',
      zipcode: '',
      roadAddress: '',
      jibunAddress: '',
      detailAddress: '',
      officialname: '',
      belong: '',
      authentication: '',
      information: '',
      state: ''
    },
    onSubmit: () => {
    },
    errorMessage
  })

  if (error) return <div>에러가 발생했습니다.</div>
  if (!lists) return null;

  return (
    <main id="articleForm-main">
      <div className="container">
        <h2 className='h2'>게시글 수정하기</h2>
        <section className="section container">
          <form onSubmit={handleSubmit}>
            <div className='article-toggle formWrap'>
              <span>모집완료</span>
              <div className='inputWrap' onChange={handleChange}>
                <label onChange={handleCheckbox}>
                  <input type='checkbox' name="state" value={`apply-state ${complete ? 'apply-ing' : 'apply-complete'}`} />
                  <span className='applycheck'>{complete ? '모집중!' : '모집완료!'}</span>
                </label>
              </div>
            </div>
            <div className='article-title formWrap' key={lists.id}>
              <span>글 제목</span>
              <div className='inputWrap'>
                <input
                  name='title'
                  type='text'
                  defaultValue={lists.title}
                  className='article-input'
                  placeholder='제목을 입력해주세요.'
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='article-date formWrap'>
              <span>봉사일</span>
              <div className='inputWrap datepicker' name='dday' onChange={handleChange} value={lists.dday}>
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
                <p className='dday'>{!changeDatepicker ? `${lists.dday}` : `${values.dday}`}</p>
              </div>
            </div>
            <div className='article-number formWrap'>
              <span>봉사 인원</span>
              <div className='inputWrap' onChange={handleChange} value={lists.value}>
                <NumberCountEditCom value={lists.members} number={lists.members} event={handleCounter} />
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
                <AddressCom event={handleChange} changEvent={handleChange}
                  zipcodeValue={lists.zipcode}
                  roadValue={lists.roadAddress}
                  jibunValue={lists.jibunAddress}
                  detailValue={lists.detailAddress}
                />
              </div>
            </div>
            <div className='article-name formWrap'>
              <span >담당자 이름</span>
              <div className='inputWrap'>
                <input
                  type='text'
                  className='article-input'
                  placeholder='담당자 이름'
                  name='officialname'
                  defaultValue={lists.officialname}
                  onChange={handleChange}
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
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='article-authentication formWrap'>
              <span>인증유무</span>
              <div className='inputWrap' name='authentication' onChange={handleChange}>
                <p onChange={Changed}>현재 선택된 인증유무 : {!changeAuthen? `${lists.authentication}` : `${values.authentication}`}</p>
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
                  onChange={handleChange}
                >
                </textarea>
              </div>
            </div>
            <div className='editBtnWrap'>
              <button type='submit' className='borderBtn editBtn'>수정하기</button>
              <button type='button' className='borderBtn editBtn' onClick={handleDelete}>삭제하기</button>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}