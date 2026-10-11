import React from 'react';
import { useSocket } from '../context/SocketContext';

export const CountdownOverlay: React.FC = () => {
  const { room } = useSocket();

  if (room?.gameState.status !== 'countdown') return null;

  const count = room.gameState.countdown;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs pointer-events-none animate-fade-in">
      <div className="flex flex-col items-center justify-center text-center px-4">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-amber-100 border-4 border-zinc-900 shadow-[6px_6px_0px_#18181b] flex items-center justify-center animate-bounce-slow">
          <span className="text-6xl md:text-7xl font-black text-zinc-900 font-mono">
            {count > 0 ? count : 'GO!'}
          </span>
        </div>
        <span className="text-xs font-black uppercase tracking-widest text-zinc-900 mt-4 px-4 py-1.5 rounded-xl bg-white border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b]">
          Babak {room.gameState.currentRound} dari {room.gameState.totalRounds}
        </span>
      </div>
    </div>
  );
};
