import React, {Component, useEffect, useState} from 'react';
import { Link } from "react-router-dom";

var users1 = [
  {
    id: 0,
    name: 'sample'
  }
];
var isLoading = true;
function Infolist({ match }) {
  const [count,setCount] = useState(0);
  useEffect(() => {
    document.title = `${count} cars`;
    if(isLoading==true){
    fetch('http://localhost:3001/api/get_list')
      .then(res => res.json())
      .then(data => {
        users1 = data.items;
        isLoading = false;
        setCount(count+1);
      });
    }
  });
  if (isLoading){
    return <p>현재 로딩중입니다.</p>
  } else{
    return (
      <>
        <h2> 차량 리스트입니다</h2>
        <ul>
          {users1.map(({id, name, cnt}) => (
            <li key={id}>
              <Link to={`history/${id}`}>{name}</Link>
            </li>
          ))}
        </ul>
      </>
    )
  }
  
}


export default Infolist;