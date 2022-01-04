import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../style/LogIn.scss';

export default function LogInModal(props) {

  return (
    <Modal
    {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    > <Modal.Header closeButton></Modal.Header>
      <div className='loginWrap'>
        <div className='titleWrap'>
          <h1>프렌즈</h1>
        </div>
        <form>
          <input name="id" type="text" className='longWidth text-input' placeholder='아이디를 입력해주세요.'></input>
          <input name="pw" type="password" className='longWidth text-input' placeholder='비밀번호를 입력해주세요.'></input>
        </form>
        <button className='longWidth loginBtn'>로그인</button>
        <div className='signinNav'>
          <span className='signin-text'>프렌즈가 처음이세요?</span>
          <Link to={'/signin'}><button className='longWidth signinBtn' onClick={props.onHide}>회원가입</button></Link>
        </div>
      </div>
    </Modal>
  )
}