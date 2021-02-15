import React, {Component } from 'react';
import { Route } from 'react-router-dom';
import Infolist from '../components/Infolist.react';
import History from '../components/history.react';
function Home({match, location, history}) {
  return (
    <div className="Home">
      <Infolist />
    </div>
  )
}

export default Home;
