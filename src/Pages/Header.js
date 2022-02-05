import '../style/Header.scss';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import LogInModal from '../Components/LogInModal';
import logo from '../style/img/logo_friends.png';
import { HiMenu } from "react-icons/hi";
import axios from 'axios';

export default function Header() {
  const [loginModalShow, setloginModalShow] = useState(false);
  const [hambuger, setHamburger] = useState(true);
  const [lists, setLists] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let token = `Token ${localStorage.getItem('token')}`

  const handleLogout = () => {
    localStorage.removeItem('token')
    document.location.href = '/'
  }

  const handleHamburger = e => {
    setHamburger(!hambuger)
  }

  const loadAxios = async () => {
    try {
      const loadNickname = await axios.get(`http://15.164.62.156:8888/api/profile/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      console.log(loadNickname)
      setLists(loadNickname.data)
    }
    catch (error) {
      console.log(error)
      setError(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (localStorage.token) {
      loadAxios()
    }
    return lists;
  }, []);

  if (loading) return <div>로딩중...</div>
  if (error) return <div>에러가 발생했습니다.</div>
  if (!lists) return null;


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
                <span className='welcomeText'>{lists.nickname}님 환영합니다.</span>
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