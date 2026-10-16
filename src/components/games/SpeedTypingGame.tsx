import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../../context/SocketContext';
import { sound } from '../../utils/sound';
import confetti from 'canvas-confetti';
import { Keyboard, Trophy, Sparkles, Clock, Flame, CheckCircle2, Zap } from 'lucide-react';

export const SpeedTypingGame: React.FC = () => {
  const { room, playerId, submitTypingProgress } = useSocket();

  const [inputVal, setInputVal] = useState('');
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [hasFinished, setHasFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const gameState = room?.gameState;
  const typingState = gameState?.speedTypingState;
  const prompt = typingState?.prompt;
  const currentRound = gameState?.currentRound ?? 1;
  const totalRounds = gameState?.totalRounds ?? 5;
  const timeLeft = gameState?.timeLeft ?? 60;
  const isPinkTheme = room?.roomId === 'ACAA' || room?.isSpecialTheme;

  const playerIds = room ? Object.keys(room.players) : [];
  const p1Id = playerIds[0];
  const p2Id = playerIds[1];
  const p1 = p1Id ? room?.players[p1Id] : null;
  const p2 = p2Id ? room?.players[p2Id] : null;

  const myProgress = playerId && typingState?.playerProgress[playerId] ? typingState.playerProgress[playerId] : null;
  const oppId = playerIds.find((id) => id !== playerId);
  const oppProgress = oppId && typingState?.playerProgress[oppId] ? typingState.playerProgress[oppId] : null;

  // Reset state on new prompt / round
  useEffect(() => {
    setInputVal('');
    setHasFinished(false);
    setStartTime(Date.now());
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [prompt?.id, currentRound]);

  // Keep focus on input
  useEffect(() => {
    if (!hasFinished && inputRef.current) {
      inputRef.current.focus();
    }
  }, [hasFinished]);

  if (!typingState || !prompt) return null;

  const targetText = prompt.text;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (hasFinished) return;
    const val = e.target.value;
    setInputVal(val);

    const now = Date.now();
    const elapsedMinutes = Math.max(0.05, (now - startTime) / 60000);

    // Calculate correct chars
    let correctCount = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === targetText[i]) {
        correctCount++;
      }
    }

    const accuracy = val.length > 0 ? Math.round((correctCount / val.length) * 100) : 100;
    const wpm = Math.round((correctCount / 5) / elapsedMinutes);
    const progressPercent = Math.min(100, Math.round((correctCount / targetText.length) * 100));
    const isFinished = val === targetText;

    if (isFinished && !hasFinished) {
      setHasFinished(true);
      sound.playCorrect();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } else {
      // Sound feedback
      if (val.length > inputVal.length) {
        const lastCharIdx = val.length - 1;
        if (val[lastCharIdx] === targetText[lastCharIdx]) {
          sound.playClick();
        } else {
          sound.playWrong();
        }
      }
    }

    submitTypingProgress(progressPercent, val.length, wpm, accuracy, isFinished);
  };

  // Render character-by-character color coded prompt text
  const renderFormattedPrompt = () => {
    const chars = targetText.split('');
    return (
      <p className="font-mono text-base md:text-lg leading-relaxed select-none tracking-wide text-left">
        {chars.map((char, index) => {
          let styleClass = 'text-zinc-400 dark:text-zinc-500';

          if (index < inputVal.length) {
            if (inputVal[index] === char) {
              styleClass = 'text-emerald-700 dark:text-emerald-300 bg-emerald-100/90 dark:bg-emerald-950/80 font-black rounded-xs';
            } else {
              styleClass = 'text-rose-700 dark:text-rose-300 bg-rose-200/90 dark:bg-rose-950/90 font-black underline decoration-2 rounded-xs';
            }
          } else if (index === inputVal.length) {
            styleClass = 'border-b-3 border-amber-500 font-black text-zinc-900 dark:text-white bg-amber-100/70 dark:bg-amber-950/60 animate-pulse';
          }

          return (
            <span key={index} className={styleClass}>
              {char}
            </span>
          );
        })}
      </p>
    );
  };

  const p1ProgressData = p1Id ? typingState.playerProgress[p1Id] : null;
  const p2ProgressData = p2Id ? typingState.playerProgress[p2Id] : null;

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-3 select-none">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between px-1 text-xs">
        <span
          className={`font-black uppercase tracking-wider flex items-center gap-1.5 ${
            isPinkTheme ? 'text-pink-900' : 'text-zinc-800 dark:text-zinc-200'
          }`}
        >
          <Keyboard className={`w-4 h-4 ${isPinkTheme ? 'text-pink-600' : 'text-zinc-900 dark:text-amber-400'}`} />
          Ngetik Cepat • Babak {currentRound} / {totalRounds}
        </span>
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border-2 font-mono font-black ${
            isPinkTheme
              ? 'bg-pink-100 border-pink-400 text-pink-950 shadow-[2px_2px_0px_#f472b6]'
              : 'bg-amber-100 dark:bg-amber-950/80 border-zinc-900 dark:border-amber-500 shadow-[2px_2px_0px_#18181b] text-zinc-900 dark:text-amber-200'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>{timeLeft}s</span>
        </div>
      </div>

      {/* Real-Time Dual Race Track Visualizer */}
      <div
        className={`w-full p-3.5 rounded-3xl border-2 space-y-3 transition-all ${
          isPinkTheme
            ? 'bg-white/95 border-pink-400 shadow-[4px_4px_0px_#f472b6]'
            : 'bg-white dark:bg-zinc-900 border-zinc-900 dark:border-zinc-700 shadow-[4px_4px_0px_#18181b]'
        }`}
      >
        {/* Track 1: Player 1 */}
        {p1 && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-black">
              <div className="flex items-center gap-1.5 truncate">
                <span>{p1.avatar}</span>
                <span className="truncate">{p1.nickname} {p1.id === playerId ? '(Kamu)' : ''}</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="text-zinc-500 dark:text-zinc-400">
                  {p1ProgressData?.wpm ?? 0} KPM
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded-lg border text-[10px] font-black ${
                    p1ProgressData?.isFinished
                      ? 'bg-emerald-400 text-emerald-950 border-zinc-900'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-900'
                  }`}
                >
                  {p1ProgressData?.isFinished ? 'FINISH 🏁' : `${p1ProgressData?.progressPercent ?? 0}%`}
                </span>
              </div>
            </div>
            {/* Race Bar */}
            <div className="w-full h-3 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-900 overflow-hidden relative">
              <div
                style={{ width: `${p1ProgressData?.progressPercent ?? 0}%` }}
                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-200 relative"
              />
            </div>
          </div>
        )}

        {/* Track 2: Player 2 */}
        {p2 && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-black">
              <div className="flex items-center gap-1.5 truncate">
                <span>{p2.avatar}</span>
                <span className="truncate">{p2.nickname} {p2.id === playerId ? '(Kamu)' : ''}</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="text-zinc-500 dark:text-zinc-400">
                  {p2ProgressData?.wpm ?? 0} KPM
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded-lg border text-[10px] font-black ${
                    p2ProgressData?.isFinished
                      ? 'bg-emerald-400 text-emerald-950 border-zinc-900'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-900'
                  }`}
                >
                  {p2ProgressData?.isFinished ? 'FINISH 🏁' : `${p2ProgressData?.progressPercent ?? 0}%`}
                </span>
              </div>
            </div>
            {/* Race Bar */}
            <div className="w-full h-3 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-900 overflow-hidden relative">
              <div
                style={{ width: `${p2ProgressData?.progressPercent ?? 0}%` }}
                className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transition-all duration-200 relative"
              />
            </div>
          </div>
        )}
      </div>

      {/* Target Sentence Card */}
      <div
        className={`w-full p-4 rounded-3xl border-2 space-y-2.5 transition-all relative ${
          isPinkTheme
            ? 'bg-white/95 border-pink-400 shadow-[4px_4px_0px_#f472b6]'
            : 'bg-white dark:bg-zinc-900 border-zinc-900 dark:border-zinc-700 shadow-[4px_4px_0px_#18181b]'
        }`}
      >
        <div className="flex items-center justify-between">
          <span
            className={`px-2.5 py-0.5 rounded-lg border text-[10px] font-black uppercase tracking-wider ${
              isPinkTheme
                ? 'bg-pink-100 border-pink-400 text-pink-900'
                : 'bg-amber-100 dark:bg-amber-950/80 border-zinc-900 dark:border-amber-500 text-amber-950 dark:text-amber-200'
            }`}
          >
            {prompt.category}
          </span>
          <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400">
            {targetText.length - inputVal.length > 0 ? `${targetText.length - inputVal.length} huruf lagi` : 'Selesai!'}
          </span>
        </div>

        {/* Display Text with Color Highlighting */}
        <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 min-h-[90px] flex items-center">
          {renderFormattedPrompt()}
        </div>
      </div>

      {/* Typing Input Box */}
      <div className="w-full space-y-2">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={handleInputChange}
            disabled={hasFinished || timeLeft <= 0}
            placeholder={hasFinished ? '🎉 Kamu sudah menyelesaikan ketikan!' : 'Ketik kalimat persis di atas di sini...'}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            className={`w-full px-4 py-3.5 rounded-2xl border-2 border-zinc-900 text-sm md:text-base font-bold shadow-[4px_4px_0px_#18181b] focus:outline-none transition-all ${
              hasFinished
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border-emerald-600'
                : isPinkTheme
                ? 'bg-white text-pink-950 placeholder-pink-300 focus:ring-2 focus:ring-pink-400'
                : 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 focus:ring-2 focus:ring-amber-400'
            }`}
          />
          {hasFinished && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-emerald-600 font-black text-xs">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          )}
        </div>

        {/* Live Counters Banner */}
        <div className="w-full grid grid-cols-3 gap-2 text-center text-xs">
          <div
            className={`p-2 rounded-2xl border flex flex-col items-center shadow-xs ${
              isPinkTheme
                ? 'bg-pink-50 border-pink-300 text-pink-950'
                : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-900 text-zinc-900 dark:text-zinc-100'
            }`}
          >
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold">Kecepatan</span>
            <span className="font-mono font-black text-sm">{myProgress?.wpm ?? 0} <span className="text-[9px]">KPM</span></span>
          </div>

          <div
            className={`p-2 rounded-2xl border flex flex-col items-center shadow-xs ${
              isPinkTheme
                ? 'bg-pink-50 border-pink-300 text-pink-950'
                : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-900 text-zinc-900 dark:text-zinc-100'
            }`}
          >
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold">Akurasi</span>
            <span className="font-mono font-black text-sm">{myProgress?.accuracy ?? 100}%</span>
          </div>

          <div
            className={`p-2 rounded-2xl border flex flex-col items-center shadow-xs ${
              isPinkTheme
                ? 'bg-pink-50 border-pink-300 text-pink-950'
                : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-900 text-zinc-900 dark:text-zinc-100'
            }`}
          >
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold">Progres</span>
            <span className="font-mono font-black text-sm">{myProgress?.progressPercent ?? 0}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
