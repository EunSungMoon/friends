export default function validate({ email, password, nickName, password2 }) {
  const errors = {};

  if (!email) {
    errors.email = "이메일이 입력되지 않았습니다.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "입력된 이메일이 유효하지 않습니다.";
  }

  if (!password) {
    errors.password = "비밀번호가 입력되지 않았습니다.";
  } else if (password.length < 8) {
    errors.password = "8자 이상의 패스워드를 사용해야 합니다.";
  }

  if (!password2) {
    errors.password2 = "비밀번호가 입력되지 않았습니다.";
  } else if (password2.length < 8) {
    errors.password2 = "8자 이상의 패스워드를 사용해야 합니다.";
  }
  
  if (!nickName) {
    errors.nickName = "별명이 입력되지 않았습니다.";
  } else if (nickName.length < 2) {
    errors.nickName = '2자리 이상 별명을 사용해야 합니다.'
  }

  return errors;
}