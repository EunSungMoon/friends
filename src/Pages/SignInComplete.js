import '../style/SignInComplete.scss';
import { Link } from 'react-router-dom';

export default function SignInComplete() {
  return (
    <main id="siginComplete-main">
      <div className="container">
        <div className="titleWrap">
          <h2 className="h2">회원가입 완료</h2>
        </div>
        <section className="message">
          <p>가입이 완료되었습니다.<br /> 메일을 통해 인증을 완료해주세요.</p>
          <Link to='/'><button className="goHome">홈으로 가기</button></Link>
        </section>
      </div>
    </main>
  )
}