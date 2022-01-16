import { useState } from "react"

export default function Authentication(props) {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheck = e => {
    if(isChecked)
    console.log(e.target.value)
    setIsChecked(!isChecked)
  }

  return (
    <>
      <label>
        <input
          type="radio"
          name="authentication"
          className="displayNo"
          value={props.value}
          onClick={handleCheck}
        />
        <p className='icon'>{props.icon}</p>
      </label>
    </>
  )
}