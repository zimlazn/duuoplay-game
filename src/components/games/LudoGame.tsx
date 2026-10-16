import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../../context/SocketContext';
import { LudoToken, LudoColor } from '../../types/game';
import {
  TRACK_COORDINATES,
  HOME_COLUMNS,
  BASE_COORDINATES,
  SAFE_INDICES,
  getGlobalTrackIndex,
  getTokenCoordinates
} from '../../utils/ludoLogic';
import { sound } from '../../utils/sound';
import { Dices, Trophy, Sparkles, Star, Crown } from 'lucide-react';

export const LudoGame: React.FC = () => {
  const {
    room,
    playerId,
    rollLudoDice,
    moveLudoToken
  } = useSocket();

  const [isDiceAnimating, setIsDiceAnimating] = useState(false);
  const [displayDiceVal, setDisplayDiceVal] = useState<number | null>(null);
  const [activeHopTokenId, setActiveHopTokenId] = useState<number | null>(null);
  const rollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const ludo = room?.gameState.ludoState;
  const currentRound = room?.gameState.currentRound ?? 1;
  const totalRounds = room?.gameState.totalRounds ?? 5;
  const isPinkTheme = room?.roomId === 'ACAA' || room?.isSpecialTheme;

  const playerIds = room ? Object.keys(room.players) : [];
  const p1Id = playerIds[0];
  const p2Id = playerIds[1];
  const p1 = p1Id ? room?.players[p1Id] : null;
  const p2 = p2Id ? room?.players[p2Id] : null;

  const myColor: LudoColor = playerId && ludo?.playerColors[playerId] ? ludo.playerColors[playerId] : 'red';
  const oppColor: LudoColor = myColor === 'red' ? 'yellow' : 'red';

  const isMyTurn = ludo?.currentTurnPlayerId === playerId;
  const myTokens = ludo?.tokens[myColor] || [];
  const oppTokens = ludo?.tokens[oppColor] || [];

  // Sync dice display value when server updates
  useEffect(() => {
    if (ludo?.diceValue && !isDiceAnimating) {
      setDisplayDiceVal(ludo.diceValue);
    }
  }, [ludo?.diceValue, isDiceAnimating]);

  if (!ludo) return null;

  const handleRollClick = () => {
    if (!isMyTurn || !ludo.canRoll || ludo.diceRolled) return;

    sound.playDiceRoll();
    setIsDiceAnimating(true);

    // Rapid random face tumble effect
    let count = 0;
    rollIntervalRef.current = setInterval(() => {
      setDisplayDiceVal(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 8) {
        if (rollIntervalRef.current) clearInterval(rollIntervalRef.current);
      }
    }, 70);

    setTimeout(() => {
      if (rollIntervalRef.current) clearInterval(rollIntervalRef.current);
      setIsDiceAnimating(false);
    }, 650);

    rollLudoDice();
  };

  const handleTokenClick = (tokenId: number) => {
    if (!isMyTurn || !ludo.diceRolled || !ludo.validMoves.includes(tokenId)) return;
    sound.playPawnHop();
    setActiveHopTokenId(tokenId);
    setTimeout(() => setActiveHopTokenId(null), 500);
    moveLudoToken(tokenId);
  };

  // Count tokens in home
  const myHomeCount = myTokens.filter((t) => t.step === 56).length;
  const oppHomeCount = oppTokens.filter((t) => t.step === 56).length;

  const renderDiceFace = (val: number | null) => {
    if (!val) {
      return (
        <div className="flex flex-col items-center justify-center text-zinc-700 dark:text-zinc-200">
          <Dices className="w-9 h-9" />
          <span className="text-[9px] font-black uppercase mt-0.5">Kocok</span>
        </div>
      );
    }

    const dotPatterns: Record<number, number[]> = {
      1: [4],
      2: [0, 8],
      3: [0, 4, 8],
      4: [0, 2, 6, 8],
      5: [0, 2, 4, 6, 8],
      6: [0, 2, 3, 5, 6, 8]
    };
    const activeDots = dotPatterns[val] || [];

    return (
      <div className="w-14 h-14 grid grid-cols-3 grid-rows-3 p-2 gap-1 bg-gradient-to-br from-white via-zinc-50 to-zinc-200 rounded-2xl border-2 border-zinc-900 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.15)] relative">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="flex items-center justify-center">
            {activeDots.includes(i) && (
              <span
                className={`w-2.5 h-2.5 rounded-full shadow-inner ${
                  val === 6 || val === 1
                    ? 'bg-gradient-to-br from-red-500 to-red-700 ring-1 ring-red-800'
                    : 'bg-gradient-to-br from-zinc-800 to-zinc-950 ring-1 ring-black'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-2.5 select-none relative">
      {/* Header (No Timer / Time limit) */}
      <div className="w-full flex items-center justify-between px-1 text-xs">
        <span
          className={`font-black uppercase tracking-wider flex items-center gap-1.5 ${
            isPinkTheme ? 'text-pink-900' : 'text-zinc-800 dark:text-zinc-200'
          }`}
        >
          <Trophy className={`w-4 h-4 ${isPinkTheme ? 'text-pink-600' : 'text-zinc-900 dark:text-amber-400'}`} />
          LUDO • Babak {currentRound} / {totalRounds}
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

      {/* Players Progress Bar */}
      <div className="w-full grid grid-cols-2 gap-2">
        {p1 && (
          <div
            className={`p-2.5 rounded-2xl border-2 border-zinc-900 flex items-center justify-between shadow-[2px_2px_0px_#18181b] transition-all ${
              ludo.currentTurnPlayerId === p1.id
                ? 'bg-red-100 dark:bg-red-950/70 border-red-600 scale-[1.02] ring-2 ring-red-400'
                : 'bg-white dark:bg-zinc-800 opacity-80'
            }`}
          >
            <div className="flex items-center gap-1.5 truncate">
              <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-red-400 to-red-600 border border-zinc-900 shadow-xs"></span>
              <span className="text-xs font-black text-zinc-900 dark:text-white truncate">
                {p1.nickname}
              </span>
            </div>
            <span className="text-[10px] font-black font-mono bg-red-200 dark:bg-red-900 text-red-950 dark:text-red-200 px-2.5 py-0.5 rounded-xl border border-zinc-900 shadow-xs">
              {p1.id === playerId ? myHomeCount : oppHomeCount}/4 🏠
            </span>
          </div>
        )}

        {p2 && (
          <div
            className={`p-2.5 rounded-2xl border-2 border-zinc-900 flex items-center justify-between shadow-[2px_2px_0px_#18181b] transition-all ${
              ludo.currentTurnPlayerId === p2.id
                ? 'bg-amber-100 dark:bg-amber-950/70 border-amber-500 scale-[1.02] ring-2 ring-amber-400'
                : 'bg-white dark:bg-zinc-800 opacity-80'
            }`}
          >
            <div className="flex items-center gap-1.5 truncate">
              <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 border border-zinc-900 shadow-xs"></span>
              <span className="text-xs font-black text-zinc-900 dark:text-white truncate">
                {p2.nickname}
              </span>
            </div>
            <span className="text-[10px] font-black font-mono bg-amber-200 dark:bg-amber-900 text-amber-950 dark:text-amber-200 px-2.5 py-0.5 rounded-xl border border-zinc-900 shadow-xs">
              {p2.id === playerId ? myHomeCount : oppHomeCount}/4 🏠
            </span>
          </div>
        )}
      </div>

      {/* ENHANCED REALISTIC LUDO BOARD SVG */}
      <div
        className={`w-full max-w-[370px] aspect-square rounded-3xl p-1.5 border-4 border-zinc-900 relative overflow-hidden transition-all ${
          isPinkTheme
            ? 'bg-pink-100/90 shadow-[6px_6px_0px_#f472b6]'
            : 'bg-[#FBF7ED] dark:bg-zinc-950 shadow-[6px_6px_0px_#18181b]'
        }`}
      >
        <svg
          viewBox="0 0 15 15"
          className="w-full h-full rounded-2xl border-2 border-zinc-900 select-none shadow-inner"
        >
          <defs>
            {/* Realistic 3D Pawn Gradients */}
            <radialGradient id="redPawnHead" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FCA5A5" />
              <stop offset="45%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#991B1B" />
            </radialGradient>
            <linearGradient id="redPawnBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F87171" />
              <stop offset="50%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#7F1D1D" />
            </linearGradient>

            <radialGradient id="yellowPawnHead" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="45%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </radialGradient>
            <linearGradient id="yellowPawnBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="50%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            {/* Yard Bases Radial Gradients */}
            <radialGradient id="greenBaseGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </radialGradient>
            <radialGradient id="yellowBaseGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#D97706" />
            </radialGradient>
            <radialGradient id="redBaseGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F87171" />
              <stop offset="100%" stopColor="#DC2626" />
            </radialGradient>
            <radialGradient id="blueBaseGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#2563EB" />
            </radialGradient>
          </defs>

          {/* 4 Quadrants Background (Yards) */}
          {/* Top-Left: Green Yard */}
          <rect x="0" y="0" width="6" height="6" fill="url(#greenBaseGrad)" stroke="#18181B" strokeWidth="0.1" />
          <rect x="1" y="1" width="4" height="4" fill="#FFFFFF" rx="0.8" stroke="#18181B" strokeWidth="0.1" />
          {/* Green 4 Token Pedestals */}
          {BASE_COORDINATES.green.map((pt, i) => (
            <g key={`g_ped_${i}`}>
              <circle cx={pt.c + 0.5} cy={pt.r + 0.5} r="0.45" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="0.04" />
              <circle cx={pt.c + 0.5} cy={pt.r + 0.5} r="0.32" fill="#10B981" stroke="#18181B" strokeWidth="0.05" />
            </g>
          ))}

          {/* Top-Right: Yellow Yard */}
          <rect x="9" y="0" width="6" height="6" fill="url(#yellowBaseGrad)" stroke="#18181B" strokeWidth="0.1" />
          <rect x="10" y="1" width="4" height="4" fill="#FFFFFF" rx="0.8" stroke="#18181B" strokeWidth="0.1" />
          {/* Yellow 4 Token Pedestals */}
          {BASE_COORDINATES.yellow.map((pt, i) => (
            <g key={`y_ped_${i}`}>
              <circle cx={pt.c + 0.5} cy={pt.r + 0.5} r="0.45" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="0.04" />
              <circle cx={pt.c + 0.5} cy={pt.r + 0.5} r="0.32" fill="#F59E0B" stroke="#18181B" strokeWidth="0.05" />
            </g>
          ))}

          {/* Bottom-Left: Red Yard */}
          <rect x="0" y="9" width="6" height="6" fill="url(#redBaseGrad)" stroke="#18181B" strokeWidth="0.1" />
          <rect x="1" y="10" width="4" height="4" fill="#FFFFFF" rx="0.8" stroke="#18181B" strokeWidth="0.1" />
          {/* Red 4 Token Pedestals */}
          {BASE_COORDINATES.red.map((pt, i) => (
            <g key={`r_ped_${i}`}>
              <circle cx={pt.c + 0.5} cy={pt.r + 0.5} r="0.45" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="0.04" />
              <circle cx={pt.c + 0.5} cy={pt.r + 0.5} r="0.32" fill="#EF4444" stroke="#18181B" strokeWidth="0.05" />
            </g>
          ))}

          {/* Bottom-Right: Blue Yard */}
          <rect x="9" y="9" width="6" height="6" fill="url(#blueBaseGrad)" stroke="#18181B" strokeWidth="0.1" />
          <rect x="10" y="10" width="4" height="4" fill="#FFFFFF" rx="0.8" stroke="#18181B" strokeWidth="0.1" />
          {/* Blue 4 Token Pedestals */}
          {BASE_COORDINATES.blue.map((pt, i) => (
            <g key={`b_ped_${i}`}>
              <circle cx={pt.c + 0.5} cy={pt.r + 0.5} r="0.45" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="0.04" />
              <circle cx={pt.c + 0.5} cy={pt.r + 0.5} r="0.32" fill="#3B82F6" stroke="#18181B" strokeWidth="0.05" />
            </g>
          ))}

          {/* Center Finishing Triangles */}
          <polygon points="6,6 9,6 7.5,7.5" fill="#F59E0B" stroke="#18181B" strokeWidth="0.08" />
          <polygon points="9,6 9,9 7.5,7.5" fill="#2563EB" stroke="#18181B" strokeWidth="0.08" />
          <polygon points="6,9 9,9 7.5,7.5" fill="#DC2626" stroke="#18181B" strokeWidth="0.08" />
          <polygon points="6,6 6,9 7.5,7.5" fill="#059669" stroke="#18181B" strokeWidth="0.08" />

          {/* Center Golden Finish Crest */}
          <circle cx="7.5" cy="7.5" r="0.65" fill="#FEF08A" stroke="#18181B" strokeWidth="0.08" />
          <text x="7.5" y="7.7" fontSize="0.45" textAnchor="middle" fill="#B45309" fontWeight="bold">
            ★
          </text>

          {/* Home Columns Shading and Chevron Arrows */}
          {/* Red home column: r 9..13, c 7 */}
          {[9, 10, 11, 12, 13].map((r, i) => (
            <g key={`red_h_${r}`}>
              <rect x="7" y={r} width="1" height="1" fill="#FCA5A5" stroke="#18181B" strokeWidth="0.06" />
              <text x="7.5" y={r + 0.65} fontSize="0.42" textAnchor="middle" fill="#DC2626" fontWeight="bold" opacity="0.6">
                ▲
              </text>
            </g>
          ))}
          {/* Yellow home column: r 1..5, c 7 */}
          {[1, 2, 3, 4, 5].map((r, i) => (
            <g key={`yel_h_${r}`}>
              <rect x="7" y={r} width="1" height="1" fill="#FDE68A" stroke="#18181B" strokeWidth="0.06" />
              <text x="7.5" y={r + 0.65} fontSize="0.42" textAnchor="middle" fill="#D97706" fontWeight="bold" opacity="0.6">
                ▼
              </text>
            </g>
          ))}

          {/* 52 Global Track Grid Squares */}
          {TRACK_COORDINATES.map((coord, idx) => {
            const isRedStart = idx === 0;
            const isYellowStart = idx === 26;
            const isGreenStart = idx === 13;
            const isBlueStart = idx === 39;
            const isStar = SAFE_INDICES.includes(idx) && !isRedStart && !isYellowStart;

            return (
              <g key={`sq_${idx}`}>
                <rect
                  x={coord.c}
                  y={coord.r}
                  width="1"
                  height="1"
                  fill={
                    isRedStart
                      ? '#EF4444'
                      : isYellowStart
                      ? '#F59E0B'
                      : isGreenStart
                      ? '#10B981'
                      : isBlueStart
                      ? '#3B82F6'
                      : '#FFFFFF'
                  }
                  stroke="#18181B"
                  strokeWidth="0.06"
                />

                {/* Safe Star Squares */}
                {isStar && (
                  <g>
                    <circle cx={coord.c + 0.5} cy={coord.r + 0.5} r="0.32" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="0.03" />
                    <text
                      x={coord.c + 0.5}
                      y={coord.r + 0.66}
                      fontSize="0.42"
                      textAnchor="middle"
                      fill="#B45309"
                      fontWeight="bold"
                    >
                      ★
                    </text>
                  </g>
                )}

                {/* Red Start Arrow */}
                {isRedStart && (
                  <text
                    x={coord.c + 0.5}
                    y={coord.r + 0.68}
                    fontSize="0.45"
                    textAnchor="middle"
                    fontWeight="black"
                    fill="#FFFFFF"
                  >
                    ▲
                  </text>
                )}

                {/* Yellow Start Arrow */}
                {isYellowStart && (
                  <text
                    x={coord.c + 0.5}
                    y={coord.r + 0.68}
                    fontSize="0.45"
                    textAnchor="middle"
                    fontWeight="black"
                    fill="#FFFFFF"
                  >
                    ▼
                  </text>
                )}
              </g>
            );
          })}

          {/* REALISTIC 3D LUDO PAWN TOKENS */}
          {(() => {
            const allTokens = [...(ludo.tokens.red || []), ...(ludo.tokens.yellow || [])];

            const renderPawn = (
              token: LudoToken,
              color: LudoColor,
              isValidMove: boolean,
              isHopping: boolean
            ) => {
              const pos = getTokenCoordinates(token);

              // Calculate sub-offset if multiple tokens land on the exact same track cell
              let subOffsetX = 0;
              let subOffsetY = 0;
              if (token.step >= 0 && token.step < 56) {
                const sameCell = allTokens.filter((t) => {
                  if (t.step < 0) return false;
                  const p = getTokenCoordinates(t);
                  return Math.abs(p.r - pos.r) < 0.1 && Math.abs(p.c - pos.c) < 0.1;
                });
                if (sameCell.length > 1) {
                  const idx = sameCell.findIndex((t) => t.id === token.id && t.color === token.color);
                  if (idx === 0) {
                    subOffsetX = -0.15;
                    subOffsetY = -0.12;
                  } else if (idx === 1) {
                    subOffsetX = 0.15;
                    subOffsetY = 0.12;
                  } else if (idx === 2) {
                    subOffsetX = 0.15;
                    subOffsetY = -0.12;
                  } else {
                    subOffsetX = -0.15;
                    subOffsetY = 0.12;
                  }
                }
              }

              const cx = pos.c + 0.5 + subOffsetX;
              const cy = pos.r + 0.5 + subOffsetY;

              const isRed = color === 'red';
              const bodyGrad = isRed ? 'url(#redPawnBody)' : 'url(#yellowPawnBody)';
              const headGrad = isRed ? 'url(#redPawnHead)' : 'url(#yellowPawnHead)';
              const textColor = isRed ? '#991B1B' : '#78350F';
              const auraColor = isRed ? '#F87171' : '#F59E0B';

              return (
                <g
                  key={`tok_${color}_${token.id}`}
                  onClick={() => myColor === color && handleTokenClick(token.id)}
                  className={`${isValidMove ? 'cursor-pointer' : ''} transition-all duration-300`}
                  style={{
                    transformOrigin: `${cx}px ${cy}px`
                  }}
                >
                  {/* Pawn Ground Shadow - Perfectly Centered in Cell */}
                  <ellipse
                    cx={cx}
                    cy={cy + 0.16}
                    rx={0.24}
                    ry={0.08}
                    fill="rgba(0,0,0,0.32)"
                  />

                  {/* Pulsing Aura if Selectable */}
                  {isValidMove && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={0.42}
                      fill="none"
                      stroke={auraColor}
                      strokeWidth={0.06}
                      strokeDasharray="0.14 0.1"
                      className="animate-spin"
                    />
                  )}

                  {/* 3D Pawn Base Pedestal - Sits Flat on Ground Shadow */}
                  <ellipse
                    cx={cx}
                    cy={cy + 0.12}
                    rx={0.23}
                    ry={0.09}
                    fill={bodyGrad}
                    stroke="#18181B"
                    strokeWidth={0.05}
                  />

                  {/* 3D Pawn Body / Waist Column */}
                  <path
                    d={`M ${cx - 0.18} ${cy + 0.11} Q ${cx - 0.07} ${cy} ${cx - 0.09} ${cy - 0.07} L ${cx + 0.09} ${cy - 0.07} Q ${cx + 0.07} ${cy} ${cx + 0.18} ${cy + 0.11} Z`}
                    fill={bodyGrad}
                    stroke="#18181B"
                    strokeWidth={0.04}
                  />

                  {/* 3D Pawn Spherical Head */}
                  <circle
                    cx={cx}
                    cy={cy - 0.14}
                    r={0.18}
                    fill={headGrad}
                    stroke="#18181B"
                    strokeWidth={0.05}
                    className={isHopping ? 'animate-pawn-hop' : ''}
                  />

                  {/* Number Badge on Pawn Crown */}
                  <circle cx={cx} cy={cy - 0.14} r={0.10} fill="#FFFFFF" opacity={0.9} />
                  <text
                    x={cx}
                    y={cy - 0.10}
                    fontSize={0.16}
                    textAnchor="middle"
                    fontWeight="black"
                    fill={textColor}
                  >
                    {token.id + 1}
                  </text>
                </g>
              );
            };

            return (
              <>
                {(ludo.tokens.red || []).map((token) =>
                  renderPawn(
                    token,
                    'red',
                    isMyTurn && myColor === 'red' && ludo.validMoves.includes(token.id),
                    activeHopTokenId === token.id && myColor === 'red'
                  )
                )}
                {(ludo.tokens.yellow || []).map((token) =>
                  renderPawn(
                    token,
                    'yellow',
                    isMyTurn && myColor === 'yellow' && ludo.validMoves.includes(token.id),
                    activeHopTokenId === token.id && myColor === 'yellow'
                  )
                )}
              </>
            );
          })()}
        </svg>
      </div>

      {/* Action Notification Message */}
      {ludo.lastMessage && (
        <div className="w-full py-2 px-3 rounded-2xl bg-amber-50 dark:bg-zinc-850 border border-zinc-900 dark:border-zinc-700 text-center text-xs font-bold text-zinc-800 dark:text-zinc-200 shadow-[2px_2px_0px_#18181b] truncate">
          {ludo.lastMessage}
        </div>
      )}

      {/* Interactive 3D Dice & Controls Tray */}
      <div
        className={`w-full p-3.5 border-2 rounded-3xl flex items-center justify-between gap-3 transition-all ${
          isPinkTheme
            ? 'bg-white/95 border-pink-400 shadow-[4px_4px_0px_#f472b6]'
            : 'bg-white dark:bg-zinc-900 border-zinc-900 dark:border-zinc-700 shadow-[4px_4px_0px_#18181b]'
        }`}
      >
        {/* Dice Visual and Roll Button with Realistic 3D Tumble */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={!isMyTurn || !ludo.canRoll || ludo.diceRolled}
            onClick={handleRollClick}
            className={`w-18 h-18 rounded-2xl border-3 border-zinc-900 shadow-[4px_4px_0px_#18181b] flex items-center justify-center p-1.5 transition-all relative ${
              isMyTurn && ludo.canRoll && !ludo.diceRolled
                ? 'bg-amber-300 dark:bg-amber-500 hover:scale-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer ring-3 ring-amber-400 animate-bounce'
                : 'bg-zinc-100 dark:bg-zinc-800 opacity-90'
            } ${isDiceAnimating ? 'animate-dice-tumble' : ''}`}
          >
            {renderDiceFace(displayDiceVal)}
          </button>

          <div>
            <div className="text-xs font-black text-zinc-900 dark:text-zinc-100">
              {isMyTurn && ludo.canRoll && !ludo.diceRolled
                ? 'KOCOK DADU! 🎲'
                : ludo.diceRolled
                ? `Angka Dadu: ${ludo.diceValue}`
                : 'Menunggu Lawan'}
            </div>
            <div className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">
              {isMyTurn && ludo.diceRolled && ludo.validMoves.length > 0
                ? 'Ketuk pion yang berkedip di papan'
                : isMyTurn && ludo.canRoll
                ? 'Ketuk kotak dadu untuk melempar'
                : 'Menunggu giliran lawan'}
            </div>
          </div>
        </div>

        {/* Quick Token Selector Buttons (if multiple valid moves) */}
        {isMyTurn && ludo.diceRolled && ludo.validMoves.length > 0 && (
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black text-zinc-600 dark:text-zinc-400 uppercase">
              Pion:
            </span>
            {ludo.validMoves.map((tId) => (
              <button
                key={tId}
                type="button"
                onClick={() => handleTokenClick(tId)}
                className="w-8 h-8 rounded-xl bg-amber-200 dark:bg-amber-500 hover:bg-amber-300 border-2 border-zinc-900 font-black text-xs text-zinc-900 shadow-[2px_2px_0px_#18181b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer transition-all"
              >
                #{tId + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
