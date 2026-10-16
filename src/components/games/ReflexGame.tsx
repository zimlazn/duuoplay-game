import React, { useState, useEffect } from 'react';
import { useSocket } from '../../context/SocketContext';
import { Zap, Clock, AlertOctagon } from 'lucide-react';

export const ReflexGame: React.FC = () => {
  const { room, playerId, submitReflexTap } = useSocket();
  const [tapped, setTapped] = useState(false);

  const reflexState = room?.gameState.reflexState;
  const status = room?.gameState.status;
  const currentRound = room?.gameState.currentRound ?? 1;
  const totalRounds = room?.gameState.totalRounds ?? 5;

  const playerIds = room ? Object.keys(room.players) : [];
  const p1Id = playerIds[0];
  const p2Id = playerIds[1];
  const p1Obj = p1Id ? room?.players[p1Id] : null;
  const p2Obj = p2Id ? room?.players[p2Id] : null;

  const taps = reflexState?.playerTaps || {};
  const myTap = playerId ? taps[playerId] : null;
  const isRoundOver = status === 'round_result';

  const phase = reflexState?.phase || 'ready';

  // FIX: Reset tapped state whenever a new round starts or phase resets to ready!
  useEffect(() => {
    setTapped(false);
  }, [currentRound, phase]);

  const handleBuzzerTap = () => {
    if (tapped || isRoundOver || !playerId) return;
    setTapped(true);
    submitReflexTap(Date.now());
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-3">
      {/* Header */}
      <div className="w-full flex items-center justify-between px-1 text-xs">
        <span className="font-black text-zinc-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-zinc-900 dark:text-amber-400" />
          Babak {currentRound} / {totalRounds}
        </span>
        <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-yellow-100 dark:bg-yellow-950/80 border-2 border-zinc-900 dark:border-yellow-500 shadow-[2px_2px_0px_#18181b] font-mono font-black text-zinc-900 dark:text-yellow-200">
          <Clock className="w-3.5 h-3.5" />
          <span>Refleks Duel</span>
        </div>
      </div>

      {/* Main Buzzer Area */}
      <div className="w-full flex flex-col items-center">
        {phase === 'ready' && !isRoundOver && (
          <button
            onClick={handleBuzzerTap}
            className="w-full aspect-square max-h-72 rounded-3xl bg-pink-100 dark:bg-pink-950/40 border-4 border-zinc-900 dark:border-pink-500 shadow-[6px_6px_0px_#18181b] flex flex-col items-center justify-center p-6 text-center cursor-pointer active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all select-none"
          >
            <div className="w-20 h-20 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-pink-500 shadow-[2px_2px_0px_#18181b] flex items-center justify-center mb-3">
              <AlertOctagon className="w-10 h-10 text-pink-700 dark:text-pink-400" />
            </div>
            <h3 className="text-xl font-black text-zinc-900 dark:text-pink-100 tracking-wide">
              TUNGGU TOMBOL HIJAU...
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 max-w-xs font-bold">
              Jangan ditekan dulu! Menekan sekarang dianggap false start (curang).
            </p>
          </button>
        )}

        {phase === 'signal' && !isRoundOver && (
          <button
            onClick={handleBuzzerTap}
            className="w-full aspect-square max-h-72 rounded-3xl bg-emerald-400 dark:bg-emerald-500 border-4 border-zinc-900 dark:border-emerald-300 shadow-[6px_6px_0px_#18181b] flex flex-col items-center justify-center p-6 text-center cursor-pointer active:scale-95 transition-transform select-none animate-bounce"
          >
            <div className="w-24 h-24 rounded-full bg-white dark:bg-zinc-950 border-2 border-zinc-900 dark:border-white shadow-[2px_2px_0px_#18181b] flex items-center justify-center mb-2">
              <Zap className="w-14 h-14 text-zinc-900 dark:text-yellow-400 fill-yellow-400" />
            </div>
            <h2 className="text-3xl font-black text-zinc-900 dark:text-zinc-950 tracking-widest uppercase">
              TEKAN SEKARANG!
            </h2>
            <p className="text-xs font-black text-zinc-900 dark:text-zinc-950 mt-1 uppercase">
              Ketuk secepat kilat!
            </p>
          </button>
        )}

        {isRoundOver && (
          <div className="w-full p-5 bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-700 rounded-3xl shadow-[4px_4px_0px_#18181b] flex flex-col items-center text-center">
            <span className="text-4xl mb-1">⚡</span>
            <h3 className="text-base font-black text-zinc-900 dark:text-zinc-100 mb-3">Hasil Refleks Babak Ini</h3>

            {/* Tap comparison */}
            <div className="w-full grid grid-cols-2 gap-3 mb-2">
              {p1Obj && (
                <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border-2 border-zinc-900 dark:border-purple-600 shadow-[2px_2px_0px_#18181b] flex flex-col items-center">
                  <span className="text-xl mb-1">{p1Obj.avatar}</span>
                  <span className="text-xs font-black text-zinc-900 dark:text-zinc-100 truncate max-w-full">
                    {p1Obj.nickname}
                  </span>
                  <div className="mt-2 text-lg font-mono font-black text-purple-900 dark:text-purple-300">
                    {taps[p1Obj.id]?.early ? (
                      <span className="text-xs text-pink-700 dark:text-pink-400 font-black">False Start ✕</span>
                    ) : taps[p1Obj.id] ? (
                      `${taps[p1Obj.id].timeMs} ms`
                    ) : (
                      <span className="text-xs text-zinc-400">Tidak menekan</span>
                    )}
                  </div>
                </div>
              )}

              {p2Obj && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-zinc-900 dark:border-emerald-600 shadow-[2px_2px_0px_#18181b] flex flex-col items-center">
                  <span className="text-xl mb-1">{p2Obj.avatar}</span>
                  <span className="text-xs font-black text-zinc-900 dark:text-zinc-100 truncate max-w-full">
                    {p2Obj.nickname}
                  </span>
                  <div className="mt-2 text-lg font-mono font-black text-emerald-900 dark:text-emerald-300">
                    {taps[p2Obj.id]?.early ? (
                      <span className="text-xs text-pink-700 dark:text-pink-400 font-black">False Start ✕</span>
                    ) : taps[p2Obj.id] ? (
                      `${taps[p2Obj.id].timeMs} ms`
                    ) : (
                      <span className="text-xs text-zinc-400">Tidak menekan</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {myTap && !isRoundOver && (
        <div className="text-xs font-black text-zinc-900 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100 border border-zinc-900 px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_#18181b] animate-pulse">
          ⚡ Waktu reaksimu tersimpan! Menghitung pemenang...
        </div>
      )}
    </div>
  );
};
