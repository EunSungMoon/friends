import '../style/ProfilePage.scss';
import ProfileCom from '../Components/ProfileCom';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import MyBoardCom from '../Components/MyBoardCom';

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lists, setLists] = useState([])

  const [belong, setBlong] = useState('');
  const handleChange = e => {
    setBlong(e.target.value)
  }

  const loadFetch = () => {
    let token = `Token ${localStorage.getItem('token')}`
    fetch(`http://15.164.62.156:8888/api/profile/`, {
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
        console.log(data.detail)
      })
      .catch(error => {
        setError(error)
        console.log(error)
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
    <main id='profile-main'>
      <div className='container'>
        <h2 className='h2'>프로필</h2>
        <section className='section'>
          <form className='profile'>
            <ProfileCom
              head="이메일"
              info={lists.username}
            />
            <ProfileCom
              head="별명"
              info={lists.nickname}
            />
            <ProfileCom
              head="업체명"
              info={lists.belong}
            />
            {/* <div className='infoWrap'>
              <span>업체명</span>

              <input name="belong" type="text" className='belong-input' defaultValue={lists.belong} placeholder='변경할 소속명을 입력해주세요.' onChange={handleChange} />
            </div> */}
          </form>
        </section>
        <section className='section' id='myBoard'>
          <h3 className='h3'>내 게시글</h3>
          <MyBoardCom />
        </section>
      </div>
    </main>
  )
}