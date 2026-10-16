export type GameType =
  | 'flag'
  | 'word'
  | 'emoji_voice'
  | 'dilemma'
  | 'reflex'
  | 'tictactoe'
  | 'uno'
  | 'ludo'
  | 'speed_typing'
  | 'find_and_mark';

export interface Player {
  id: string; // socket.id
  nickname: string;
  avatar: string;
  isHost: boolean;
  score: number;
  totalWins: number;
  isReady: boolean;
  isConnected: boolean;
}

export interface FlagQuestion {
  id: string;
  countryCode: string;
  countryName: string;
  flagEmoji: string;
  options: string[];
  fact?: string;
}

export interface WordQuestion {
  id: string;
  word: string;
  clue: string;
  category: string;
  options: string[];
  hint: string;
}

export interface EmojiVoiceQuestion {
  id: string;
  targetEmoji: string;
  name: string;
  category: string;
  forbiddenWords: string[];
  options: { emoji: string; name: string }[];
  describerPlayerId: string;
  guesserPlayerId: string;
}

export interface DilemmaQuestion {
  id: string;
  title: string;
  category: string;
  optionA: { id: 'A'; text: string; emoji: string };
  optionB: { id: 'B'; text: string; emoji: string };
}

export interface RoundResult {
  roundNumber: number;
  winnerPlayerId: string | 'draw' | null;
  winnerName: string;
  player1Score: number;
  player2Score: number;
  details?: string;
}

// --- TIC TAC TOE TYPES ---
export interface TicTacToeState {
  board: Array<string | null>; // 9 cells
  currentTurnPlayerId: string;
  playerSymbols: Record<string, 'X' | 'O'>;
  winningLine: number[] | null;
  status: 'playing' | 'win' | 'draw';
  winnerPlayerId?: string | 'draw';
}

// --- UNO TYPES ---
export type UnoColor = 'red' | 'blue' | 'green' | 'yellow';
export type UnoValue =
  | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
  | 'skip' | 'reverse' | 'draw2' | 'wild' | 'wild4';

export interface UnoCard {
  id: string;
  color: UnoColor | 'wild';
  value: UnoValue;
}

export interface UnoState {
  currentTurnPlayerId: string;
  topCard: UnoCard;
  activeColor: UnoColor;
  playerHands: Record<string, UnoCard[]>;
  drawPileCount: number;
  unoCalled: Record<string, boolean>;
  hasDrawnCardThisTurn?: boolean;
  drawnCardId?: string;
  lastActionMessage?: string;
  winnerPlayerId?: string;
}

// --- LUDO TYPES ---
export type LudoColor = 'red' | 'yellow' | 'green' | 'blue';

export interface LudoToken {
  id: number; // 0, 1, 2, 3
  color: LudoColor;
  step: number; // -1 = base/yard; 0..50 = track; 51..55 = home column; 56 = home!
}

export interface LudoState {
  currentTurnPlayerId: string;
  playerColors: Record<string, LudoColor>; // p1 -> red, p2 -> yellow
  diceValue: number | null;
  diceRolled: boolean;
  canRoll: boolean;
  tokens: Record<LudoColor, LudoToken[]>;
  validMoves: number[]; // token IDs of current player that can move
  isRolling: boolean;
  consecutiveSixes: number;
  winnerPlayerId?: string;
  lastMessage?: string;
}

// --- SPEED TYPING (NGETIK CEPAT) TYPES ---
export interface SpeedTypingPrompt {
  id: string;
  text: string;
  category: string;
  authorOrSource?: string;
}

export interface SpeedTypingPlayerProgress {
  progressPercent: number; // 0 to 100
  charsTyped: number;
  wpm: number;
  accuracy: number;
  isFinished: boolean;
  finishedAt?: number;
}

export interface SpeedTypingState {
  prompt: SpeedTypingPrompt;
  playerProgress: Record<string, SpeedTypingPlayerProgress>;
  startTime: number;
  winnerPlayerId?: string;
}

// --- FIND AND MARK (CARI & CORET) TYPES ---
// 7x7 grid = 49 cells
// Cell state: 0 = kosong, 1 = garis satu '/', 2 = silang penuh 'X'
export interface FindAndMarkState {
  turnNumber: number;
  phase: 'pick_number' | 'seeking_and_marking' | 'turn_recap' | 'game_finished';
  setterPlayerId: string; // Pemain yang menentukan angka dan mencoret papan 7x7 miliknya
  seekerPlayerId: string; // Pemain yang mencari angka di tumpukan angka acak
  targetNumber: number | null; // Angka yang harus dicari
  numberPool: number[]; // Tumpukan angka acak (misal 64 angka acak 1-99)
  timeLimitSeconds: number; // 25 detik sesuai deskripsi user
  timeLeftSeconds: number; // Sisa waktu pencarian (25 detik hitung mundur)
  // Papan 7x7 (49 sel) untuk masing-masing pemain
  playerBoards: Record<string, number[]>; // Array 49 angka (0, 1, atau 2)
  playerCompletedCount: Record<string, number>; // Jumlah sel yang sudah berstatus '2' (X)
  lastTurnResult?: {
    found: boolean;
    timeTakenSeconds?: number;
    setterMarksAdded?: number;
    winnerId?: string;
    message?: string;
  };
  winnerPlayerId?: string;
}

export interface GameState {
  gameType: GameType;
  status: 'waiting' | 'countdown' | 'in_round' | 'round_result' | 'game_over';
  currentRound: number;
  totalRounds: number;
  timeLeft: number;
  countdown: number;
  // Game specific state
  flagData?: FlagQuestion;
  wordData?: WordQuestion;
  emojiVoiceData?: EmojiVoiceQuestion;
  dilemmaData?: DilemmaQuestion;
  reflexState?: {
    phase: 'waiting' | 'ready' | 'signal' | 'result';
    signalTimestamp?: number;
    playerTaps: Record<string, { timeMs: number; early?: boolean }>;
  };
  tictactoeState?: TicTacToeState;
  unoState?: UnoState;
  ludoState?: LudoState;
  speedTypingState?: SpeedTypingState;
  findAndMarkState?: FindAndMarkState;

  playerAnswers: Record<string, any>;
  roundWinnerId?: string | 'draw' | null;
  roundFeedback?: string;

  // Mutual pause and exit
  isPaused?: boolean;
  pausedByPlayerId?: string;
  exitVotes?: string[]; // IDs of players who agreed to exit
}

export interface RoomState {
  roomId: string;
  players: Record<string, Player>;
  hostId: string;
  gameState: GameState;
  roundHistory: RoundResult[];
  usedQuestionIds?: Record<string, string[]>;
  isSpecialTheme?: boolean;
  isPermanent?: boolean;
  lastReaction?: {
    id: string;
    senderId: string;
    senderName: string;
    emoji: string;
    timestamp: number;
  };
}
