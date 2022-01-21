import React from "react";
import { useState } from 'react'

export default function BtnGp({ btns, changeEvt }) {
  const [Current, setCurrent] = useState(btns[0].id)

  const onClick = v => {
    changeEvt(v);
    setCurrent(v.id)
  }
  return (
    <div className="authenticationWrap">
      {btns.map((v, i) => {
        return (
          <div
            name='authentication'
            value={v.value}
            key={i}
            onClick={() => onClick(v)}
            className={`authenticationBtn ${Current === v.id ? 'active' : ''}`}
          >
            {v.value}
          </div>
        )
      })}
    </div>
  )
}