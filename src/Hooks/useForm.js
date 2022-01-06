import { useEffect, useState } from "react";

export default function useForm({ initialValues, onSubmit, validate }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);


  const [visible, setVisible] = useState(false);
  const [purpose, setPurpose] = useState('volunteer')

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
        }).then((response) => {
          console.log(response.json())
          console.log('new user added!')
          console.log(values)
        }).catch(() => {
          console.log('error')
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