import React, { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import { GameType } from '../types/game';
import { ROBLOX_GAMES } from './Lobby';
import {
  X,
  Sparkles,
  Flame,
  ThumbsUp,
  Users,
  Clock,
  Play,
  Check
} from 'lucide-react';

interface GameSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MODAL_CATEGORY_TABS = [
  { id: 'all', label: '🌟 Semua' },
  { id: 'popular', label: '🔥 Populer' },
  { id: 'action', label: '⚡ Aksi' },
  { id: 'board', label: '🃏 Papan' },
  { id: 'word', label: '🧠 Kata' },
  { id: 'casual', label: '💖 Santai' }
];

export const GameSelectorModal: React.FC<GameSelectorModalProps> = ({ isOpen, onClose }) => {
  const { room, selectGameType, playerId } = useSocket();
  const [selectedRounds, setSelectedRounds] = useState<number>(room?.gameState.totalRounds || 5);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    if (room?.gameState.totalRounds) {
      setSelectedRounds(room.gameState.totalRounds);
    }
  }, [room?.gameState.totalRounds]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !room) return null;

  const currentGameType = room.gameState.gameType;
  const isHost = room.hostId === playerId;
  const playerIds = Object.keys(room.players);
  const bothConnected = playerIds.length >= 2;
  const isPinkTheme = room.roomId === 'ACAA' || room.isSpecialTheme;

  const filteredGames = ROBLOX_GAMES.filter((game) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'popular') {
      return ['find_and_mark', 'speed_typing', 'uno', 'ludo'].includes(game.type);
    }
    return game.category === activeCategory;
  });

  const handleSelectAndStart = (type: GameType) => {
    selectGameType(type, selectedRounds, true);
    onClose();
  };

  const handleSelectOnly = (type: GameType) => {
    selectGameType(type, selectedRounds, false);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-2xl border-3 rounded-3xl overflow-hidden flex flex-col max-h-[90vh] cursor-default transition-all ${
          isPinkTheme
            ? 'bg-pink-50 border-pink-500 shadow-[6px_6px_0px_#f472b6] text-pink-950'
            : 'bg-white dark:bg-zinc-900 border-zinc-900 dark:border-zinc-700 shadow-[6px_6px_0px_#18181b]'
        }`}
      >
        {/* Roblox Experience Header */}
        <div
          className={`p-4 border-b-2 flex items-center justify-between ${
            isPinkTheme
              ? 'bg-pink-200 border-pink-400 text-pink-950'
              : 'bg-amber-100 dark:bg-amber-950/80 border-zinc-900 dark:border-zinc-700'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`p-2 rounded-xl border-2 ${
                isPinkTheme
                  ? 'bg-white border-pink-500 shadow-[2px_2px_0px_#f472b6]'
                  : 'bg-amber-300 border-zinc-900 shadow-[2px_2px_0px_#18181b]'
              }`}
            >
              <Flame className="w-5 h-5 text-zinc-900" />
            </div>
            <div>
              <h3 className="text-base font-black text-zinc-900 dark:text-white">
                Katalog Pengalaman Roblox (Games)
              </h3>
              <p
                className={`text-xs font-medium ${
                  isPinkTheme ? 'text-pink-800' : 'text-zinc-600 dark:text-zinc-400'
                }`}
              >
                Pilih game 2 pemain yang ingin dimainkan bersama
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-xl border-2 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer ${
              isPinkTheme
                ? 'bg-white hover:bg-pink-100 border-pink-500 text-pink-900 shadow-[2px_2px_0px_#f472b6]'
                : 'bg-white dark:bg-zinc-800 border-zinc-900 shadow-[2px_2px_0px_#18181b] text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Tabs & Rounds Bar */}
        <div className="p-3 border-b-2 border-zinc-900/10 dark:border-zinc-700/50 bg-[#F4F1EB] dark:bg-zinc-850 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {MODAL_CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-2.5 py-1 rounded-xl text-xs font-black whitespace-nowrap shrink-0 transition-all border cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs'
                    : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Round Selector */}
          <div className="flex items-center gap-1.5 shrink-0 justify-end">
            <span className="text-[11px] font-black uppercase text-zinc-600 dark:text-zinc-400">
              Babak:
            </span>
            <div className="flex gap-1 bg-white dark:bg-zinc-900 p-0.5 rounded-xl border border-zinc-900">
              {[3, 5, 7, 10].map((rounds) => (
                <button
                  key={rounds}
                  disabled={!isHost}
                  onClick={() => setSelectedRounds(rounds)}
                  className={`px-2 py-0.5 rounded-lg text-xs font-black transition-all ${
                    selectedRounds === rounds
                      ? 'bg-amber-300 text-zinc-950 font-black'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  {rounds}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Roblox Game Experiences Grid */}
        <div className="p-4 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 no-scrollbar">
          {filteredGames.map((game) => {
            const isCurrent = currentGameType === game.type;

            return (
              <div
                key={game.type}
                className={`p-3.5 rounded-2xl border-2 flex flex-col justify-between gap-3 transition-all ${
                  isCurrent
                    ? `${game.pastelBg} border-amber-500 shadow-[4px_4px_0px_#f59e0b] ring-2 ring-amber-400`
                    : 'bg-white dark:bg-zinc-850 hover:bg-zinc-50 border-zinc-900 dark:border-zinc-700 shadow-[2px_2px_0px_#18181b]'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b]">
                        {game.icon}
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-zinc-900 dark:text-white">
                          {game.title}
                        </h4>
                        <span className="inline-block px-2 py-0.5 rounded-md bg-white/80 dark:bg-zinc-900 text-[10px] font-black text-zinc-700 dark:text-zinc-300 border border-zinc-400 mt-0.5">
                          {game.badge}
                        </span>
                      </div>
                    </div>
                    {isCurrent && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-400 border border-zinc-900 text-emerald-950 text-[10px] font-black shrink-0">
                        Dipilih ✓
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed mb-2">
                    {game.description}
                  </p>

                  <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500">
                    <span className="flex items-center gap-0.5">
                      <ThumbsUp className="w-3 h-3 text-emerald-600" />
                      <span>{game.rating}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <Clock className="w-3 h-3 text-amber-600" />
                      <span>{game.timeEstimate}</span>
                    </span>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-2 border-t border-zinc-900/10 dark:border-zinc-700/50 flex items-center gap-2">
                  {bothConnected ? (
                    <button
                      onClick={() => handleSelectAndStart(game.type)}
                      className="w-full py-2 px-3 rounded-xl bg-emerald-400 hover:bg-emerald-500 text-emerald-950 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] text-xs font-black flex items-center justify-center gap-1.5 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Pilih & Mulai Langsung</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSelectOnly(game.type)}
                      className="w-full py-2 px-3 rounded-xl bg-amber-300 hover:bg-amber-400 text-zinc-900 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] text-xs font-black flex items-center justify-center gap-1.5 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Pilih Mode Ini</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
