import { useEffect, useRef, useState, useCallback } from "react";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Cell = { x: number; y: number };

const COLS = 15;
const ROWS = 12;
const INITIAL_SPEED = 180;
const NOTES_TO_COLLECT = 5;

// Simpler maze - just a few small obstacles
const MAZE_WALLS: Cell[] = [
  ...Array.from({ length: 3 }, (_, i) => ({ x: 4 + i, y: 3 })),
  ...Array.from({ length: 3 }, (_, i) => ({ x: 9 + i, y: 8 })),
  { x: 7, y: 5 }, { x: 7, y: 6 },
];

interface SnakeMazeGameProps {
  onWin: (timeSeconds: number) => void;
}

const SnakeMazeGame = ({ onWin }: SnakeMazeGameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [snake, setSnake] = useState<Cell[]>([{ x: 1, y: 1 }]);
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [notes, setNotes] = useState<Cell[]>([]);
  const [collected, setCollected] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [cellSize, setCellSize] = useState(20);
  const dirRef = useRef<Direction>("RIGHT");
  const gameLoopRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);

  // Responsive cell size
  useEffect(() => {
    const updateSize = () => {
      const maxW = Math.min(window.innerWidth - 40, 400);
      setCellSize(Math.floor(maxW / COLS));
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const isWall = useCallback((x: number, y: number) => {
    return MAZE_WALLS.some((w) => w.x === x && w.y === y);
  }, []);

  const spawnNotes = useCallback(() => {
    const newNotes: Cell[] = [];
    while (newNotes.length < NOTES_TO_COLLECT) {
      const x = Math.floor(Math.random() * COLS);
      const y = Math.floor(Math.random() * ROWS);
      if (!isWall(x, y) && !(x <= 2 && y <= 2) && !newNotes.some((n) => n.x === x && n.y === y)) {
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

  const changeDir = useCallback((newDir: Direction) => {
    if (!gameStarted && !gameOver) startGame();
    const opposites: Record<Direction, Direction> = { UP: "DOWN", DOWN: "UP", LEFT: "RIGHT", RIGHT: "LEFT" };
    if (dirRef.current !== opposites[newDir]) {
      dirRef.current = newDir;
      setDirection(newDir);
    }
  }, [gameStarted, gameOver, startGame]);

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

        if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS || isWall(head.x, head.y)) {
          setGameOver(true);
          if (timerRef.current) clearInterval(timerRef.current);
          return prev;
        }
        if (prev.some((s) => s.x === head.x && s.y === head.y)) {
          setGameOver(true);
          if (timerRef.current) clearInterval(timerRef.current);
          return prev;
        }

        const newSnake = [head, ...prev];
        setNotes((prevNotes) => {
          const idx = prevNotes.findIndex((n) => n.x === head.x && n.y === head.y);
          if (idx !== -1) {
            setCollected((c) => {
              const newC = c + 1;
              if (newC >= NOTES_TO_COLLECT) {
                setGameOver(true);
                if (timerRef.current) clearInterval(timerRef.current);
                setTimer((t) => { onWin(Math.round(t * 10) / 10); return t; });
              }
              return newC;
            });
            return prevNotes.filter((_, i) => i !== idx);
          }
          newSnake.pop();
          return prevNotes;
        });
        return newSnake;
      });
    }, INITIAL_SPEED);
    return () => { if (gameLoopRef.current) clearInterval(gameLoopRef.current); };
  }, [gameStarted, gameOver, isWall, onWin]);

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const map: Record<string, Direction> = {
        ArrowUp: "UP", w: "UP", ArrowDown: "DOWN", s: "DOWN",
        ArrowLeft: "LEFT", a: "LEFT", ArrowRight: "RIGHT", d: "RIGHT",
      };
      const dir = map[e.key];
      if (dir) { changeDir(dir); e.preventDefault(); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [changeDir]);

  // Swipe support
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startX = 0, startY = 0;
    const onStart = (e: TouchEvent) => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;
      if (Math.abs(dx) > Math.abs(dy)) changeDir(dx > 0 ? "RIGHT" : "LEFT");
      else changeDir(dy > 0 ? "DOWN" : "UP");
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => { el.removeEventListener("touchstart", onStart); el.removeEventListener("touchend", onEnd); };
  }, [changeDir]);

  // Draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = COLS * cellSize;
    const h = ROWS * cellSize;
    canvas.width = w;
    canvas.height = h;

    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = "#1a1a2e";
    ctx.lineWidth = 0.5;
    for (let x = 0; x < COLS; x++) for (let y = 0; y < ROWS; y++) ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);

    MAZE_WALLS.forEach((wall) => {
      ctx.fillStyle = "#4a1942";
      ctx.fillRect(wall.x * cellSize, wall.y * cellSize, cellSize, cellSize);
      ctx.strokeStyle = "#8b2252";
      ctx.lineWidth = 1;
      ctx.strokeRect(wall.x * cellSize, wall.y * cellSize, cellSize, cellSize);
    });

    notes.forEach((note) => {
      ctx.fillStyle = "#ffd700";
      ctx.font = `${cellSize - 4}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("♪", note.x * cellSize + cellSize / 2, note.y * cellSize + cellSize / 2);
    });

    snake.forEach((seg, i) => {
      const isHead = i === 0;
      ctx.fillStyle = isHead ? "#ff4488" : "#cc3366";
      ctx.fillRect(seg.x * cellSize + 1, seg.y * cellSize + 1, cellSize - 2, cellSize - 2);
      if (isHead) {
        ctx.shadowColor = "#ff4488";
        ctx.shadowBlur = 8;
        ctx.fillRect(seg.x * cellSize + 1, seg.y * cellSize + 1, cellSize - 2, cellSize - 2);
        ctx.shadowBlur = 0;
      }
    });

    if (!gameStarted && !gameOver) {
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#ff4488";
      ctx.font = `bold ${Math.max(12, cellSize * 0.7)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("Tap or press arrow keys", w / 2, h / 2 - 8);
      ctx.fillText("to start!", w / 2, h / 2 + 16);
    }

    if (gameOver && collected < NOTES_TO_COLLECT) {
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#ff4444";
      ctx.font = `bold ${Math.max(14, cellSize * 0.8)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", w / 2, h / 2 - 8);
      ctx.fillStyle = "#aaa";
      ctx.font = `${Math.max(10, cellSize * 0.5)}px monospace`;
      ctx.fillText("Tap 'Try Again' below", w / 2, h / 2 + 16);
    }
  }, [snake, notes, gameOver, gameStarted, collected, direction, cellSize]);

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-2 touch-none select-none">
      <div className="flex justify-between w-full text-xs font-mono px-1">
        <span className="text-maroon-bright">♪ {collected}/{NOTES_TO_COLLECT}</span>
        <span className="text-muted-foreground">⏱ {timer.toFixed(1)}s</span>
      </div>
      <canvas
        ref={canvasRef}
        className="border border-maroon-bright/50 rounded"
        style={{ width: COLS * cellSize, height: ROWS * cellSize }}
      />
      {/* D-pad controls - always visible on touch devices */}
      <div className="grid grid-cols-3 gap-1.5 sm:hidden mt-1">
        <div />
        <button onTouchStart={(e) => { e.preventDefault(); changeDir("UP"); }} className="bg-secondary text-foreground rounded-lg p-3 text-xl font-bold active:bg-maroon-bright select-none">▲</button>
        <div />
        <button onTouchStart={(e) => { e.preventDefault(); changeDir("LEFT"); }} className="bg-secondary text-foreground rounded-lg p-3 text-xl font-bold active:bg-maroon-bright select-none">◄</button>
        <button onTouchStart={(e) => { e.preventDefault(); changeDir("DOWN"); }} className="bg-secondary text-foreground rounded-lg p-3 text-xl font-bold active:bg-maroon-bright select-none">▼</button>
        <button onTouchStart={(e) => { e.preventDefault(); changeDir("RIGHT"); }} className="bg-secondary text-foreground rounded-lg p-3 text-xl font-bold active:bg-maroon-bright select-none">►</button>
      </div>
      {gameOver && collected < NOTES_TO_COLLECT && (
        <button onClick={resetGame} className="bg-maroon-bright text-foreground px-4 py-2 rounded font-mono text-sm hover:bg-maroon-neon transition-colors">
          Try Again
        </button>
      )}
    </div>
  );
};

export default SnakeMazeGame;
