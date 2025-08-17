import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface GameUIProps {
  score: number;
  isPlaying: boolean;
  onStart: () => void;
  onPause: () => void;
}

export const GameUI: React.FC<GameUIProps> = ({
  score,
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

      {/* Game Controls */}
      <div className="flex gap-3">
        {!isPlaying ? (
          <Button 
            onClick={onStart}
            size="lg"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-soft font-semibold px-8 py-3 rounded-2xl transition-all duration-200 hover:scale-105"
          >
            🎮 Start Game
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

      {/* Status Indicator */}
      {isPlaying && (
        <Card className="px-4 py-2 bg-green-50 border-green-200 shadow-soft">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">Playing</span>
          </div>
        </Card>
      )}
    </div>
  );
};