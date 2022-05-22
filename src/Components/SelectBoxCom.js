/* eslint-disable no-unused-vars */
import { useState } from "react";

export default function SelectBoxCom(props) {
  const [selected, setSelected] = useState("haircut");

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };
  return (
    <select className="optionSelector" name='part' onChange={handleSelect} value={props.value}>
      {props.options.map((option) => (
        <option value={option.value} defaultValue={props.defaultValue} key={option.value} onChange={props.event}>{option.name}</option>
      ))}

    </select>
  )
} 