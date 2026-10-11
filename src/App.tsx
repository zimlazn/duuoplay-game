/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SocketProvider, useSocket } from './context/SocketContext';
import { Navbar } from './components/Navbar';
import { Lobby } from './components/Lobby';
import { ScoreboardModal } from './components/ScoreboardModal';
import { GameSelectorModal } from './components/GameSelectorModal';
import { VoiceCallModal } from './components/VoiceCallModal';
import { GameOverModal } from './components/GameOverModal';
import { FloatingReactions } from './components/FloatingReactions';
import { ReactionPicker } from './components/ReactionPicker';
import { CountdownOverlay } from './components/CountdownOverlay';
import { RoundResultBanner } from './components/RoundResultBanner';

import { FlagGame } from './components/games/FlagGame';
import { WordGame } from './components/games/WordGame';
import { EmojiVoiceGame } from './components/games/EmojiVoiceGame';
import { DilemmaGame } from './components/games/DilemmaGame';
import { ReflexGame } from './components/games/ReflexGame';

function GameContainer() {
  const { room } = useSocket();
  const [isScoreboardOpen, setIsScoreboardOpen] = useState(false);
  const [isGameSelectorOpen, setIsGameSelectorOpen] = useState(false);
  const [isVoiceCallModalOpen, setIsVoiceCallModalOpen] = useState(false);

  const gameState = room?.gameState;
  const isPlaying = gameState && gameState.status !== 'waiting';

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-zinc-900 flex flex-col font-sans selection:bg-pink-200 selection:text-zinc-900">
      {/* Real-time floating animated reactions */}
      <FloatingReactions />

      {/* Synchronized Countdown Overlay */}
      <CountdownOverlay />

      {/* Top Navigation */}
      <Navbar
        onOpenScoreboard={() => setIsScoreboardOpen(true)}
        onOpenGameSelector={() => setIsGameSelectorOpen(true)}
        onOpenVoiceCallModal={() => setIsVoiceCallModalOpen(true)}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-4 pb-24 flex flex-col justify-center">
        {!isPlaying ? (
          <Lobby
            onOpenGameSelector={() => setIsGameSelectorOpen(true)}
            onOpenVoiceCallModal={() => setIsVoiceCallModalOpen(true)}
          />
        ) : (
          <div className="w-full flex flex-col items-center">
            {/* Round Result Feedback when round finishes */}
            <RoundResultBanner />

            {/* Active Game Component */}
            {gameState.gameType === 'flag' && <FlagGame />}
            {gameState.gameType === 'word' && <WordGame />}
            {gameState.gameType === 'emoji_voice' && <EmojiVoiceGame />}
            {gameState.gameType === 'dilemma' && <DilemmaGame />}
            {gameState.gameType === 'reflex' && <ReflexGame />}
          </div>
        )}
      </main>

      {/* Reaction and Emote Bar (Visible when in room) */}
      {room && <ReactionPicker />}

      {/* Scoreboard Modal */}
      <ScoreboardModal
        isOpen={isScoreboardOpen}
        onClose={() => setIsScoreboardOpen(false)}
      />

      {/* Game Selector Modal */}
      <GameSelectorModal
        isOpen={isGameSelectorOpen}
        onClose={() => setIsGameSelectorOpen(false)}
      />

      {/* Voice Call Helper Modal */}
      <VoiceCallModal
        isOpen={isVoiceCallModalOpen}
        onClose={() => setIsVoiceCallModalOpen(false)}
      />

      {/* Game Over Celebration Modal */}
      <GameOverModal
        onOpenGameSelector={() => setIsGameSelectorOpen(true)}
        onOpenScoreboard={() => setIsScoreboardOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <SocketProvider>
      <GameContainer />
    </SocketProvider>
  );
}
