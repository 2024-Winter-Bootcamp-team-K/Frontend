import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const GamePage2: React.FC = () => {
  const [missiles, setMissiles] = useState<{ x: number; y: number; angle: number }[]>([]);
  const [enemies, setEnemies] = useState<{ x: number; y: number; speed: number }[]>([]);
  const [score, setScore] = useState(0);
  const [enemySpeed, setEnemySpeed] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const playerPosition = { x: 400, y: 300 }; // 플레이어는 화면 중앙에 고정

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (gameAreaRef.current && !gameOver) {
        const rect = gameAreaRef.current.getBoundingClientRect();
        const angle = Math.atan2(
          e.clientY - rect.top - playerPosition.y,
          e.clientX - rect.left - playerPosition.x
        );
        setMissiles((prev) => [
          ...prev,
          { x: playerPosition.x, y: playerPosition.y, angle },
        ]);
      }
    };

    const gameArea = gameAreaRef.current;
    if (gameArea) {
      gameArea.addEventListener('click', handleClick);
    }

    return () => {
      if (gameArea) {
        gameArea.removeEventListener('click', handleClick);
      }
    };
  }, [gameOver, playerPosition.x, playerPosition.y]); // 종속성 배열에 playerPosition.x와 playerPosition.y 추가

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        setEnemies((prev) => [
          ...prev,
          {
            x: Math.random() * 800,
            y: Math.random() * 600,
            speed: enemySpeed,
          },
        ]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [enemySpeed, gameOver]);

  useEffect(() => {
    const moveMissiles = () => {
      setMissiles((prev) =>
        prev.map((missile) => ({
          ...missile,
          x: missile.x + Math.cos(missile.angle) * 5,
          y: missile.y + Math.sin(missile.angle) * 5,
        }))
      );
    };

    const moveEnemies = () => {
      setEnemies((prev) =>
        prev.map((enemy) => ({
          ...enemy,
          x: enemy.x + (playerPosition.x - enemy.x) * 0.01 * enemy.speed,
          y: enemy.y + (playerPosition.y - enemy.y) * 0.01 * enemy.speed,
        }))
      );
    };

    const checkCollisions = () => {
      // 미사일과 적 충돌 검사
      setMissiles((prevMissiles) =>
        prevMissiles.filter((missile) => {
          const hit = enemies.some(
            (enemy) =>
              Math.sqrt((missile.x - enemy.x) ** 2 + (missile.y - enemy.y) ** 2) < 20
          );
          if (hit) {
            setScore((prevScore) => prevScore + 1);
            setEnemySpeed((prevSpeed) => prevSpeed + 0.1); // 적을 죽일 때마다 속도 증가
          }
          return !hit;
        })
      );

      // 적과 플레이어 충돌 검사
      const isGameOver = enemies.some(
        (enemy) =>
          Math.sqrt((playerPosition.x - enemy.x) ** 2 + (playerPosition.y - enemy.y) ** 2) < 20
      );

      if (isGameOver) {
        setGameOver(true);
      }

      // 적과 미사일 충돌 시 적 제거
      setEnemies((prevEnemies) =>
        prevEnemies.filter(
          (enemy) =>
            !missiles.some(
              (missile) =>
                Math.sqrt((missile.x - enemy.x) ** 2 + (missile.y - enemy.y) ** 2) < 20
            )
        )
      );
    };

    const gameLoop = setInterval(() => {
      if (!gameOver) {
        moveMissiles();
        moveEnemies();
        checkCollisions();
      }
    }, 16);

    return () => clearInterval(gameLoop);
  }, [enemies, missiles, score, enemySpeed, gameOver]);

  return (
    <GameArea ref={gameAreaRef}>
      <Player style={{ left: playerPosition.x, top: playerPosition.y }} />
      {missiles.map((missile, index) => (
        <Missile key={index} style={{ left: missile.x, top: missile.y }} />
      ))}
      {enemies.map((enemy, index) => (
        <Enemy key={index} style={{ left: enemy.x, top: enemy.y }} />
      ))}
      <Score>Score: {score}</Score>
      {gameOver && <GameOverText>Game Over</GameOverText>}
    </GameArea>
  );
};

const GameArea = styled.div`
  position: relative;
  width: 800px;
  height: 600px;
  background-color: black;
  overflow: hidden;
`;

const Player = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: blue;
  border-radius: 50%;
  transform: translate(-50%, -50%);
`;

const Missile = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  transform: translate(-50%, -50%);
`;

const Enemy = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: green;
  border-radius: 50%;
  transform: translate(-50%, -50%);
`;

const Score = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
  font-size: 20px;
`;

const GameOverText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 40px;
  font-weight: bold;
`;

export default GamePage2;