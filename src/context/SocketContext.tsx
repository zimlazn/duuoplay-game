import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { RoomState, GameType, UnoColor } from '../types/game';
import { sound } from '../utils/sound';

export interface ChatMessage {
  senderId: string;
  senderName: string;
  senderAvatar: string;
  message: string;
  timestamp: number;
}

export interface ReactionItem {
  id: string;
  senderId: string;
  senderName: string;
  emoji: string;
  timestamp: number;
}

interface SocketContextType {
  socket: Socket | null;
  room: RoomState | null;
  playerId: string | null;
  isConnected: boolean;
  error: string | null;
  clearError: () => void;
  createRoom: (nickname: string, avatar: string) => void;
  joinRoom: (roomId: string, nickname: string, avatar: string) => void;
  setReady: (isReady: boolean) => void;
  selectGameType: (gameType: GameType, totalRounds?: number, startImmediately?: boolean) => void;
  setTotalRounds: (rounds: number) => void;
  startGame: () => void;
  rematch: () => void;
  submitAnswer: (data: any) => void;
  submitReflexTap: (timestamp: number) => void;

  // New Games
  submitTicTacToeMove: (index: number) => void;
  playUnoCard: (cardId: string, chosenColor?: UnoColor) => void;
  drawUnoCard: () => void;
  callUno: () => void;
  passUnoTurn: () => void;
  rollLudoDice: () => void;
  moveLudoToken: (tokenId: number) => void;

  // Pause & Exit
  togglePause: () => void;
  requestExit: () => void;
  cancelExit: () => void;
  leaveRoom: () => void;

  // Speed Typing
  submitTypingProgress: (progressPercent: number, charsTyped: number, wpm: number, accuracy: number, isFinished: boolean) => void;

  // Find & Mark (Cari & Coret)
  setFindAndMarkTargetNumber: (targetNumber: number) => void;
  markFindAndMarkCell: (cellIndex: number) => void;
  submitFindAndMarkSeekerGuess: (guessedNumber: number) => void;

