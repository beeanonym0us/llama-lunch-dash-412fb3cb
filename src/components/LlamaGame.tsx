import React, { useState, useEffect, useCallback } from 'react';
import { GameArea } from './GameArea';
import { GameUI } from './GameUI';
import { useToast } from '@/hooks/use-toast';

export interface Position {
  x: number;
  y: number;
}

export interface FoodItem {
  id: string;
  position: Position;
  type: 'grass' | 'grain';
}

const GAME_WIDTH = 600;
const GAME_HEIGHT = 400;
const LLAMA_SIZE = 40;
const FOOD_SIZE = 20;
const LLAMA_SPEED = 5;

const LlamaGame = () => {
  const [llamaPosition, setLlamaPosition] = useState<Position>({ x: 280, y: 180 });
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  // Generate random food
  const generateFood = useCallback(() => {
    const newFood: FoodItem = {
      id: Math.random().toString(36).substr(2, 9),
      position: {
        x: Math.random() * (GAME_WIDTH - FOOD_SIZE),
        y: Math.random() * (GAME_HEIGHT - FOOD_SIZE)
      },
      type: Math.random() > 0.5 ? 'grass' : 'grain'
    };
    setFoodItems(prev => [...prev, newFood]);
  }, []);

  // Check collision between llama and food
  const checkCollision = useCallback((llamaPos: Position, foodPos: Position) => {
    const distance = Math.sqrt(
      Math.pow(llamaPos.x - foodPos.x, 2) + Math.pow(llamaPos.y - foodPos.y, 2)
    );
    return distance < (LLAMA_SIZE / 2 + FOOD_SIZE / 2);
  }, []);

  // Handle food collection
  const collectFood = useCallback((foodId: string, foodType: string) => {
    setFoodItems(prev => prev.filter(food => food.id !== foodId));
    setScore(prev => prev + (foodType === 'grain' ? 20 : 10));
    
    toast({
      title: foodType === 'grain' ? "Yummy grains! 🌾" : "Fresh grass! 🌱",
      description: `+${foodType === 'grain' ? 20 : 10} points`,
      duration: 1000,
    });
  }, [toast]);

  // Keyboard event handlers
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault();
      setKeysPressed(prev => new Set(prev).add(event.key));
    }
  }, []);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault();
      setKeysPressed(prev => {
        const newSet = new Set(prev);
        newSet.delete(event.key);
        return newSet;
      });
    }
  }, []);

  // Game loop
  useEffect(() => {
    if (!isPlaying) return;

    const gameInterval = setInterval(() => {
      // Move llama based on pressed keys
      setLlamaPosition(prev => {
        let newX = prev.x;
        let newY = prev.y;

        if (keysPressed.has('ArrowLeft')) newX -= LLAMA_SPEED;
        if (keysPressed.has('ArrowRight')) newX += LLAMA_SPEED;
        if (keysPressed.has('ArrowUp')) newY -= LLAMA_SPEED;
        if (keysPressed.has('ArrowDown')) newY += LLAMA_SPEED;

        // Keep llama within bounds
        newX = Math.max(0, Math.min(GAME_WIDTH - LLAMA_SIZE, newX));
        newY = Math.max(0, Math.min(GAME_HEIGHT - LLAMA_SIZE, newY));

        const newPosition = { x: newX, y: newY };

        // Check for food collisions
        foodItems.forEach(food => {
          if (checkCollision(newPosition, food.position)) {
            collectFood(food.id, food.type);
          }
        });

        return newPosition;
      });
    }, 16); // ~60fps

    return () => clearInterval(gameInterval);
  }, [isPlaying, keysPressed, foodItems, checkCollision, collectFood]);

  // Food spawning
  useEffect(() => {
    if (!isPlaying) return;

    const foodInterval = setInterval(() => {
      if (foodItems.length < 5) {
        generateFood();
      }
    }, 2000);

    return () => clearInterval(foodInterval);
  }, [isPlaying, foodItems.length, generateFood]);

  // Keyboard listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setFoodItems([]);
    setLlamaPosition({ x: 280, y: 180 });
    generateFood();
  };

  const pauseGame = () => {
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-background p-8">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-2 text-center">
          🦙 Hungry Llama
        </h1>
        <p className="text-muted-foreground text-center">
          Use arrow keys to help the llama find her food!
        </p>
      </div>

      <GameUI 
        score={score}
        isPlaying={isPlaying}
        onStart={startGame}
        onPause={pauseGame}
      />

      <GameArea
        llamaPosition={llamaPosition}
        foodItems={foodItems}
        gameWidth={GAME_WIDTH}
        gameHeight={GAME_HEIGHT}
        llamaSize={LLAMA_SIZE}
        foodSize={FOOD_SIZE}
      />

      {!isPlaying && (
        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            🌱 Grass = 10 points • 🌾 Grains = 20 points
          </p>
        </div>
      )}
    </div>
  );
};

export default LlamaGame;
