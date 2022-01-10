import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../style/LogIn.scss';
import { useState } from 'react';

export default function LogInModal(props) {

  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  })
  const { email, password } = inputs

  const onChange = e => {
    const { name, value } = e.target
    const nextInputs = {
      ...inputs,
      [name]: value,
    }
    setInputs(nextInputs)
    console.log(JSON.stringify(inputs))
  }

  const handleLogin = () => {
    fetch('http://15.164.62.156:8888/api/login/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    })
      .then(response => {
        return console.log(response.json())
      })
      .then(response => {
        console.log(response.error)
      })
      .catch(error => {
        console.log(error)
      })
  }

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
        <form onChange={handleLogin}>
          <input
            name="email"
            type="text"
            className='longWidth text-input'
            placeholder='아이디를 입력해주세요.'
            onChange={onChange}
            value={email}
          />
          <input
            name="password"
            type="password"
            className='longWidth text-input'
            placeholder='비밀번호를 입력해주세요.'
            onChange={onChange}
          />
          <button type='button' className='longWidth loginBtn'>로그인</button>
        </form>

        <div className='signinNav'>
          <span className='signin-text'>프렌즈가 처음이세요?</span>
          <Link to={'/signin'}><button className='longWidth signinBtn' onClick={props.onHide}>회원가입</button></Link>
        </div>
      </div>
    </Modal>
  )
}