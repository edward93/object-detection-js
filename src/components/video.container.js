import React from "react";
import Detector from "./object.detector.container";

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.constraints = { audio: false, video: { width: 1280, height: 720 } };

    this.state = {
      mediaStream: undefined
    };
  }

  videoRef = undefined;

  render() {
    return (
      <div>
        <video autoPlay ref={ref => (this.videoRef = ref)} />
        <Detector video={this.videoRef} />
      </div>
    );
  }

  async componentDidMount() {
    await this.getStreamFromCamera();
  }

  getStreamFromCamera = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia(
      this.constraints
    );

    // Show the stream from the default camera
    this.videoRef.srcObject = mediaStream;
    this.setState({ mediaStream });
    console.log("stream has started");
  };
}

export default Video;
