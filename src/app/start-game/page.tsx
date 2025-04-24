import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import cx from "../../lib/cx";
import { controls } from "../../data/controllers";

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
      if (
        event.key?.toLocaleLowerCase() === controls?.interactuar &&
        playVideo
      ) {
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
    <main className="w-full h-full bg-gray-900 flex flex-col justify-center items-center">
      {!playVideo && (
        <>
          <button
            className="bg-[#e0a800] px-6 py-2 rounded-[5px]"
            onClick={handlePlayGame}
          >
            Play Game
          </button>
          <div className="bg-white rounded-2xl bg-opacity-75 mt-10 px-8 py-4">
            {controls && (
              <div className="flex flex-col gap-2">
                {Object.keys(controls).map((control, i) => (
                  <div className="flex gap-4 items-center" key={i}>
                    <img
                      className={cx("w-12 h-12", i !== 0 && "w-12 h-7")}
                      src={`${import.meta.env.BASE_URL}controls/${i + 1}.svg`}
                    />
                    <p className="capitalize">{control}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
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
