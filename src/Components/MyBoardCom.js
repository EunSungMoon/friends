import { Link } from 'react-router-dom';
import { useState } from 'react';
import { BsPencil, BsCalendarDate, BsPeople, BsShopWindow, BsTrash } from "react-icons/bs";

export default function MyBoardCom() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lists, setLists] = useState([])

  return (
    <ol className="contentWrap row">
      {lists.map(list => (
        <li className="list" data-type={list.id} key={list.id}>
          <div className="listTitle">
            <h4 className="h4">{list.title}</h4>
            <p className={list.state}>모집중</p>
          </div>
          <div className='listWrap'>
            <div className="listContent">
              <p className="field">{list.part}</p>
              <p className="date"><BsCalendarDate className="bi" />{list.dday}</p>
              <p className="headcount"><BsPeople className="bi" />{list.members}명</p>
              <p className="address"><BsShopWindow className="bi" />{list.place}</p>
            </div>
            <div className='buttonWrap'>
              <button className='editBtn' title='수정하기'><Link to={`/myarticle/${list.id}`}><BsPencil /></Link></button>
              <button className='editBtn' title='삭제하기'><BsTrash /></button>
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}