import { useState, useEffect } from "react";
import { X, Trophy, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import SnakeMazeGame from "./SnakeMazeGame";

interface LeaderboardEntry {
  player_name: string;
  time_seconds: number;
}

const GamePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [winTime, setWinTime] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    // Show popup after a short delay
    const timer = setTimeout(() => setIsOpen(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    const { data } = await supabase
      .from("game_scores")
      .select("player_name, time_seconds")
      .order("time_seconds", { ascending: true })
      .limit(10);
    if (data) setLeaderboard(data);
  };

  const handleWin = (timeSeconds: number) => {
    setHasWon(true);
    setWinTime(timeSeconds);
  };

  const handleSubmitScore = async () => {
    if (!playerName.trim()) return;
    await supabase.from("game_scores").insert({
      player_name: playerName.trim().slice(0, 20),
      time_seconds: winTime,
    });
    setSubmitted(true);
    fetchLeaderboard();
    setShowLeaderboard(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-card border border-maroon-bright/50 rounded-xl shadow-[0_0_40px_hsl(348,78%,45%,0.3)] max-w-md w-[95vw] max-h-[90vh] overflow-y-auto p-6">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {!showGame && !hasWon && (
          <div className="text-center space-y-5">
            <Gamepad2 className="h-16 w-16 mx-auto text-maroon-bright animate-bounce" />
            <h2 className="font-display text-2xl font-bold text-gradient-maroon">
              🎵 Want a Clue?
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We've got a <span className="text-maroon-bright font-semibold">new song</span> dropping soon! 
              Want to know the name? Play our retro 8-bit game — collect all the musical notes 
              in the maze and we'll give you the <span className="text-maroon-bright font-semibold">secret clue!</span>
            </p>
            <div className="space-y-3 pt-2">
              <Button
                onClick={() => setShowGame(true)}
                className="w-full bg-gradient-to-r from-maroon-bright to-maroon-neon hover:from-maroon-neon hover:to-maroon-bright text-foreground font-bold text-lg py-5 shadow-[0_0_20px_hsl(348,78%,45%,0.4)]"
              >
                <Gamepad2 className="mr-2 h-5 w-5" />
                Play the Game!
              </Button>
              <button
                onClick={() => {
                  setShowLeaderboard(true);
                  setShowGame(true);
                  fetchLeaderboard();
                }}
                className="text-xs text-muted-foreground hover:text-maroon-bright transition-colors"
              >
                <Trophy className="inline h-3 w-3 mr-1" />
                View Leaderboard
              </button>
            </div>
          </div>
        )}

        {showGame && !hasWon && !showLeaderboard && (
          <div className="space-y-3">
            <h3 className="font-display text-lg font-bold text-gradient-maroon text-center">
              Collect all ♪ notes!
            </h3>
            <p className="text-xs text-muted-foreground text-center">
              Use arrow keys or WASD. Avoid walls & yourself!
            </p>
            <SnakeMazeGame onWin={handleWin} />
            <button
              onClick={() => { setShowLeaderboard(true); }}
              className="text-xs text-muted-foreground hover:text-maroon-bright transition-colors block mx-auto"
            >
              <Trophy className="inline h-3 w-3 mr-1" />
              Leaderboard
            </button>
          </div>
        )}

        {showGame && showLeaderboard && !hasWon && (
          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold text-gradient-maroon text-center flex items-center justify-center gap-2">
              <Trophy className="h-5 w-5 text-maroon-bright" />
              Top 10 Leaderboard
            </h3>
            {leaderboard.length === 0 ? (
              <p className="text-center text-muted-foreground text-sm">No scores yet. Be the first!</p>
            ) : (
              <div className="space-y-1">
                {leaderboard.map((entry, i) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center px-3 py-2 rounded text-sm font-mono ${
                      i === 0 ? "bg-maroon-bright/20 text-maroon-bright font-bold" : "bg-secondary/50 text-foreground"
                    }`}
                  >
                    <span>
                      {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}{" "}
                      {entry.player_name}
                    </span>
                    <span>{entry.time_seconds}s</span>
                  </div>
                ))}
              </div>
            )}
            <Button
              onClick={() => setShowLeaderboard(false)}
              variant="outline"
              className="w-full border-maroon-bright/50 text-maroon-bright hover:bg-maroon-bright hover:text-foreground"
            >
              Back to Game
            </Button>
          </div>
        )}

        {hasWon && !submitted && (
          <div className="text-center space-y-5">
            <div className="text-5xl animate-bounce">🎉</div>
            <h2 className="font-display text-2xl font-bold text-gradient-maroon">
              YOU WON!
            </h2>
            <p className="text-muted-foreground text-sm">
              Time: <span className="text-maroon-bright font-bold">{winTime}s</span>
            </p>
            <div className="bg-secondary/50 border border-maroon-bright/30 rounded-lg p-4 space-y-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">🔑 Your Clue</p>
              <p className="font-display text-3xl font-bold text-maroon-bright tracking-widest">
                ARCADE
              </p>
              <p className="text-xs text-muted-foreground italic">
                Can you guess the song name? 🤔
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Enter your name for the leaderboard:</p>
              <Input
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Your name"
                maxLength={20}
                className="text-center border-maroon-bright/50 bg-secondary/30"
                onKeyDown={(e) => e.key === "Enter" && handleSubmitScore()}
              />
              <Button
                onClick={handleSubmitScore}
                disabled={!playerName.trim()}
                className="w-full bg-gradient-to-r from-maroon-bright to-maroon-neon hover:from-maroon-neon hover:to-maroon-bright text-foreground font-bold"
              >
                <Trophy className="mr-2 h-4 w-4" />
                Submit Score
              </Button>
            </div>
          </div>
        )}

        {hasWon && submitted && (
          <div className="text-center space-y-5">
            <Trophy className="h-12 w-12 mx-auto text-maroon-bright" />
            <h2 className="font-display text-xl font-bold text-gradient-maroon">
              Score Submitted!
            </h2>
            <div className="space-y-1">
              {leaderboard.map((entry, i) => (
                <div
                  key={i}
                  className={`flex justify-between items-center px-3 py-2 rounded text-sm font-mono ${
                    entry.player_name === playerName.trim() && entry.time_seconds === winTime
                      ? "bg-maroon-bright/20 text-maroon-bright font-bold border border-maroon-bright/50"
                      : i === 0 ? "bg-maroon-bright/10 text-maroon-bright" : "bg-secondary/50 text-foreground"
                  }`}
                >
                  <span>
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}{" "}
                    {entry.player_name}
                  </span>
                  <span>{entry.time_seconds}s</span>
                </div>
              ))}
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="outline"
              className="w-full border-maroon-bright/50 text-maroon-bright hover:bg-maroon-bright hover:text-foreground"
            >
              Close & Explore
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePopup;
