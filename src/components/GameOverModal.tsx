import React, { useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Gamepad2, Award } from 'lucide-react';

interface GameOverModalProps {
  onOpenGameSelector: () => void;
  onOpenScoreboard: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  onOpenGameSelector,
  onOpenScoreboard
}) => {
  const { room, playerId, rematch } = useSocket();

  const isGameOver = room?.gameState.status === 'game_over';

  useEffect(() => {
    if (isGameOver) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  }, [isGameOver]);

  if (!isGameOver || !room) return null;

  const playerIds = Object.keys(room.players);
  const p1 = playerIds[0] ? room.players[playerIds[0]] : null;
  const p2 = playerIds[1] ? room.players[playerIds[1]] : null;

  let overallWinner: typeof p1 = null;
  let isDraw = false;

  if (p1 && p2) {
    if (p1.score > p2.score) overallWinner = p1;
    else if (p2.score > p1.score) overallWinner = p2;
    else isDraw = true;
  }

  const isIWon = overallWinner?.id === playerId;
  const isPinkTheme = room.roomId === 'ACAA' || room.isSpecialTheme;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className={`relative w-full max-w-md border-2 rounded-3xl overflow-hidden flex flex-col p-6 text-center ${
          isPinkTheme
            ? 'bg-gradient-to-b from-pink-100 to-rose-100 border-pink-500 shadow-[6px_6px_0px_#f472b6] text-pink-950'
            : 'bg-white dark:bg-zinc-900 border-zinc-900 dark:border-zinc-700 shadow-[6px_6px_0px_#18181b]'
        }`}
      >
        <span
          className={`text-[11px] font-black px-2.5 py-0.5 rounded-lg border mx-auto mb-3 ${
            isPinkTheme
              ? 'text-pink-900 bg-pink-200 border-pink-500'
              : 'text-purple-900 bg-purple-100 dark:bg-purple-950 dark:text-purple-200 border-zinc-900'
          }`}
        >
          {room.gameState.totalRounds || 5} Babak Selesai 🎮
        </span>

        {/* Trophy Avatar Box */}
        <div className="w-24 h-24 rounded-3xl bg-amber-200 dark:bg-amber-600 border-3 border-zinc-900 flex items-center justify-center mx-auto shadow-[4px_4px_0px_#18181b] text-5xl mb-3 relative animate-bounce">
          {overallWinner ? overallWinner.avatar : '🤝'}
          <span className="absolute -top-3 -right-3 text-3xl">👑</span>
        </div>

        {/* Winner Announcement */}
        <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-1">
          {isDraw ? (
            'Hasil Akhir Seri!'
          ) : isIWon ? (
            '🎉 KAMU PEMENANGNYA!'
          ) : (
            `🏆 ${overallWinner?.nickname} Menang!`
          )}
        </h2>

        <p className="text-xs text-zinc-600 dark:text-zinc-400 font-bold mb-4">
          {isDraw
            ? 'Skor kalian sama kuat! Pertarungan yang sangat sengit.'
            : isIWon
            ? 'Permainan luar biasa! Kamu berhasil mengumpulkan skor tertinggi.'
            : `${overallWinner?.nickname} unggul dengan skor tertinggi dalam duel ini.`}
        </p>

        {/* Final Score Comparison */}
        <div className="w-full grid grid-cols-2 gap-3 mb-5">
          {p1 && (
            <div
              className={`p-3 rounded-2xl border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] flex flex-col items-center ${
                overallWinner?.id === p1.id
                  ? 'bg-amber-100 dark:bg-amber-950/70 border-amber-600'
                  : 'bg-zinc-50 dark:bg-zinc-800'
              }`}
            >
              <span className="text-2xl mb-1">{p1.avatar}</span>
              <span className="text-xs font-black text-zinc-900 dark:text-white truncate max-w-full">
                {p1.nickname}
              </span>
              <span className="text-xl font-mono font-black text-purple-700 dark:text-purple-300 mt-1">
                {p1.score} pts
              </span>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold">
                {p1.totalWins}x Juara Match
              </span>
            </div>
          )}

          {p2 && (
            <div
              className={`p-3 rounded-2xl border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] flex flex-col items-center ${
                overallWinner?.id === p2.id
                  ? 'bg-amber-100 dark:bg-amber-950/70 border-amber-600'
                  : 'bg-zinc-50 dark:bg-zinc-800'
              }`}
            >
              <span className="text-2xl mb-1">{p2.avatar}</span>
              <span className="text-xs font-black text-zinc-900 dark:text-white truncate max-w-full">
                {p2.nickname}
              </span>
              <span className="text-xl font-mono font-black text-emerald-700 dark:text-emerald-300 mt-1">
                {p2.score} pts
              </span>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold">
                {p2.totalWins}x Juara Match
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={rematch}
            className="w-full py-3.5 rounded-2xl bg-amber-300 dark:bg-amber-500 hover:bg-amber-400 text-zinc-900 border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] font-black text-sm flex items-center justify-center gap-2 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Tanding Ulang (Rematch)</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onOpenGameSelector}
              className="py-2.5 rounded-xl bg-purple-100 dark:bg-purple-950 hover:bg-purple-200 text-purple-950 dark:text-purple-200 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] text-xs font-black flex items-center justify-center gap-1 active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Ganti Game</span>
            </button>

            <button
              onClick={onOpenScoreboard}
              className="py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-900 dark:text-zinc-200 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] text-xs font-black flex items-center justify-center gap-1 active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Lihat Detail</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
