import { LudoColor, LudoToken, LudoState } from '../types/game';

// 52 Global Track squares (row, col) on a 15x15 board
export const TRACK_COORDINATES: Array<{ r: number; c: number }> = [
  /* 0 - Red Start */ { r: 13, c: 6 },
  /* 1 */ { r: 12, c: 6 },
  /* 2 */ { r: 11, c: 6 },
  /* 3 */ { r: 10, c: 6 },
  /* 4 */ { r: 9, c: 6 },
  /* 5 */ { r: 8, c: 5 },
  /* 6 */ { r: 8, c: 4 },
  /* 7 */ { r: 8, c: 3 },
  /* 8 - Star */ { r: 8, c: 2 },
  /* 9 */ { r: 8, c: 1 },
  /* 10 */ { r: 8, c: 0 },
  /* 11 */ { r: 7, c: 0 },
  /* 12 */ { r: 6, c: 0 },
  /* 13 - Green Start */ { r: 6, c: 1 },
  /* 14 */ { r: 6, c: 2 },
  /* 15 */ { r: 6, c: 3 },
  /* 16 */ { r: 6, c: 4 },
  /* 17 */ { r: 6, c: 5 },
  /* 18 */ { r: 5, c: 6 },
  /* 19 */ { r: 4, c: 6 },
  /* 20 */ { r: 3, c: 6 },
  /* 21 - Star */ { r: 2, c: 6 },
  /* 22 */ { r: 1, c: 6 },
  /* 23 */ { r: 0, c: 6 },
  /* 24 */ { r: 0, c: 7 },
  /* 25 */ { r: 0, c: 8 },
  /* 26 - Yellow Start */ { r: 1, c: 8 },
  /* 27 */ { r: 2, c: 8 },
  /* 28 */ { r: 3, c: 8 },
  /* 29 */ { r: 4, c: 8 },
  /* 30 */ { r: 5, c: 8 },
  /* 31 */ { r: 6, c: 9 },
  /* 32 */ { r: 6, c: 10 },
  /* 33 */ { r: 6, c: 11 },
  /* 34 - Star */ { r: 6, c: 12 },
  /* 35 */ { r: 6, c: 13 },
  /* 36 */ { r: 6, c: 14 },
  /* 37 */ { r: 7, c: 14 },
  /* 38 */ { r: 8, c: 14 },
  /* 39 - Blue Start */ { r: 8, c: 13 },
  /* 40 */ { r: 8, c: 12 },
  /* 41 */ { r: 8, c: 11 },
  /* 42 */ { r: 8, c: 10 },
  /* 43 */ { r: 8, c: 9 },
  /* 44 */ { r: 9, c: 8 },
  /* 45 */ { r: 10, c: 8 },
  /* 46 */ { r: 11, c: 8 },
  /* 47 - Star */ { r: 12, c: 8 },
  /* 48 */ { r: 13, c: 8 },
  /* 49 */ { r: 14, c: 8 },
  /* 50 */ { r: 14, c: 7 },
  /* 51 */ { r: 14, c: 6 }
];

// Home column coordinates for Red and Yellow
export const HOME_COLUMNS: Record<LudoColor, Array<{ r: number; c: number }>> = {
  red: [
    { r: 13, c: 7 },
    { r: 12, c: 7 },
    { r: 11, c: 7 },
    { r: 10, c: 7 },
    { r: 9, c: 7 },
    { r: 7, c: 7 } // Step 56: Home
  ],
  yellow: [
    { r: 1, c: 7 },
    { r: 2, c: 7 },
    { r: 3, c: 7 },
    { r: 4, c: 7 },
    { r: 5, c: 7 },
    { r: 7, c: 7 } // Step 56: Home
  ],
  green: [
    { r: 7, c: 1 },
    { r: 7, c: 2 },
    { r: 7, c: 3 },
    { r: 7, c: 4 },
    { r: 7, c: 5 },
    { r: 7, c: 7 }
  ],
  blue: [
    { r: 7, c: 13 },
    { r: 7, c: 12 },
    { r: 7, c: 11 },
    { r: 7, c: 10 },
    { r: 7, c: 9 },
    { r: 7, c: 7 }
  ]
};

