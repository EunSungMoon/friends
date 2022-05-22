import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import apiSwagger from '../apiSwagger/apiSwagger.json'

export default function useForm({ initialValues, onSubmit, validate }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const history = useHistory()

  const handleChange = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async event => {
    setSubmitting(true);
    event.preventDefault();
    await new Promise(r => setTimeout(r, 1000));
    setErrors(validate(values));
  };

  const handleAxios = async () => {
    try {
      const loadAxios = await axios.post(`${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/register/`,
        {
          username: values.username,
          password: values.password,
          nickname: values.nickname
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        })
      if (loadAxios.data.message === 'success') {
        history.push('/signinComplete')
      } else if (loadAxios.data.username[0] === 'custom_user with this username already exists.') {
        alert('메일 주소 중복입니다.')
      }
    }

    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (submitting) {
      if (Object.keys(errors).length === 0) {
        handleAxios()
        onSubmit(values);
      }
      setSubmitting(false);
    }
  }, [errors]);

  return {
    values,
    errors,
    submitting,
    handleChange,
    handleSubmit
  };
}