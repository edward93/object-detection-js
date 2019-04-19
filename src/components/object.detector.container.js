import React from "react";
import ml5 from "ml5";
import PropTypes from "prop-types";
import { inspect } from "util";

class Detector extends React.Component {
  static propTypes = {
    video: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.yolo = undefined;
    this.intervalHr = undefined;

    this.state = {
      results: []
    };
  }

  initYolo = (video) => {
    if (video) {
      // load model
      this.yolo = ml5.YOLO(video, () =>
        console.log("YOLO Model Loaded")
      );

      // Detect objects every 3 seconds
      this.intervalHr = setInterval(
        () =>
          this.yolo.detect((err, results) => {
            if (err) {
              console.log(err);
            } else {
              this.setState({ results });
            }
          }),
        3000
      );
    }
  };

  componentDidMount() {
    this.initYolo(this.props.video);
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (
      JSON.stringify(inspect(nextProps)) !== JSON.stringify(inspect(this.props))
    ) {
      this.initYolo(nextProps.video);
    }
  }

  render() {
    return (
      <div>
        {this.state.results.length === 0 ? (
          <p>nothing found yet...</p>
        ) : (
          this.state.results.map((r, index) => (
            <div key={index}>
              <p>
                {r.label} - {(r.confidence * 100).toFixed(2)} %
              </p>
            </div>
          ))
        )}
      </div>
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalHr);
  }
}

export default Detector;
