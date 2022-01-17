import { useState } from "react"

export default function Authentication(props) {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheck = e => {
    if(e.target.value==='VMS'){
      document.querySelector('.vmsText').classList.add('clicked');
      document.querySelector('.goText').classList.remove('clicked')
      document.querySelector('.noText').classList.remove('clicked')
    }
    else if(e.target.value==='1365'){
      document.querySelector('.goText').classList.add('clicked');
      document.querySelector('.vmsText').classList.remove('clicked')
      document.querySelector('.noText').classList.remove('clicked')
    }
    else if(e.target.value==='없음'){
      document.querySelector('.noText').classList.add('clicked');
      document.querySelector('.vmsText').classList.remove('clicked')
      document.querySelector('.goText').classList.remove('clicked')
    }
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
          defaultChecked={props.checked}
        />
        <p className={`icon ${props.pClass}`}>{props.icon}</p>
      </label>
    </>
  )
}