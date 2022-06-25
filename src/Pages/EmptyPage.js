import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Empty.scss'

export default function EmptyPage(){
  return(
    <div id="emptyPage" className="container">
    <h1>잘못된 접근입니다.</h1>
    <button type="button" className="backToHome">
      <Link to="/" >
        돌아가기
      </Link>
    </button>
  </div>
  )
}