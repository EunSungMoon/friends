import './style/Board.scss';
import { BsPencil, BsCalendarDate, BsPeople, BsShopWindow } from "react-icons/bs";
import useFetch from '../Hooks/useFetch';

export default function Board() {
  const boards = useFetch('http://localhost:3004/list')

  return (
    <main id="board-main">
      <div className="container">
        <div className="titleWrap">
          <h2 className="h2">게시판</h2>
          <button className="writing-btn borderBtn"><BsPencil />글쓰기</button>
        </div>
        <section className="container">
          <ol className="contentWrap row">

            {boards.map(board => (
              <li className="col-6 list" data-type={board.number} key={board.number}>
                <div className="listTitle">
                  <h3 className="h3">{board.title}</h3>
                  <p className="apply-state apply-ing">모집중</p>
                </div>
                <div className="listContent">
                  <p className="field">{board.part}</p>
                  <p className="date"><BsCalendarDate />{board.need_date}</p>
                  <p className="headcount"><BsPeople />{board.people_number}명</p>
                  <p className="address"><BsShopWindow />{board.address}</p>
                </div>
              </li>
            ))}

          </ol>
        </section>
      </div>
    </main>
  )
}