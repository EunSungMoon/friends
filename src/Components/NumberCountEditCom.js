import { useState } from "react"

export default function NumberCountCom(props) {
  const [number, setNumber] = useState(props.number);

  const onIncrease = () => {
    let newNumber;
    if (number > 9) {
      newNumber = 10
    } else {
      newNumber = number + 1
    }
    setNumber(newNumber)
    console.log(number)
  }

  const onDecrease = () => {
    let newNumber;
    if (number < 2) {
      newNumber = 1
    } else {
      newNumber = number - 1
    }
    setNumber(newNumber)
    console.log(number)
  }

  return (
    <div className="countDom">
      <button type="button" className="minus countBtn" onClick={onDecrease}></button>
      <span className="membersSpan" onChange={props.event} value={number}>{number}</span>
      <button type="button" className="plus countBtn" onClick={onIncrease}></button>
    </div>
  )
}