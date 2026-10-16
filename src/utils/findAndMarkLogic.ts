import { FindAndMarkState } from '../types/game';

/**
 * Buat kumpulan angka acak (tumpukan angka) berisi targetNumber
 * Default: 64 angka acak unik antara 10 - 99
 */
export function generateNumberPool(targetNumber: number, poolSize: number = 64): number[] {
  const poolSet = new Set<number>();
  poolSet.add(targetNumber);

  while (poolSet.size < poolSize) {
    // Angka antara 10 sampai 99 (2 digit yang menantang dan seru dicari)
    const rand = Math.floor(Math.random() * 90) + 10;
    poolSet.add(rand);
  }

  // Acak urutan angka dalam tumpukan
  return Array.from(poolSet).sort(() => Math.random() - 0.5);
}

/**
 * Inisialisasi state awal permainan Find & Mark
 */
export function initFindAndMarkGame(p1Id: string, p2Id: string): FindAndMarkState {
  return {
    turnNumber: 1,
    phase: 'pick_number',
    setterPlayerId: p1Id,
    seekerPlayerId: p2Id,
    targetNumber: null,
    numberPool: [],
    timeLimitSeconds: 25,
    timeLeftSeconds: 25,
    playerBoards: {
      [p1Id]: Array(49).fill(0),
      [p2Id]: Array(49).fill(0)
    },
    playerCompletedCount: {
      [p1Id]: 0,
      [p2Id]: 0
    }
  };
}
