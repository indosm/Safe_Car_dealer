import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { users } from "../data/data.json";

function Infolist({ match }) {
  return (
    <>
      <h2> 차량 리스트입니다</h2>
      <ul>
        {users.map(({id, name}) => (
          <li key={id}>
            <Link to={`history/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}


export default Infolist;