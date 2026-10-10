import React, { useEffect, useState, useRef } from "react";

interface PreloaderProps {
  onLoaded?: () => void;
  minDisplayTime?: number; // Minimum time in ms to show the video loader
}

export const Preloader: React.FC<PreloaderProps> = ({
  onLoaded,
  minDisplayTime = 3000,
}) => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let isWindowLoaded = document.readyState === "complete";
    let isMinTimePassed = false;

    // Ensure video begins playing immediately
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy handled by muted attribute
      });
    }

    const handleWindowLoad = () => {
      isWindowLoaded = true;
      checkCompletion();
    };

    if (!isWindowLoaded) {
      window.addEventListener("load", handleWindowLoad);
    }

    const timer = setTimeout(() => {
      isMinTimePassed = true;
      checkCompletion();
    }, minDisplayTime);

    function checkCompletion() {
      if (isWindowLoaded && isMinTimePassed) {
        setFading(true);
        setTimeout(() => {
          setVisible(false);
          if (onLoaded) onLoaded();
        }, 700); // 700ms smooth fade-out
      }
    }

    return () => {
      window.removeEventListener("load", handleWindowLoad);
      clearTimeout(timer);
    };
  }, [minDisplayTime, onLoaded]);

  if (!visible) return null;

  return (
    <div
      id="preloader"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-700 ease-in-out select-none ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-live="polite"
      aria-busy={!fading}
    >
      <div className="relative flex items-center justify-center w-full max-w-xl max-h-screen p-4">
        {/* User's video loader */}
        <video
          ref={videoRef}
          src="/gemini_generated_video_1b55b1a7.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto max-h-[85vh] object-contain rounded-xl select-none"
        />
      </div>
    </div>
  );
};

export default Preloader;
