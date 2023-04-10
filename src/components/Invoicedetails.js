import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import './cssfiles/Invoicedetails1.css';
export default class Invoicedetails extends Component{
    constructor(props){
        super(props)
        this.state={
            userData:"",
            customername:"",
            mobile:"",
            item:"",
            price:"",
            quantity:"",
            totalbill:"",   
        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    componentDidMount(){
        fetch("http://localhost:5000/userData",{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
               token:window.localStorage.getItem("token"),
              }),
            })
            .then((res) => res.json())
            .then((data) => {
              console.log(data, "userData");
              this.setState({userData:data.data})
              
        });
    }
    logOut=()=>{
         window.localStorage.clear();
         window.location.href="./sign-in";
    }


    handleSubmit(e){
        e.preventDefault();
        const{customername,mobile,item,price,quantity,totalbill}=this.state;
        fetch("http://localhost:5000/filldetails",{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                userfname:this.state.userData.fname,
                customername,
                mobile,
                item,
                price,
                quantity,
                totalbill
              }),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "userRegister");
                if(data.status==="ok"){
                  alert("invoice generated succcessfully");
                  window.location.href="./Invoicedetails";
                  }  
                
                
          });
    }

    render() {
        return(
            <div>
                
                <h1>Welcome-{this.state.userData.fname}</h1>
                <br></br>
                <div className='buttondiv'>
                <button onClick={this.logOut} className="btn btn-warning">Logout</button>
                </div>
                <div className="outerdiv2">
                <Card style={{ width: '40rem' }}>
                <form onSubmit={this.handleSubmit}>
        <h3>Invoice Filling</h3>
        

        <div className="mb-3">
          <label>Shopkeeper Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Complete name"
            value={this.state.userData.fname}
            onChange={(e)=>this.setState({userfname:e.target.value})}
          />
        </div>


        <div className="mb-3">
          <label>Customer Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Customer name"
            onChange={(e)=>this.setState({customername:e.target.value})}
          />
        </div>

        <div className="mb-3">
          <label>Mobile Number</label>
          <input type="number" className="form-control" placeholder="Enter Mobile Number" 
          onChange={(e)=>this.setState({mobile:e.target.value})} />
        </div>

        <div className="mb-3">
          <label>Item</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter items"
            onChange={(e)=>this.setState({item:e.target.value})}
          />
        </div>

        <div className="mb-3">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter price of item"
            onChange={(e)=>this.setState({price:e.target.value})}
          />
        </div>

        <div className="mb-3">
          <label>Quantity</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Quantity of items"
            onChange={(e)=>this.setState({quantity:e.target.value})}
          />
        </div>

        <div className="mb-3">
          <label>Totalbill</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Total bill"
            onChange={(e)=>this.setState({totalbill:e.target.value})}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-warning">
            Submit details
          </button>
        </div>

      </form>
      </Card>
            </div>
            </div>
            
        )
    }
}