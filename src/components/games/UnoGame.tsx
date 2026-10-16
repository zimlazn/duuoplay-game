import React, { useState, useEffect } from 'react';
import { useSocket } from '../../context/SocketContext';
import { UnoCard, UnoColor } from '../../types/game';
import { isValidUnoMove } from '../../utils/unoLogic';
import { sound } from '../../utils/sound';
import { Flame, Layers, Sparkles, ChevronRight, Ban, RotateCcw } from 'lucide-react';

const COLOR_MAP: Record<UnoColor | 'wild', { bg: string; text: string; border: string; name: string; glow: string; hex: string }> = {
  red: { bg: 'bg-[#EF4444]', text: 'text-white', border: 'border-red-700', name: 'Merah', glow: 'shadow-red-500/50', hex: '#EF4444' },
  blue: { bg: 'bg-[#2563EB]', text: 'text-white', border: 'border-blue-700', name: 'Biru', glow: 'shadow-blue-500/50', hex: '#2563EB' },
  green: { bg: 'bg-[#10B981]', text: 'text-white', border: 'border-emerald-700', name: 'Hijau', glow: 'shadow-emerald-500/50', hex: '#10B981' },
  yellow: { bg: 'bg-[#F59E0B]', text: 'text-zinc-950', border: 'border-amber-600', name: 'Kuning', glow: 'shadow-amber-500/50', hex: '#F59E0B' },
  wild: { bg: 'bg-gradient-to-br from-rose-500 via-amber-400 to-sky-500', text: 'text-white', border: 'border-purple-600', name: 'Wild', glow: 'shadow-purple-500/50', hex: '#8B5CF6' }
};

