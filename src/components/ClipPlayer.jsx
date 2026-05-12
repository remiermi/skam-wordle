import React, { useState, useEffect, useRef } from "react";

export const ClipPlayer = ({ youtubeId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const playerRef = useRef(null);

  const videoUrl = `https://www.youtube.com/watch?v=${youtubeId}`;

  useEffect(() => {
    if (!isPlaying) return;

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    const initPlayer = () => {
      playerRef.current = new window.YT.Player("yt-iframe", {
        events: {
          onReady: (e) => e.target.playVideo(),
        },
      });
    };

    if (window.YT && window.YT.Player) initPlayer();
    else window.onYouTubeIframeAPIReady = initPlayer;
  }, [isPlaying]);

  const handleOverlayClick = () => {
    if (!playerRef.current) return;

    if (isPaused) playerRef.current.playVideo();
    else playerRef.current.pauseVideo();

    setIsPaused(!isPaused);
  };

  return (
  <div className="flex flex-col items-center mt-6 w-full px-4">
    {!isPlaying ? (
      <div
        className="w-full max-w-[560px] aspect-video bg-black rounded-xl flex items-center justify-center cursor-pointer"
        onClick={() => setIsPlaying(true)}
      >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <div
              style={{
                width: 0,
                height: 0,
                borderTop: "12px solid transparent",
                borderBottom: "12px solid transparent",
                borderLeft: "20px solid black",
                marginLeft: "4px",
              }}
            />
          </div>
        </div>
      ) : (
        <div className="w-full max-w-[560px] aspect-video overflow-hidden relative">
          <iframe
            id="yt-iframe"
            style={{
              width: "300%",
              height: "100%",
              marginLeft: "-100%",
              pointerEvents: "none",
            }}
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&start=20&mute=0&controls=0&rel=0&modestbranding=1&iv_load_policy=3&cc_load_policy=1&loop=1&playlist=${youtubeId}&disablekb=1&enablejsapi=1&playsinline=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="YouTube video player"
          />

          <div
            className="absolute inset-0 z-10 cursor-pointer flex items-center justify-center"
            onClick={handleOverlayClick}
          >
            {isPaused && (
              <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: "12px solid transparent",
                    borderBottom: "12px solid transparent",
                    borderLeft: "20px solid black",
                    marginLeft: "4px",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};