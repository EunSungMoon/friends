import { useState } from "react"

export default function NumberCountCom(props, isEdit) {
  const [number, setNumber] = useState(1);

  const onIncrease = () => {
    let newNumber;
    if (number > 9) {
      newNumber = 10
    } else {
      newNumber = number + 1
    }
    setNumber(newNumber)
    console.log(newNumber)
  }

  const onDecrease = () => {
    let newNumber;
    if (number < 2) {
      newNumber = 1
    } else {
      newNumber = number - 1
    }
    setNumber(newNumber)
    console.log(newNumber)
  }

  return (
    <div className="countDom">
      <button type="button" className="minus countBtn" onClick={onDecrease}></button>
      {/* {isEdit ? (<p value={props.number}>{props.number}명</p>) : (<p>{number}명</p>)} */}
      <p value={props.number}>{props.number}명</p>
      <button type="button" className="plus countBtn" onClick={onIncrease}></button>
    </div>
  )
}