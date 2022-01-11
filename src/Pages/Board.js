import '../style/Board.scss';
import { BsPencil, BsCalendarDate, BsPeople, BsShopWindow } from "react-icons/bs";
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import LogInModal from '../Components/LogInModal';

export default function Board() {

  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loginModalShow, setloginModalShow] = useState(false);

  const loadFetch = () => {
    fetch(`http://15.164.62.156:8888/api/board`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        return response.json()
      })
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        setError(error)
      })
    setLoading(false);
  }

  useEffect(() => {
    loadFetch()
    return users
  }, []);


  if (loading) return <div>로딩중...</div>
  if (error) return <div>에러가 발생했습니다.</div>
  if (!users) return null;

  return (
    <main id="board-main">
      <div className="container">
        <div className="titleWrap">
          <h2 className="h2">게시판</h2>

          {localStorage.token ?
            (
              <>
                <Link to={'/articleForm'}>
                  <button className="borderBtn">
                    <BsPencil className="fa" />글쓰기
                  </button>
                </Link>
              </>
            ) :
            (
              <>
                <button
                  className="borderBtn"
                  onClick={() => setloginModalShow(true)}
                >
                  <BsPencil className="fa" />글쓰기
                </button>
              </>
            )
          }
        </div>
        <section className="container">
          <ol className="contentWrap row">

            {users.map(user => (
              <li className="col-6 list" data-type={user.id} key={user.id}>
                <Link to={`/board/${user.id}/`}>
                  <div className="listTitle">
                    <h3 className="h3">{user.title}</h3>
                    <p className={user.state}>모집중</p>
                  </div>
                  <div className="listContent">
                    <p className="field">{user.part}</p>
                    <p className="date"><BsCalendarDate className="bi" />{user.dday}</p>
                    <p className="headcount"><BsPeople className="bi" />{user.members}명</p>
                    <p className="address"><BsShopWindow className="bi" />{user.place}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </div>
      <LogInModal
        show={loginModalShow}
        onHide={() => setloginModalShow(false)}
      />
    </main>
  )
}