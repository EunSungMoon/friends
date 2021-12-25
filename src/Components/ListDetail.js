
import { useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { BsFillPersonFill, BsPencil, BsChatDots } from "react-icons/bs";

export default function ListDetail() {
  const { id } = useParams();
  const lists = useFetch(`http://localhost:3001/lists?id=${id}`)

  return (
    <div>
      {lists.map(list=>(
        <main id = "articel-main" key={list.id}>
          <section className = "container">
            <article>
              <h2 className = "article-header">{list.title}</h2>
              <p>{list.created_at}</p>
            </article>
            <article>
              <table>
                <colgroup>
                  <col style={{width : '150px'}}></col>
                  <col style={{width : '500px'}}></col>
                </colgroup>
                <tbody>
                  <tr>
                    <th className = "subject">봉사일</th>
                    <td>{list.dday}</td>
                  </tr>
                  <tr>
                    <th className = "subject">인원수</th>
                    <td>{list.members}명</td>
                  </tr>
                  <tr>
                    <th className = "subject">분야</th>
                    <td>{list.part}</td>
                  </tr>
                  <tr>
                    <th className = "subject">장소</th>
                    <td>{list.place}</td>
                  </tr>
                  <tr>
                    <th className = "subject">세부내용</th>
                    <td>{list.detail}</td>
                  </tr>
                </tbody>
              </table>
            </article>
            <article>
              <div className="profile">
                <BsFillPersonFill />
                <p>{list.author}</p>
              </div>
              <button className="borderBtn">
                <BsPencil />수정하기
              </button>
              <button className="borderBtn">
                <BsChatDots />채팅하기
              </button>
            </article>
          </section>
        </main>
      ))}
    </div>
  );
}

//e.currentTarget방법을 써보자