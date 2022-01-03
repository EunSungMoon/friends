import '../style/ProfilePage.scss';
import ProfileCom from '../Components/ProfileCom';
import { useState } from 'react';
import MyBoardCom from '../Components/MyBoardCom';

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
              <input name="belong" type="text" className='belong-input' defaultValue={belong ? belong : '아무개 병원'} placeholder='변경할 소속명을 입력해주세요.' onChange={handleChange} />
            </div>
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