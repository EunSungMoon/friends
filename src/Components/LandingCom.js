import '../style/Header.scss';
import logo from '../style/img/logo_friends.png';

export default function LandingCom() {
  return (
    <section id='landing' className='container-fluid'>
      <div className='slogan container'>
        <p>약자의 이익을 위해<br />
        대가없이<br />
        자발적으로 모이는<br />
        봉사활동 플렛폼</p>
        <img src={logo} alt=''></img>
      </div>
    </section>
  )
}