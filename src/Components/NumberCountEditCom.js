import { useState } from "react"

export default function NumberCountCom(props) {
  const [number, setNumber] = useState(1);

  const onIncrease = () => {
    let newNumber;
    if (number > 9) {
      newNumber = 10
    } else {
      newNumber = number + 1
    }
    setNumber(newNumber)
  }

  const onDecrease = () => {
    let newNumber;
    if (number < 2) {
      newNumber = 1
    } else {
      newNumber = number - 1
    }
    setNumber(newNumber)
  }

  return (
    <div className="countDom">
      <button type="button" className="minus countBtn" onClick={onDecrease}></button>
      <input className="members" name='members' onChange={props.event} disabled placeholder={`${props.number}명`}/> 
      <button type="button" className="plus countBtn" onClick={onIncrease}></button>
    </div>
  )
}