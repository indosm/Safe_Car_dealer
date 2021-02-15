import React, {Component } from 'react';
import { Button, Tab, Tabs } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';
class Navigation extends Component {
  handleSelect(route){
    this.props.history.push(route)
  }
  render(){
    return (
      <div className="Tabs">
        {/*
        <Tabs defaultActiveKey="search" id="tabs_main" onSelect={this.handleSelect.bind(this)}>
            <Tab eventKey="search" title="자동차 리스트 검색">
                <h1> 리스트가 나옵니다 뿅!</h1>
            </Tab>
            <Tab eventKey="history" title="특정 자동차 히스토리 확인">
                <h2> 소나타의 히스토리입니다 </h2>
            </Tab>
            <Tab eventKey="update" title="기록 작성하기">
            </Tab>
        </Tabs>
        <p>탭으로 routing은 실패했음. 밑에는 임시방편으로 button으로 작성해놓은 코드</p>
        */}
        <Link to="/">
          <Button>Home</Button>
        </Link>
        <Link to="/history">
          <Button>history</Button>
        </Link>
        <Link to="/update">
          <Button>update</Button>
        </Link>
      </div>
    );
  }
}
/*
function Navigation({history}) {
  return (
    <div>
      <Button onClick={() => history.push('/about')}>about으로 이동</Button>
    </div>
  )
}*/

export default Navigation;
