import { useState } from "react";

export default function Content({ list: w }) {
  const [content] = useState(w)

  return (
    <p>{ content.title}</p>
  )
}