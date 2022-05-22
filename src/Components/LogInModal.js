import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../style/LogIn.scss';
import { useState } from 'react';
import axios from 'axios';
import apiSwagger from '../apiSwagger/apiSwagger.json'

export default function LogInModal(props) {

  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });
  const { email, password } = inputs

  const onChange = e => {
    const { name, value } = e.target
    const nextInputs = {
      ...inputs,
      [name]: value,
    }
    setInputs(nextInputs)
  }

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const loadAxios = await axios.post(`${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/login/`,
        {
          email: email,
          password: password
        },
        {
          headers: {
            'Content-type': 'application/json'
          }
        })
      if (loadAxios.data.token) {
        alert('로그인 완료')
        localStorage.setItem('token', loadAxios.data.token)
        onClickLoginBtn()
        document.location.href = '/'
      }
    }
    catch (error) {
      alert('아이디 또는 비밀번호 확인헤주세요.')
    }
  }

  const onClickLoginBtn = () => {
    const resetInputs = {
      email: '',
      password: ''
    }
    setInputs(resetInputs)
    props.onHide()
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
        <form onSubmit={handleLogin}>
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
          <button type='submit' className='longWidth loginBtn'>로그인</button>
        </form>
        <div className='signinNav'>
          <span className='signin-text'>프렌즈가 처음이세요?</span>
          <Link to={'/signin'}><button className='longWidth signinBtn' onClick={props.onHide}>회원가입</button></Link>
        </div>
      </div>
    </Modal>
  )
}