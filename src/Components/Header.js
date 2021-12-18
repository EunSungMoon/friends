import './style/Header.scss';
import {Link} from 'react-router-dom'

export default function Header() {
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
          <button className="login flexNone">로그인</button>
          <button className="signIn flexNone">회원가입</button>
        </div>
      </div>
    </header>
  )
}