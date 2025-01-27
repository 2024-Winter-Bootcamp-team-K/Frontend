import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import styled from "styled-components";

const GamePage1: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [missiles, setMissiles] = useState<{ x: number; y: number; angle: number }[]>([]);
  const [enemies, setEnemies] = useState<{ x: number; y: number; angle: number; speed: number }[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const enemySpeedRef = useRef(1);

  const playerPosition = useMemo(() => ({ x: 50, y: 50 }), []); // 플레이어 위치

  const laserSoundRef = useRef<HTMLAudioElement | null>(null);
  const bombSoundRef = useRef<HTMLAudioElement | null>(null);

  // 미사일 발사
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (gameAreaRef.current && !gameOver) {
        const rect = gameAreaRef.current.getBoundingClientRect();
        const angle = Math.atan2(
          e.clientY - rect.top - (rect.height * playerPosition.y) / 100,
          e.clientX - rect.left - (rect.width * playerPosition.x) / 100
        );

        setMissiles((prev) => [
          ...prev,
          {
            x: (rect.width * playerPosition.x) / 100, // 플레이어의 현재 x 위치
            y: (rect.height * playerPosition.y) / 100, // 플레이어의 현재 y 위치
            angle, // 발사 각도
          },
        ]);

        if (laserSoundRef.current) {
          laserSoundRef.current.currentTime = 0;
          laserSoundRef.current.play().catch((err) => console.error("Laser sound error:", err));
        }
      }
    },
    [gameOver, playerPosition]
  );

  useEffect(() => {
    const gameArea = gameAreaRef.current;
    if (gameArea) {
      gameArea.addEventListener("click", handleClick);
    }

    return () => {
      if (gameArea) {
        gameArea.removeEventListener("click", handleClick);
      }
    };
  }, [handleClick]);

  // 적 생성
  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        const spawnDistance = 20; // 플레이어와의 최소 거리
        let x, y;

        do {
          x = Math.random() * 100;
          y = Math.random() * 100;
        } while (Math.sqrt((x - playerPosition.x) ** 2 + (y - playerPosition.y) ** 2) < spawnDistance);

        const angle = Math.atan2(
          (playerPosition.y - y),
          (playerPosition.x - x)
        );

        setEnemies((prev) => [...prev, { x, y, angle, speed: enemySpeedRef.current }]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [gameOver, playerPosition]);

  const gameLoop = useCallback(() => {
    if (!gameAreaRef.current) return; // gameAreaRef가 없으면 중단
    if (gameOver) {
      cancelAnimationFrame(animationFrameRef.current!);
      return; // 게임 오버 시 루프 중단
    }

    // 미사일 이동
    setMissiles((prevMissiles) =>
      prevMissiles
        .map((missile) => ({
          ...missile,
          x: missile.x + Math.cos(missile.angle) * 5, // 속도 감소 (5로 설정)
          y: missile.y + Math.sin(missile.angle) * 5, // 속도 감소
        }))
        .filter(
          (missile) =>
            missile.x >= 0 &&
            missile.x <= gameAreaRef.current!.clientWidth &&
            missile.y >= 0 &&
            missile.y <= gameAreaRef.current!.clientHeight
        )
    );

    // 적 이동
    setEnemies((prevEnemies) =>
      prevEnemies.map((enemy) => ({
        ...enemy,
        x: enemy.x + (playerPosition.x - enemy.x) * 0.01 * enemy.speed,
        y: enemy.y + (playerPosition.y - enemy.y) * 0.01 * enemy.speed,
      }))
    );

    // 충돌 감지 및 적 제거
    setEnemies((prevEnemies) =>
      prevEnemies.filter((enemy) => {
        const isHit = missiles.some((missile) => {
          const distance = Math.sqrt(
            (missile.x - (enemy.x / 100) * gameAreaRef.current!.clientWidth) ** 2 +
              (missile.y - (enemy.y / 100) * gameAreaRef.current!.clientHeight) ** 2
          );
          return distance < 15; // 충돌 거리
        });

        if (isHit) {
          setScore((prevScore) => prevScore + 100); // 점수 증가
        }

        return !isHit; // 충돌한 적 제거
      })
    );

    // 게임 오버 조건 확인
    const isGameOver = enemies.some(
      (enemy) =>
        Math.sqrt(
          ((playerPosition.x / 100) * gameAreaRef.current!.clientWidth -
            (enemy.x / 100) * gameAreaRef.current!.clientWidth) **
            2 +
            ((playerPosition.y / 100) * gameAreaRef.current!.clientHeight -
              (enemy.y / 100) * gameAreaRef.current!.clientHeight) **
              2
        ) < 20
    );

    if (isGameOver) {
      setGameOver(true);
      if (bombSoundRef.current) {
        bombSoundRef.current.currentTime = 0;
        bombSoundRef.current.play().catch((err) => console.error("Bomb sound error:", err));
      }
    } else {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }
  }, [gameOver, enemies, missiles, playerPosition]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameLoop]);

  // 사운드 초기화
  useEffect(() => {
    laserSoundRef.current = new Audio("/sounds/laser.mp3");
    bombSoundRef.current = new Audio("/sounds/bomb.mp3");
  }, []);

  return (
    <PopupContainer
      onClick={() => {
        onClose(); // Always close the pop-up, even if the game is over
      }}
    >
      <GameArea
        ref={gameAreaRef}
        onClick={(e) => {
          e.stopPropagation(); // Prevent the click from closing the pop-up
        }}
      >
        <Player style={{ left: `${playerPosition.x}%`, top: `${playerPosition.y}%` }} />
        {missiles.map((missile, index) => (
          <img
            key={index}
            src="/images/flame.png" /* 픽셀아트 미사일 이미지 경로 */
            alt="Missile"
            style={{
              position: "absolute",
              width: "2%", /* 미사일의 너비 */
              height: "6%", /* 미사일의 높이 */
              left: `${(missile.x / gameAreaRef.current!.clientWidth) * 100}%`,
              top: `${(missile.y / gameAreaRef.current!.clientHeight) * 100}%`,
              transform: `translate(-50%, -50%) rotate(${((missile.angle * 180) / Math.PI +70) % 360}deg)`, /* 각도 적용 */
            }}
          />
        ))}

        {enemies.map((enemy, index) => (
          <img
            key={index}
            src="/images/meteor.png" /* 적 이미지 경로 */
            alt="Enemy"
            style={{
              position: "absolute",
              width: "4%", /* 적 크기 */
              height: "4%", /* 적 높이 */
              left: `${enemy.x}%`,
              top: `${enemy.y}%`,
              transform: `translate(-50%, -50%) rotate(${(((enemy.angle * 180) / Math.PI) + 80) % 360}deg)`, /* 각도 반대로 적용 */
            }}
          />
        ))}
        <Score>Score: {score}</Score>
        {gameOver && <GameOverText>Game Over</GameOverText>}
      </GameArea>
    </PopupContainer>
  );
};

