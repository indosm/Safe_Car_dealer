import * as React from "react";
import {InputGroup, DropdownButton, Dropdown, FormControl, Form, Button, Row, Col} from "react-bootstrap";
import { render } from "react-dom";

class Update extends React.Component{
    constructor() {
        super();
        
        this.state = {
            dropDownValue: "액션 선택"
        }
    }

    clicked(text){
        this.setState({dropDownValue: text})
    }

    render(){
        return (
            <>
                <Form>
                    <Form.Group as={Row} controlId="WriteTrace.ChooseAction">
                        <Col sm={2}>
                            <Form.Control as="select" column sm={2}>
                                <option>차량 구매하기</option>
                                <option>차량 수리하기</option>
                            </Form.Control>
                        </Col>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="차량 이름" />
                        </Col>
                    </Form.Group>
                    <Form.Control type="text" placeholder="Your ID..." readOnly />
                    <Form.Group controlId="WriteTrace.DetailInfo">
                        <Form.Label>기타 특이사항을 적어주세요</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <InputGroup className="mb-3">
                <DropdownButton
                    as={InputGroup.Prepend}
                    variant="outline-secondary"
                    title={this.state.dropDownValue}
                    id="input-group-dropdown-1"
                    onSelect={SelectItem}
                >
                    <Dropdown.Item onClick={(e) => this.clicked(e.target.textContent)} href="#/buy">차량 구매하기</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => this.clicked(e.target.textContent)} href="#/fix">차량 수리하기</Dropdown.Item>
                </DropdownButton>
                <FormControl
                    placeholder="차량 이름 입력하기"
                    aria-describedby="basic-addon1"
                />
                </InputGroup>
                <h4>{this.state.dropDownValue}</h4>
            </>
        )
    }
}
function SelectItem(eventkey){
    alert(eventkey+"를 선택하셨습니다.");
    console.log(eventkey);
}

export default Update;
