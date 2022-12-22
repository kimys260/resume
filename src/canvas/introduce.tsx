import React, { useEffect, useRef } from "react";

type ParticleType = {
  x: number; // 캔버스 안에서 랜덤한 x 좌표
  y: number; // 캔버스 안에서 랜덤한 y 좌표
  r: number; // 랜덤한 눈 지름 크기
  d: number; // 눈 밀도
};
function Introduce(props) {
  const particleMax = 50;
  const particles: ParticleType[] = [];
  // (Math.random() * document.body.clientHeight) / 7
  for (let i = 0; i < particleMax; i++) {
    particles.push({
      x: Math.random() * document.body.clientWidth,
      y: 0,
      r: Math.random() * 4 + 1,
      d: Math.random() * particleMax,
    });
  }

  const canvasRef = useRef(null);
  const scale = 2;
  let angle = 0;

  const initCanvas = () => {
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
  };

  const resizeCanvas = () => {
    console.log(particles);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = document.body.clientWidth * scale;
    canvas.height = document.body.clientHeight * scale;
    ctx.scale(scale, scale);

    draw();
    setInterval(draw, 33);
  };

  const snow = (x, y, r, d) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.moveTo(x, y);

    ctx.arc(x, y, r, 0, 2 * Math.PI);

    ctx.stroke();

    ctx.fillStyle = `rgba(255,255,255, 0.8)`;
    ctx.fill();
  };

  const update = () => {
    angle += 0.01;
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;
    particles.forEach((p, i) => {
      p.y += Math.cos(p.d) + 1 + p.r / 4;
      p.x += Math.sin(p.d) / 4;

      if (p.x > width + 5 || p.x < -5 || p.y > height) {
        if (i % 3 > 0) {
          //66.67% of the flakes
          p.x = Math.random() * width;
          p.y = -10;
        } else {
          //If the flake is exitting from the right
          if (Math.sin(angle) > 0) {
            //Enter from the left
            p.x = -5;
            p.y = Math.random() * height;
          } else {
            //Enter from the right
            p.x = width + 5;
            p.y = Math.random() * height;
          }
        }
      }
    });
  };

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#303554";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#E94234";

    ctx.textAlign = "center";
    ctx.font = "600 150px NanumSquareRound";

    ctx.fillText("Merry Christmas", width / 2, height / 2);

    ctx.strokeStyle = "#4F7851";
    ctx.lineWidth = 2;
    ctx.strokeText("Merry Christmas", width / 2, height / 2);

    ctx.beginPath();

    particles.forEach((p) => {
      snow(p.x, p.y, p.r, 0);
    });

    update();
  };

  useEffect(() => {
    initCanvas();
  }, []);

  //   useEffect(() => {
  //     if (particles.length > 0) {
  //       draw();
  //     }
  //   }, [particles]);

  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  );
}

export default Introduce;
