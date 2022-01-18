import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useParams } from 'react-router-dom'

export default function useForm({ initialValues, onSubmit, errorMessage }) {
  const { id } = useParams();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const history = useHistory();

  let token = `Token ${localStorage.getItem('token')}`

  const handleChange = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    console.log(values)
  };

  const handleZipcode = () => {
    values.zipcode = document.querySelector('.zipcode').value
    values.roadAddress = document.querySelector('.road').value
    values.jibunAddress = document.querySelector('.jibun').value
  }

  const handleSubmit = async event => {
    setSubmitting(true);
    event.preventDefault();
    await new Promise(r => setTimeout(r, 1000));
    setErrors(errorMessage(values));
  };

  const handleAxios = async () => {
    try {
      const loadAxios = await axios.get(`http://15.164.62.156:8888/api/board/${id}/`,
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
      console.log(loadAxios)
      if (loadAxios.statusText === 'Created') {
        alert('성공!')
        history.push('/')
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
    handleSubmit,
    handleZipcode,
  };
}