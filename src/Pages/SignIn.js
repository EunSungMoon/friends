import '../style/SignIn.scss';
import { useState } from 'react';
import InputCom from '../Components/InputCom';
import useForm from '../Hooks/useForm';
import validate from '../Components/validate';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export default function SignIn() {
  const history = useHistory()

  //빈 값일때, 비밀번호 오류 로직
  const { values, errors, visible, submitting, handleChange, handleReason, handleSubmit } = useForm({
    initialValues: { username: '', password: '', nickname: '', belong: '', purpose: 'true' },
    onSubmit: () => {
      history.push('/signinComplete')
    },
    validate
  })

  // const [reason, setReason] = useState();
  const [noMatchPassword, setNoMatchPassword] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');

  const handlePasswordChk = e => {
    setNoMatchPassword(e.target.value !== values.password);
    setPasswordCheck(e.target.value);
  };

  return (
    <main id="sign-main">
      <div className="container">
        <h2 className='h2'>회원가입</h2>
        <section className='section'>
          <form onSubmit={handleSubmit}>
            <div className='email-input form-common'>
              <InputCom
                title="이메일"
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
                name="password"
                type="password"
                class="text-input longWidth"
                placeholder="비밀번호를 입력해주세요."
                event={handleChange}
              // value={values.password}
              />
              {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
            </div>
            <div className='password-input form-common' onChange={handlePasswordChk}>
              <InputCom
                title="비밀번호 재확인"
                name="password2"
                type="password"
                class="text-input longWidth"
                placeholder="비밀번호를 입력해주세요."
              // event={handleChange}
              />
              {errors.password2 && <p style={{ color: 'red' }}>{errors.password2}</p>}
              {noMatchPassword && <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>}
            </div>
            <div className='nickname-input form-common'>
              <InputCom
                title="별명"
                name="nickname"
                type="text"
                class="text-input nickname"
                placeholder="별명을 입력해주세요."
                event={handleChange}
                value={values.nickname}
              />
              <button type='button' className='confirmBtn'>중복확인</button>
              {errors.nickname && <p style={{ color: 'red' }}>{errors.nickname}</p>}
            </div>

            <div className='join-reason form-common'>
              <p>가입이유</p>
              <label className='volunteer'>
                <input
                  type='radio'
                  name='purpose'
                  value='true'
                  defaultChecked
                  onChange={handleReason}
                />봉사활동을 하고 싶어요
              </label>
              <label className='need-helper'>
                <input
                  type='radio'
                  name='purpose'
                  value='false'
                  onChange={handleReason}
                />봉사자의 도움이 필요해요
              </label>
            </div>

            {visible &&
              <div className='belongWrap form-common'>
                <InputCom
                  title="'소속' 또는 '기관'을 적어주세요."
                  name="belong"
                  type="text"
                  class="longWidth text-input belong"
                  placeholder="00병원"
                  value={values.belongs}
                  event={handleChange}
                />
              </div>
            }

            <p className='infoText'>회원가입 시 이메일 인증 메일이 발송됩니다. <br />정확한 이메일 주소를 입력해주세요.</p>
            <button type='submit' className='joinComplete' disabled={submitting} >회원가입</button>
          </form>
        </section>
      </div>
    </main>
  )
}