import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import './cssfiles/Loginbody.css'
import Navbar1 from './Navbar1';
export default class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            fname:"",
            passw:""
        };
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const{fname,passw}=this.state;
        console.log(fname,passw);
        fetch("http://localhost:5000/loginuser", {
        method: "POST",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*", 
        },
        body: JSON.stringify({
        fname,
        passw,
      }),
    })
    .then((res) => res.json())
            .then((data) => {
              console.log(data, "userRegister");
            if(data.status=="ok"){
                alert("login successfull");
                window.localStorage.setItem("token",data.data);
                window.localStorage.setItem("loggedIn",true);
                window.location.href="./Invoicedetails"
            }
            if(data.eroor=="User Not found"){
                alert("User Not Found");
                window.location.href="./sign-in"
            }  
            if(data.error=="InvAlid Password"){
                alert("invalid passwprd entered");
                window.location.href="./sign-in"
            }  
        });
    }

    render() {
        return (
            <div>
                <Navbar1 />
            <div className='outerdiv'>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>    
            <Card style={{ width: '30rem' }}>
                <br></br>
            <Card.Title>Sign-In   .<i class="fa fa-paper-plane"></i></Card.Title>
            <br></br>
            <form  onSubmit={this.handleSubmit}>

                <div className="mb-3">
                <Card.Title>Full Name <i class="fa fa-envelope"></i></Card.Title>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter first name"
                        onChange={(e)=>this.setState({fname:e.target.value})}
                    />
                </div>

                <div className="mb-3">
                <Card.Title>Enter Password<i class="fa fa-key"></i></Card.Title>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter 8 digit password"
                        onChange={(e)=>this.setState({passw:e.target.value})}
                    />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-warning">
                        Submit
                    </button>
                </div>

            </form>


            </Card>

            </div>
            </div>
        )
    }
}