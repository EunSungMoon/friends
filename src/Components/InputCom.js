export default function InputCom(props) {
  return (
    <>
      <p>{props.title}<span style={{ color: 'red' }}>{props.necessary}</span></p>
      <input name={props.name} type={props.type} className={props.class} placeholder={props.placeholder} onChange={props.event} value={props.value} ref={props.ref}></input>
    </>
  )
}