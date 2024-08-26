import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Snake = () => {

    const navigate = useNavigate();
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
    const [direction, setDirection] = useState("RIGHT");
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const moveSnake = () => {
        if (gameOver || isPaused) return;

        const newSnake = [...snake];
        const head = { ...newSnake[0] };

        switch (direction) {
            case "RIGHT":
                head.x += 1;
                break;
            case "LEFT":
                head.x -= 1;
                break;
            case "UP":
                head.y -= 1;
                break;
            case "DOWN":
                head.y += 1;
                break;
            default:
                break;
        }

        newSnake.unshift(head);

        // Check if snake eats food
        if (head.x === food.x && head.y === food.y) {
            setFood({
                x: Math.floor(Math.random() * 20),
                y: Math.floor(Math.random() * 20),
            });
            setScore(score + 1); // Update the score
        } else {
            newSnake.pop();
        }

        // Check collision with walls or itself
        if (
            head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 ||
            newSnake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
        ) {
            setGameOver(true);
        } else {
            setSnake(newSnake);
        }
    };

    const changeDirection = (e) => {
        switch (e.key) {
            case "ArrowUp":
                if (direction !== "DOWN") setDirection("UP");
                break;
            case "ArrowDown":
                if (direction !== "UP") setDirection("DOWN");
                break;
            case "ArrowLeft":
                if (direction !== "RIGHT") setDirection("LEFT");
                break;
            case "ArrowRight":
                if (direction !== "LEFT") setDirection("RIGHT");
                break;
            default:
                break;
        }
    };

    const pauseGame = () => {
        setIsPaused(!isPaused);
    };

    const game = () => {
        if (gameOver) {
            window.location.reload();
        } else {
            pauseGame();
        }
    };

    const gameDashboard = () => {
        navigate('/play-games');
    }

    useEffect(() => {
        const gameInterval = setInterval(moveSnake, 200);

        if (isPaused) {
            clearInterval(gameInterval);
        }

        document.addEventListener("keydown", changeDirection);
        return () => {
            clearInterval(gameInterval);
            document.removeEventListener("keydown", changeDirection);
        };
    }, [snake, direction, gameOver, isPaused]);

    return (
        <div className="page flexcol g10 center wh">

            <div className="text">Score: {score}</div>
            <button onClick={gameDashboard}>Back</button>

            <div className="game-board">
                {gameOver && <div className="game-over">What a loooser</div>}
                {Array.from({ length: 20 }, (_, rowIndex) =>
                    <div key={rowIndex} className="row">
                        {Array.from({ length: 20 }, (_, colIndex) =>
                            <div key={colIndex}
                                className={`cell ${snake.some(segment => segment.x === colIndex && segment.y === rowIndex) ? "snake" : ""} ${food.x === colIndex && food.y === rowIndex ? "food" : ""}`}
                            />
                        )}
                    </div>
                )}
            </div>
            <button onClick={game}>{gameOver ? "Play Again" : isPaused ? "Resume" : "Pause"}</button>
        </div>
    );
};

export default Snake;
