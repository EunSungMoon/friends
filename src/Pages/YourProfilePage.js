/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import '../style/ProfilePage.scss';
import ProfileCom from '../Components/ProfileCom';
import { useState, useEffect } from 'react';
import YourBoardCom from '../Components/YourBoardCom';
import axios from 'axios';
import { useLocation } from 'react-router';
import apiSwagger from '../apiSwagger/apiSwagger.json'

export default function YourProfilePage() {
  const [yourLists, setYourLists] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation()
  let token = `Token ${localStorage.getItem('token')}`

  const loadProfile = async () => {
    try {
      setError(null);
      setYourLists(null);
      setLoading(true);
      const loadData = await axios.post(`${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/your_profile/`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify({ "author": location.state })
        }
      )
      setYourLists(loadData.data)
    }
    catch (error) {
      setError(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadProfile()
    return () => setLoading(false);
  }, [])

  if (error) return <div>에러가 발생했습니다.</div>
  if (!yourLists) return null;

  return (
    <main id='profile-main'>
      <div className='container'>
        <h2 className='h2'>프로필</h2>
        <section className='section container'>
          <form className='profile'>
            <ProfileCom
              head="별명"
              info={location.state}
            />
          </form>
        </section>
        <section className='section container' id='myBoard'>
          <YourBoardCom />
        </section>
      </div>
    </main>
  )
}