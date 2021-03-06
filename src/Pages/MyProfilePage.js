/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import '../style/ProfilePage.scss';
import ProfileCom from '../Components/ProfileCom';
import { useState, useEffect } from 'react';
import MyBoardCom from '../Components/MyBoardCom';
import axios from 'axios';
import apiSwagger from '../apiSwagger/apiSwagger.json'

export default function MyProfilePage() {
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let token = `Token ${localStorage.getItem('token')}`

  const loadAxios = async () => {
    try {
      setError(null);
      setLists(null);
      setLoading(true);
      const loadData = await axios.get(`${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/profile/`, {
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