import './style/ProfilePage.scss';
import ProfileCom from './ProfileCom';
import { useState } from 'react';
import MyBoardCom from './MyBoardCom';

export default function ProfilePage() {

  const [belong, setBlong] = useState('');
  const handleChange = e => {
    setBlong(e.target.value)
  }

  return (
    <main id='profile-main'>
      <div className='container'>
        <h2 className='h2'>프로필</h2>
        <section className='section'>
          <form className='profile'>
            <ProfileCom
              head="이메일"
              info="moonsilverr47@gmail.com"
            />
            <ProfileCom
              head="별명"
              info="moon"
            />
            <ProfileCom
              head="유형"
              info="봉사자 또는 봉사기관"
            />
            <div className='infoWrap'>
              <span>소속</span>
              <div className='infoBox'>
                <div className='infoInput'>
                  <input name="belong" type="text" defaultValue={belong ? belong : '빈칸'} placeholder='변경할 소속명을 입력해주세요.' onChange={handleChange}/>
                </div>
              </div>
            </div>
          </form>
        </section>
        <section>
          <MyBoardCom />
        </section>
      </div>
    </main>
  )
}