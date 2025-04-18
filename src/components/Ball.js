import { useEffect, useRef, useState } from "react";
import BallSound from "../object/BallSound";

const Ball = ({ x, y }) => {
  const [posY, setPosY] = useState(y);
  const [display, setDisplay] = useState(true);
  const gravity = 980;
  const energyLoss = 0.83;
  const radius = 24;
  const floorRef = useRef(window.innerHeight); // 바닥 위치 = 브라우저 높이
  const floorY = floorRef.current - radius;

  const velocityRef = useRef(0);
  const positionRef = useRef(y);
  const lastTimeRef = useRef(null);
  const animationRef = useRef(null);
  const lastBounceTimeRef = useRef(-200);
  const soundRef = useRef(BallSound.getBallSoundInstance());

  const animate = (timestamp) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const delta = (timestamp - lastTimeRef.current) / 1000;
    lastTimeRef.current = timestamp;

    // 중력 적용
    velocityRef.current += gravity * delta;
    positionRef.current += velocityRef.current * delta;

    // 바닥에 닿으면 반사
    if (positionRef.current >= floorY - radius) {
      positionRef.current = floorY - radius;
      velocityRef.current = -velocityRef.current * energyLoss;

      // 마지막 반사 후 잠시 대기 (0.2초)
      if (timestamp - lastBounceTimeRef.current > 10) {
        soundRef.current.play();
        lastBounceTimeRef.current = timestamp;
      }

      if (Math.abs(velocityRef.current) < 10) {
        cancelAnimationFrame(animationRef.current);
        setTimeout(() => {
          setDisplay(false);
        }, 10000);
        return;
      }
    }

    setPosY(positionRef.current);
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <>
      {display && (
        <div
          style={{
            position: "absolute",
            width: radius * 2,
            height: radius * 2,
            backgroundColor: "red",
            borderRadius: "50%",
            left: x - radius,
            top: posY,
          }}
        />
      )}
    </>
  );
};

export default Ball;
