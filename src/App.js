import React, { Component } from "react";
import "./styles/App.scss";
import Video from "./components/video.container";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h4>WELCOME</h4>
          <Video />
        </header>
      </div>
    );
  }
}

export default App;
