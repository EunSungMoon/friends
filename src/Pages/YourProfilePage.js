import '../style/ProfilePage.scss';
import ProfileCom from '../Components/ProfileCom';
import { useState, useEffect } from 'react';
import YourBoardCom from '../Components/YourBoardCom';
import axios from 'axios';
import { useLocation } from 'react-router';

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
      const loadData = await axios.post(`http://15.164.62.156:8888/api/your_profile/`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify({ "author": location.state })
        }
      )
      setYourLists(loadData.data)
      console.log(loadData)
    }
    catch (error) {
      setError(error)
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadProfile()
    return () => setLoading(false);
    // return yourLists
  },[])

  if (loading) return <div>로딩중...</div>
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