import React from 'react';
import { Position, FoodItem } from './LlamaGame';

interface GameAreaProps {
  llamaPosition: Position;
  foodItems: FoodItem[];
  gameWidth: number;
  gameHeight: number;
  llamaSize: number;
  foodSize: number;
}

export const GameArea: React.FC<GameAreaProps> = ({
  llamaPosition,
  foodItems,
  gameWidth,
  gameHeight,
  llamaSize,
  foodSize,
}) => {
  return (
    <div 
      className="relative border-4 border-border rounded-3xl overflow-hidden shadow-cute bg-game-bg"
      style={{ width: gameWidth, height: gameHeight }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        {/* Cute background pattern */}
        <div className="absolute top-4 left-4 w-3 h-3 bg-llama-accent rounded-full opacity-30"></div>
        <div className="absolute top-8 right-8 w-2 h-2 bg-score-highlight rounded-full opacity-40"></div>
        <div className="absolute bottom-6 left-12 w-4 h-4 bg-secondary rounded-full opacity-25"></div>
        <div className="absolute bottom-12 right-6 w-3 h-3 bg-llama-accent rounded-full opacity-30"></div>
      </div>

      {/* Llama */}
      <div
        className="absolute transition-all duration-75 ease-out"
        style={{
          left: llamaPosition.x,
          top: llamaPosition.y,
          width: llamaSize,
          height: llamaSize,
        }}
      >
        <div className="w-full h-full bg-llama-body rounded-full shadow-soft border-4 border-llama-accent flex items-center justify-center text-2xl animate-bounce-cute">
          🦙
        </div>
      </div>

      {/* Food Items */}
      {foodItems.map((food) => (
        <div
          key={food.id}
          className="absolute transition-all duration-300 ease-out animate-pulse-glow"
          style={{
            left: food.position.x,
            top: food.position.y,
            width: foodSize,
            height: foodSize,
          }}
        >
          <div className={`w-full h-full rounded-full shadow-soft flex items-center justify-center text-lg ${
            food.type === 'grass' 
              ? 'bg-food-grass border-2 border-green-400' 
              : 'bg-food-grain border-2 border-yellow-400'
          }`}>
            {food.type === 'grass' ? '🌱' : '🌾'}
          </div>
        </div>
      ))}

      {/* Game boundaries indicator */}
      <div className="absolute inset-2 border-2 border-dashed border-border opacity-20 rounded-2xl pointer-events-none"></div>
    </div>
  );
};