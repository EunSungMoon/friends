import './style/Header.scss';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import SignInModal from './SignInModal';
import LogInModal from './LogInModal';

export default function Header() {
  const [loginModalShow, setloginModalShow] = useState(false);
  const [signinModalShow, setsigninModalShow] = useState(false);

  return (
    <header id="header">
      <div className="headerInner container">
        <h1 className="title flexNone">
          <Link to='/'>프렌즈</Link>
        </h1>
        <nav>
          <ol className="flexNone">
            <li><Link to='/'>게시판</Link></li>
            <li><Link to='/'>채팅</Link></li>
            <li><Link to='/'>프로필</Link></li>
          </ol>
        </nav>
        <div className="btnWrap">
          <button className="login flexNone" onClick={() => setloginModalShow(true)}>로그인</button>
          <button className="signIn flexNone" onClick={() => setsigninModalShow(true)}>회원가입</button>
        </div>
      </div>
      <LogInModal
        show={loginModalShow}
        onHide={() => setloginModalShow(false)}
      />
      <SignInModal
        show={signinModalShow}
        onHide={() => setsigninModalShow(false)}
      />
    </header>

  )
}