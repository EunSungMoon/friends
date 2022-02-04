import '../style/Header.scss';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import LogInModal from '../Components/LogInModal';
import logo from '../style/img/logo_friends.png';
import { HiMenu } from "react-icons/hi";

export default function Header() {
  const [loginModalShow, setloginModalShow] = useState(false);
  const [hambuger, setHamburger] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token')
    document.location.href = '/'
  }

  const handleHamburger = e => {
    setHamburger(!hambuger)
  }

  return (
    <header id="header">
      <div className="headerInner container">
        <h1 className="title flexNone">
          <Link to='/'>
            <img src={logo} alt=''></img>
          </Link>
        </h1>
        <nav>
          <ol className={`tabName ${hambuger ? '' : 'active'}`}>
            <li><Link to='/boards' className='tab'>게시판</Link></li>
            <li><Link to='/' className='tab'>채팅</Link></li>
            {localStorage.token ?
              (
                <>
                  <li><Link to='/myprofile' className='tab'>프로필</Link></li>
                </>
              ) :
              (
                <>
                  <li className='tab' onClick={() => setloginModalShow(true)}>프로필</li>
                </>
              )
            }

          </ol>
          <div className='hamburger' onClick={handleHamburger}>
            <HiMenu />
          </div>
        </nav>
        <div className={`btnWrap displayno ${hambuger ? '' : 'active'}`}>

          {localStorage.token ?
            (
              <>
                <span className='welcomeText'>문은성님 환영합니다.</span>
                <button className="logout flexNone" onClick={handleLogout}>로그아웃</button>
              </>
            ) :
            (
              <>
                <button className="login flexNone" onClick={() => setloginModalShow(true)}>로그인</button>
                <button className="signIn flexNone"><Link to={'/signin'}>회원가입</Link></button>
              </>
            )
          }
        </div>
      </div >
      <LogInModal
        show={loginModalShow}
        onHide={() => setloginModalShow(false)}
      />
    </header >

  )
}