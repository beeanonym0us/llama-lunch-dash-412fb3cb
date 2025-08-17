import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface GameUIProps {
  score: number;
  timeLeft: number;
  isPlaying: boolean;
  onStart: () => void;
  onPause: () => void;
}

export const GameUI: React.FC<GameUIProps> = ({
  score,
  timeLeft,
  isPlaying,
  onStart,
  onPause,
}) => {
  return (
    <div className="flex items-center gap-6 mb-8">
      {/* Score Display */}
      <Card className="px-6 py-4 bg-card border-border shadow-soft">
        <div className="text-center">
          <div className="text-2xl font-bold text-score-highlight mb-1">
            {score}
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            Points
          </div>
        </div>
      </Card>

      {/* Timer Display */}
      <Card className="px-6 py-4 bg-card border-border shadow-soft">
        <div className="text-center">
          <div className={`text-2xl font-bold mb-1 transition-colors duration-200 ${
            timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-primary'
          }`}>
            {timeLeft}s
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            Time Left
          </div>
        </div>
      </Card>

      {/* Game Controls */}
      <div className="flex gap-3">
        {!isPlaying ? (
          <Button 
            onClick={onStart}
            size="lg"
            disabled={timeLeft === 0 && !isPlaying}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-soft font-semibold px-8 py-3 rounded-2xl transition-all duration-200 hover:scale-105 disabled:opacity-50"
          >
            {timeLeft === 0 ? '🔄 New Game' : '🎮 Start Game'}
          </Button>
        ) : (
          <Button 
            onClick={onPause}
            variant="outline"
            size="lg"
            className="border-border hover:bg-muted shadow-soft font-semibold px-8 py-3 rounded-2xl transition-all duration-200"
          >
            ⏸️ Pause
          </Button>
        )}
      </div>
    </div>
  );
};