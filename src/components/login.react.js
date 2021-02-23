import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

const LOGIN_PAGE = (props)=> {

    return (
        <div >
            <Button variant="contained" onClick = {props.action}>Log In</Button>
        </div>
    );
}

export default LOGIN_PAGE;