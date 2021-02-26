import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React, {Component, useEffect, useState} from 'react';
import { Link } from "react-router-dom";
var car_history = [
    {
      id: 0,
      name: 'sample'
    }
  ];
var car_history_exists=false;
var car_id = '';
const useStyles = makeStyles({
    card: {
        margin: "20px 0",
        maxWidth: 600,
        overflow: "visible"
    }
});
function History({match, history}){
    const [isLoading, Loads] = useState(true);
    const classes = useStyles();
    useEffect(() => {
        if(match.params.id != undefined){
            if(isLoading){
                fetch('http://localhost:3001/api/history/'+match.params.id)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if(data.result){
                        car_history_exists=true;
                        car_history = data.items;
                        car_id =data.name;
                        console.log(car_history);
                        console.log(car_history_exists);
                    }
                    else{
                        car_history_exists=false;
                    }
                    Loads(false);
                });
            }
        }
    });

    if(match.params.id==undefined){
        return (
            <div >
                <h1>차량의 history를 보는 페이지입니다. </h1>
                <h2>Home화면에서 보고싶은 자동차를 선택해주세요.</h2>
            </div>
        );
    }
    else{
        if(isLoading){
            return (
                <p>현재 로딩중입니다 2트..</p>
            )
        }
        else{
            return (
                <>
                    <h1>{car_id}'s history</h1>
                    <ul>
                        {car_history_exists}
                        {car_history_exists &&
                        <div>
                            {car_history.map(({userName, eventName, timestamp, data}) => (
                                <Card key={timestamp} className={classes.card}>
                                    <CardContent>
                                        <Typography color="textSecondary" gutterBottom>
                                            {timestamp.toLocaleDateString}
                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                            {eventName}
                                        </Typography>
                                        <Typography color="textSecondary">
                                            {userName}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {data}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        }
                    </ul>
                    <button onClick={() => history.goBack()}>Back</button>
                    <Link to={`/update/`+match.params.id}> 구매하러 가기 </Link>
                </>
            );
        }
    }
}

export default History;