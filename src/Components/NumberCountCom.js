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
    <div className="countDom" onClick={props.event}>
      <button type="button" className="minus countBtn" onClick={onDecrease}></button>
      <p className="members" name='members' value={number} >{number}</p>
      <button type="button" className="plus countBtn" onClick={onIncrease}></button>
    </div>
  )
}