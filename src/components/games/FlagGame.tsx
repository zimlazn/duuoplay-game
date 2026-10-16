import React, { useState, useEffect } from 'react';
import { useSocket } from '../../context/SocketContext';
import { Flag, Clock, CheckCircle, XCircle } from 'lucide-react';

export const FlagGame: React.FC = () => {
  const { room, playerId, submitAnswer } = useSocket();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number>(Date.now());

  const flagData = room?.gameState.flagData;
  const status = room?.gameState.status;
  const timeLeft = room?.gameState.timeLeft ?? 0;
  const currentRound = room?.gameState.currentRound ?? 1;
  const totalRounds = room?.gameState.totalRounds ?? 5;
  const playerAnswers = room?.gameState.playerAnswers ?? {};
  const myAnswer = playerId ? playerAnswers[playerId] : null;

  useEffect(() => {
    setSelectedOption(null);
    setStartTime(Date.now());
  }, [flagData?.id]);

  if (!flagData) return null;

  const handleSelectOption = (option: string) => {
    if (selectedOption !== null || myAnswer || status !== 'in_round') return;

    setSelectedOption(option);
    const timeTaken = (Date.now() - startTime) / 1000;
    submitAnswer({
      answer: option,
      timeTaken: parseFloat(timeTaken.toFixed(2))
    });
  };

  const isRoundOver = status === 'round_result';
  const correctAnswer = flagData.countryName;

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-3">
      {/* Round & Timer Header */}
      <div className="w-full flex items-center justify-between px-1 text-xs">
        <span className="font-black text-zinc-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
          <Flag className="w-4 h-4 text-zinc-900 dark:text-amber-400" />
          Babak {currentRound} / {totalRounds}
        </span>
        <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-100 dark:bg-amber-950/80 border-2 border-zinc-900 dark:border-amber-500 shadow-[2px_2px_0px_#18181b] font-mono font-black text-zinc-900 dark:text-amber-200">
          <Clock className="w-3.5 h-3.5" />
          <span>{timeLeft}s</span>
        </div>
      </div>

      {/* Flag Display Card */}
      <div className="w-full flex flex-col items-center justify-center p-6 bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-700 rounded-3xl shadow-[4px_4px_0px_#18181b]">
        {/* Big Emoji Flag */}
        <div className="text-8xl md:text-9xl my-2 select-none filter drop-shadow-sm transition-transform active:scale-105">
          {flagData.flagEmoji}
        </div>

        <p className="text-xs text-zinc-600 dark:text-zinc-400 font-bold text-center mt-1">
          {isRoundOver ? flagData.fact : 'Bendera negara manakah ini?'}
        </p>

        {myAnswer && !isRoundOver && (
          <div className="mt-2 text-xs font-black text-purple-800 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-3 py-1 rounded-xl border border-zinc-900 animate-pulse">
            ✓ Jawabanmu tersimpan! Menunggu lawan...
          </div>
        )}
      </div>

      {/* Multiple Choice Options */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {flagData.options.map((option, idx) => {
          const isSelected = selectedOption === option || myAnswer?.answer === option;
          const isCorrect = option === correctAnswer;

          let btnStyle = 'bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-700 hover:bg-amber-50 dark:hover:bg-zinc-800 shadow-[2px_2px_0px_#18181b] text-zinc-900 dark:text-white';

          if (isRoundOver) {
            if (isCorrect) {
              btnStyle = 'bg-emerald-200 dark:bg-emerald-800 border-2 border-zinc-900 text-emerald-950 dark:text-emerald-100 shadow-[3px_3px_0px_#18181b] font-black';
            } else if (isSelected && !isCorrect) {
              btnStyle = 'bg-pink-100 dark:bg-pink-950 border-2 border-zinc-900 text-pink-900 dark:text-pink-300 line-through opacity-80';
            } else {
              btnStyle = 'bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-300 dark:border-zinc-700 text-zinc-400 opacity-60';
            }
          } else if (isSelected) {
            btnStyle = 'bg-purple-200 dark:bg-purple-900 border-2 border-zinc-900 text-purple-950 dark:text-purple-100 shadow-[3px_3px_0px_#18181b] font-black';
          }

          return (
            <button
              key={idx}
              disabled={selectedOption !== null || isRoundOver}
              onClick={() => handleSelectOption(option)}
              className={`p-3.5 rounded-2xl text-sm font-bold flex items-center justify-between transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer ${btnStyle}`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-900 flex items-center justify-center text-xs font-mono font-black text-zinc-900 dark:text-zinc-200">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-left leading-tight">{option}</span>
              </div>
              {isRoundOver && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />}
              {isRoundOver && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-pink-700 dark:text-pink-400" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
