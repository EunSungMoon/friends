import e from "express";
import { useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import Content from "./Content";

export default function ListDetail() {
  const { number } = useParams();
  const lists = useFetch(`http://localhost:3001/lists?list=${number}`)


  return (
    <div>
      <h1>{number}</h1>

    </div>
  );
}

//e.currentTarget방법을 써보자