import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BsCalendarDate, BsPeople, BsShopWindow } from "react-icons/bs";
import axios from 'axios';
import { useLocation } from 'react-router';

export default function YourBoardCom() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [yourLists, setYourLists] = useState([])
  let token = `Token ${localStorage.getItem('token')}`
  const location = useLocation()

  const loadYourList = async () => {
    try {
      setError(null);
      setYourLists(null);
      setLoading(true);
      const loadData = await axios.post('http://15.164.62.156:8888/api/your_list/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ "author": location.state })
      })
      console.log(loadData)
      setYourLists(loadData.data)
    }
    catch (error) {
      console.log(error)
      setError(error)
    }
    setLoading(false)
  }
  useEffect(() => {
    loadYourList()
    return () => setLoading(false);
    // return yourLists
  },[])

  if (loading) return <div>로딩중...</div>
  if (error) return <div>에러가 발생했습니다.</div>
  if (!yourLists) return null;


  return (
    <>
      <h3 className='h3'>게시글</h3>
      {yourLists.length === 0 ?
        <div className='noList'>내가 작성한 게시글이 없습니다.</div>
        :
        <ol className="contentWrap row">
          {yourLists.map(yourList => (
            <li className="list" data-type={yourList.id} key={yourList.id}>
              <Link to={`/board/${yourList.id}/`}>
                <div className="listTitle">
                  <h4 className="h4">{yourList.title}</h4>
                  <p className={yourList.state}></p>
                </div>
                <div className='listWrap'>
                  <div className="listContent">
                    <p className="field">{yourList.part}</p>
                    <p className="date"><BsCalendarDate className="bi" />{yourList.dday}</p>
                    <p className="headcount"><BsPeople className="bi" />{yourList.members}명</p>
                    <p className="address"><BsShopWindow className="bi" />{yourList.roadAddress} {yourList.detailAddress}</p>
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