import React from 'react';
import { useSocket } from '../context/SocketContext';
import { Pause, Play, LogOut, AlertTriangle, Check, X } from 'lucide-react';

export const PauseExitControls: React.FC = () => {
  const { room, playerId, togglePause, requestExit, cancelExit } = useSocket();

  if (!room) return null;

  const gameState = room.gameState;
  const isPlaying = gameState && gameState.status !== 'waiting';

  if (!isPlaying) return null;

  const isPaused = !!gameState.isPaused;
  const exitVotes = gameState.exitVotes || [];
  const hasVotedExit = playerId ? exitVotes.includes(playerId) : false;
  const someoneWantsExit = exitVotes.length > 0;

  const opponentId = Object.keys(room.players).find((id) => id !== playerId);
  const opponent = opponentId ? room.players[opponentId] : null;
  const pauser = gameState.pausedByPlayerId ? room.players[gameState.pausedByPlayerId] : null;

  return (
    <>
      {/* Top Floating Mini Controls for Pause & Exit */}
      <div className="w-full max-w-md mx-auto flex items-center justify-between px-2 mb-2">
        <div className="flex items-center gap-2">
          {/* Pause Button */}
          <button
            type="button"
            onClick={togglePause}
            className={`px-3 py-1.5 rounded-xl border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
              isPaused
                ? 'bg-amber-300 dark:bg-amber-500 text-zinc-950 animate-pulse'
                : 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100'
            }`}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
            <span>{isPaused ? 'Lanjut' : 'Jeda (Pause)'}</span>
          </button>
        </div>

        {/* Mutual Exit Button */}
        <button
          type="button"
          onClick={requestExit}
          className="px-3 py-1.5 rounded-xl bg-rose-100 dark:bg-rose-950/70 hover:bg-rose-200 text-rose-950 dark:text-rose-200 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] text-xs font-black flex items-center gap-1.5 active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Keluar Game</span>
        </button>
      </div>

      {/* PAUSE OVERLAY MODAL */}
      {isPaused && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-zinc-900 border-4 border-zinc-900 rounded-3xl p-6 shadow-[6px_6px_0px_#18181b] text-center space-y-4 animate-scale-in">
            <div className="w-16 h-16 rounded-2xl bg-amber-200 dark:bg-amber-800 border-2 border-zinc-900 flex items-center justify-center mx-auto shadow-[2px_2px_0px_#18181b]">
              <Pause className="w-8 h-8 text-zinc-900 dark:text-amber-100 fill-current" />
            </div>

            <div>
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
                Permainan Dijeda ⏸️
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 font-medium">
                {pauser ? `${pauser.nickname} menjeda permainan.` : 'Permainan di-pause.'} Waktu dan giliran dibekukan sementara.
              </p>
            </div>

            <button
              type="button"
              onClick={togglePause}
              className="w-full py-3 px-4 rounded-2xl bg-emerald-300 hover:bg-emerald-400 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-zinc-900 dark:text-white border-2 border-zinc-900 shadow-[4px_4px_0px_#18181b] text-sm font-black flex items-center justify-center gap-2 active:translate-x-[2px] active:translate-y-[2px] cursor-pointer transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Lanjutkan Permainan (Resume)</span>
            </button>
          </div>
        </div>
      )}

      {/* MUTUAL EXIT CONFIRMATION MODAL */}
      {someoneWantsExit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-zinc-900 border-4 border-zinc-900 rounded-3xl p-6 shadow-[6px_6px_0px_#18181b] text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-rose-200 dark:bg-rose-900 border-2 border-zinc-900 flex items-center justify-center mx-auto shadow-[2px_2px_0px_#18181b]">
              <AlertTriangle className="w-8 h-8 text-rose-700 dark:text-rose-200" />
            </div>

            <div>
              <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight">
                Permintaan Keluar Game
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 font-medium">
                {hasVotedExit ? (
                  <>
                    Kamu telah menyetujui untuk keluar (1/2). Menunggu konfirmasi dari{' '}
                    <strong>{opponent?.nickname || 'Lawan'}</strong>.
                  </>
                ) : (
                  <>
                    <strong>{opponent?.nickname || 'Lawan'}</strong> meminta untuk mengakhiri game dan kembali ke Lobby.
                    Apakah kamu setuju? (Memerlukan persetujuan kedua pemain)
                  </>
                )}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {!hasVotedExit ? (
                <>
                  <button
                    type="button"
                    onClick={requestExit}
                    className="w-full py-2.5 px-4 rounded-xl bg-rose-500 hover:bg-rose-600 text-white border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] text-xs font-black flex items-center justify-center gap-1.5 active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Setuju Keluar ke Lobby (2/2)</span>
                  </button>
                  <button
                    type="button"
                    onClick={cancelExit}
                    className="w-full py-2 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] text-xs font-bold active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
                  >
                    <X className="w-4 h-4 inline mr-1" />
                    <span>Tolak / Tetap Lanjut Main</span>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={cancelExit}
                  className="w-full py-2.5 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] text-xs font-bold active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
                >
                  <span>Batalkan Permintaan Keluar</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
