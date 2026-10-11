import React, { useState, useEffect } from 'react';
import { useSocket } from '../../context/SocketContext';
import { HeartHandshake, Clock, Sparkles, Heart } from 'lucide-react';

export const DilemmaGame: React.FC = () => {
  const { room, playerId, submitAnswer } = useSocket();
  const [selectedChoice, setSelectedChoice] = useState<'A' | 'B' | null>(null);

  const dilemmaData = room?.gameState.dilemmaData;
  const status = room?.gameState.status;
  const timeLeft = room?.gameState.timeLeft ?? 0;
  const currentRound = room?.gameState.currentRound ?? 1;
  const totalRounds = room?.gameState.totalRounds ?? 5;
  const playerAnswers = room?.gameState.playerAnswers ?? {};

  const playerIds = room ? Object.keys(room.players) : [];
  const p1Id = playerIds[0];
  const p2Id = playerIds[1];
  const p1Obj = p1Id ? room?.players[p1Id] : null;
  const p2Obj = p2Id ? room?.players[p2Id] : null;

  const myAnswer = playerId ? playerAnswers[playerId] : null;
  const isRoundOver = status === 'round_result';

  useEffect(() => {
    setSelectedChoice(null);
  }, [dilemmaData?.id]);

  if (!dilemmaData) return null;

  const handleChoose = (choice: 'A' | 'B') => {
    if (selectedChoice !== null || myAnswer || status !== 'in_round') return;
    setSelectedChoice(choice);
    submitAnswer({
      choice
    });
  };

  const p1Choice = p1Id ? playerAnswers[p1Id]?.choice : null;
  const p2Choice = p2Id ? playerAnswers[p2Id]?.choice : null;
  const isMatch = isRoundOver && p1Choice && p2Choice && p1Choice === p2Choice;

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-3">
      {/* Header */}
      <div className="w-full flex items-center justify-between px-1 text-xs">
        <span className="font-black text-zinc-800 uppercase tracking-wider flex items-center gap-1.5">
          <HeartHandshake className="w-4 h-4 text-zinc-900" />
          Babak {currentRound} / {totalRounds}
        </span>
        <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-pink-100 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] font-mono font-black text-zinc-900">
          <Clock className="w-3.5 h-3.5 text-zinc-900" />
          <span>{timeLeft}s</span>
        </div>
      </div>

      {/* Dilemma Header Card */}
      <div className="w-full p-5 bg-white border-2 border-zinc-900 rounded-3xl shadow-[4px_4px_0px_#18181b] flex flex-col items-center text-center">
        <span className="text-[11px] font-black px-2.5 py-0.5 rounded-lg bg-pink-100 text-pink-950 border border-zinc-900 mb-1">
          {dilemmaData.category}
        </span>

        <h3 className="text-xl font-black text-zinc-900 leading-tight my-2">
          {dilemmaData.title}
        </h3>

        <p className="text-xs text-zinc-600 font-bold max-w-xs">
          Pilih mana yang paling mencerminkan dirimu:
        </p>

        {myAnswer && !isRoundOver && (
          <div className="mt-2 text-xs font-black text-pink-950 bg-pink-50 border border-zinc-900 px-3 py-1 rounded-xl animate-pulse flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" /> Pilihan tersimpan! Menunggu pasangan...
          </div>
        )}
      </div>

      {/* 2 Big Dilemma Choice Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Option A */}
        {(() => {
          const isSelected = selectedChoice === 'A' || myAnswer?.choice === 'A';
          let borderStyle = 'bg-white border-2 border-zinc-900 hover:bg-pink-50 shadow-[3px_3px_0px_#18181b] text-zinc-900';

          if (isRoundOver) {
            if (isMatch && p1Choice === 'A') {
              borderStyle = 'bg-pink-100 border-2 border-zinc-900 shadow-[4px_4px_0px_#18181b] ring-2 ring-zinc-900';
            } else if (p1Choice === 'A' || p2Choice === 'A') {
              borderStyle = 'bg-zinc-100 border-2 border-zinc-900 text-zinc-800';
            } else {
              borderStyle = 'bg-zinc-100 border-2 border-zinc-300 text-zinc-400 opacity-60';
            }
          } else if (isSelected) {
            borderStyle = 'bg-pink-100 border-2 border-zinc-900 shadow-[4px_4px_0px_#18181b] font-black ring-2 ring-zinc-900';
          }

          return (
            <button
              disabled={selectedChoice !== null || isRoundOver}
              onClick={() => handleChoose('A')}
              className={`p-5 rounded-2xl flex flex-col items-center text-center justify-center gap-2 transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer ${borderStyle}`}
            >
              <span className="text-5xl my-1 select-none">{dilemmaData.optionA.emoji}</span>
              <span className="text-sm font-bold">{dilemmaData.optionA.text}</span>

              {/* Reveal Badges */}
              {isRoundOver && (
                <div className="flex gap-1.5 mt-2 flex-wrap justify-center">
                  {p1Choice === 'A' && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-purple-100 border border-zinc-900 text-purple-950">
                      {p1Obj?.nickname}
                    </span>
                  )}
                  {p2Choice === 'A' && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-100 border border-zinc-900 text-emerald-950">
                      {p2Obj?.nickname}
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
          let borderStyle = 'bg-white border-2 border-zinc-900 hover:bg-sky-50 shadow-[3px_3px_0px_#18181b] text-zinc-900';

          if (isRoundOver) {
            if (isMatch && p1Choice === 'B') {
              borderStyle = 'bg-pink-100 border-2 border-zinc-900 shadow-[4px_4px_0px_#18181b] ring-2 ring-zinc-900';
            } else if (p1Choice === 'B' || p2Choice === 'B') {
              borderStyle = 'bg-zinc-100 border-2 border-zinc-900 text-zinc-800';
            } else {
              borderStyle = 'bg-zinc-100 border-2 border-zinc-300 text-zinc-400 opacity-60';
            }
          } else if (isSelected) {
            borderStyle = 'bg-sky-100 border-2 border-zinc-900 shadow-[4px_4px_0px_#18181b] font-black ring-2 ring-zinc-900';
          }

          return (
            <button
              disabled={selectedChoice !== null || isRoundOver}
              onClick={() => handleChoose('B')}
              className={`p-5 rounded-2xl flex flex-col items-center text-center justify-center gap-2 transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer ${borderStyle}`}
            >
              <span className="text-5xl my-1 select-none">{dilemmaData.optionB.emoji}</span>
              <span className="text-sm font-bold">{dilemmaData.optionB.text}</span>

              {/* Reveal Badges */}
              {isRoundOver && (
                <div className="flex gap-1.5 mt-2 flex-wrap justify-center">
                  {p1Choice === 'B' && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-purple-100 border border-zinc-900 text-purple-950">
                      {p1Obj?.nickname}
                    </span>
                  )}
                  {p2Choice === 'B' && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-100 border border-zinc-900 text-emerald-950">
                      {p2Obj?.nickname}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })()}
      </div>

      {isRoundOver && isMatch && (
        <div className="w-full p-3 rounded-2xl bg-pink-100 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] text-center animate-fade-in flex items-center justify-center gap-2 text-pink-950 font-black text-xs">
          <Sparkles className="w-4 h-4 text-pink-600" />
          Kalian sefrekuensi! Pilihan cocok (+15 Poin)
        </div>
      )}
    </div>
  );
};
