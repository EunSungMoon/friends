export default function SelectBoxCom(props) {
  return (
    <select className="optionSelector">
      {props.options.map((option) => (
        <option value={option.value} defaultValue={props.defaultValue === option.value} key={option.value}>{option.name}</option>
      ))}

    </select>
  )
} 