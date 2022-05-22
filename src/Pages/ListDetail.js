/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'
import { BsFillPersonFill, BsPencil } from "react-icons/bs";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import '../style/ListDetail.scss';
import LogInModal from '../Components/LogInModal';
import apiSwagger from '../apiSwagger/apiSwagger.json'

export default function ListDetail() {
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lists, setLists] = useState([]);
  const [loginModalShow, setloginModalShow] = useState(false);

  let token = `Token ${localStorage.getItem('token')}`

  const loadAxios = async () => {
    try {
      setError(null);
      setLists(null);
      setLoading(true);
      const loadData = await axios.get(`${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/board/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      setLists(loadData.data)
    }
    catch (error) {
      setError(error)
    }
    setLoading(false)
  }

  const loadAxiosNoToken = async () => {
    try {
      setError(null);
      setLists(null);
      setLoading(true);
      const loadData = await axios.get(`${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/board/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      setLists(loadData.data)
    }
    catch (error) {
      setError(error)
    }
    setLoading(false)
  }

  const moveToProfile = () => {
    history.push({
      pathname: '/yourprofile/',
      state: lists.author,
    })
  }

  useEffect(() => {
    localStorage.token ? loadAxios() : loadAxiosNoToken()
    return () => setLoading(false);
  }, []);

  if (error) return <div>에러가 발생했습니다.</div>
  if (!lists) return null;

  let stringToDate = new Date(lists.created_at)
  let year = stringToDate.getFullYear()
  let month = stringToDate.getMonth() + 1
  let day = stringToDate.getDate()

  let createdAt = `
    ${year}-0${month.toString().slice(-2, 1)}-${day.toString()}
  `

  return (
    <>
      <main id="article-main" key={lists.id}>
        <section className="container">
          <article className="titleWrap">
            <div className="headerState">
              <p className={lists.state} id="articleState"></p>
              <h2 className="article-header">{lists.title}</h2>
            </div>
            <div>
              <span className="article-date article-info" value={createdAt}>{createdAt} | </span>
              <span className="viewCount article-info">조회수 {lists.counter}</span>
            </div>
            {localStorage.token ?
              (lists.is_author === true ?
                // 내 프로필로
                (<div className="profile">
                  <Link to={`/myprofile`}>
                    <BsFillPersonFill />
                    <span>{lists.author}</span>
                  </Link>
                </div>) :
                // 게시글 작성자 프로필
                (<div className="profile" onClick={moveToProfile}>
                  <BsFillPersonFill />
                  <span>{lists.author}</span>
                </div>)
              ) :
              // 로그인모달
              (<div className="profile" onClick={() => setloginModalShow(true)}>
                <BsFillPersonFill />
                <span>{lists.author}</span>
              </div>)
            }
          </article>
          <article className="infoWrap">
            <form>
              <div className="wrapper">
                <span className="subject">봉사일</span>
                <span className="content">{lists.dday}</span>
              </div>
              <div className="wrapper">
                <span className="subject">인원수</span>
                <span className="content">{lists.members}명</span>
              </div>
              <div className="wrapper">
                <span className="subject">분야</span>
                <span className="content">{lists.part}</span>
              </div>
              <div className="wrapper">
                <span className="subject">장소</span>
                <p className="content address">{lists.roadAddress} <br /> {lists.detailAddress} <br /> ({lists.jibunAddress})</p>
              </div>
              <div className="wrapper">
                <span className="subject">담당자 이름</span>
                <span className="content">{lists.officialname}</span>
              </div>
              <div className="wrapper">
                <span className="subject">담당자 소속</span>
                <span className="content">{lists.belong}</span>
              </div>
              <div className="wrapper">
                <span className="subject">인증유무</span>
                <span className="content">{lists.authentication}</span>
              </div>
              <div className="wrapper">
                <span className="subject">상세내용</span>
                <span className="content">{lists.information}</span>
              </div>
            </form>
          </article>
          <article className="btnWrap">
            {localStorage.token ?
              (lists.is_author === true ?
                // 로그인 상태 and 내가 작성한 게시글
                (<>
                  <Link to={`/editarticle/${lists.id}/`}>
                    <button className="btnGreen">
                      <BsPencil className="fa" />수정하기
                    </button>
                  </Link>
                </>) :
                // 로그인 상태 and 내가 작성한 게시글 아님
                (<></>)
              ) :
              //로그인 상태 아님
              (<></>)
            }
          </article>
        </section>
      </main>

      <LogInModal
        show={loginModalShow}
        onHide={() => setloginModalShow(false)}
      />
    </>
  );
}