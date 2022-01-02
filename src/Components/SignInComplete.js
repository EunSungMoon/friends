import './style/SignInComplete.scss';
import { Link } from 'react-router-dom';

export default function SignInComplete() {
  return (
    <main id="siginComplete-main">
      <div className="container">
        <div className="titleWrap">
          <h2 className="h2">회원가입 완료</h2>
        </div>
        <section className="message">
          <p>가입이 완료되었습니다. 메일을 통해 인증을 완료해주세요.</p>
          <button className="goHome"><Link to='/'>홈으로 가기</Link></button>
        </section>
      </div>
    </main>
  )
}