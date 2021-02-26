import { Grid, makeStyles, MenuItem, TextField, Typography } from "@material-ui/core";
import * as React from "react";
import { useState, useEffect } from "react";
import { render } from "react-dom";


const CarAction = [
    {
      value: 'BUY',
      label: '차량 구매하기',
    },
    {
      value: 'FIX',
      label: '차량 수리하기',
    },
];
var car_name="";
const useStyles = makeStyles((theme) =>({
    TextField: {
        marginLeft : theme.spacing(1),
        marginTop  : theme.spacing(2)
    }
}))
export default function Update({match, history}) {
    const classes = useStyles();
    const [car_action, setAction] = useState('BUY');
    const [is_loading, load_fin] = useState('true');
    const [data, setData] = useState('여기에 입력하고 싶으신 데이터를 입력하시면 됩니다. 예) 차량 구입 : 700만원');
    const handleChange = (event) =>{
        setAction(event.target.value);
    }
    const dataChange = (e)=>{
        setData(e.target.value);
    }
    useEffect(() => {
        if(match.params.id != undefined){
            fetch('http://localhost:3001/api/get_list/'+match.params.id)
                .then(res => res.json())
                .then(data => {
                    car_name= data.items[0].name;
                    console.log(car_name);
                    load_fin('false');
                });
            }
    }, []);
    const submit= ()=>{
        let email = localStorage.getItem("email");
        fetch('http://localhost:3001/api/update',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'action':car_action,
                'car_name':car_name,
                'username':email,
                'data':data
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                history.replace('/history/'+match.params.id);
            })
    }
    if(match.params.id==undefined){
        return (
            <div >
                <h1>차량의 이벤트를 update하는 페이지입니다. </h1>
                <h2>홈화면에서 자동차를 하나 선택해주세요.</h2>
            </div>
        );
    }
    else{
        console.log(data);
        return (
            <>
                <Typography variant="h5">
                    차량 이벤트 업데이트하기
                </Typography>
                <Grid container spacing={3}>
                    <TextField
                        id="outlined-select-caraction"
                        select
                        label="Action"
                        style={{marginTop: 30, marginLeft :30}}
                        value={car_action}
                        onChange={handleChange}
                        variant="outlined"
                    >
                        {CarAction.map((option) =>(
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Grid item xs={8} sm={4}>
                        <TextField
                            id="carName"
                            name="carName"
                            label="차량 이름"
                            value={car_name}
                            style={{marginTop: 15}}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="filled"
                        />
                    </Grid>
                    <Grid item xs={8} sm={4}>
                        <TextField
                            id="userName"
                            name="userName"
                            label="회원 아이디"
                            value={localStorage.getItem("email")}
                            style={{marginTop: 15}}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="filled"
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Multiline"
                        multiline
                        fullWidth
                        rows={4}
                        style={{marginTop: 15,marginLeft:17}}
                        defaultValue="쓰고싶은 내용을 적으면 됩니다. 예시) 구입가격 : xxx원"
                        variant="outlined"
                        onChange={dataChange}
                    />
                </Grid>
                <button onClick={() => history.goBack()}>Back</button>
                <button onClick={()=>submit()}>Update</button>
            </>
        );
    }
}/*
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
