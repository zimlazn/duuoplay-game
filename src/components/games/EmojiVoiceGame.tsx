import React, { useState, useEffect } from 'react';
import { useSocket } from '../../context/SocketContext';
import { PhoneCall, Clock, Mic, Headphones, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export const EmojiVoiceGame: React.FC = () => {
  const { room, playerId, submitAnswer } = useSocket();
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  const emojiData = room?.gameState.emojiVoiceData;
  const status = room?.gameState.status;
  const timeLeft = room?.gameState.timeLeft ?? 0;
  const currentRound = room?.gameState.currentRound ?? 1;
  const totalRounds = room?.gameState.totalRounds ?? 5;
  const playerAnswers = room?.gameState.playerAnswers ?? {};
  const myAnswer = playerId ? playerAnswers[playerId] : null;

  useEffect(() => {
    setSelectedEmoji(null);
  }, [emojiData?.id]);

  if (!emojiData) return null;

  const isDescriber = playerId === emojiData.describerPlayerId;
  const isGuesser = playerId === emojiData.guesserPlayerId;
  const isRoundOver = status === 'round_result';

  const describerName = room?.players[emojiData.describerPlayerId]?.nickname || 'Pemberi Clue';
  const guesserName = room?.players[emojiData.guesserPlayerId]?.nickname || 'Penebak';

  const handleSelectEmoji = (emoji: string) => {
    if (!isGuesser || selectedEmoji !== null || myAnswer || status !== 'in_round') return;
    setSelectedEmoji(emoji);
    submitAnswer({ answer: emoji });
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-3">
      {/* Header Info */}
      <div className="w-full flex items-center justify-between px-1 text-xs">
        <span className="font-black text-zinc-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
          <PhoneCall className="w-4 h-4 text-zinc-900 dark:text-amber-400" />
          Babak {currentRound} / {totalRounds}
        </span>
        <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border-2 border-zinc-900 dark:border-emerald-500 shadow-[2px_2px_0px_#18181b] font-mono font-black text-zinc-900 dark:text-emerald-200">
          <Clock className="w-3.5 h-3.5" />
          <span>{timeLeft}s</span>
        </div>
      </div>

      {/* Role Banner */}
      <div
        className={`w-full p-3 rounded-2xl border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] flex items-center justify-between text-xs font-black ${
          isDescriber
            ? 'bg-purple-100 dark:bg-purple-950/80 text-purple-950 dark:text-purple-200'
            : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-950 dark:text-emerald-200'
        }`}
      >
        <div className="flex items-center gap-2">
          {isDescriber ? (
            <Mic className="w-4 h-4 text-purple-900 dark:text-purple-300" />
          ) : (
            <Headphones className="w-4 h-4 text-emerald-900 dark:text-emerald-300" />
          )}
          <span>
            {isDescriber
              ? 'PERANMU: PEMBERI CLUE (Bicara di Telepon! Kamu 0 poin)'
              : 'PERANMU: PENEBAK (Dengarkan & Tebak! +15 poin)'}
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white dark:bg-zinc-800 border border-zinc-900">
          Voice Call
        </span>
      </div>

      {/* DESCRIBER VIEW */}
      {isDescriber && (
        <div className="w-full p-5 bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-700 rounded-3xl shadow-[4px_4px_0px_#18181b] flex flex-col items-center text-center">
          <span className="text-[11px] font-black text-purple-950 dark:text-purple-300 uppercase tracking-wider">
            Emoji Rahasia (Hanya Tampil di Layarmu)
          </span>

          <div className="text-8xl my-3 select-none filter drop-shadow-sm animate-bounce-slow">
            {emojiData.targetEmoji}
          </div>

          <h3 className="text-lg font-black text-zinc-900 dark:text-white">{emojiData.name}</h3>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-bold mb-2">
            Kategori: {emojiData.category}
          </span>

          {/* Forbidden Words Alert */}
          <div className="w-full mt-3 p-3.5 rounded-2xl bg-pink-50 dark:bg-pink-950/60 border-2 border-zinc-900 dark:border-pink-600 shadow-[2px_2px_0px_#18181b]">
            <div className="flex items-center justify-center gap-1.5 text-xs font-black text-pink-950 dark:text-pink-300 mb-2">
              <AlertTriangle className="w-4 h-4 text-pink-700 dark:text-pink-400" />
              <span>KATA TERLARANG (DILARANG DISEBUT!):</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {emojiData.forbiddenWords.map((word, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-xs font-black bg-white dark:bg-zinc-800 text-pink-900 dark:text-pink-300 border border-zinc-900 rounded-lg shadow-[1px_1px_0px_#18181b]"
                >
                  ✕ {word}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-900 text-xs font-bold text-zinc-600 dark:text-zinc-300">
            Jelaskan emoji di atas lewat panggilan suara WhatsApp tanpa menyebut kata terlarang!
          </div>
        </div>
      )}

      {/* GUESSER VIEW */}
      {isGuesser && (
        <div className="w-full flex flex-col items-center gap-3">
          <div className="w-full p-4 bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-700 rounded-3xl shadow-[4px_4px_0px_#18181b] text-center">
            <span className="text-xs font-black text-emerald-900 dark:text-emerald-300 uppercase tracking-wider block mb-1">
              Dengarkan Suara {describerName}!
            </span>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 font-bold">
              {describerName} sedang memberikan petunjuk lewat telepon. Pilih emoji yang dimaksud:
            </p>
          </div>

          <div className="w-full grid grid-cols-2 gap-2.5">
            {emojiData.options.map((opt, idx) => {
              const isSelected = selectedEmoji === opt.emoji || myAnswer?.answer === opt.emoji;
              const isCorrect = opt.emoji === emojiData.targetEmoji;

              let btnStyle = 'bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-700 hover:bg-emerald-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white';

              if (isRoundOver) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-200 dark:bg-emerald-800 border-2 border-zinc-900 text-emerald-950 dark:text-emerald-100 font-black shadow-[3px_3px_0px_#18181b]';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-pink-100 dark:bg-pink-950 border-2 border-zinc-900 text-pink-900 dark:text-pink-300 line-through opacity-80';
                } else {
                  btnStyle = 'bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-300 dark:border-zinc-700 text-zinc-400 opacity-60';
                }
              } else if (isSelected) {
                btnStyle = 'bg-emerald-200 dark:bg-emerald-800 border-2 border-zinc-900 text-emerald-950 dark:text-emerald-100 font-black shadow-[3px_3px_0px_#18181b]';
              }

              return (
                <button
                  key={idx}
                  disabled={selectedEmoji !== null || isRoundOver}
                  onClick={() => handleSelectEmoji(opt.emoji)}
                  className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all active:translate-x-[1px] active:translate-y-[1px] cursor-pointer shadow-[2px_2px_0px_#18181b] ${btnStyle}`}
                >
                  <span className="text-4xl my-1 select-none">{opt.emoji}</span>
                  <span className="text-xs font-black text-center truncate max-w-full">
                    {opt.name}
                  </span>
                  {isRoundOver && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-400 mt-1" />}
                  {isRoundOver && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-pink-700 dark:text-pink-400 mt-1" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
