import React, { Component } from "react";
import "./CustomerDetails.css";
import customerImage from "../resources/image.jpg";

class CustomerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      phone: props.phone,
      addr: props.addr,
      tags: props.tags,
    };
  }

  //   const zipcode =
  render() {
    return (
      <div id="cd">
        <img id="image" src={customerImage}></img>
        <div id="desc">
          <h1>{this.state.name}</h1>
          <p>{this.state.phone}</p>
          {/* <p>
            {this.state.addr.street}, {this.state.addr.suite},{" "}
            {this.state.addr.city}, {this.state.addr.zipcode}
          </p> */}
          <p>try</p>
        </div>
      </div>
    );
  }
}

export default CustomerDetails;
