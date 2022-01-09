import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export default function useForm({ initialValues, onSubmit, validate }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);


  const [visible, setVisible] = useState(false);
  const history = useHistory()

  const handleChange = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleReason = (e) => {
    setVisible(!visible)
  }

  const handleSubmit = async event => {
    setSubmitting(true);
    event.preventDefault();
    await new Promise(r => setTimeout(r, 1000));
    setErrors(validate(values));
  };

  useEffect(() => {
    if (submitting) {
      if (Object.keys(errors).length === 0) {
        onSubmit(values);
        fetch('http://15.164.62.156:8888/api/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })
          .then(response => {
            return response.json()
          })
          .then(data => {
            if (data.message === 'success') {
              history.push('/signinComplete')
            } else if (data.username[0] === 'custom_user with this username already exists.') {
              alert('메일 주소 중복입니다.')
            }
          })
          .catch(error => {
            alert('회원가입에 실패하였습니다. 다시 시도해주세요.')
          })
      }
      setSubmitting(false);
    }
  }, [errors]);

  return {
    values,
    errors,
    visible,
    submitting,
    handleChange,
    handleReason,
    handleSubmit
  };
}