import React from 'react';
import { useSocket } from '../context/SocketContext';

export const FloatingReactions: React.FC = () => {
  const { floatingReactions } = useSocket();

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {floatingReactions.map((item) => {
        // Random horizontal positioning between 15% and 85%
        const randomX = ((item.timestamp % 70) + 15);

        return (
          <div
            key={item.id}
            style={{
              left: `${randomX}%`,
              bottom: '90px'
            }}
            className="absolute flex flex-col items-center animate-bounce-and-rise"
          >
            <span className="text-4xl filter drop-shadow-lg select-none">
              {item.emoji}
            </span>
            <span className="text-[10px] font-black px-2 py-0.5 rounded-lg bg-white text-zinc-900 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] mt-1 whitespace-nowrap">
              {item.senderName}
            </span>
          </div>
        );
      })}
    </div>
  );
};
