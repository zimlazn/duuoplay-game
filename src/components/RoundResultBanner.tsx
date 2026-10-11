import React from 'react';
import { useSocket } from '../context/SocketContext';
import { Sparkles } from 'lucide-react';

export const RoundResultBanner: React.FC = () => {
  const { room, playerId } = useSocket();

  if (room?.gameState.status !== 'round_result') return null;

  const winnerId = room.gameState.roundWinnerId;
  const feedback = room.gameState.roundFeedback;
  const isDraw = winnerId === 'draw';
  const isMe = winnerId === playerId;

  let title = 'Hasil Babak Selesai';
  let bannerBg = 'bg-amber-100';

  if (isDraw) {
    title = '🤝 Babak Ini Seri!';
    bannerBg = 'bg-yellow-100';
  } else if (isMe) {
    title = '🎉 Kamu Menang Babak Ini!';
    bannerBg = 'bg-emerald-100';
  } else if (winnerId && room.players[winnerId]) {
    title = `🏆 ${room.players[winnerId].nickname} Menang!`;
    bannerBg = 'bg-purple-100';
  }

  return (
    <div className={`w-full max-w-md mx-auto mb-3 p-4 rounded-2xl ${bannerBg} border-2 border-zinc-900 shadow-[4px_4px_0px_#18181b] text-center animate-fade-in`}>
      <div className="flex items-center justify-center gap-2 mb-1">
        <Sparkles className="w-4 h-4 text-zinc-900" />
        <h4 className="text-sm font-black text-zinc-900">{title}</h4>
      </div>

      {feedback && (
        <p className="text-xs text-zinc-700 font-bold leading-relaxed mt-1">
          {feedback}
        </p>
      )}

      <div className="mt-2 text-[10px] text-zinc-500 font-black uppercase tracking-wider">
        Menuju babak berikutnya...
      </div>
    </div>
  );
};