  sendReaction: (emoji: string) => void;
  sendChatMessage: (message: string) => void;
  chatMessages: ChatMessage[];
  floatingReactions: ReactionItem[];
  soundEnabled: boolean;
  toggleSound: () => void;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [room, setRoom] = useState<RoomState | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [floatingReactions, setFloatingReactions] = useState<ReactionItem[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const prevRoundRef = useRef<number>(1);
  const prevStatusRef = useRef<string>('');

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const next = !prev;
      sound.enabled = next;
      if (next) sound.playClick();
      return next;
    });
  }, []);

  useEffect(() => {
    const newSocket = io({
      transports: ['polling', 'websocket'],
      reconnectionAttempts: 10,
      reconnectionDelay: 1000
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      setIsConnected(true);
      setPlayerId(newSocket.id || null);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    newSocket.on('room:joined', ({ room, playerId }: { room: RoomState; playerId: string }) => {
      setRoom(room);
      setPlayerId(playerId);
      setError(null);
      sound.playClick();
    });

    newSocket.on('room:updated', (updatedRoom: RoomState) => {
      setRoom(updatedRoom);

      if (updatedRoom.gameState.status === 'countdown' && prevStatusRef.current !== 'countdown') {
        sound.playTick();
      }

      if (updatedRoom.gameState.status === 'round_result' && prevStatusRef.current !== 'round_result') {
        if (updatedRoom.gameState.roundWinnerId === newSocket.id) {
          sound.playCorrect();
        } else if (updatedRoom.gameState.roundWinnerId === 'draw') {
          sound.playClick();
        } else {
          sound.playWrong();
        }
      }

      if (updatedRoom.gameState.status === 'game_over' && prevStatusRef.current !== 'game_over') {
        sound.playVictory();
      }

      prevStatusRef.current = updatedRoom.gameState.status;
      prevRoundRef.current = updatedRoom.gameState.currentRound;
    });

    newSocket.on('game:countdown_tick', ({ countdown }: { countdown: number }) => {
      setRoom(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          gameState: {
            ...prev.gameState,
            countdown
          }
        };
      });
      sound.playTick();
    });

    newSocket.on('game:time_update', ({ timeLeft }: { timeLeft: number }) => {
      setRoom(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          gameState: {
            ...prev.gameState,
            timeLeft
          }
        };
      });
      if (timeLeft <= 3 && timeLeft > 0) {
        sound.playTick();
      }
    });

    newSocket.on('game:reflex_signal', () => {
      sound.playSignal();
    });

    newSocket.on('reaction:broadcast', (reaction: ReactionItem) => {
      sound.playPop();
      setFloatingReactions(prev => [...prev.slice(-15), reaction]);
      setTimeout(() => {
        setFloatingReactions(prev => prev.filter(r => r.id !== reaction.id));
      }, 3000);
    });

    newSocket.on('chat:broadcast', (chatMsg: ChatMessage) => {
      setChatMessages(prev => [...prev.slice(-30), chatMsg]);
    });

    newSocket.on('room:error', ({ message }: { message: string }) => {
      setError(message);
      sound.playWrong();
    });

    newSocket.on('room:left', () => {
      setRoom(null);
      if (typeof window !== 'undefined') {
        window.history.replaceState({}, '', '/');
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const createRoom = useCallback((nickname: string, avatar: string) => {
    if (socket) {
      socket.emit('room:create', { nickname, avatar });
    }
  }, [socket]);

  const joinRoom = useCallback((roomId: string, nickname: string, avatar: string) => {
    if (socket) {
      socket.emit('room:join', { roomId, nickname, avatar });
    }
  }, [socket]);

  const setReady = useCallback((isReady: boolean) => {
    if (socket) {
      sound.playClick();
      socket.emit('player:ready', { isReady });
    }
  }, [socket]);

  const selectGameType = useCallback((gameType: GameType, totalRounds: number = 5, startImmediately: boolean = false) => {
    if (socket) {
      sound.playClick();
      socket.emit('game:select_type', { gameType, totalRounds, startImmediately });
    }
  }, [socket]);

  const setTotalRounds = useCallback((rounds: number) => {
    if (socket) {
      sound.playClick();
      socket.emit('game:set_rounds', { totalRounds: rounds });
    }
  }, [socket]);

  const startGame = useCallback(() => {
    if (socket) {
      sound.playClick();
      socket.emit('game:start');
    }
  }, [socket]);

  const rematch = useCallback(() => {
    if (socket) {
      sound.playClick();
      socket.emit('game:rematch');
    }
  }, [socket]);

  const submitAnswer = useCallback((data: any) => {
    if (socket) {
      sound.playClick();
      socket.emit('game:answer', data);
    }
  }, [socket]);

  const submitReflexTap = useCallback((tapTimestamp: number) => {
    if (socket) {
      socket.emit('game:reflex_tap', { tapTimestamp });
    }
  }, [socket]);

  // Tic Tac Toe
  const submitTicTacToeMove = useCallback((index: number) => {
    if (socket) {
      sound.playClick();
      socket.emit('tictactoe:move', { index });
    }
  }, [socket]);

  // UNO
  const playUnoCard = useCallback((cardId: string, chosenColor?: UnoColor) => {
    if (socket) {
      sound.playCardPlay();
      socket.emit('uno:play_card', { cardId, chosenColor });
    }
  }, [socket]);

  const drawUnoCard = useCallback(() => {
    if (socket) {
      sound.playCardDraw();
      socket.emit('uno:draw_card');
    }
  }, [socket]);

  const callUno = useCallback(() => {
    if (socket) {
      sound.playCorrect();
      socket.emit('uno:call_uno');
    }
  }, [socket]);

  const passUnoTurn = useCallback(() => {
    if (socket) {
      sound.playClick();
      socket.emit('uno:pass_turn');
    }
  }, [socket]);

  // LUDO
  const rollLudoDice = useCallback(() => {
    if (socket) {
      sound.playDiceRoll();
      socket.emit('ludo:roll_dice');
    }
  }, [socket]);

  const moveLudoToken = useCallback((tokenId: number) => {
    if (socket) {
      sound.playClick();
      socket.emit('ludo:move_token', { tokenId });
    }
  }, [socket]);

  // Pause & Exit
  const togglePause = useCallback(() => {
    if (socket) {
      sound.playClick();
      socket.emit('game:pause_toggle');
    }
  }, [socket]);

  const requestExit = useCallback(() => {
    if (socket) {
      sound.playClick();
      socket.emit('game:exit_request');
    }
  }, [socket]);

  const cancelExit = useCallback(() => {
    if (socket) {
      sound.playClick();
      socket.emit('game:exit_cancel');
    }
  }, [socket]);

  const leaveRoom = useCallback(() => {
    if (socket) {
      sound.playClick();
      socket.emit('room:leave');
      setRoom(null);
      if (typeof window !== 'undefined') {
        window.history.replaceState({}, '', '/');
      }
    }
  }, [socket]);

  const submitTypingProgress = useCallback(
    (progressPercent: number, charsTyped: number, wpm: number, accuracy: number, isFinished: boolean) => {
      if (socket) {
        socket.emit('typing:progress', {
          progressPercent,
          charsTyped,
          wpm,
          accuracy,
          isFinished
        });
      }
    },
    [socket]
  );

  const setFindAndMarkTargetNumber = useCallback(
    (targetNumber: number) => {
      if (socket) {
        sound.playClick();
        socket.emit('find_and_mark:set_target_number', { targetNumber });
      }
    },
    [socket]
  );

  const markFindAndMarkCell = useCallback(
    (cellIndex: number) => {
      if (socket) {
        sound.playTick();
        socket.emit('find_and_mark:mark_cell', { cellIndex });
      }
    },
    [socket]
  );

  const submitFindAndMarkSeekerGuess = useCallback(
    (guessedNumber: number) => {
      if (socket) {
        socket.emit('find_and_mark:seeker_guess', { guessedNumber });
      }
    },
    [socket]
  );

  const sendReaction = useCallback((emoji: string) => {
    if (socket) {
      socket.emit('reaction:send', { emoji });
    }
  }, [socket]);

  const sendChatMessage = useCallback((message: string) => {
    if (socket && message.trim()) {
      socket.emit('chat:send', { message: message.trim() });
    }
  }, [socket]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        room,
        playerId,
        isConnected,
        error,
        clearError,
        createRoom,
        joinRoom,
        setReady,
        selectGameType,
        setTotalRounds,
        startGame,
        rematch,
        submitAnswer,
        submitReflexTap,
        submitTicTacToeMove,
        playUnoCard,
        drawUnoCard,
        callUno,
        passUnoTurn,
        rollLudoDice,
        moveLudoToken,
        togglePause,
        requestExit,
        cancelExit,
        leaveRoom,
        submitTypingProgress,
        setFindAndMarkTargetNumber,
        markFindAndMarkCell,
        submitFindAndMarkSeekerGuess,
        sendReaction,
        sendChatMessage,
        chatMessages,
        floatingReactions,
        soundEnabled,
        toggleSound
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
