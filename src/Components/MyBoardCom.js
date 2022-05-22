/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BsPencil, BsCalendarDate, BsPeople, BsShopWindow } from "react-icons/bs";
import apiSwagger from '../apiSwagger/apiSwagger.json'
import axios from 'axios';

export default function MyBoardCom() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [myLists, setMyLists] = useState([])
  let token = `Token ${localStorage.getItem('token')}`

  const loadMyList = async () => {
    try {
      setError(null);
      setMyLists(null);
      setLoading(true);
      const loadData = await axios.get(`${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/board/my_list/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      setMyLists(loadData.data)
    }
    catch (error) {
      setError(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadMyList()
    return () => setLoading(false);
    // return myLists;
  }, []);

  if (loading) return <div>로딩중...</div>
  if (error) return <div>에러가 발생했습니다.</div>
  if (!myLists) return null;

  return (
    <>
      <h3 className='h3'>내 게시글</h3>
      {myLists.length === 0 ?
        <div className='noList'>내가 작성한 게시글이 없습니다.</div>
        :
        <ol className="contentWrap row">
          {myLists.map(myList => (
            <li className="list" data-type={myList.id} key={myList.id}>
              <Link to={`/board/${myList.id}/`}>
                <div className="listTitle">
                  <h4 className="h4">{myList.title}</h4>
                  <p className={myList.state}></p>
                </div>
                <div className='listWrap'>
                  <div className="listContent">
                    <p className="field">{myList.part}</p>
                    <p className="date"><BsCalendarDate className="bi" />{myList.dday}</p>
                    <p className="headcount"><BsPeople className="bi" />{myList.members}명</p>
                    <p className="address"><BsShopWindow className="bi" />{myList.roadAddress} {myList.detailAddress}</p>
                  </div>
                  <div className='buttonWrap'>
                    <Link to={`/editarticle/${myList.id}`}><button className='editBtn' title='수정하기'><BsPencil /></button></Link>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      }
    </>
  )
}