// Yard / Base spawn coordinates (4 tokens)
// White yard inner boxes are 4x4 squares: x:1..5/y:1..5 (green), x:10..14/y:1..5 (yellow), x:1..5/y:10..14 (red), x:10..14/y:10..14 (blue)
// With +0.5 added in renderer, (c+0.5, r+0.5) gives exact center: (2, 11), (4, 11), (2, 13), (4, 13) for Red, etc.
export const BASE_COORDINATES: Record<LudoColor, Array<{ r: number; c: number }>> = {
  red: [
    { r: 10.5, c: 1.5 },
    { r: 10.5, c: 3.5 },
    { r: 12.5, c: 1.5 },
    { r: 12.5, c: 3.5 }
  ],
  yellow: [
    { r: 1.5, c: 10.5 },
    { r: 1.5, c: 12.5 },
    { r: 3.5, c: 10.5 },
    { r: 3.5, c: 12.5 }
  ],
  green: [
    { r: 1.5, c: 1.5 },
    { r: 1.5, c: 3.5 },
    { r: 3.5, c: 1.5 },
    { r: 3.5, c: 3.5 }
  ],
  blue: [
    { r: 10.5, c: 10.5 },
    { r: 10.5, c: 12.5 },
    { r: 12.5, c: 10.5 },
    { r: 12.5, c: 12.5 }
  ]
};

// Safe track square indices (no capture can happen here)
export const SAFE_INDICES = [0, 8, 13, 21, 26, 34, 39, 47];

export const COLOR_OFFSETS: Record<LudoColor, number> = {
  red: 0,
  green: 13,
  yellow: 26,
  blue: 39
};

export function getGlobalTrackIndex(color: LudoColor, step: number): number | null {
  if (step < 0 || step > 50) return null;
  const offset = COLOR_OFFSETS[color];
  return (offset + step) % 52;
}

export function getTokenCoordinates(token: LudoToken): { r: number; c: number } {
  if (token.step === -1) {
    // In Base Yard
    return BASE_COORDINATES[token.color][token.id] || { r: 0, c: 0 };
  }
  if (token.step >= 0 && token.step <= 50) {
    const globalIdx = getGlobalTrackIndex(token.color, token.step);
    if (globalIdx !== null && TRACK_COORDINATES[globalIdx]) {
      return TRACK_COORDINATES[globalIdx];
    }
  }
  if (token.step >= 51 && token.step <= 55) {
    const homeIdx = token.step - 51;
    return HOME_COLUMNS[token.color][homeIdx] || { r: 7, c: 7 };
  }
  if (token.step >= 56) {
    // Reached Home Triangle: display tokens side-by-side in their respective triangle!
    if (token.color === 'red') {
      const colOffset = (token.id - 1.5) * 0.35;
      return { r: 7.6, c: 7.0 + colOffset };
    }
    if (token.color === 'yellow') {
      const colOffset = (token.id - 1.5) * 0.35;
      return { r: 6.4, c: 7.0 + colOffset };
    }
    return { r: 7, c: 7 };
  }
  return { r: 7, c: 7 };
}

export function initLudoGame(p1Id: string, p2Id: string): LudoState {
  const tokens: Record<LudoColor, LudoToken[]> = {
    red: [
      { id: 0, color: 'red', step: -1 },
      { id: 1, color: 'red', step: -1 },
      { id: 2, color: 'red', step: -1 },
      { id: 3, color: 'red', step: -1 }
    ],
    yellow: [
      { id: 0, color: 'yellow', step: -1 },
      { id: 1, color: 'yellow', step: -1 },
      { id: 2, color: 'yellow', step: -1 },
      { id: 3, color: 'yellow', step: -1 }
    ],
    green: [],
    blue: []
  };

  return {
    currentTurnPlayerId: p1Id,
    playerColors: {
      [p1Id]: 'red',
      [p2Id]: 'yellow'
    },
    diceValue: null,
    diceRolled: false,
    canRoll: true,
    tokens,
    validMoves: [],
    isRolling: false,
    consecutiveSixes: 0,
    lastMessage: 'Giliran pertama! Lempar dadu untuk memulai.'
  };
}

export function getValidLudoMoves(tokens: LudoToken[], dice: number): number[] {
  const valid: number[] = [];
  tokens.forEach((token) => {
    if (token.step === -1) {
      // Token in base can only move if rolled a 6
      if (dice === 6) {
        valid.push(token.id);
      }
    } else if (token.step < 56) {
      // Must not overshoot Home (exact roll to 56)
      if (token.step + dice <= 56) {
        valid.push(token.id);
      }
    }
  });
  return valid;
}
