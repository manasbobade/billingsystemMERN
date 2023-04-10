import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import './cssfiles/Signup1.css';
import Navbar1 from './Navbar1';
export default class SignUp extends Component {
    constructor(props){
        super (props)
        this.state={
            fname:"",
            passw:"",
        };
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        const{fname,passw}=this.state;
        console.log(fname,passw);
        fetch("http://localhost:5000/register",{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                fname,
                passw
              }),
            })
            .then((res) => res.json())
            .then((data) => {
              console.log(data, "userRegister");
              if(data.status==="User Exists"){
                alert("User Already exits")
                window.location.href="./sign-up";
              }
              if(data.status==="ok"){
                alert("login successfull");
                window.location.href="./sign-in";
                }  
                if(data.status==="incorrect count"){
                    alert("please enter 8 digit password");
                    window.location.href="./sign-up";
                    }  
              
              
        });
    }
    render() {
        return (
<div>
    <Navbar1 />
            <div className="outerdiv1">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <Card style={{ width: '30rem' }}>

            <form onSubmit={this.handleSubmit}>
                <br></br>
            <Card.Title>Sign-Up  .<i className="fa fa-address-card"></i></Card.Title>
            <br></br>
                <div className="mb-3">
                <Card.Title>First Name</Card.Title>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter full name"
                        onChange={(e)=>this.setState({fname:e.target.value})}
                    />
                </div>


                <div className="mb-3">
                <Card.Title>Password<i class="fa fa-key"></i></Card.Title>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter 8 digit password"
                        onChange={(e)=>this.setState({passw:e.target.value})}
                    />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-warning">
                        Sign Up
                    </button>
                </div>
                <br></br>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">sign in?</a>
                </p>
            </form>


                
            </Card>
            </div>
            </div>    
        )
    }
}