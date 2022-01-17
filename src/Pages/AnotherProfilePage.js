import '../style/ProfilePage.scss';
import ProfileCom from '../Components/ProfileCom';
import { useState, useEffect } from 'react';
import MyBoardCom from '../Components/MyBoardCom';
import axios from 'axios';

export default function ProfilePage() {
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let token = `Token ${localStorage.getItem('token')}`

  const loadAxios = async () => {
    try {
      setError(null);
      setLists(null);
      setLoading(true);
      const loadData = await axios.get('http://15.164.62.156:8888/api/profile/', {
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
    <main id='profile-main'>
      <div className='container'>
        <h2 className='h2'>프로필</h2>
        <section className='section container'>
          <form className='profile'>
            <ProfileCom
              head="이메일"
              info={lists.username}
            />
            <ProfileCom
              head="별명"
              info={lists.nickname}
            />
          </form>
        </section>
        <section className='section container' id='myBoard'>
          <MyBoardCom />
        </section>
      </div>
    </main>
  )
}