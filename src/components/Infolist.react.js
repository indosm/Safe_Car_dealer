import React, {Component, useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core";
var users1 = [
  {
    id: 0,
    name: 'sample'
  }
];
var isLoading = true;

const useStyles = makeStyles({
    card: {
        margin: "20px 0",
        maxWidth: 600,
        overflow: "visible"
    }
});

function Infolist({ match }) {
  const [count,setCount] = useState(0);
  const classes = useStyles();
  useEffect(() => {
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
    console.log(users1);
    return (
      <>
        <h2> 차량 리스트입니다</h2>
        <ul>
          {users1.map(({id, name, cnt}) => (
              <Card key={id} className={classes.card}>
                  <CardContent>
                      <Typography variant="h5" component="h2">
                          {name}
                      </Typography>
                      <Typography color="textSecondary">
                          {cnt}번의 히스토리 존재
                      </Typography>
                  </CardContent>
                  <CardActions>
                      <Link to={`history/${id}`}>더보기</Link>
                  </CardActions>
              </Card>
          ))}
        </ul>
      </>
    )
  }
  
}


export default Infolist;