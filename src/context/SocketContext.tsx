import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { RoomState, GameType } from '../types/game';
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
  selectGameType: (gameType: GameType, totalRounds?: number) => void;
  startGame: () => void;
  rematch: () => void;
  submitAnswer: (data: any) => void;
  submitReflexTap: (timestamp: number) => void;
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
    // Connect to same origin
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

      // Sound triggers on state transitions
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
      sound.playTick();
    });

    newSocket.on('game:time_update', ({ timeLeft }: { timeLeft: number }) => {
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
      // Auto-remove reaction after 3 seconds
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

  const selectGameType = useCallback((gameType: GameType, totalRounds: number = 5) => {
    if (socket) {
      sound.playClick();
      socket.emit('game:select_type', { gameType, totalRounds });
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
        startGame,
        rematch,
        submitAnswer,
        submitReflexTap,
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
