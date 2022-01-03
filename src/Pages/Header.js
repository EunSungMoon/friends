import '../style/Header.scss';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import LogInModal from '../Components/LogInModal';

export default function Header() {
  const [loginModalShow, setloginModalShow] = useState(false);

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
            <li><Link to='/profile'>프로필</Link></li>
          </ol>
        </nav>
        <div className="btnWrap">
          <button className="login flexNone" onClick={() => setloginModalShow(true)}>로그인</button>
          <button className="signIn flexNone"><Link to={'/signin'}>회원가입</Link></button>
        </div>
      </div>
      <LogInModal
        show={loginModalShow}
        onHide={() => setloginModalShow(false)}
      />
    </header>

  )
}