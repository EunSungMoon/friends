import '../style/SignIn.scss';
import { useState } from 'react';
import InputCom from '../Components/InputCom';
import useForm from '../Hooks/useForm';
import validate from '../Components/validate';
import axios from 'axios';

export default function SignIn() {
  //빈 값일때, 비밀번호 오류 로직
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: { username: '', password: '', nickname: '', password2: '' },
    onSubmit: () => {
      // console.log(JSON.stringify({ "username": values.username, "password": values.password, "nickname": values.nickname }));
    },
    validate
  })

  const [noMatchPassword, setNoMatchPassword] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');

  const handlePasswordChk = e => {
    setNoMatchPassword(e.target.value !== values.password);
    setPasswordCheck(e.target.value);
  };

  //별명 체크 로직
  const [btnName, setBtnName] = useState('중복확인')

  const handleNickname = async () => {
    try {
      const loadAxios = await axios.post('http://15.164.62.156:8888/api/nicknamecheck/', {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "nickname": values.nickname })
      })
      if (loadAxios.data.message === 'possible nickname') {
        if (values.nickname === '') {
          alert('별명을 입력해주세요.')
        } else {
          alert('사용 가능한 별명입니다.')
          setBtnName('확인완료')
        }
      } else if (loadAxios.data.message === 'already exists') {
        alert('이미 존재하는 별명입니다.')
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const changeBtnName = e => {
    if (e.target.value !== values.nickname) {
      setBtnName('중복확인')
    }
  }

  return (
    <main id="sign-main">
      <div className="container">
        <h2 className='h2'>회원가입</h2>
        <section className='section container'>
          <form onSubmit={handleSubmit}>
            <div className='email-input form-common'>
              <InputCom
                title="이메일"
                necessary='*'
                name="username"
                type="text"
                class="text-input longWidth"
                placeholder="이메일주소를 입력해주세요."
                event={handleChange}
                value={values.username}
              />
              {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
            </div>
            <div className='password-input form-common'>
              <InputCom
                title="비밀번호"
                necessary='*'
                name="password"
                type="password"
                class="text-input longWidth"
                placeholder="비밀번호를 입력해주세요."
                event={handleChange}
              />
              {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
            </div>
            <div className='password-input form-common' onChange={handlePasswordChk}>
              <InputCom
                title="비밀번호 재확인"
                necessary='*'
                name="password2"
                type="password"
                class="text-input longWidth"
                placeholder="비밀번호를 입력해주세요."
                event={handleChange}
              />
              {noMatchPassword && <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>}
              {errors.password2 && <p style={{ color: 'red' }}>{errors.password2}</p>}
            </div>
            <div className='nickname-input form-common' onChange={changeBtnName}>
              <InputCom
                title="별명"
                necessary='*'
                name="nickname"
                type="text"
                class="text-input nickname"
                placeholder="별명을 입력해주세요."
                event={handleChange}
                value={values.nickname}
              />
              <button type='button' className='confirmBtn' onClick={handleNickname}>{btnName}</button>
              {errors.nickname && <p style={{ color: 'red' }}>{errors.nickname}</p>}
            </div>

            <p className='infoText'>회원가입 시 이메일 인증 메일이 발송됩니다. <br />정확한 이메일 주소를 입력해주세요.</p>
            <button type='submit' className='joinComplete' disabled={btnName === '중복확인'} >회원가입</button>
          </form>
        </section>
      </div>
    </main>
  )
}