export const UnoGame: React.FC = () => {
  const {
    room,
    playerId,
    playUnoCard,
    drawUnoCard,
    callUno,
    passUnoTurn
  } = useSocket();

  const [pendingWildCardId, setPendingWildCardId] = useState<string | null>(null);
  const [animatingCardId, setAnimatingCardId] = useState<string | null>(null);
  const [actionBanner, setActionBanner] = useState<{ text: string; icon: string } | null>(null);
  const [isDrawingAnim, setIsDrawingAnim] = useState(false);
  const [playedCardDropRot, setPlayedCardDropRot] = useState<number>(2);

  const uno = room?.gameState.unoState;
  const currentRound = room?.gameState.currentRound ?? 1;
  const totalRounds = room?.gameState.totalRounds ?? 5;
  const isPinkTheme = room?.roomId === 'ACAA' || room?.isSpecialTheme;

  // Detect action cards played to trigger splash animation banner
  useEffect(() => {
    if (!uno?.lastActionMessage) return;
    const msg = uno.lastActionMessage;
    if (msg.includes('Skip')) {
      setActionBanner({ text: '🚫 SKIP! Giliran Lawan Dilewati!', icon: '🚫' });
    } else if (msg.includes('Reverse')) {
      setActionBanner({ text: '🔁 REVERSE! Putaran Berbalik!', icon: '🔁' });
    } else if (msg.includes('Draw +2')) {
      setActionBanner({ text: '💥 +2 KARTU UNTUK LAWAN!', icon: '💥' });
    } else if (msg.includes('Wild +4')) {
      setActionBanner({ text: '🔥 WILD +4! Lawan Ambil 4 Kartu!', icon: '🔥' });
    } else if (msg.includes('UNO!')) {
      setActionBanner({ text: '🔥 SESEORANG BERKATA: UNO! 🔥', icon: '🔥' });
    }
    const timer = setTimeout(() => setActionBanner(null), 2500);
    return () => clearTimeout(timer);
  }, [uno?.lastActionMessage, uno?.topCard?.id]);

  if (!uno) return null;

  const playerIds = room ? Object.keys(room.players) : [];
  const opponentId = playerIds.find((id) => id !== playerId);

  const myHand = playerId && uno.playerHands[playerId] ? uno.playerHands[playerId] : [];
  const oppHand = opponentId && uno.playerHands[opponentId] ? uno.playerHands[opponentId] : [];

  const isMyTurn = uno.currentTurnPlayerId === playerId;
  const opponent = opponentId ? room?.players[opponentId] : null;

  const handleCardClick = (card: UnoCard) => {
    if (!isMyTurn) return;
    if (!isValidUnoMove(card, uno.topCard, uno.activeColor)) return;

    sound.playCardPlay();
    const randomAngle = Math.floor(Math.random() * 16) - 8;
    setPlayedCardDropRot(randomAngle);

    if (card.color === 'wild') {
      setPendingWildCardId(card.id);
    } else {
      setAnimatingCardId(card.id);
      setTimeout(() => {
        playUnoCard(card.id);
        setAnimatingCardId(null);
      }, 260);
    }
  };

  const handlePickColor = (color: UnoColor) => {
    if (!pendingWildCardId) return;
    sound.playCardPlay();
    setAnimatingCardId(pendingWildCardId);
    setTimeout(() => {
      playUnoCard(pendingWildCardId, color);
      setPendingWildCardId(null);
      setAnimatingCardId(null);
    }, 260);
  };

  const handleDrawCard = () => {
    if (!isMyTurn || uno.hasDrawnCardThisTurn) return;
    sound.playCardDraw();
    setIsDrawingAnim(true);
    setTimeout(() => {
      drawUnoCard();
      setIsDrawingAnim(false);
    }, 320);
  };

  const renderCardContent = (card: UnoCard) => {
    if (card.value === 'skip') return <Ban className="w-7 h-7 stroke-[3.5] drop-shadow-md" />;
    if (card.value === 'reverse') return <RotateCcw className="w-7 h-7 stroke-[3.5] drop-shadow-md" />;
    if (card.value === 'draw2') return <span className="font-black text-2xl tracking-tighter drop-shadow-md font-mono">+2</span>;
    if (card.value === 'wild') return <span className="font-black text-[11px] uppercase tracking-wider drop-shadow-md">WILD</span>;
    if (card.value === 'wild4') return <span className="font-black text-2xl tracking-tighter drop-shadow-md font-mono">+4</span>;
    return <span className="font-black text-3xl font-mono drop-shadow-md tracking-tighter">{card.value}</span>;
  };

  const renderCardCorner = (card: UnoCard) => {
    if (card.value === 'skip') return '🚫';
    if (card.value === 'reverse') return '🔁';
    if (card.value === 'draw2') return '+2';
    if (card.value === 'wild') return '★';
    if (card.value === 'wild4') return '+4';
    return card.value;
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-2 select-none relative">
      {/* Floating Action Splash Banner */}
      {actionBanner && (
        <div className="fixed top-20 z-50 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-red-500 via-amber-500 to-rose-500 text-white border-2 border-zinc-950 shadow-[4px_4px_0px_#18181b] font-black text-xs uppercase tracking-wider animate-badge-pop pointer-events-none flex items-center gap-2">
          <span className="text-base">{actionBanner.icon}</span>
          <span>{actionBanner.text}</span>
        </div>
      )}

      {/* Header Info (No Timer / Time limit) */}
      <div className="w-full flex items-center justify-between px-1 text-xs">
        <span
          className={`font-black uppercase tracking-wider flex items-center gap-1.5 ${
            isPinkTheme ? 'text-pink-900' : 'text-zinc-800 dark:text-zinc-200'
          }`}
        >
          <Layers className={`w-4 h-4 ${isPinkTheme ? 'text-pink-600' : 'text-zinc-900 dark:text-amber-400'}`} />
          UNO • Babak {currentRound} / {totalRounds}
        </span>
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border-2 font-black ${
            isPinkTheme
              ? 'bg-pink-100 border-pink-400 text-pink-950 shadow-[2px_2px_0px_#f472b6]'
              : 'bg-amber-100 dark:bg-amber-950/80 border-zinc-900 dark:border-amber-500 shadow-[2px_2px_0px_#18181b] text-zinc-900 dark:text-amber-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{isMyTurn ? 'Giliranmu Main' : 'Giliran Lawan'}</span>
        </div>
      </div>

      {/* Opponent Hand Tray with Realistic 3D Mini Cards */}
      <div
        className={`w-full p-2.5 rounded-2xl border-2 flex items-center justify-between transition-all ${
          isPinkTheme
            ? 'bg-white/95 border-pink-400 shadow-[2px_2px_0px_#f472b6]'
            : 'bg-zinc-100 dark:bg-zinc-850 border-zinc-900 dark:border-zinc-700 shadow-[2px_2px_0px_#18181b]'
        }`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center text-base ${
              isPinkTheme ? 'bg-pink-100 border-pink-400' : 'bg-purple-200 border-zinc-900'
            }`}
          >
            {opponent?.avatar || '🦊'}
          </div>
          <div>
            <div
              className={`text-xs font-black flex items-center gap-1.5 ${
                isPinkTheme ? 'text-pink-950' : 'text-zinc-900 dark:text-zinc-100'
              }`}
            >
              <span>{opponent?.nickname || 'Lawan'}</span>
              {uno.unoCalled[opponentId || ''] && (
                <span className="px-1.5 py-0.5 rounded-md bg-red-600 text-white text-[9px] font-black uppercase shadow-sm animate-bounce">
                  UNO! 🔥
                </span>
              )}
            </div>
            <div
              className={`text-[10px] font-bold ${
                isPinkTheme ? 'text-pink-600' : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              {uno.currentTurnPlayerId === opponentId ? 'Sedang berpikir... 🤔' : 'Menunggu giliran'}
            </div>
          </div>
        </div>

        {/* Realistic Fanned Opponent Mini Cards */}
        <div className="flex items-center -space-x-4 overflow-hidden py-1 px-1">
          {oppHand.map((_, i) => {
            const rot = (i - (oppHand.length - 1) / 2) * 5;
            return (
              <div
                key={i}
                style={{ transform: `rotate(${rot}deg)` }}
                className="w-7 h-11 rounded-lg bg-zinc-900 border-2 border-white shadow-[2px_2px_4px_rgba(0,0,0,0.35)] flex items-center justify-center transition-transform hover:-translate-y-1.5 relative overflow-hidden"
              >
                {/* Diagonal card sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                <div className="w-4 h-7 rounded-full bg-red-600 border border-yellow-300 flex items-center justify-center text-[7px] font-black text-yellow-300 -rotate-12 shadow-sm font-mono">
                  U
                </div>
              </div>
            );
          })}
          <div
            className={`ml-2 pl-2 text-xs font-black font-mono ${
              isPinkTheme ? 'text-pink-900' : 'text-zinc-900 dark:text-white'
            }`}
          >
            {oppHand.length} kartu
          </div>
        </div>
      </div>

      {/* Action Notification Message */}
      {uno.lastActionMessage && (
        <div
          className={`w-full py-1.5 px-3 rounded-xl border text-center text-xs font-bold truncate ${
            isPinkTheme
              ? 'bg-pink-50 border-pink-400 text-pink-950 shadow-[1px_1px_0px_#f472b6]'
              : 'bg-amber-50 dark:bg-zinc-850 border-zinc-900 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 shadow-[1px_1px_0px_#18181b]'
          }`}
        >
          {uno.lastActionMessage}
        </div>
      )}

      {/* Center Table Area (Realistic Felt Table with Draw Stack & Discard Stack) */}
      <div
        className={`w-full p-4 border-2 rounded-3xl flex flex-col items-center gap-3 transition-all relative overflow-hidden ${
          isPinkTheme
            ? 'bg-white/95 border-pink-400 shadow-[4px_4px_0px_#f472b6]'
            : 'bg-[#15803d]/10 dark:bg-zinc-900 border-zinc-900 dark:border-zinc-700 shadow-[4px_4px_0px_#18181b]'
        }`}
      >
        {/* Active Color Highlight Bar */}
        <div className="flex items-center gap-2">
          <span
            className={`text-[11px] font-black uppercase tracking-wider ${
              isPinkTheme ? 'text-pink-800' : 'text-zinc-600 dark:text-zinc-400'
            }`}
          >
            Warna Aktif:
          </span>
          <div
            className={`px-3.5 py-1 rounded-xl border-2 border-zinc-900 text-xs font-black flex items-center gap-1.5 shadow-[2px_2px_0px_#18181b] transition-all ${
              COLOR_MAP[uno.activeColor].bg
            } ${COLOR_MAP[uno.activeColor].text}`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-white border border-zinc-900 shadow-sm"></span>
            <span>{COLOR_MAP[uno.activeColor].name}</span>
          </div>
        </div>

        {/* The Two Piles with Realistic 3D Thickness & Physical Stack Shadows */}
        <div className="flex items-center justify-center gap-8 my-2">
          {/* Draw Pile (Thick 3D Stack of Cards) */}
          <div className="flex flex-col items-center gap-1.5">
            <button
              type="button"
              disabled={!isMyTurn || uno.hasDrawnCardThisTurn}
              onClick={handleDrawCard}
              className={`w-22 h-32 rounded-2xl bg-zinc-950 border-3 border-zinc-900 text-white flex flex-col items-center justify-center p-2 relative shadow-[6px_6px_12px_rgba(0,0,0,0.35)] transition-all ${
                isMyTurn && !uno.hasDrawnCardThisTurn
                  ? 'hover:-translate-y-2 active:translate-x-[2px] active:translate-y-[2px] cursor-pointer ring-4 ring-amber-400'
                  : 'opacity-85 cursor-not-allowed'
              } ${isDrawingAnim ? 'scale-95 translate-y-1' : ''}`}
            >
              {/* Stack Depth Layer 3 */}
              <div className="absolute -top-2 -left-2 w-full h-full rounded-2xl bg-zinc-800 border-2 border-zinc-900 -z-30 shadow-xs" />
              {/* Stack Depth Layer 2 */}
              <div className="absolute -top-1 -left-1 w-full h-full rounded-2xl bg-zinc-900 border-2 border-zinc-900 -z-20 shadow-xs" />

              {/* Card Center Logo */}
              <div className="w-16 h-24 rounded-xl bg-zinc-900 border-2 border-yellow-400 flex flex-col items-center justify-center transform rotate-2 relative overflow-hidden shadow-inner">
                {/* Diagonal highlight sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                <span className="text-base font-black text-yellow-400 font-mono tracking-tighter drop-shadow-md">
                  UNO
                </span>
                <span className="text-[10px] text-zinc-300 font-mono mt-1 font-bold">
                  {uno.drawPileCount}
                </span>
              </div>
            </button>
            <span
              className={`text-[10px] font-bold ${
                isPinkTheme ? 'text-pink-800' : 'text-zinc-600 dark:text-zinc-400'
              }`}
            >
              Ambil Kartu
            </span>
          </div>

          {/* Discard Pile (Realistic Layered Stack with Angle Variations) */}
          <div className="flex flex-col items-center gap-1.5 relative">
            <div className="relative w-22 h-32">
              {/* Previous underlying card 1 */}
              <div
                className="absolute inset-0 w-22 h-32 rounded-2xl bg-zinc-800 border-2 border-zinc-900 -rotate-6 shadow-md pointer-events-none opacity-80"
              />
              {/* Previous underlying card 2 */}
              <div
                className="absolute inset-0 w-22 h-32 rounded-2xl bg-zinc-700 border-2 border-zinc-900 rotate-4 shadow-md pointer-events-none opacity-90"
              />

              {/* Active Top Card with Realistic Gloss & Bevel */}
              <div
                style={{ transform: `rotate(${playedCardDropRot}deg)` }}
                className={`absolute inset-0 w-22 h-32 rounded-2xl border-3 border-zinc-900 p-2 shadow-[6px_6px_12px_rgba(0,0,0,0.35)] flex flex-col justify-between relative transition-transform duration-300 overflow-hidden ${
                  COLOR_MAP[uno.topCard.color].bg
                } ${COLOR_MAP[uno.topCard.color].text}`}
              >
                {/* Diagonal Glossy Card Sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />

                {/* Top Corner Mini Badge */}
                <div className="text-xs font-black leading-none drop-shadow-md z-10">
                  {renderCardCorner(uno.topCard)}
                </div>

                {/* Center Rotated Signature Oval with Symbol */}
                <div className="w-full flex-1 rounded-2xl bg-white/25 border-2 border-white/50 flex items-center justify-center transform -rotate-12 shadow-inner z-10">
                  {renderCardContent(uno.topCard)}
                </div>

                {/* Inverted Bottom Corner */}
                <div className="text-xs font-black leading-none self-end rotate-180 drop-shadow-md z-10">
                  {renderCardCorner(uno.topCard)}
                </div>
              </div>
            </div>

            <span
              className={`text-[10px] font-bold ${
                isPinkTheme ? 'text-pink-800' : 'text-zinc-600 dark:text-zinc-400'
              }`}
            >
              Kartu Terbuka
            </span>
          </div>
        </div>

        {/* Turn Status Banner */}
        <div
          className={`w-full py-2 px-3 rounded-xl border-2 text-center text-xs font-black transition-all ${
            isMyTurn
              ? isPinkTheme
                ? 'bg-pink-300 border-pink-600 text-pink-950 shadow-[2px_2px_0px_#f472b6] animate-pulse'
                : 'bg-amber-200 dark:bg-amber-900 text-amber-950 dark:text-amber-100 border-zinc-900 shadow-[2px_2px_0px_#18181b] animate-pulse'
              : isPinkTheme
              ? 'bg-pink-50 border-pink-300 text-pink-800'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-900'
          }`}
        >
          {isMyTurn ? '⚡ Giliranmu! Mainkan kartu yang sesuai atau ambil dari tumpukan' : `Menunggu giliran lawan...`}
        </div>
      </div>

      {/* Control Buttons (Pass & Call UNO) */}
      <div className="w-full flex items-center justify-between gap-2 px-1">
        {uno.hasDrawnCardThisTurn && isMyTurn ? (
          <button
            type="button"
            onClick={passUnoTurn}
            className="flex-1 py-2 px-3 rounded-xl bg-sky-200 hover:bg-sky-300 text-sky-950 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] text-xs font-black flex items-center justify-center gap-1 active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
          >
            <span>Lewati Giliran (Pass)</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div
            className={`text-xs font-bold ${
              isPinkTheme ? 'text-pink-900' : 'text-zinc-500 dark:text-zinc-400'
            }`}
          >
            Kartumu: <strong className="font-mono text-base">{myHand.length}</strong>
          </div>
        )}

        {/* Shout UNO Button */}
        <button
          type="button"
          onClick={callUno}
          className={`py-2 px-4 rounded-xl border-2 text-xs font-black flex items-center gap-1.5 shadow-[2px_2px_0px_#18181b] transition-all cursor-pointer ${
            myHand.length <= 2
              ? 'bg-red-600 hover:bg-red-700 text-white border-zinc-900 animate-bounce ring-3 ring-yellow-400'
              : isPinkTheme
              ? 'bg-pink-100 border-pink-400 text-pink-900'
              : 'bg-zinc-200 dark:bg-zinc-800 border-zinc-900 text-zinc-700 dark:text-zinc-300'
          }`}
        >
          <Flame className="w-4 h-4 text-yellow-300 fill-yellow-300 animate-pulse" />
          <span>KATAKAN UNO!</span>
        </button>
      </div>

      {/* Player's Realistic Fanned Hand of Cards */}
      <div
        className={`w-full p-3 border-2 rounded-3xl overflow-hidden transition-all ${
          isPinkTheme
            ? 'bg-pink-100/70 border-pink-400 shadow-[3px_3px_0px_#f472b6]'
            : 'bg-zinc-100 dark:bg-zinc-850 border-zinc-900 dark:border-zinc-700 shadow-[3px_3px_0px_#18181b]'
        }`}
      >
        <div className="flex gap-2.5 overflow-x-auto pb-5 pt-4 px-3 no-scrollbar items-end min-h-[145px]">
          {myHand.map((card, idx) => {
            const isPlayable = isMyTurn && isValidUnoMove(card, uno.topCard, uno.activeColor);
            const isBeingPlayed = animatingCardId === card.id;

            // Realistic organic fan curve based on hand index
            const count = myHand.length;
            const normalizedIdx = idx - (count - 1) / 2;
            const rotationDeg = count > 1 ? normalizedIdx * 3.5 : 0;
            const translateY = Math.abs(normalizedIdx) * 2.5;

            return (
              <button
                key={card.id}
                type="button"
                disabled={!isPlayable}
                onClick={() => handleCardClick(card)}
                style={{
                  transform: isBeingPlayed
                    ? 'translateY(-70px) scale(1.18) rotate(0deg)'
                    : `rotate(${rotationDeg}deg) translateY(${translateY}px)`
                }}
                className={`w-18 h-28 rounded-2xl border-2 border-zinc-900 p-1.5 flex flex-col justify-between shrink-0 transition-all duration-200 select-none relative overflow-hidden ${
                  COLOR_MAP[card.color].bg
                } ${COLOR_MAP[card.color].text} ${
                  isPlayable
                    ? 'shadow-[4px_6px_12px_rgba(0,0,0,0.35)] hover:!translate-y-[-22px] hover:!rotate-0 hover:z-30 cursor-pointer ring-3 ring-white scale-100'
                    : 'opacity-40 cursor-not-allowed scale-95'
                }`}
              >
                {/* Diagonal highlight sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />

                {/* Top Corner */}
                <div className="text-xs font-black leading-none drop-shadow-md z-10">
                  {renderCardCorner(card)}
                </div>

                {/* Center Symbol with Oval */}
                <div className="w-full flex-1 rounded-xl bg-white/25 border-2 border-white/40 flex items-center justify-center transform -rotate-8 shadow-inner z-10">
                  {renderCardContent(card)}
                </div>

                {/* Bottom Corner */}
                <div className="text-xs font-black leading-none self-end rotate-180 drop-shadow-md z-10">
                  {renderCardCorner(card)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal / Sheet for Picking Color on Wild Card */}
      {pendingWildCardId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div
            className={`w-full max-w-xs border-4 rounded-3xl p-5 shadow-[6px_6px_0px_#18181b] text-center space-y-4 animate-scale-in ${
              isPinkTheme
                ? 'bg-pink-50 border-pink-500'
                : 'bg-white dark:bg-zinc-900 border-zinc-900'
            }`}
          >
            <h3
              className={`text-base font-black flex items-center justify-center gap-1.5 ${
                isPinkTheme ? 'text-pink-950' : 'text-zinc-900 dark:text-zinc-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              PILIH WARNA BERIKUTNYA
            </h3>
            <p
              className={`text-xs font-medium ${
                isPinkTheme ? 'text-pink-800' : 'text-zinc-600 dark:text-zinc-400'
              }`}
            >
              Kartu Wild mengharuskanmu menentukan warna aktif:
            </p>

            <div className="grid grid-cols-2 gap-3">
              {(['red', 'yellow', 'green', 'blue'] as UnoColor[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => handlePickColor(c)}
                  className={`py-3.5 px-2 rounded-2xl border-2 border-zinc-900 font-black text-sm uppercase shadow-[3px_3px_0px_#18181b] active:translate-x-[2px] active:translate-y-[2px] hover:scale-105 cursor-pointer transition-all ${
                    COLOR_MAP[c].bg
                  } ${COLOR_MAP[c].text}`}
                >
                  {COLOR_MAP[c].name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
