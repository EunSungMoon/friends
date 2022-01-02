export default function InputCom(props) {
  return (
    <>
      <span>{props.title}</span>
      <input name={props.name} type={props.type} className={props.class} placeholder={props.placeholder} onChange={props.event} value={props.value}></input>
    </>
  )
}