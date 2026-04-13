import { useEffect, useRef, useState, useCallback } from "react";

const CELL_SIZE = 20;
const COLS = 20;
const ROWS = 15;
const INITIAL_SPEED = 150;

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Cell = { x: number; y: number };

// Simple maze walls
const MAZE_WALLS: Cell[] = [
  // Top horizontal bar
  ...Array.from({ length: 6 }, (_, i) => ({ x: 3 + i, y: 3 })),
  // Bottom horizontal bar
  ...Array.from({ length: 6 }, (_, i) => ({ x: 11 + i, y: 11 })),
  // Left vertical bar
  ...Array.from({ length: 5 }, (_, i) => ({ x: 5, y: 6 + i })),
  // Right vertical bar
  ...Array.from({ length: 5 }, (_, i) => ({ x: 14, y: 3 + i })),
  // Center block
  { x: 9, y: 7 }, { x: 10, y: 7 }, { x: 9, y: 8 }, { x: 10, y: 8 },
];

const NOTES_TO_COLLECT = 8;

interface SnakeMazeGameProps {
  onWin: (timeSeconds: number) => void;
}

const SnakeMazeGame = ({ onWin }: SnakeMazeGameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Cell[]>([{ x: 1, y: 1 }]);
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [notes, setNotes] = useState<Cell[]>([]);
  const [collected, setCollected] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const dirRef = useRef<Direction>("RIGHT");
  const gameLoopRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);

  const isWall = useCallback((x: number, y: number) => {
    return MAZE_WALLS.some((w) => w.x === x && w.y === y);
  }, []);

  const spawnNotes = useCallback(() => {
    const newNotes: Cell[] = [];
    while (newNotes.length < NOTES_TO_COLLECT) {
      const x = Math.floor(Math.random() * COLS);
      const y = Math.floor(Math.random() * ROWS);
      if (
        !isWall(x, y) &&
        !(x === 1 && y === 1) &&
        !newNotes.some((n) => n.x === x && n.y === y)
      ) {
        newNotes.push({ x, y });
      }
    }
    return newNotes;
  }, [isWall]);

  const resetGame = useCallback(() => {
    setSnake([{ x: 1, y: 1 }]);
    setDirection("RIGHT");
    dirRef.current = "RIGHT";
    setNotes(spawnNotes());
    setCollected(0);
    setGameOver(false);
    setTimer(0);
    setGameStarted(false);
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [spawnNotes]);

  useEffect(() => {
    setNotes(spawnNotes());
  }, [spawnNotes]);

  const startGame = useCallback(() => {
    if (gameStarted) return;
    setGameStarted(true);
    timerRef.current = window.setInterval(() => {
      setTimer((t) => t + 0.1);
    }, 100);
  }, [gameStarted]);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    gameLoopRef.current = window.setInterval(() => {
      setSnake((prev) => {
        const head = { ...prev[0] };
        const dir = dirRef.current;
        if (dir === "UP") head.y -= 1;
        if (dir === "DOWN") head.y += 1;
        if (dir === "LEFT") head.x -= 1;
        if (dir === "RIGHT") head.x += 1;

        // Wall collision or boundary
        if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS || isWall(head.x, head.y)) {
          setGameOver(true);
          if (timerRef.current) clearInterval(timerRef.current);
          return prev;
        }

        // Self collision
        if (prev.some((s) => s.x === head.x && s.y === head.y)) {
          setGameOver(true);
          if (timerRef.current) clearInterval(timerRef.current);
          return prev;
        }

        const newSnake = [head, ...prev];

        // Check note collection
        setNotes((prevNotes) => {
          const idx = prevNotes.findIndex((n) => n.x === head.x && n.y === head.y);
          if (idx !== -1) {
            setCollected((c) => {
              const newC = c + 1;
              if (newC >= NOTES_TO_COLLECT) {
                setGameOver(true);
                if (timerRef.current) clearInterval(timerRef.current);
                setTimer((t) => {
                  onWin(Math.round(t * 10) / 10);
                  return t;
                });
              }
              return newC;
            });
            return prevNotes.filter((_, i) => i !== idx);
          }
          // Remove tail if no note collected
          newSnake.pop();
          return prevNotes;
        });

        return newSnake;
      });
    }, INITIAL_SPEED);

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameStarted, gameOver, isWall, onWin]);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!gameStarted && !gameOver) startGame();
      const key = e.key;
      if ((key === "ArrowUp" || key === "w") && dirRef.current !== "DOWN") {
        dirRef.current = "UP";
        setDirection("UP");
      }
      if ((key === "ArrowDown" || key === "s") && dirRef.current !== "UP") {
        dirRef.current = "DOWN";
        setDirection("DOWN");
      }
      if ((key === "ArrowLeft" || key === "a") && dirRef.current !== "RIGHT") {
        dirRef.current = "LEFT";
        setDirection("LEFT");
      }
      if ((key === "ArrowRight" || key === "d") && dirRef.current !== "LEFT") {
        dirRef.current = "RIGHT";
        setDirection("RIGHT");
      }
      e.preventDefault();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameStarted, gameOver, startGame]);

  // Draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = COLS * CELL_SIZE;
    const h = ROWS * CELL_SIZE;

    // Background
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = "#1a1a2e";
    ctx.lineWidth = 0.5;
    for (let x = 0; x < COLS; x++) {
      for (let y = 0; y < ROWS; y++) {
        ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }

    // Walls
    MAZE_WALLS.forEach((wall) => {
      ctx.fillStyle = "#4a1942";
      ctx.fillRect(wall.x * CELL_SIZE, wall.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      ctx.strokeStyle = "#8b2252";
      ctx.lineWidth = 1;
      ctx.strokeRect(wall.x * CELL_SIZE, wall.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    });

    // Notes (musical notes as collectibles)
    notes.forEach((note) => {
      ctx.fillStyle = "#ffd700";
      ctx.font = `${CELL_SIZE - 4}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("♪", note.x * CELL_SIZE + CELL_SIZE / 2, note.y * CELL_SIZE + CELL_SIZE / 2);
    });

    // Snake
    snake.forEach((seg, i) => {
      const isHead = i === 0;
      ctx.fillStyle = isHead ? "#ff4488" : "#cc3366";
      ctx.fillRect(
        seg.x * CELL_SIZE + 1,
        seg.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );
      if (isHead) {
        ctx.shadowColor = "#ff4488";
        ctx.shadowBlur = 8;
        ctx.fillRect(
          seg.x * CELL_SIZE + 1,
          seg.y * CELL_SIZE + 1,
          CELL_SIZE - 2,
          CELL_SIZE - 2
        );
        ctx.shadowBlur = 0;
      }
    });

    // Start overlay
    if (!gameStarted && !gameOver) {
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#ff4488";
      ctx.font = "bold 16px 'Press Start 2P', monospace";
      ctx.textAlign = "center";
      ctx.fillText("Press any arrow key", w / 2, h / 2 - 10);
      ctx.fillText("to start!", w / 2, h / 2 + 15);
    }

    // Game over overlay
    if (gameOver && collected < NOTES_TO_COLLECT) {
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#ff4444";
      ctx.font = "bold 18px 'Press Start 2P', monospace";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", w / 2, h / 2 - 10);
      ctx.fillStyle = "#aaa";
      ctx.font = "12px monospace";
      ctx.fillText("Click 'Try Again' below", w / 2, h / 2 + 20);
    }
  }, [snake, notes, gameOver, gameStarted, collected, direction]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex justify-between w-full text-xs font-mono px-1">
        <span className="text-maroon-bright">♪ {collected}/{NOTES_TO_COLLECT}</span>
        <span className="text-muted-foreground">⏱ {timer.toFixed(1)}s</span>
      </div>
      <canvas
        ref={canvasRef}
        width={COLS * CELL_SIZE}
        height={ROWS * CELL_SIZE}
        className="border border-maroon-bright/50 rounded"
      />
      {/* Mobile controls */}
      <div className="grid grid-cols-3 gap-1 md:hidden">
        <div />
        <button
          onClick={() => { if (!gameStarted) startGame(); if (dirRef.current !== "DOWN") { dirRef.current = "UP"; setDirection("UP"); } }}
          className="bg-secondary text-foreground rounded p-2 text-lg font-bold active:bg-maroon-bright"
        >▲</button>
        <div />
        <button
          onClick={() => { if (!gameStarted) startGame(); if (dirRef.current !== "RIGHT") { dirRef.current = "LEFT"; setDirection("LEFT"); } }}
          className="bg-secondary text-foreground rounded p-2 text-lg font-bold active:bg-maroon-bright"
        >◄</button>
        <button
          onClick={() => { if (!gameStarted) startGame(); if (dirRef.current !== "UP") { dirRef.current = "DOWN"; setDirection("DOWN"); } }}
          className="bg-secondary text-foreground rounded p-2 text-lg font-bold active:bg-maroon-bright"
        >▼</button>
        <button
          onClick={() => { if (!gameStarted) startGame(); if (dirRef.current !== "LEFT") { dirRef.current = "RIGHT"; setDirection("RIGHT"); } }}
          className="bg-secondary text-foreground rounded p-2 text-lg font-bold active:bg-maroon-bright"
        >►</button>
      </div>
      {gameOver && collected < NOTES_TO_COLLECT && (
        <button
          onClick={resetGame}
          className="bg-maroon-bright text-foreground px-4 py-2 rounded font-mono text-sm hover:bg-maroon-neon transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default SnakeMazeGame;
