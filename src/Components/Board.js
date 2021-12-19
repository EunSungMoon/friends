import './style/Board.scss';
import { BsPencil, BsCalendarDate, BsPeople, BsShopWindow } from "react-icons/bs";
import useFetch from '../Hooks/useFetch';
// import ListModal from './ListModal';
import { React, useState } from 'react';
import Modal from 'react-modal'

export default function Board() {
  const boards = useFetch('http://localhost:3001/list')

  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    console.log('test');
    setIsOpen(!isOpen);
  }


  return (
    <main id="board-main">
      <div className="container">
        <div className="titleWrap">
          <h2 className="h2">게시판</h2>
          <button className="writing-btn borderBtn"><BsPencil className="fa" />글쓰기</button>
        </div>
        <section className="container">
          <ol className="contentWrap row">

            {boards.map(board => (
              <li className="col-6 list" data-type={board.number} key={board.number} onClick={toggleModal}>
                <div className="listTitle">
                  <h3 className="h3">{board.title}</h3>
                  <p className={board.state}>모집중</p>
                </div>
                <div className="listContent">
                  <p className="field">{board.part}</p>
                  <p className="date"><BsCalendarDate className="bi" />{board.need_date}</p>
                  <p className="headcount"><BsPeople className="bi" />{board.people_number}명</p>
                  <p className="address"><BsShopWindow className="bi" />{board.address}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
      >
        <div>My modal dialog.</div>
        <button onClick={toggleModal}>Close modal</button>
      </Modal>
    </main>
  )
}