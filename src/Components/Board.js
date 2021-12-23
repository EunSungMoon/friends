import './style/Board.scss';
import { BsPencil, BsCalendarDate, BsPeople, BsShopWindow } from "react-icons/bs";
import useFetch from '../Hooks/useFetch';
import { Link } from 'react-router-dom';

export default function Board() {
  const lists = useFetch('http://localhost:3001/lists')

  return (
    <main id="board-main">
      <div className="container">
        <div className="titleWrap">
          <h2 className="h2">게시판</h2>
          <button className="writing-btn borderBtn"><BsPencil className="fa" />글쓰기</button>
        </div>
        <section className="container">
          <ol className="contentWrap row">

            {lists.map(list => (
              <li className="col-6 list" data-type={list.number} key={list.number}>
                <Link to={`/list/${list.number}`}>
                  <div className="listTitle">
                    <h3 className="h3">{list.title}</h3>
                    <p className={list.state}>모집중</p>
                  </div>
                  <div className="listContent">
                    <p className="field">{list.part}</p>
                    <p className="date"><BsCalendarDate className="bi" />{list.need_date}</p>
                    <p className="headcount"><BsPeople className="bi" />{list.people_number}명</p>
                    <p className="address"><BsShopWindow className="bi" />{list.address}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  )
}