import './style/SignIn.scss';
import { useState } from 'react';
import InputCom from './InputCom';
import useForm from '../Hooks/useForm';
import validate from './validate';

export default function SignIn(props) {

  const { values, errors, submitting, handleChange, handleSubmit } = useForm({
    initialValues: { email: '', password: '', nickName: '' },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 3));
    },
    validate
  })

  const [visible, setVisible] = useState(false);
  const [reason, setReason] = useState('volunteer');

  const [password, setPassword] = useState('');

  const [noMatchPassword, setNoMatchPassword] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');


  const handleReason = e => {
    setReason(e.currentTarget.value);
    setVisible(!visible)
  }

  const handlePassword = e => {
    setPassword(e.target.value)
  }

  const handlePasswordChk = (e) => {
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
                name="email"
                type="text"
                class="text-input longWidth"
                placeholder="이메일주소를 입력해주세요."
                event={handleChange}
                value={values.email}
              />
              {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            </div>
            <div className='password-input form-common'>
              <InputCom
                title="비밀번호"
                name="password"
                type="password"
                class="text-input longWidth"
                placeholder="비밀번호를 입력해주세요."
                event={handleChange}
                onChange={handlePassword}
                value={values.password}
              />
              {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
            </div>
            <div className='password-input form-common'>
              <InputCom
                title="비밀번호 재확인"
                name="password"
                type="password"
                class="text-input longWidth"
                placeholder="비밀번호를 입력해주세요."
                event={handlePasswordChk}
              />
              {noMatchPassword && <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>}
            </div>
            <div className='nickname-input form-common'>
              <InputCom
                title="별명"
                name="nickName"
                type="text"
                class="text-input nickname"
                placeholder="별명을 입력해주세요."
                event={handleChange}
                value={values.nickName}
              />
              <button type='button' className='confirmBtn'>중복확인</button>
              {errors.nickName && <p style={{ color: 'red' }}>{errors.nickName}</p>}
            </div>

            <div className='join-reason form-common'>
              <p>가입이유</p>
              <label className='volunteer'>
                <input
                  type='radio'
                  name='join'
                  value='volunteer'
                  checked={reason === 'volunteer'}
                  onChange={handleReason}
                />봉사활동을 하고 싶어요
              </label>
              <label className='need-helper'>
                <input
                  type='radio'
                  name='join'
                  value='need-helper'
                  checked={reason === 'need-helper'}
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