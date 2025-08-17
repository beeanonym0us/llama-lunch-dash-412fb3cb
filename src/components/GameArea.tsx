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
        {/* Sun */}
        <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full shadow-lg opacity-80">
          <div className="absolute inset-0 flex items-center justify-center text-yellow-100 text-lg">☀️</div>
          {/* Sun rays */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-yellow-400 rounded-full opacity-60"></div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-yellow-400 rounded-full opacity-60"></div>
          <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-3 h-0.5 bg-yellow-400 rounded-full opacity-60"></div>
          <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-3 h-0.5 bg-yellow-400 rounded-full opacity-60"></div>
          <div className="absolute -top-1 -left-1 w-2 h-0.5 bg-yellow-400 rounded-full opacity-50 transform rotate-45"></div>
          <div className="absolute -top-1 -right-1 w-2 h-0.5 bg-yellow-400 rounded-full opacity-50 transform -rotate-45"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-0.5 bg-yellow-400 rounded-full opacity-50 transform -rotate-45"></div>
          <div className="absolute -bottom-1 -right-1 w-2 h-0.5 bg-yellow-400 rounded-full opacity-50 transform rotate-45"></div>
        </div>

        {/* Clouds */}
        <div className="absolute top-6 left-8 flex items-center opacity-60">
          <div className="w-8 h-6 bg-white rounded-full"></div>
          <div className="w-10 h-8 bg-white rounded-full -ml-3"></div>
          <div className="w-6 h-5 bg-white rounded-full -ml-2"></div>
        </div>
        <div className="absolute top-12 left-32 flex items-center opacity-50">
          <div className="w-6 h-4 bg-white rounded-full"></div>
          <div className="w-8 h-6 bg-white rounded-full -ml-2"></div>
          <div className="w-5 h-4 bg-white rounded-full -ml-1"></div>
        </div>
        <div className="absolute top-8 right-24 flex items-center opacity-55">
          <div className="w-7 h-5 bg-white rounded-full"></div>
          <div className="w-9 h-7 bg-white rounded-full -ml-3"></div>
          <div className="w-6 h-5 bg-white rounded-full -ml-2"></div>
        </div>
        <div className="absolute top-16 right-8 flex items-center opacity-45">
          <div className="w-5 h-4 bg-white rounded-full"></div>
          <div className="w-7 h-5 bg-white rounded-full -ml-2"></div>
          <div className="w-4 h-3 bg-white rounded-full -ml-1"></div>
        </div>

        {/* Grass patches */}
        <div className="absolute bottom-0 left-0 w-16 h-8 bg-gradient-to-t from-green-400 to-green-300 rounded-t-full opacity-40"></div>
        <div className="absolute bottom-0 left-20 w-12 h-6 bg-gradient-to-t from-green-500 to-green-400 rounded-t-full opacity-35"></div>
        <div className="absolute bottom-0 left-40 w-20 h-10 bg-gradient-to-t from-green-400 to-green-300 rounded-t-full opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-18 h-9 bg-gradient-to-t from-green-500 to-green-400 rounded-t-full opacity-40"></div>
        <div className="absolute bottom-0 right-24 w-14 h-7 bg-gradient-to-t from-green-400 to-green-300 rounded-t-full opacity-35"></div>
        <div className="absolute bottom-0 right-48 w-16 h-8 bg-gradient-to-t from-green-500 to-green-400 rounded-t-full opacity-30"></div>
        
        {/* Grass blades scattered around */}
        <div className="absolute bottom-12 left-8 w-1 h-4 bg-green-500 rounded-full opacity-60 transform rotate-12"></div>
        <div className="absolute bottom-16 left-16 w-1 h-5 bg-green-400 rounded-full opacity-50 transform -rotate-6"></div>
        <div className="absolute bottom-20 left-32 w-1 h-3 bg-green-500 rounded-full opacity-45 transform rotate-24"></div>
        <div className="absolute bottom-14 right-12 w-1 h-4 bg-green-400 rounded-full opacity-55 transform -rotate-18"></div>
        <div className="absolute bottom-18 right-28 w-1 h-5 bg-green-500 rounded-full opacity-40 transform rotate-8"></div>
        <div className="absolute bottom-22 right-44 w-1 h-3 bg-green-400 rounded-full opacity-50 transform -rotate-12"></div>
        
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
        <div className="w-full h-full bg-llama-body rounded-full shadow-soft flex items-center justify-center text-2xl animate-bounce-cute">
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