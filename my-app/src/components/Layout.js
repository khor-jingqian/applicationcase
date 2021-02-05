import React, { Component } from "react";
import axios from "axios";
import "./Layout.css";
import CustomerDetails from "./CustomerDetails";
import CustomerPosts from "./CustomerPosts";
import customerImage from "../resources/image.jpg";
import loading from "../resources/loading.svg";
// import { ReactComponent as PhoneIcon } from "../resources/icon-24-phone.svg";
import phoneIcon from "../resources/icon-24-shop.svg";

class Layout extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => {
        console.log(response.data);
        this.setState({ items: response.data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const isFetched = this.state.items.name != undefined;

    let layout;

    if (isFetched) {
      layout = (
        <div>
          <div id="left-box">
            <div id="cd">
              <img id="image" src={customerImage}></img>
              <div id="desc">
                <h1>{this.state.items.name}</h1>
                <p>{this.state.items.phone}</p>
                <div>
                  <img src={phoneIcon}></img>
                  <p id="address">
                    {this.state.items.address.street},{" "}
                    {this.state.items.address.suite},{" "}
                    {this.state.items.address.city},{" "}
                    {this.state.items.address.zipcode}
                  </p>
                </div>
                <p>try</p>
              </div>
            </div>
          </div>
          <div id="right-box">
            <CustomerPosts id="cp"></CustomerPosts>
          </div>
        </div>
      );
    } else {
      layout = (
        <div id="loading">
          <img src={loading}></img>
          <h1>Information is loading .....</h1>
        </div>
      );
    }

    return layout;
  }
}

export default Layout;
