import '../style/Board.scss';
import { BsPencil, BsCalendarDate, BsPeople, BsShopWindow } from "react-icons/bs";
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import LogInModal from '../Components/LogInModal';
import axios from 'axios'

export default function Board() {
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loginModalShow, setloginModalShow] = useState(false);

  const loadAxios = async () => {
    try {
      setError(null);
      setLists(null);
      setLoading(true);
      const loadData = await axios.get('http://15.164.62.156:8888/api/board', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setLists(loadData.data)
    }
    catch (error) {
      setError(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadAxios()
    return lists
  }, []);


  if (loading) return <div>로딩중...</div>
  if (error) return <div>에러가 발생했습니다.</div>
  if (!lists) return null;

  let stringToCreatedDate = new Date(lists.dday)
  let yearCreated = stringToCreatedDate.getFullYear()
  let monthCreated = stringToCreatedDate.getMonth() + 1
  let dayCreated = stringToCreatedDate.getDate()

  let ddayAt = `
  ${yearCreated}-0${monthCreated.toString().slice(-2, 1)}-0${dayCreated.toString()}
`

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

            {lists.map(list => (
              <li className="col-6 list" data-type={list.id} key={list.id}>
                <Link to={`/board/${list.id}/`}>
                  <div className="listTitle">
                    <h3 className="h3">{list.title}</h3>
                    <p className={list.state}>모집중</p>
                  </div>
                  <div className="listContent">
                    <p className="field">{list.part}</p>
                    <p className="date"><BsCalendarDate className="bi" />{list.dday}</p>
                    <p className="headcount"><BsPeople className="bi" />{list.members}명</p>
                    <p className="address"><BsShopWindow className="bi" />{list.roadAddress} {list.detailAddress}</p>
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