import React from 'react';
import { useSocket } from '../../context/SocketContext';
import { Grid3X3, Sparkles } from 'lucide-react';

export const TicTacToeGame: React.FC = () => {
  const { room, playerId, submitTicTacToeMove } = useSocket();

  const ttt = room?.gameState.tictactoeState;
  const currentRound = room?.gameState.currentRound ?? 1;
  const totalRounds = room?.gameState.totalRounds ?? 5;

  if (!ttt) return null;

  const isPinkTheme = room?.roomId === 'ACAA' || room?.isSpecialTheme;
  const playerIds = room ? Object.keys(room.players) : [];
  const p1Id = playerIds[0];
  const p2Id = playerIds[1];
  const p1 = p1Id ? room?.players[p1Id] : null;
  const p2 = p2Id ? room?.players[p2Id] : null;

  const isMyTurn = ttt.currentTurnPlayerId === playerId;
  const mySymbol = playerId ? ttt.playerSymbols[playerId] : null;
  const currentTurnPlayer = ttt.currentTurnPlayerId ? room?.players[ttt.currentTurnPlayerId] : null;

  const handleCellClick = (index: number) => {
    if (!isMyTurn || ttt.board[index] !== null || ttt.status !== 'playing') return;
    submitTicTacToeMove(index);
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-3 select-none">
      {/* Header (No Timer) */}
      <div className="w-full flex items-center justify-between px-1 text-xs">
        <span
          className={`font-black uppercase tracking-wider flex items-center gap-1.5 ${
            isPinkTheme ? 'text-pink-900' : 'text-zinc-800 dark:text-zinc-200'
          }`}
        >
          <Grid3X3 className={`w-4 h-4 ${isPinkTheme ? 'text-pink-600' : 'text-zinc-900 dark:text-amber-400'}`} />
          Babak {currentRound} / {totalRounds}
        </span>
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border-2 font-black ${
            isPinkTheme
              ? 'bg-pink-100 border-pink-400 text-pink-950 shadow-[2px_2px_0px_#f472b6]'
              : 'bg-amber-100 dark:bg-amber-950/80 border-zinc-900 dark:border-amber-500 shadow-[2px_2px_0px_#18181b] text-zinc-900 dark:text-amber-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{isMyTurn ? 'Giliran Kamu!' : 'Giliran Lawan'}</span>
        </div>
      </div>

      {/* Players Indicator Bar */}
      <div className="w-full grid grid-cols-2 gap-2">
        {p1 && (
          <div
            className={`p-2.5 rounded-2xl border-2 flex items-center gap-2 transition-all shadow-[2px_2px_0px_#18181b] ${
              ttt.currentTurnPlayerId === p1.id
                ? isPinkTheme
                  ? 'bg-pink-200 border-pink-600 shadow-[2px_2px_0px_#f472b6] scale-[1.02] ring-2 ring-pink-400'
                  : 'bg-rose-100 dark:bg-rose-950/70 border-rose-600 scale-[1.02] ring-2 ring-rose-400'
                : isPinkTheme
                ? 'bg-white/80 border-pink-300 opacity-80'
                : 'bg-white dark:bg-zinc-800 border-zinc-900 opacity-70'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-rose-500 text-white font-black text-base flex items-center justify-center border border-zinc-900">
              X
            </div>
            <div className="truncate">
              <div
                className={`text-xs font-black truncate ${
                  isPinkTheme ? 'text-pink-950' : 'text-zinc-900 dark:text-white'
                }`}
              >
                {p1.nickname} {p1.id === playerId ? '(Kamu)' : ''}
              </div>
              <div
                className={`text-[10px] font-bold ${
                  isPinkTheme ? 'text-pink-600' : 'text-zinc-500 dark:text-zinc-400'
                }`}
              >
                {ttt.currentTurnPlayerId === p1.id ? 'Sedang Giliran ⚡' : 'Menunggu'}
              </div>
            </div>
          </div>
        )}

        {p2 && (
          <div
            className={`p-2.5 rounded-2xl border-2 flex items-center gap-2 transition-all shadow-[2px_2px_0px_#18181b] ${
              ttt.currentTurnPlayerId === p2.id
                ? isPinkTheme
                  ? 'bg-rose-100 border-rose-600 shadow-[2px_2px_0px_#fb7185] scale-[1.02] ring-2 ring-rose-400'
                  : 'bg-sky-100 dark:bg-sky-950/70 border-sky-600 scale-[1.02] ring-2 ring-sky-400'
                : isPinkTheme
                ? 'bg-white/80 border-pink-300 opacity-80'
                : 'bg-white dark:bg-zinc-800 border-zinc-900 opacity-70'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-sky-500 text-white font-black text-base flex items-center justify-center border border-zinc-900">
              O
            </div>
            <div className="truncate">
              <div
                className={`text-xs font-black truncate ${
                  isPinkTheme ? 'text-pink-950' : 'text-zinc-900 dark:text-white'
                }`}
              >
                {p2.nickname} {p2.id === playerId ? '(Kamu)' : ''}
              </div>
              <div
                className={`text-[10px] font-bold ${
                  isPinkTheme ? 'text-pink-600' : 'text-zinc-500 dark:text-zinc-400'
                }`}
              >
                {ttt.currentTurnPlayerId === p2.id ? 'Sedang Giliran ⚡' : 'Menunggu'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Turn Banner */}
      <div
        className={`w-full py-2 px-3 rounded-2xl border-2 text-center text-xs font-black flex items-center justify-center gap-1.5 transition-colors ${
          isMyTurn
            ? isPinkTheme
              ? 'bg-pink-300 text-pink-950 border-pink-600 shadow-[2px_2px_0px_#f472b6] animate-pulse'
              : 'bg-amber-200 dark:bg-amber-900/80 text-amber-950 dark:text-amber-100 border-zinc-900 shadow-[2px_2px_0px_#18181b] animate-pulse'
            : isPinkTheme
            ? 'bg-white/90 text-pink-800 border-pink-300 shadow-[2px_2px_0px_#f472b6]'
            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-900 shadow-[2px_2px_0px_#18181b]'
        }`}
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>
          {isMyTurn
            ? `Giliranmu! Ketuk kotak kosong untuk pasang ${mySymbol}`
            : `Menunggu langkah ${currentTurnPlayer?.nickname || 'Lawan'}...`}
        </span>
      </div>

      {/* 3x3 Grid Board */}
      <div
        className={`w-full max-w-[340px] aspect-square p-3 border-4 rounded-3xl grid grid-cols-3 gap-2.5 transition-all ${
          isPinkTheme
            ? 'bg-white/95 border-pink-500 shadow-[6px_6px_0px_#f472b6]'
            : 'bg-white dark:bg-zinc-900 border-zinc-900 dark:border-zinc-700 shadow-[6px_6px_0px_#18181b]'
        }`}
      >
        {ttt.board.map((cell, idx) => {
          const isWinningCell = ttt.winningLine?.includes(idx);
          const isEmpty = cell === null;
          return (
            <button
              key={idx}
              type="button"
              disabled={!isMyTurn || !isEmpty || ttt.status !== 'playing'}
              onClick={() => handleCellClick(idx)}
              className={`rounded-2xl border-2 font-black text-4xl flex items-center justify-center transition-all ${
                isWinningCell
                  ? 'bg-emerald-300 dark:bg-emerald-600 scale-105 shadow-[0_0_15px_rgba(52,211,153,0.8)] border-emerald-950 animate-bounce'
                  : cell === 'X'
                  ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-zinc-900 shadow-[2px_2px_0px_#18181b]'
                  : cell === 'O'
                  ? 'bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border-zinc-900 shadow-[2px_2px_0px_#18181b]'
                  : isMyTurn
                  ? isPinkTheme
                    ? 'bg-pink-50 hover:bg-pink-100 border-pink-400 cursor-pointer active:scale-95 shadow-[2px_2px_0px_#f472b6]'
                    : 'bg-amber-50/60 dark:bg-zinc-800 hover:bg-amber-100 dark:hover:bg-zinc-750 border-zinc-900 cursor-pointer active:scale-95 shadow-[2px_2px_0px_#18181b]'
                  : isPinkTheme
                  ? 'bg-pink-50/40 border-pink-200 cursor-not-allowed opacity-70'
                  : 'bg-zinc-50 dark:bg-zinc-850 border-zinc-900 cursor-not-allowed opacity-80'
              }`}
            >
              {cell === 'X' && (
                <span className="drop-shadow-[1px_1px_0px_#18181b]">✕</span>
              )}
              {cell === 'O' && (
                <span className="drop-shadow-[1px_1px_0px_#18181b]">◯</span>
              )}
              {isEmpty && isMyTurn && (
                <span className="text-zinc-300 dark:text-zinc-600 text-lg opacity-40 font-mono">
                  +
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
