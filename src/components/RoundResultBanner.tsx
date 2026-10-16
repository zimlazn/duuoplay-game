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
  let bannerBg = 'bg-amber-100 dark:bg-amber-950/80 text-amber-950 dark:text-amber-100';

  if (room.gameState.gameType === 'emoji_voice') {
    if (winnerId && winnerId !== 'draw') {
      if (winnerId === playerId) {
        title = '🎉 Tebakanmu Tepat! (+15 Poin Untukmu)';
        bannerBg = 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-950 dark:text-emerald-100';
      } else {
        const winnerNickname = room.players[winnerId]?.nickname || 'Penebak';
        title = `🎯 ${winnerNickname} (Penebak) Berhasil Menjawab! (+15 Poin)`;
        bannerBg = 'bg-purple-100 dark:bg-purple-950/80 text-purple-950 dark:text-purple-100';
      }
    } else {
      title = '❌ Tebakan Meleset / Waktu Habis (0 Poin)';
      bannerBg = 'bg-pink-100 dark:bg-pink-950/80 text-pink-950 dark:text-pink-100';
    }
  } else if (room.gameState.gameType === 'dilemma') {
    if (feedback?.includes('SEFREKUENSI')) {
      title = '💖 Cocok Sefrekuensi! (+15 Poin Kecocokan)';
      bannerBg = 'bg-pink-100 dark:bg-pink-950/80 text-pink-950 dark:text-pink-100';
    } else {
      title = '🤝 Beda Pilihan, Saling Melengkapi!';
      bannerBg = 'bg-yellow-100 dark:bg-yellow-950/80 text-yellow-950 dark:text-yellow-100';
    }
  } else if (isDraw) {
    title = '🤝 Babak Ini Seri!';
    bannerBg = 'bg-yellow-100 dark:bg-yellow-950/80 text-yellow-950 dark:text-yellow-100';
  } else if (isMe) {
    title = '🎉 Kamu Menang Babak Ini!';
    bannerBg = 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-950 dark:text-emerald-100';
  } else if (winnerId && room.players[winnerId]) {
    title = `🏆 ${room.players[winnerId].nickname} Menang!`;
    bannerBg = 'bg-purple-100 dark:bg-purple-950/80 text-purple-950 dark:text-purple-100';
  }

  return (
    <div className={`w-full max-w-md mx-auto mb-3 p-4 rounded-2xl ${bannerBg} border-2 border-zinc-900 shadow-[4px_4px_0px_#18181b] text-center animate-fade-in`}>
      <div className="flex items-center justify-center gap-2 mb-1">
        <Sparkles className="w-4 h-4" />
        <h4 className="text-sm font-black">{title}</h4>
      </div>

      {feedback && (
        <p className="text-xs font-bold leading-relaxed mt-1 opacity-90">
          {feedback}
        </p>
      )}
    </div>
  );
};