// 스타일 컴포넌트
const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  cursor: pointer; /* Clickable area */
`;

const GameArea = styled.div`
  position: relative;
  width: 70vw;
  aspect-ratio: 16 / 9; /* 가로:세로 비율 유지 */
  background-image: url("/images/space.jpg"); /* 우주 배경 이미지 경로 */
  background-size: cover; /* 배경 이미지가 영역을 채우도록 설정 */
  background-repeat: no-repeat; /* 이미지 반복 방지 */
  background-position: center; /* 배경 이미지 중앙 정렬 */
  border: 2px solid white;
  cursor: default; /* 내부 클릭 시 이벤트 전파 방지 */
`;

const Player = styled.div`
  position: absolute;
  width: 5%; /* 플레이어의 너비 */
  height: 5%; /* 플레이어의 높이 */
  background-image: url("/images/robot.png"); /* 로봇 이미지 경로 */
  background-size: contain; /* 이미지 크기 조정 */
  background-repeat: no-repeat; /* 이미지 반복 방지 */
  background-position: center; /* 이미지 중앙 정렬 */
  transform: translate(-50%, -50%);
`;

const Score = styled.div`
  position: absolute;
  top: 1%;
  left: 1%;
  color: white;
  font-size: 2vh;
`;

const GameOverText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 4vh;
  font-weight: bold;
`;

export default GamePage1;
