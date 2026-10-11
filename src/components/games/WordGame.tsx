import React, { useState, useEffect } from 'react';
import { useSocket } from '../../context/SocketContext';
import { BookOpen, Clock, Lightbulb, CheckCircle, XCircle } from 'lucide-react';

export const WordGame: React.FC = () => {
  const { room, playerId, submitAnswer } = useSocket();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(Date.now());

  const wordData = room?.gameState.wordData;
  const status = room?.gameState.status;
  const timeLeft = room?.gameState.timeLeft ?? 0;
  const currentRound = room?.gameState.currentRound ?? 1;
  const totalRounds = room?.gameState.totalRounds ?? 5;
  const playerAnswers = room?.gameState.playerAnswers ?? {};
  const myAnswer = playerId ? playerAnswers[playerId] : null;

  useEffect(() => {
    setSelectedOption(null);
    setShowHint(false);
    setStartTime(Date.now());
  }, [wordData?.id]);

  if (!wordData) return null;

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
  const correctAnswer = wordData.word;

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-3">
      {/* Round & Timer Header */}
      <div className="w-full flex items-center justify-between px-1 text-xs">
        <span className="font-black text-zinc-800 uppercase tracking-wider flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-zinc-900" />
          Babak {currentRound} / {totalRounds}
        </span>
        <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-purple-100 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] font-mono font-black text-zinc-900">
          <Clock className="w-3.5 h-3.5 text-zinc-900" />
          <span>{timeLeft}s</span>
        </div>
      </div>

      {/* Riddle Card */}
      <div className="w-full p-5 bg-white border-2 border-zinc-900 rounded-3xl shadow-[4px_4px_0px_#18181b] flex flex-col items-center text-center">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-black px-2.5 py-0.5 rounded-lg bg-purple-100 text-purple-950 border border-zinc-900">
            {wordData.category}
          </span>
          <span className="text-[11px] font-mono font-bold text-zinc-500">
            {wordData.word.length} Huruf
          </span>
        </div>

        {/* Clue Text */}
        <p className="text-sm font-bold text-zinc-800 leading-relaxed my-2 max-w-sm">
          "{wordData.clue}"
        </p>

        {/* Word Letter Blanks */}
        <div className="flex items-center justify-center gap-1.5 my-3 flex-wrap">
          {wordData.word.split('').map((char, index) => (
            <div
              key={index}
              className="w-7 h-9 rounded-lg bg-zinc-50 border-2 border-zinc-900 flex items-center justify-center font-mono font-black text-base text-zinc-900 shadow-[1px_1px_0px_#18181b]"
            >
              {isRoundOver ? char : '_'}
            </div>
          ))}
        </div>

        {/* Hint button */}
        {!showHint && !isRoundOver ? (
          <button
            onClick={() => setShowHint(true)}
            className="flex items-center gap-1.5 text-xs text-amber-950 font-black py-1 px-3 rounded-xl bg-amber-100 hover:bg-amber-200 border border-zinc-900 shadow-[1px_1px_0px_#18181b] transition active:scale-95 cursor-pointer"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            Petunjuk Tambahan
          </button>
        ) : (
          <p className="text-xs text-amber-950 bg-amber-50 border border-zinc-900 px-3 py-1.5 rounded-xl font-bold mt-1">
            💡 {wordData.hint}
          </p>
        )}

        {myAnswer && !isRoundOver && (
          <div className="mt-2 text-xs font-black text-purple-800 bg-purple-50 px-3 py-1 rounded-xl border border-zinc-900 animate-pulse">
            ✓ Jawabanmu tersimpan! Menunggu lawan...
          </div>
        )}
      </div>

      {/* Multiple Choice Options */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {wordData.options.map((option, idx) => {
          const isSelected = selectedOption === option || myAnswer?.answer === option;
          const isCorrect = option === correctAnswer;

          let btnStyle = 'bg-white border-2 border-zinc-900 hover:bg-purple-50 shadow-[2px_2px_0px_#18181b] text-zinc-900';

          if (isRoundOver) {
            if (isCorrect) {
              btnStyle = 'bg-emerald-200 border-2 border-zinc-900 text-emerald-950 shadow-[3px_3px_0px_#18181b] font-black';
            } else if (isSelected && !isCorrect) {
              btnStyle = 'bg-pink-100 border-2 border-zinc-900 text-pink-900 line-through opacity-80';
            } else {
              btnStyle = 'bg-zinc-100 border-2 border-zinc-300 text-zinc-400 opacity-60';
            }
          } else if (isSelected) {
            btnStyle = 'bg-purple-200 border-2 border-zinc-900 text-purple-950 shadow-[3px_3px_0px_#18181b] font-black';
          }

          return (
            <button
              key={idx}
              disabled={selectedOption !== null || isRoundOver}
              onClick={() => handleSelectOption(option)}
              className={`p-3.5 rounded-2xl text-sm font-bold flex items-center justify-between transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer ${btnStyle}`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-zinc-100 border border-zinc-900 flex items-center justify-center text-xs font-mono font-black text-zinc-900">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option}</span>
              </div>

              {isRoundOver && isCorrect && (
                <CheckCircle className="w-4 h-4 text-emerald-900 shrink-0" />
              )}
              {isRoundOver && isSelected && !isCorrect && (
                <XCircle className="w-4 h-4 text-pink-900 shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
