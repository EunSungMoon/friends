import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'
import { BsFillPersonFill, BsChatDots, BsPencil } from "react-icons/bs";
import '../style/ListDetail.scss';
import LogInModal from '../Components/LogInModal';

export default function ListDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lists, setLists] = useState([])

  const [loginModalShow, setloginModalShow] = useState(false);
  let token = `Token ${localStorage.getItem('token')}`

  const loadAxios = async () => {
    try {
      setError(null);
      setLists(null);
      setLoading(true);
      const loadData = await axios.get(`http://15.164.62.156:8888/api/board/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      setLists(loadData.data)
    }
    catch(error) {
      setError(error)
    }
    setLoading(false)
  }

  const loadAxiosNoToken = async () => {
    try {
      setError(null);
      setLists(null);
      setLoading(true);
      const loadData = await axios.get(`http://15.164.62.156:8888/api/board/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setLists(loadData.data)
    }
    catch(error) {
      setError(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    localStorage.token ? loadAxios() : loadAxiosNoToken()
    return lists;
  }, []);

  if (loading) return <div>로딩중...</div>
  if (error) return <div>에러가 발생했습니다.</div>
  if (!lists) return null;

  let stringToDate = new Date(lists.created_at)
  let year = stringToDate.getFullYear()
  let month = stringToDate.getMonth() + 1
  let day = stringToDate.getDate()

  let createdAt = `
    ${year}-0${month.toString().slice(-2, 1)}-0${day.toString().slice(-2, 1)}
  `

  return (
    <div>
      <main id="article-main" key={lists.id}>
        <section className="container">
          <article className="titleWrap">
            <h2 className="article-header">{lists.title}</h2>
            <p className="article-date article-info" value={createdAt}>{createdAt}</p>
            <p className="viewCount article-info">조회수 10</p>
          </article>
          <article className="tableWrap">
            <table>
              <colgroup>
                <col style={{ width: '200px' }}></col>
                <col style={{ width: '1000px' }}></col>
              </colgroup>
              <tbody>
                <tr>
                  <th className="subject">봉사일</th>
                  <td>{lists.dday}</td>
                </tr>
                <tr>
                  <th className="subject">인원수</th>
                  <td>{lists.members}명</td>
                </tr>
                <tr>
                  <th className="subject">분야</th>
                  <td>{lists.part}</td>
                </tr>
                <tr>
                  <th className="subject">장소</th>
                  <td>{lists.place}</td>
                </tr>
              </tbody>
            </table>
            <div className="article-detail">
              <p>{lists.detail}</p>
            </div>
          </article>
          <article className="profileWrap">
            <div className="profile">
              {/* 해당 프로필 페이지로 이동 */}
              <BsFillPersonFill size={50} />
              <p>{lists.author}</p>
            </div>
            <div className="btnWrap">
              {localStorage.token ?
                (lists.is_author === true ?
                  // 로그인 상태 and 내가 작성한 게시글
                  (<>
                    <Link to={`/myarticle/${lists.id}/`}>
                      <button className="borderBtn chatBtn">
                        <BsPencil className="fa" />수정하기
                      </button>
                    </Link>
                  </>) :
                  // 로그인 상태 and 내가 작성한 게시글 아님
                  (<>
                    {/* 채팅하기 완성되면 그 페이지로 */}
                    <button
                      className="borderBtn chatBtn"
                      onClick={() => console.log('채팅하자')}
                    >
                      <BsChatDots className="fa" />채팅하기
                    </button>
                  </>)
                ) :
                //로그인 상태 아님
                (<>
                  <button
                    className="borderBtn chatBtn"
                    onClick={() => setloginModalShow(true)}
                  >
                    <BsChatDots className="fa" />채팅하기
                  </button>
                </>)
              }
            </div>
          </article>
        </section>
      </main>
      <LogInModal
        show={loginModalShow}
        onHide={() => setloginModalShow(false)}
      />
    </div>
  );
}

//e.currentTarget방법을 써보자