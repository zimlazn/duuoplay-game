import React, { useState, useEffect } from 'react';
import { useSocket } from '../../context/SocketContext';
import { sound } from '../../utils/sound';
import confetti from 'canvas-confetti';
import {
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  Trophy,
  Target,
  Edit3,
  Flame,
  ArrowRight
} from 'lucide-react';

export const FindAndMarkGame: React.FC = () => {
  const {
    room,
    playerId,
    setFindAndMarkTargetNumber,
    markFindAndMarkCell,
    submitFindAndMarkSeekerGuess
  } = useSocket();

  const [selectedNumInput, setSelectedNumInput] = useState<number>(() => Math.floor(Math.random() * 90) + 10);
  const [wrongTaps, setWrongTaps] = useState<number[]>([]);

  const gameState = room?.gameState;
  const fam = gameState?.findAndMarkState;
  const isPinkTheme = room?.roomId === 'ACAA' || room?.isSpecialTheme;

  const playerIds = room ? Object.keys(room.players) : [];
  const p1 = playerIds[0] ? room?.players[playerIds[0]] : null;
  const p2 = playerIds[1] ? room?.players[playerIds[1]] : null;

  const isSetter = fam?.setterPlayerId === playerId;
  const isSeeker = fam?.seekerPlayerId === playerId;

  const myBoard = playerId && fam?.playerBoards[playerId] ? fam.playerBoards[playerId] : Array(49).fill(0);
  const oppId = playerIds.find((id) => id !== playerId);
  const oppBoard = oppId && fam?.playerBoards[oppId] ? fam.playerBoards[oppId] : Array(49).fill(0);

  const myCompletedCount = playerId && fam?.playerCompletedCount[playerId] ? fam.playerCompletedCount[playerId] : 0;
  const oppCompletedCount = oppId && fam?.playerCompletedCount[oppId] ? fam.playerCompletedCount[oppId] : 0;

  // Sound effect when time is ticking low
  useEffect(() => {
    if (fam?.phase === 'seeking_and_marking' && fam.timeLeftSeconds <= 5 && fam.timeLeftSeconds > 0) {
      sound.playTick();
    }
  }, [fam?.phase, fam?.timeLeftSeconds]);

  // Reset wrong taps when phase changes
  useEffect(() => {
    setWrongTaps([]);
  }, [fam?.phase, fam?.turnNumber]);

  // Confetti on win
  useEffect(() => {
    if (fam?.phase === 'game_finished' && fam.winnerPlayerId === playerId) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      sound.playCorrect();
    }
  }, [fam?.phase, fam?.winnerPlayerId, playerId]);

  if (!fam) return null;

  const handleCellClick = (index: number) => {
    if (!isSetter || fam.phase !== 'seeking_and_marking') return;
    markFindAndMarkCell(index);
  };

  const handleNumberGuess = (num: number) => {
    if (!isSeeker || fam.phase !== 'seeking_and_marking') return;

    if (num === fam.targetNumber) {
      sound.playCorrect();
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.65 }
      });
      submitFindAndMarkSeekerGuess(num);
    } else {
      sound.playPop();
      setWrongTaps((prev) => [...prev, num]);
      setTimeout(() => {
        setWrongTaps((prev) => prev.filter((n) => n !== num));
      }, 700);
    }
  };

  const timerRatio = Math.max(0, Math.min(1, fam.timeLeftSeconds / 25));
  const timerColor =
    fam.timeLeftSeconds > 12
      ? 'bg-emerald-500'
      : fam.timeLeftSeconds > 5
      ? 'bg-amber-500'
      : 'bg-rose-500 animate-pulse';

  return (
    <div className="w-full flex flex-col items-center gap-3">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between px-1 text-xs">
        <span
          className={`font-black uppercase tracking-wider flex items-center gap-1.5 ${
            isPinkTheme ? 'text-pink-900 font-extrabold' : 'text-zinc-700 dark:text-zinc-300'
          }`}
        >
          <Target className="w-4 h-4 text-rose-500" />
          Find & Mark • Giliran #{fam.turnNumber}
        </span>

        {/* Role Badge */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border-2 font-black text-xs ${
            isSetter
              ? 'bg-amber-100 text-amber-950 border-amber-500 shadow-[2px_2px_0px_#f59e0b]'
              : 'bg-sky-100 text-sky-950 border-sky-500 shadow-[2px_2px_0px_#0284c7]'
          }`}
        >
          {isSetter ? <Edit3 className="w-3.5 h-3.5" /> : <Search className="w-3.5 h-3.5" />}
          <span>{isSetter ? 'Kamu: Pencoret Papan' : 'Kamu: Pencari Angka'}</span>
        </div>
      </div>

      {/* Players Progress Bar (7x7 / 49 Boxes) */}
      <div className="w-full grid grid-cols-2 gap-2">
        {p1 && (
          <div
            className={`p-2 rounded-2xl border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] flex items-center justify-between transition-all ${
              fam.setterPlayerId === p1.id
                ? 'bg-amber-100 dark:bg-amber-950/70 border-amber-600 ring-2 ring-amber-400'
                : 'bg-white dark:bg-zinc-800'
            }`}
          >
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-sm">{p1.avatar}</span>
              <span className="text-xs font-black truncate text-zinc-900 dark:text-white">
                {p1.nickname}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-900">
                {fam.playerCompletedCount[p1.id] || 0}/49 ❌
              </span>
            </div>
          </div>
        )}

        {p2 && (
          <div
            className={`p-2 rounded-2xl border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] flex items-center justify-between transition-all ${
              fam.setterPlayerId === p2.id
                ? 'bg-amber-100 dark:bg-amber-950/70 border-amber-600 ring-2 ring-amber-400'
                : 'bg-white dark:bg-zinc-800'
            }`}
          >
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-sm">{p2.avatar}</span>
              <span className="text-xs font-black truncate text-zinc-900 dark:text-white">
                {p2.nickname}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-900">
                {fam.playerCompletedCount[p2.id] || 0}/49 ❌
              </span>
            </div>
          </div>
        )}
      </div>

      {/* PHASE 1: PICK NUMBER */}
      {fam.phase === 'pick_number' && (
        <div
          className={`w-full p-5 rounded-3xl border-3 border-zinc-900 shadow-[4px_4px_0px_#18181b] flex flex-col items-center text-center transition-all ${
            isPinkTheme ? 'bg-pink-100/95' : 'bg-white dark:bg-zinc-900'
          }`}
        >
          {isSetter ? (
            <>
              <div className="w-12 h-12 rounded-2xl bg-amber-200 border-2 border-zinc-900 flex items-center justify-center text-2xl shadow-[2px_2px_0px_#18181b] mb-3">
                🎯
              </div>
              <h3 className="text-base font-black text-zinc-900 dark:text-white mb-1">
                Tentukan Angka Rahasia!
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-sm mb-4 leading-relaxed">
                Pilih angka di bawah yang harus dicari lawan. Selama lawan mencari dalam{' '}
                <strong className="text-amber-600 dark:text-amber-400">25 detik</strong>, kamu akan
                mencoret kotak di papan 7x7 milikmu sebanyak mungkin!
              </p>

              {/* Quick Choice Buttons */}
              <div className="grid grid-cols-4 gap-2 w-full max-w-xs mb-4">
                {[17, 34, 58, 82].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      setSelectedNumInput(num);
                      sound.playClick();
                    }}
                    className={`py-2 rounded-xl border-2 border-zinc-900 text-sm font-black font-mono shadow-[2px_2px_0px_#18181b] cursor-pointer active:scale-95 transition-all ${
                      selectedNumInput === num
                        ? 'bg-amber-400 text-zinc-950 scale-105'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              {/* Custom Number Input & Randomize */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Atau Angka Pilihanmu:
                </span>
                <input
                  type="number"
                  min="10"
                  max="99"
                  value={selectedNumInput}
                  onChange={(e) => setSelectedNumInput(Number(e.target.value) || 10)}
                  className="w-20 text-center py-1 rounded-xl border-2 border-zinc-900 bg-white dark:bg-zinc-800 font-mono font-black text-sm text-zinc-900 dark:text-white shadow-[2px_2px_0px_#18181b]"
                />
                <button
                  onClick={() => {
                    setSelectedNumInput(Math.floor(Math.random() * 90) + 10);
                    sound.playClick();
                  }}
                  title="Angka Acak"
                  className="px-2.5 py-1 rounded-xl border-2 border-zinc-900 bg-zinc-200 dark:bg-zinc-700 font-black text-xs active:scale-95 cursor-pointer shadow-[2px_2px_0px_#18181b]"
                >
                  🎲 Acak
                </button>
              </div>

              {/* Start Button */}
              <button
                onClick={() => setFindAndMarkTargetNumber(selectedNumInput)}
                className="w-full max-w-xs py-3 rounded-2xl border-3 border-zinc-900 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-zinc-950 font-black text-sm shadow-[4px_4px_0px_#18181b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer flex items-center justify-center gap-2 transition-all"
              >
                <span>🚀 Mulai Sembunyikan & Coret!</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="py-6 flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-sky-200 border-2 border-zinc-900 flex items-center justify-center text-3xl shadow-[3px_3px_0px_#18181b] animate-bounce mb-3">
                🔍
              </div>
              <h3 className="text-base font-black text-zinc-900 dark:text-white mb-1">
                Lawan Sedang Memilih Angka...
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-xs leading-relaxed">
                Siapkan matamu! Begitu angka ditentukan, kamu memiliki waktu{' '}
                <strong className="text-sky-600 dark:text-sky-400">25 detik</strong> untuk mencarinya di antara tumpukan angka acak.
              </p>
            </div>
          )}
        </div>
      )}

      {/* PHASE 2: SEEKING & MARKING (THE MAIN BATTLE) */}
      {fam.phase === 'seeking_and_marking' && (
        <div className="w-full flex flex-col items-center gap-3">
          {/* Synchronized 25s Countdown Bar */}
          <div className="w-full bg-white dark:bg-zinc-900 p-2.5 rounded-2xl border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs font-black">
              <div className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>Waktu Pencarian:</span>
              </div>
              <span
                className={`font-mono text-sm px-2.5 py-0.5 rounded-lg border border-zinc-900 font-black ${
                  fam.timeLeftSeconds <= 5
                    ? 'bg-rose-200 text-rose-950 animate-pulse'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'
                }`}
              >
                {fam.timeLeftSeconds}s
              </span>
            </div>
            <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full border border-zinc-900 overflow-hidden relative">
              <div
                className={`h-full transition-all duration-1000 ease-linear ${timerColor}`}
                style={{ width: `${timerRatio * 100}%` }}
              />
            </div>
          </div>

          {/* ROLE VIEW: SETTER (MARKER BOARD 7x7) */}
          {isSetter && (
            <div
              className={`w-full p-4 rounded-3xl border-3 border-zinc-900 shadow-[4px_4px_0px_#18181b] flex flex-col items-center transition-all ${
                isPinkTheme ? 'bg-pink-50' : 'bg-[#FFFDF7] dark:bg-zinc-900'
              }`}
            >
              <div className="w-full flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-black text-amber-950 dark:text-amber-200">
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>Coret Kotakmu Secepat Mungkin!</span>
                </div>
                <span className="text-[11px] font-mono font-bold bg-amber-200 dark:bg-amber-900 text-amber-950 dark:text-amber-200 px-2 py-0.5 rounded-md border border-zinc-900">
                  {myCompletedCount}/49 Penuh
                </span>
              </div>

              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mb-3 text-center">
                Aturan: Klik 1x = <strong className="text-zinc-900 dark:text-white">/ (1 garis)</strong>, Klik 2x ={' '}
                <strong className="text-rose-600 dark:text-rose-400">X (silang penuh)</strong>.
              </p>

              {/* 7x7 BOARD (49 CELLS) */}
              <div className="w-full max-w-[340px] aspect-square grid grid-cols-7 gap-1 sm:gap-1.5 p-2 bg-zinc-200 dark:bg-zinc-950 rounded-2xl border-2 border-zinc-900 shadow-inner">
                {myBoard.map((cellState, idx) => {
                  return (
                    <button
                      key={`cell_${idx}`}
                      onClick={() => handleCellClick(idx)}
                      disabled={cellState === 2}
                      className={`relative aspect-square rounded-lg border border-zinc-900 transition-all cursor-pointer flex items-center justify-center select-none active:scale-90 ${
                        cellState === 2
                          ? 'bg-rose-100 dark:bg-rose-950/70 border-rose-600 shadow-xs cursor-default'
                          : cellState === 1
                          ? 'bg-amber-100 dark:bg-amber-950/60 hover:bg-amber-200'
                          : 'bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 shadow-xs'
                      }`}
                    >
                      {/* Cell State 1: Single Diagonal Slash ( / ) */}
                      {cellState === 1 && (
                        <svg viewBox="0 0 24 24" className="w-full h-full p-1 stroke-amber-700 dark:stroke-amber-400">
                          <line x1="19" y1="5" x2="5" y2="19" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                      )}

                      {/* Cell State 2: Full Cross ( X ) */}
                      {cellState === 2 && (
                        <svg viewBox="0 0 24 24" className="w-full h-full p-1 stroke-rose-600 dark:stroke-rose-400">
                          <line x1="19" y1="5" x2="5" y2="19" strokeWidth="3.2" strokeLinecap="round" />
                          <line x1="5" y1="5" x2="19" y2="19" strokeWidth="3.2" strokeLinecap="round" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 text-xs text-zinc-600 dark:text-zinc-400 text-center flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-sky-500 animate-spin" />
                <span>
                  Lawan sedang mencari angka <strong className="font-mono text-zinc-900 dark:text-white font-black">{fam.targetNumber}</strong>!
                </span>
              </div>
            </div>
          )}

          {/* ROLE VIEW: SEEKER (RANDOM NUMBER SCRAMBLE POOL) */}
          {isSeeker && (
            <div
              className={`w-full p-4 rounded-3xl border-3 border-zinc-900 shadow-[4px_4px_0px_#18181b] flex flex-col items-center transition-all ${
                isPinkTheme ? 'bg-pink-50' : 'bg-[#F0FDF4] dark:bg-zinc-900'
              }`}
            >
              {/* TARGET NUMBER BIG BANNER */}
              <div className="w-full p-3 rounded-2xl bg-gradient-to-r from-sky-400 via-sky-300 to-indigo-400 border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-white border border-zinc-900 shadow-xs">
                    <Search className="w-5 h-5 text-sky-700" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-black tracking-wider text-sky-950 block">
                      Target Pencarian:
                    </span>
                    <span className="text-xl sm:text-2xl font-black font-mono text-zinc-950">
                      Angka {fam.targetNumber}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-black text-sky-950 block">Papan Lawan:</span>
                  <span className="text-xs font-mono font-black bg-white/90 px-2 py-0.5 rounded-md border border-zinc-900 text-zinc-900">
                    {oppCompletedCount}/49 ❌
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mb-2 text-center">
                Ketuk angka <strong className="text-sky-700 dark:text-sky-300 font-bold">{fam.targetNumber}</strong> di antara tumpukan angka acak ini secepat mungkin!
              </p>

              {/* 8x8 = 64 RANDOM NUMBER POOL */}
              <div className="w-full max-w-[340px] aspect-square grid grid-cols-8 gap-1 p-2 bg-zinc-200 dark:bg-zinc-950 rounded-2xl border-2 border-zinc-900 shadow-inner">
                {fam.numberPool.map((num, i) => {
                  const isWrong = wrongTaps.includes(num);
                  return (
                    <button
                      key={`num_${i}_${num}`}
                      onClick={() => handleNumberGuess(num)}
                      className={`aspect-square rounded-md border border-zinc-900 font-mono font-black text-[11px] sm:text-xs flex items-center justify-center transition-all cursor-pointer active:scale-90 select-none ${
                        isWrong
                          ? 'bg-rose-500 text-white animate-shake'
                          : 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-sky-200 dark:hover:bg-sky-900 hover:scale-105'
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* PHASE 3: TURN RECAP */}
      {fam.phase === 'turn_recap' && (
        <div
          className={`w-full p-5 rounded-3xl border-3 border-zinc-900 shadow-[4px_4px_0px_#18181b] flex flex-col items-center text-center animate-fade-in ${
            fam.lastTurnResult?.found
              ? 'bg-emerald-50 dark:bg-emerald-950/60'
              : 'bg-amber-50 dark:bg-amber-950/60'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center text-2xl shadow-[2px_2px_0px_#18181b] mb-3">
            {fam.lastTurnResult?.found ? '🎯' : '⏳'}
          </div>
          <h3 className="text-base font-black text-zinc-900 dark:text-white mb-1">
            {fam.lastTurnResult?.found ? 'Angka Berhasil Ditemukan!' : 'Waktu Pencarian Habis!'}
          </h3>
          <p className="text-xs text-zinc-700 dark:text-zinc-300 mb-4 leading-relaxed max-w-sm">
            {fam.lastTurnResult?.message}
          </p>

          <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Tukar peran giliran berikutnya dalam sekejap...</span>
          </div>
        </div>
      )}

      {/* PHASE 4: GAME FINISHED */}
      {fam.phase === 'game_finished' && (
        <div className="w-full p-6 rounded-3xl border-3 border-zinc-900 bg-gradient-to-b from-amber-100 to-amber-200 dark:from-amber-950 dark:to-zinc-900 shadow-[6px_6px_0px_#18181b] flex flex-col items-center text-center animate-scale-up">
          <div className="w-16 h-16 rounded-3xl bg-amber-400 border-3 border-zinc-900 flex items-center justify-center text-3xl shadow-[3px_3px_0px_#18181b] animate-bounce mb-3">
            🏆
          </div>
          <h2 className="text-xl font-black text-zinc-950 dark:text-white mb-1">
            Pemenang Find & Mark!
          </h2>
          <p className="text-xs text-zinc-700 dark:text-zinc-300 max-w-xs mb-4">
            {fam.winnerPlayerId === playerId
              ? 'Selamat! Kamu berhasil mengisi penuh seluruh 49 kotak papanmu terlebih dahulu!'
              : 'Lawan berhasil mengisi penuh seluruh 49 kotak papan 7x7 miliknya terlebih dahulu!'}
          </p>
        </div>
      )}
    </div>
  );
};
