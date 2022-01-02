import { useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { BsFillPersonFill, BsChatDots } from "react-icons/bs";
import './style/ListDetail.scss';

export default function ListDetail() {
  const { id } = useParams();
  const lists = useFetch(`http://localhost:3001/lists?id=${id}`)

  return (
    <div>
      {lists.map(list => (
        <main id="article-main" key={list.id}>
          <section className="container">
            <article className="titleWrap">
              <h2 className="article-header">{list.title}</h2>
              <p className="article-date">{list.created_at}</p>
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
                    <td>{list.dday}</td>
                  </tr>
                  <tr>
                    <th className="subject">인원수</th>
                    <td>{list.members}명</td>
                  </tr>
                  <tr>
                    <th className="subject">분야</th>
                    <td>{list.part}</td>
                  </tr>
                  <tr>
                    <th className="subject">장소</th>
                    <td>{list.place}</td>
                  </tr>
                </tbody>
              </table>
              <div className="article-detail">
                <p>{list.detail}</p>
              </div>
            </article>
            <article className="profileWrap">
              <div className="profile">
                {/* 해당 프로필 페이지로 이동 */}
                <BsFillPersonFill size={50}/>
                <p>{list.author}</p>
              </div>
              <div className="btnWrap">
                {/* 사용자에 따라 보여줄지 말지 로직 생성 예정 */}
                <button className="borderBtn chatBtn">
                  <BsChatDots className="fa"/>채팅하기
                </button>
              </div>
            </article>
          </section>
        </main>
      ))}
    </div>
  );
}

//e.currentTarget방법을 써보자