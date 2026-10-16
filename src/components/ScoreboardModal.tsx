import React from 'react';
import { useSocket } from '../context/SocketContext';
import { Trophy, CheckCircle2, X } from 'lucide-react';

interface ScoreboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScoreboardModal: React.FC<ScoreboardModalProps> = ({ isOpen, onClose }) => {
  const { room, playerId } = useSocket();

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !room) return null;

  const isPinkTheme = room.roomId === 'ACAA' || room.isSpecialTheme;

  const playerIds = Object.keys(room.players);
  const p1 = playerIds[0] ? room.players[playerIds[0]] : null;
  const p2 = playerIds[1] ? room.players[playerIds[1]] : null;

  const p1IsLeader = p1 && p2 && p1.score > p2.score;
  const p2IsLeader = p1 && p2 && p2.score > p1.score;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-lg border-2 rounded-3xl overflow-hidden flex flex-col max-h-[85vh] cursor-default transition-all ${
          isPinkTheme
            ? 'bg-pink-50 border-pink-500 shadow-[6px_6px_0px_#f472b6] text-pink-950'
            : 'bg-white dark:bg-zinc-900 border-zinc-900 dark:border-zinc-700 shadow-[6px_6px_0px_#18181b]'
        }`}
      >
        {/* Header */}
        <div
          className={`p-4 border-b-2 flex items-center justify-between ${
            isPinkTheme
              ? 'bg-pink-200 border-pink-400 text-pink-950'
              : 'bg-amber-100 dark:bg-amber-950/80 border-zinc-900 dark:border-zinc-700'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`p-2 rounded-xl border-2 ${
                isPinkTheme ? 'bg-white border-pink-500' : 'bg-white dark:bg-zinc-800 border-zinc-900'
              }`}
            >
              <Trophy className={`w-5 h-5 ${isPinkTheme ? 'text-pink-600' : 'text-amber-700 dark:text-amber-400'}`} />
            </div>
            <div>
              <h2 className="text-base font-black flex items-center gap-2">
                Papan Skor Bersama
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${
                    isPinkTheme
                      ? 'bg-pink-300 border-pink-600 text-pink-950'
                      : 'bg-emerald-200 dark:bg-emerald-900 border-zinc-900 text-emerald-950 dark:text-emerald-200'
                  }`}
                >
                  Live
                </span>
              </h2>
              <p className={`text-xs font-medium ${isPinkTheme ? 'text-pink-800' : 'text-zinc-600 dark:text-zinc-400'}`}>
                Skor dan riwayat babak terkini
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-xl border-2 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer ${
              isPinkTheme
                ? 'bg-white hover:bg-pink-100 border-pink-500 text-pink-900 shadow-[2px_2px_0px_#f472b6]'
                : 'bg-white dark:bg-zinc-800 border-zinc-900 shadow-[2px_2px_0px_#18181b] text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Total Points Cards */}
        <div
          className={`p-4 border-b-2 grid grid-cols-2 gap-3 ${
            isPinkTheme
              ? 'bg-pink-100/70 border-pink-400'
              : 'bg-[#F7F5F0] dark:bg-zinc-850 border-zinc-900 dark:border-zinc-700'
          }`}
        >
          {p1 && (
            <div
              className={`p-3.5 rounded-2xl border-2 flex flex-col items-center relative ${
                isPinkTheme
                  ? 'bg-white border-pink-400 shadow-[3px_3px_0px_#f472b6]'
                  : p1IsLeader
                  ? 'bg-amber-100 dark:bg-amber-950/70 border-amber-600 shadow-[3px_3px_0px_#18181b]'
                  : 'bg-white dark:bg-zinc-800 border-zinc-900 shadow-[3px_3px_0px_#18181b]'
              }`}
            >
              {p1IsLeader && (
                <span className="absolute -top-2.5 -right-2 text-xl" title="Memimpin">
                  👑
                </span>
              )}
              <span className="text-2xl mb-1">{p1.avatar}</span>
              <span className="text-xs font-black truncate max-w-full">
                {p1.nickname} {p1.id === playerId ? '(Kamu)' : ''}
              </span>
              <div
                className={`text-2xl font-mono font-black mt-1 ${
                  isPinkTheme ? 'text-pink-600' : 'text-purple-700 dark:text-purple-400'
                }`}
              >
                {p1.score}
              </div>
              <span className={`text-[10px] font-bold ${isPinkTheme ? 'text-pink-600' : 'text-zinc-500 dark:text-zinc-400'}`}>
                Total Poin
              </span>
            </div>
          )}

          {p2 && (
            <div
              className={`p-3.5 rounded-2xl border-2 flex flex-col items-center relative ${
                isPinkTheme
                  ? 'bg-white border-pink-400 shadow-[3px_3px_0px_#f472b6]'
                  : p2IsLeader
                  ? 'bg-amber-100 dark:bg-amber-950/70 border-amber-600 shadow-[3px_3px_0px_#18181b]'
                  : 'bg-white dark:bg-zinc-800 border-zinc-900 shadow-[3px_3px_0px_#18181b]'
              }`}
            >
              {p2IsLeader && (
                <span className="absolute -top-2.5 -right-2 text-xl" title="Memimpin">
                  👑
                </span>
              )}
              <span className="text-2xl mb-1">{p2.avatar}</span>
              <span className="text-xs font-black truncate max-w-full">
                {p2.nickname} {p2.id === playerId ? '(Kamu)' : ''}
              </span>
              <div
                className={`text-2xl font-mono font-black mt-1 ${
                  isPinkTheme ? 'text-rose-600' : 'text-emerald-700 dark:text-emerald-400'
                }`}
              >
                {p2.score}
              </div>
              <span className={`text-[10px] font-bold ${isPinkTheme ? 'text-pink-600' : 'text-zinc-500 dark:text-zinc-400'}`}>
                Total Poin
              </span>
            </div>
          )}
        </div>

        {/* Round History List */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1 no-scrollbar">
          <h3
            className={`text-xs font-black uppercase tracking-wider mb-2 ${
              isPinkTheme ? 'text-pink-800' : 'text-zinc-600 dark:text-zinc-400'
            }`}
          >
            Riwayat Babak Permainan ({room.roundHistory.length} Babak)
          </h3>

          {room.roundHistory.length === 0 ? (
            <div
              className={`p-8 text-center text-xs font-bold rounded-2xl border-2 border-dashed ${
                isPinkTheme
                  ? 'bg-pink-100/50 border-pink-300 text-pink-800'
                  : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400'
              }`}
            >
              Belum ada babak yang diselesaikan. Mainkan satu babak sekarang!
            </div>
          ) : (
            room.roundHistory.map((rh, idx) => {
              const isWinnerMe = rh.winnerPlayerId === playerId;
              const isDraw = rh.winnerPlayerId === 'draw';

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border-2 flex items-center justify-between gap-3 text-xs ${
                    isPinkTheme
                      ? 'bg-white border-pink-400 shadow-[2px_2px_0px_#f472b6]'
                      : 'bg-white dark:bg-zinc-800 border-zinc-900 dark:border-zinc-700 shadow-[2px_2px_0px_#18181b]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center font-mono font-black text-xs ${
                        isPinkTheme
                          ? 'bg-pink-100 border-pink-400 text-pink-900'
                          : 'bg-zinc-100 dark:bg-zinc-700 border-zinc-900 text-zinc-800 dark:text-zinc-200'
                      }`}
                    >
                      {rh.roundNumber}
                    </span>
                    <div>
                      <div className="font-black flex items-center gap-1.5">
                        {isDraw ? (
                          <span className={isPinkTheme ? 'text-pink-700' : 'text-zinc-600 dark:text-zinc-300'}>
                            🤝 Babak Seri
                          </span>
                        ) : isWinnerMe ? (
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Kamu Menang (+15)
                          </span>
                        ) : (
                          <span className={isPinkTheme ? 'text-pink-700 font-bold' : 'text-purple-600 dark:text-purple-400 font-bold'}>
                            🏆 {rh.winnerName} Menang
                          </span>
                        )}
                      </div>
                      {rh.details && (
                        <p
                          className={`text-[11px] mt-0.5 line-clamp-1 ${
                            isPinkTheme ? 'text-pink-800' : 'text-zinc-500 dark:text-zinc-400'
                          }`}
                        >
                          {rh.details}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-right font-mono font-black text-xs shrink-0">
                    <span className={isPinkTheme ? 'text-pink-700' : 'text-purple-700 dark:text-purple-400'}>
                      {rh.player1Score}
                    </span>
                    <span className="text-zinc-400 mx-1">:</span>
                    <span className={isPinkTheme ? 'text-rose-600' : 'text-emerald-700 dark:text-emerald-400'}>
                      {rh.player2Score}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
