import { useState } from "react"

export default function NumberCountCom() {
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
    <>
      <button onClick={onIncrease}>+</button>
      <p>{number}명</p>
      <button onClick={onDecrease}>-</button>
    </>
  )
}