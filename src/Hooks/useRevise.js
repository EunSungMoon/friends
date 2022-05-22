/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useParams } from "react-router-dom";
import apiSwagger from '../apiSwagger/apiSwagger.json'

export default function useRevise({ initialValues, onSubmit, errorMessage }) {
  const { id } = useParams();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const history = useHistory();

  let token = `Token ${localStorage.getItem('token')}`

  const handleChange = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async event => {
    setSubmitting(true);
    event.preventDefault();
    await new Promise(r => setTimeout(r, 1000));
    setErrors(errorMessage(values));
  };

  const handleAxios = async () => {
    try {
      const loadAxios = await axios.put(`${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/board/${id}/`,
        {
          title: values.title,
          dday: values.dday,
          members: values.members,
          part: values.part,
          zipcode: values.zipcode,
          roadAddress: values.roadAddress,
          jibunAddress: values.jibunAddress,
          detailAddress: values.detailAddress,
          officialname: values.officialname,
          belong: values.belong,
          authentication: values.authentication,
          information: values.information,
          state: values.state
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        })
      if (window.confirm('수정하시겠습니까?')) {
        alert('수정되었습니다.')
        history.push('/boards')
      }
    }
    catch (error) {
      setErrors(error)
    }
  }

  useEffect(() => {
    if (submitting) {
      handleAxios()
      onSubmit(values);
      setSubmitting(false);
    }
  }, [errors]);

  return {
    values,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  };
}