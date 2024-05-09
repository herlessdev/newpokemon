import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const StartGame = () => {
  const [playVideo, setPlayVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const currentVideo = videoRef.current;
    const handleVideoLoop = () => {
      if (currentVideo && currentVideo.currentTime >= 120) {
        currentVideo.currentTime = 61;
      }
    };
    if (videoRef.current) {
      videoRef.current.addEventListener("timeupdate", handleVideoLoop);
    }
    return () => {
      if (currentVideo) {
        currentVideo.removeEventListener("timeupdate", handleVideoLoop);
      }
    };
  }, []);

  const handlePlayGame = () => {
    setPlayVideo(true);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "a" && playVideo) {
        if (videoRef.current && videoRef.current.currentTime <= 61) {
          videoRef.current.currentTime = 61;
        } else {
          navigate("/select-menu");
        }
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [navigate, playVideo]);
  return (
    <main className="w-full h-full bg-gray-900 flex justify-center items-center">
      {!playVideo && (
        <button
          className="bg-[#e0a800] px-6 py-2 rounded-[5px]"
          onClick={handlePlayGame}
        >
          Play Game
        </button>
      )}
      {playVideo && (
        <video
          ref={videoRef}
          className="w-full"
          controls={false}
          autoPlay={true}
          muted={false}
        >
          <source src="/newpokemon/videoplayback.mp4" type="video/mp4" />
        </video>
      )}
    </main>
  );
};
export default StartGame;
