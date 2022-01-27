import '../style/ProfilePage.scss';
import ProfileCom from '../Components/ProfileCom';
import { useState } from 'react';
import YourBoardCom from '../Components/YourBoardCom';

import { useLocation } from 'react-router';

export default function YourProfilePage() {
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location =useLocation()
  console.log(location.state)

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
              head="별명"
              info={location.state}
            />
          </form>
        </section>
        <section className='section container' id='myBoard'>
          {/* <YourBoardCom /> */}
        </section>
      </div>
    </main>
  )
}