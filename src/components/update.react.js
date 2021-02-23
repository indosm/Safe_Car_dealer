import * as React from "react";
import { render } from "react-dom";

class Update extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            action: '차량 구매하기',
            car_name: '',
            user_name: '',
            detail: ''
        }
    }
    ActionChange(e){
        this.setState({action: e.target.value});
    }
    NameChange(e){
        this.setState({car_name: e.target.value});
    }
    DetailChange(e){
        this.setState({detail: e.target.value});
    }
    handleSubmit(e){
        const form = e.currentTarget;
        alert('Action : ' +this.state.action + ' name : '+this.state.car_name+' detail : '+this.state.detail);
        e.preventDefault();
    }
    render(){
        return (
            <>
            </>
            );}}/*
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group as={Row} controlId="WriteTrace.ChooseAction">
                        <Col sm={2}>
                            <Form.Control
                            as="select"
                            column sm={2}
                            onChange={this.ActionChange}
                            defaultValue={this.state.action}
                            >
                                <option>차량 구매하기</option>
                                <option>차량 수리하기</option>
                            </Form.Control>
                        </Col>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="차량 이름" onChange={this.NameChange} />
                        </Col>
                    </Form.Group>
                    <Form.Control type="text" placeholder="Your ID..." readOnly />
                    <Form.Group controlId="WriteTrace.DetailInfo">
                        <Form.Label>기타 특이사항을 적어주세요</Form.Label>
                        <Form.Control
                        as="textarea"
                        rows={3}
                        onChange={this.DetailChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        제출
                    </Button>
                </Form>
                {JSON.stringify(this.state)}
            </>
        )
    }
}
*/
export default Update;
