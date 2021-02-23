import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React, {Component, useEffect, useState} from 'react';
var car_history = [
    {
      id: 0,
      name: 'sample'
    }
  ];
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
                    car_history = data.items;
                    console.log(car_history);
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
                    <h1>{match.params.id}'s history</h1>
                    <ul>
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
                    </ul>
                    <button onClick={() => history.goBack()}>Back</button>
                </>
            );
        }
    }
}

export default History;