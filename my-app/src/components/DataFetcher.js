import React, { Component } from "react";
import axios from "axios";

class DataFetcher extends Component {
  state = {
    items: [],
    test: "Testing",
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
    return (
      <div>
        <h1>{this.state.items.name}</h1>
        <h1>{this.state.test}</h1>
      </div>
    );
  }
}

export default DataFetcher;
