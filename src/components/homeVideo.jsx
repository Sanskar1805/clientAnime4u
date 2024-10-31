import React, { useState } from "react";
import ReactPlayer from "react-player";

const HomePageVideo = (props) => {
  const urlVideo = props.url;
  const [isMuted, setIsMuted] = useState(props.mute); // Start with the video muted

  const toggleMute = () => {
    setIsMuted(prevMute => !prevMute); // Toggle the mute state
  };

  return (
    <div className="video-wrapper">
      <ReactPlayer
        url={urlVideo}
        playing
        loop
        muted={isMuted} // Use the state to control muting
        width="100%"
        height="100vh"
        config={{
          youtube: {
            playerVars: {
              autoplay: 1,
              controls: 0,
              loop: 1,
            },
          },
        }}
      />
      <button onClick={toggleMute} style={{ position: 'absolute', zIndex: 1 }}>
        {isMuted ? 'Unmute' : 'Mute'}
      </button>
    </div>
  );
};

export default HomePageVideo;
