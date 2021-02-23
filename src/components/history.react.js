import React, {Component, useState} from 'react';
import { users } from "../data/data.json";

function History({match, history}){
    const [count,isLoading] = useState(0);
    if(match.params.id==undefined){
        return (
            <div >
                <h1>차량의 history를 보는 페이지입니다. </h1>
                <h2>Home화면에서 보고싶은 자동차를 선택해주세요.</h2>
                <h3> {match.params.id}</h3>
            </div>
        );
    }
    else{
        const user = users.find((user) => user.id === match.params.id)
        console.log(match.params.id)
        return (
            <div >
                <h1>{user.id}'s history</h1>
                <dd>{user.name}</dd>
                <button onClick={() => history.goBack()}>Back</button>
            </div>
        );
    }
}

export default History;