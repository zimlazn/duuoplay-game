export type GameType = 'flag' | 'word' | 'emoji_voice' | 'dilemma' | 'reflex';

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
  playerAnswers: Record<string, any>;
  roundWinnerId?: string | 'draw' | null;
  roundFeedback?: string;
}

export interface RoomState {
  roomId: string;
  players: Record<string, Player>;
  hostId: string;
  gameState: GameState;
  roundHistory: RoundResult[];
  lastReaction?: {
    id: string;
    senderId: string;
    senderName: string;
    emoji: string;
    timestamp: number;
  };
}
