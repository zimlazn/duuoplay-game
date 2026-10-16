import React, { useState, useEffect } from 'react';
import { useSocket } from '../../context/SocketContext';
import { HeartHandshake, Clock, Heart, Sparkles } from 'lucide-react';

export const DilemmaGame: React.FC = () => {
  const { room, playerId, submitAnswer } = useSocket();
  const [selectedChoice, setSelectedChoice] = useState<'A' | 'B' | null>(null);

  const dilemmaData = room?.gameState.dilemmaData;
  const status = room?.gameState.status;
  const timeLeft = room?.gameState.timeLeft ?? 0;
  const currentRound = room?.gameState.currentRound ?? 1;
  const totalRounds = room?.gameState.totalRounds ?? 5;
  const playerAnswers = room?.gameState.playerAnswers ?? {};
  const myAnswer = playerId ? playerAnswers[playerId] : null;

  useEffect(() => {
    setSelectedChoice(null);
  }, [dilemmaData?.id]);

  if (!dilemmaData) return null;

  const handleSelectChoice = (choice: 'A' | 'B') => {
    if (selectedChoice !== null || myAnswer || status !== 'in_round') return;
    setSelectedChoice(choice);
    submitAnswer({ choice });
  };

  const isRoundOver = status === 'round_result';
  const playerIds = room ? Object.keys(room.players) : [];
  const p1Id = playerIds[0];
  const p2Id = playerIds[1];
  const p1Obj = p1Id ? room?.players[p1Id] : null;
  const p2Obj = p2Id ? room?.players[p2Id] : null;

  const p1Choice = p1Id ? playerAnswers[p1Id]?.choice : null;
  const p2Choice = p2Id ? playerAnswers[p2Id]?.choice : null;
  const isMatch = isRoundOver && p1Choice && p2Choice && p1Choice === p2Choice;

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-3">
      {/* Header */}
      <div className="w-full flex items-center justify-between px-1 text-xs">
        <span className="font-black text-zinc-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
          <HeartHandshake className="w-4 h-4 text-zinc-900 dark:text-pink-400" />
          Babak {currentRound} / {totalRounds}
        </span>
        <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-pink-100 dark:bg-pink-950/80 border-2 border-zinc-900 dark:border-pink-500 shadow-[2px_2px_0px_#18181b] font-mono font-black text-zinc-900 dark:text-pink-200">
          <Clock className="w-3.5 h-3.5" />
          <span>{timeLeft}s</span>
        </div>
      </div>

      {/* Dilemma Header Card */}
      <div className="w-full p-5 bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-700 rounded-3xl shadow-[4px_4px_0px_#18181b] flex flex-col items-center text-center">
        <span className="text-[11px] font-black px-2.5 py-0.5 rounded-lg bg-pink-100 dark:bg-pink-900 text-pink-950 dark:text-pink-200 border border-zinc-900 mb-1">
          {dilemmaData.category}
        </span>

        <h3 className="text-xl font-black text-zinc-900 dark:text-white leading-tight my-2">
          {dilemmaData.title}
        </h3>

        <p className="text-xs text-zinc-600 dark:text-zinc-400 font-bold max-w-xs">
          Pilih mana yang paling mencerminkan dirimu:
        </p>

        {myAnswer && !isRoundOver && (
          <div className="mt-2 text-xs font-black text-pink-950 dark:text-pink-300 bg-pink-50 dark:bg-pink-950/60 border border-zinc-900 px-3 py-1 rounded-xl animate-pulse flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" /> Pilihan tersimpan! Menunggu pasangan...
          </div>
        )}
      </div>

      {/* 2 Big Dilemma Choice Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Option A */}
        {(() => {
          const isSelected = selectedChoice === 'A' || myAnswer?.choice === 'A';
          let borderStyle = 'bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-700 hover:bg-pink-50 dark:hover:bg-zinc-800 shadow-[3px_3px_0px_#18181b] text-zinc-900 dark:text-white';

          if (isRoundOver) {
            if (isMatch && p1Choice === 'A') {
              borderStyle = 'bg-pink-100 dark:bg-pink-900 border-2 border-zinc-900 shadow-[4px_4px_0px_#18181b] ring-2 ring-zinc-900';
            } else if (p1Choice === 'A' || p2Choice === 'A') {
              borderStyle = 'bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-900 text-zinc-800 dark:text-zinc-200';
            } else {
              borderStyle = 'bg-zinc-100 dark:bg-zinc-850 border-2 border-zinc-300 dark:border-zinc-700 text-zinc-400 opacity-60';
            }
          } else if (isSelected) {
            borderStyle = 'bg-pink-200 dark:bg-pink-900 border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] font-black text-pink-950 dark:text-pink-100';
          }

          return (
            <button
              disabled={selectedChoice !== null || isRoundOver}
              onClick={() => handleSelectChoice('A')}
              className={`p-5 rounded-3xl flex flex-col items-center text-center justify-between transition-all active:translate-x-[1px] active:translate-y-[1px] cursor-pointer min-h-[140px] ${borderStyle}`}
            >
              <div className="text-4xl my-1 select-none">{dilemmaData.optionA.emoji}</div>
              <span className="text-sm font-extrabold leading-tight">
                {dilemmaData.optionA.text}
              </span>

              {/* Reveal Player Avatars in Round Over */}
              {isRoundOver && (
                <div className="flex items-center gap-1 mt-2">
                  {p1Choice === 'A' && (
                    <span className="px-2 py-0.5 rounded-lg bg-purple-200 dark:bg-purple-900 text-[10px] font-black border border-zinc-900">
                      {p1Obj?.avatar} {p1Obj?.nickname}
                    </span>
                  )}
                  {p2Choice === 'A' && (
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-200 dark:bg-emerald-900 text-[10px] font-black border border-zinc-900">
                      {p2Obj?.avatar} {p2Obj?.nickname}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })()}

        {/* Option B */}
        {(() => {
          const isSelected = selectedChoice === 'B' || myAnswer?.choice === 'B';
          let borderStyle = 'bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-700 hover:bg-pink-50 dark:hover:bg-zinc-800 shadow-[3px_3px_0px_#18181b] text-zinc-900 dark:text-white';

          if (isRoundOver) {
            if (isMatch && p1Choice === 'B') {
              borderStyle = 'bg-pink-100 dark:bg-pink-900 border-2 border-zinc-900 shadow-[4px_4px_0px_#18181b] ring-2 ring-zinc-900';
            } else if (p1Choice === 'B' || p2Choice === 'B') {
              borderStyle = 'bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-900 text-zinc-800 dark:text-zinc-200';
            } else {
              borderStyle = 'bg-zinc-100 dark:bg-zinc-850 border-2 border-zinc-300 dark:border-zinc-700 text-zinc-400 opacity-60';
            }
          } else if (isSelected) {
            borderStyle = 'bg-pink-200 dark:bg-pink-900 border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] font-black text-pink-950 dark:text-pink-100';
          }

          return (
            <button
              disabled={selectedChoice !== null || isRoundOver}
              onClick={() => handleSelectChoice('B')}
              className={`p-5 rounded-3xl flex flex-col items-center text-center justify-between transition-all active:translate-x-[1px] active:translate-y-[1px] cursor-pointer min-h-[140px] ${borderStyle}`}
            >
              <div className="text-4xl my-1 select-none">{dilemmaData.optionB.emoji}</div>
              <span className="text-sm font-extrabold leading-tight">
                {dilemmaData.optionB.text}
              </span>

              {/* Reveal Player Avatars in Round Over */}
              {isRoundOver && (
                <div className="flex items-center gap-1 mt-2">
                  {p1Choice === 'B' && (
                    <span className="px-2 py-0.5 rounded-lg bg-purple-200 dark:bg-purple-900 text-[10px] font-black border border-zinc-900">
                      {p1Obj?.avatar} {p1Obj?.nickname}
                    </span>
                  )}
                  {p2Choice === 'B' && (
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-200 dark:bg-emerald-900 text-[10px] font-black border border-zinc-900">
                      {p2Obj?.avatar} {p2Obj?.nickname}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })()}
      </div>

      {isMatch && (
        <div className="p-2.5 rounded-2xl bg-pink-200 dark:bg-pink-950/80 border-2 border-zinc-900 dark:border-pink-500 shadow-[2px_2px_0px_#18181b] text-xs font-black text-pink-950 dark:text-pink-100 flex items-center justify-center gap-1.5 animate-bounce">
          <Sparkles className="w-4 h-4 text-pink-600" />
          <span>KECUALIAN TELEPATI! Kalian Memilih Pilihan yang Sama!</span>
        </div>
      )}
    </div>
  );
};
