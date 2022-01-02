export default function ProfileCom(props) {
  return(
    <div className="infoWrap">
      <span>{props.head}</span>
      <div className="infoBox">
        <div className="infoText">
          <span>{props.info}</span>
        </div>
      </div>
    </div>
  )
};