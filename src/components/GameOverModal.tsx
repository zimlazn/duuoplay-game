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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md bg-white border-2 border-zinc-900 rounded-3xl shadow-[6px_6px_0px_#18181b] overflow-hidden flex flex-col p-6 text-center">
        {/* Trophy Avatar Box */}
        <div className="mx-auto w-20 h-20 rounded-3xl bg-amber-100 border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] flex items-center justify-center text-4xl mb-3">
          {isDraw ? '🤝' : '🏆'}
        </div>

        {/* Winner Announcement */}
        {isDraw ? (
          <div>
            <h2 className="text-2xl font-black text-zinc-900">PERMAINAN SERI!</h2>
            <p className="text-xs text-zinc-600 font-medium mt-1">
              Kalian berdua sama-sama tangguh dengan skor yang imbang!
            </p>
          </div>
        ) : (
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 border border-zinc-900 text-amber-950 inline-block mb-1">
              {isIWon ? '🎉 KAMU MENANG! 🎉' : 'HASIL AKHIR'}
            </span>
            <h2 className="text-2xl font-black text-zinc-900 mt-1">
              {overallWinner?.nickname} Juara!
            </h2>
            <p className="text-xs text-zinc-600 font-medium mt-0.5 flex items-center justify-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              Menambah 1 Trofi Kemenangan
            </p>
          </div>
        )}

        {/* Final Score Cards */}
        <div className="grid grid-cols-2 gap-3 my-4">
          {p1 && (
            <div className={`p-4 rounded-2xl border-2 border-zinc-900 ${
              p1 === overallWinner
                ? 'bg-purple-100 shadow-[3px_3px_0px_#18181b]'
                : 'bg-zinc-50'
            }`}>
              <span className="text-2xl">{p1.avatar}</span>
              <p className="text-xs font-black text-zinc-900 mt-1 truncate">{p1.nickname}</p>
              <p className="text-2xl font-black text-purple-900 font-mono mt-1">{p1.score}</p>
              <p className="text-[10px] text-zinc-500 font-bold">poin</p>
            </div>
          )}

          {p2 && (
            <div className={`p-4 rounded-2xl border-2 border-zinc-900 ${
              p2 === overallWinner
                ? 'bg-emerald-100 shadow-[3px_3px_0px_#18181b]'
                : 'bg-zinc-50'
            }`}>
              <span className="text-2xl">{p2.avatar}</span>
              <p className="text-xs font-black text-zinc-900 mt-1 truncate">{p2.nickname}</p>
              <p className="text-2xl font-black text-emerald-900 font-mono mt-1">{p2.score}</p>
              <p className="text-[10px] text-zinc-500 font-bold">poin</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={rematch}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-200 hover:bg-amber-300 text-zinc-900 font-black text-sm border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Main Lagi (Rematch)
          </button>

          <button
            onClick={onOpenGameSelector}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-950 font-black text-xs border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          >
            <Gamepad2 className="w-4 h-4" />
            Ganti Mode Permainan
          </button>

          <button
            onClick={onOpenScoreboard}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-zinc-600 hover:text-zinc-900 text-xs font-bold transition"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-700" />
            Lihat Papan Skor Babak
          </button>
        </div>
      </div>
    </div>
  );
};
