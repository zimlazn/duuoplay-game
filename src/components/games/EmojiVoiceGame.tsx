import React, { useState, useEffect } from 'react';
import { useSocket } from '../../context/SocketContext';
import { PhoneCall, Mic, Headphones, Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export const EmojiVoiceGame: React.FC = () => {
  const { room, playerId, submitAnswer } = useSocket();
  const [selectedGuess, setSelectedGuess] = useState<string | null>(null);

  const emojiData = room?.gameState.emojiVoiceData;
  const status = room?.gameState.status;
  const timeLeft = room?.gameState.timeLeft ?? 0;
  const currentRound = room?.gameState.currentRound ?? 1;
  const totalRounds = room?.gameState.totalRounds ?? 5;
  const playerAnswers = room?.gameState.playerAnswers ?? {};

  useEffect(() => {
    setSelectedGuess(null);
  }, [emojiData?.id]);

  if (!emojiData) return null;

  const isDescriber = playerId === emojiData.describerPlayerId;
  const isGuesser = playerId === emojiData.guesserPlayerId;
  const isRoundOver = status === 'round_result';
  const guesserAnswer = playerAnswers[emojiData.guesserPlayerId];

  const handleGuess = (emoji: string) => {
    if (selectedGuess !== null || isRoundOver || !isGuesser) return;
    setSelectedGuess(emoji);
    submitAnswer({
      answer: emoji
    });
  };

  const describerName = room?.players[emojiData.describerPlayerId]?.nickname || 'Pemberi Clue';
  const guesserName = room?.players[emojiData.guesserPlayerId]?.nickname || 'Penebak';

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-3">
      {/* Header Info */}
      <div className="w-full flex items-center justify-between px-1 text-xs">
        <span className="font-black text-zinc-800 uppercase tracking-wider flex items-center gap-1.5">
          <PhoneCall className="w-4 h-4 text-zinc-900" />
          Babak {currentRound} / {totalRounds}
        </span>
        <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-100 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] font-mono font-black text-zinc-900">
          <Clock className="w-3.5 h-3.5 text-zinc-900" />
          <span>{timeLeft}s</span>
        </div>
      </div>

      {/* Role Banner */}
      <div className={`w-full p-3 rounded-2xl border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] flex items-center justify-between text-xs font-black ${
        isDescriber
          ? 'bg-purple-100 text-purple-950'
          : 'bg-emerald-100 text-emerald-950'
      }`}>
        <div className="flex items-center gap-2">
          {isDescriber ? (
            <Mic className="w-4 h-4 text-purple-900" />
          ) : (
            <Headphones className="w-4 h-4 text-emerald-900" />
          )}
          <span>
            {isDescriber
              ? 'PERANMU: PEMBERI CLUE (Bicara di WhatsApp!)'
              : 'PERANMU: PENEBAK (Dengarkan di WhatsApp!)'}
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white border border-zinc-900">
          Voice Call
        </span>
      </div>

      {/* DESCRIBER VIEW */}
      {isDescriber && (
        <div className="w-full p-5 bg-white border-2 border-zinc-900 rounded-3xl shadow-[4px_4px_0px_#18181b] flex flex-col items-center text-center">
          <span className="text-[11px] font-black text-purple-950 uppercase tracking-wider">
            Emoji Rahasia (Hanya Tampil di Layarmu)
          </span>

          <div className="text-8xl my-3 select-none filter drop-shadow-sm animate-bounce-slow">
            {emojiData.targetEmoji}
          </div>

          <h3 className="text-lg font-black text-zinc-900">{emojiData.name}</h3>
          <span className="text-xs text-zinc-500 font-bold mb-2">
            Kategori: {emojiData.category}
          </span>

          {/* Forbidden Words Box */}
          <div className="w-full p-3.5 bg-pink-50 border-2 border-zinc-900 rounded-2xl text-left my-2 shadow-[2px_2px_0px_#18181b]">
            <div className="flex items-center gap-1.5 text-pink-950 font-black text-xs mb-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              Kata Terlarang (DILARANG diucapkan di telepon!):
            </div>
            <div className="flex flex-wrap gap-1.5">
              {emojiData.forbiddenWords.map((word, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-white border border-zinc-900 text-pink-950 text-xs font-mono font-black"
                >
                  ✕ {word}
                </span>
              ))}
            </div>
          </div>

          <p className="text-xs text-zinc-700 mt-2 bg-zinc-50 p-2.5 rounded-xl border border-zinc-900 font-bold">
            🎙️ <strong>Tugasmu:</strong> Jelaskan ciri emoji ini lewat panggilan suara sekarang ke{' '}
            <span className="underline text-emerald-800">{guesserName}</span>!
          </p>
        </div>
      )}

      {/* GUESSER VIEW */}
      {isGuesser && (
        <div className="w-full flex flex-col items-center gap-3">
          <div className="w-full p-5 bg-white border-2 border-zinc-900 rounded-3xl shadow-[4px_4px_0px_#18181b] flex flex-col items-center text-center">
            <span className="text-4xl mb-1">🎧</span>
            <h3 className="text-sm font-black text-zinc-900">
              Dengarkan Suara dari {describerName} di WhatsApp Call
            </h3>
            <p className="text-xs text-zinc-600 font-medium mt-1">
              Pilih emoji yang paling sesuai dengan petunjuk suaranya:
            </p>
          </div>

          {/* Guesser Options Grid */}
          <div className="w-full grid grid-cols-2 gap-2.5">
            {emojiData.options.map((option, idx) => {
              const isSelected = selectedGuess === option.emoji || guesserAnswer?.answer === option.emoji;
              const isCorrect = option.emoji === emojiData.targetEmoji;

              let btnStyle = 'bg-white border-2 border-zinc-900 hover:bg-emerald-50 text-zinc-900 shadow-[2px_2px_0px_#18181b]';

              if (isRoundOver) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-200 border-2 border-zinc-900 text-emerald-950 shadow-[3px_3px_0px_#18181b] font-black';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-pink-100 border-2 border-zinc-900 text-pink-900 line-through opacity-80';
                } else {
                  btnStyle = 'bg-zinc-100 border-2 border-zinc-300 text-zinc-400 opacity-60';
                }
              } else if (isSelected) {
                btnStyle = 'bg-emerald-200 border-2 border-zinc-900 text-emerald-950 shadow-[3px_3px_0px_#18181b] font-black';
              }

              return (
                <button
                  key={idx}
                  disabled={selectedGuess !== null || isRoundOver}
                  onClick={() => handleGuess(option.emoji)}
                  className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer ${btnStyle}`}
                >
                  <span className="text-4xl select-none">{option.emoji}</span>
                  <span className="text-xs font-bold text-center">{option.name}</span>
                  {isRoundOver && isCorrect && (
                    <span className="text-[10px] text-emerald-950 font-black flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Benar!
                    </span>
                  )}
                  {isRoundOver && isSelected && !isCorrect && (
                    <span className="text-[10px] text-pink-950 font-black flex items-center gap-1">
                      <XCircle className="w-3 h-3" /> Salah
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ROUND OVER REVEAL */}
      {isRoundOver && (
        <div className="w-full p-3 rounded-2xl bg-amber-100 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] text-center animate-fade-in">
          <p className="text-xs text-zinc-900 font-black">
            Emoji Rahasia: {emojiData.targetEmoji} ({emojiData.name})
          </p>
        </div>
      )}
    </div>
  );
};
