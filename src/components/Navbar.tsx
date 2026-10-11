import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';
import {
  Trophy,
  Volume2,
  VolumeX,
  PhoneCall,
  Copy,
  Check,
  Gamepad2
} from 'lucide-react';

interface NavbarProps {
  onOpenScoreboard: () => void;
  onOpenGameSelector: () => void;
  onOpenVoiceCallModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenScoreboard,
  onOpenGameSelector,
  onOpenVoiceCallModal
}) => {
  const { room, playerId, soundEnabled, toggleSound } = useSocket();
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    if (room?.roomId) {
      navigator.clipboard.writeText(room.roomId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const playerIds = room ? Object.keys(room.players) : [];
  const p1 = playerIds[0] ? room?.players[playerIds[0]] : null;
  const p2 = playerIds[1] ? room?.players[playerIds[1]] : null;

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b-2 border-zinc-900 shadow-sm">
      <div className="max-w-4xl mx-auto px-3 py-2.5 flex items-center justify-between gap-2">
        {/* Brand & Room Code */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-black text-sm tracking-tight text-zinc-900">
            <span className="w-8 h-8 rounded-xl bg-amber-200 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] flex items-center justify-center text-sm font-black">
              🎮
            </span>
            <span className="font-extrabold text-base tracking-tight hidden xs:inline">
              DuoPlay
            </span>
          </div>

          {room && (
            <button
              onClick={handleCopyCode}
              title="Salin Kode Room"
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-purple-100 hover:bg-purple-200 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] text-xs font-mono font-black text-purple-950 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
            >
              <span>{room.roomId}</span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-700" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-zinc-700" />
              )}
            </button>
          )}
        </div>

        {/* Live Scores Banner */}
        {room && (
          <div className="flex items-center gap-2 bg-zinc-50 border-2 border-zinc-900 px-3 py-1 rounded-xl shadow-[2px_2px_0px_#18181b]">
            <div className="flex items-center gap-1 text-xs">
              <span className="text-sm">{p1?.avatar || '🦁'}</span>
              <span className="font-black text-purple-700 font-mono">{p1?.score ?? 0}</span>
            </div>
            <span className="text-zinc-400 text-xs font-bold">:</span>
            <div className="flex items-center gap-1 text-xs">
              <span className="font-black text-emerald-700 font-mono">{p2?.score ?? 0}</span>
              <span className="text-sm">{p2?.avatar || '🦊'}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          {/* WhatsApp Call Guide Button */}
          <button
            onClick={onOpenVoiceCallModal}
            title="Panduan Panggilan Suara WhatsApp"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] text-xs font-bold active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Voice Call WA</span>
          </button>

          {/* Switch Game Button */}
          {room && (
            <button
              onClick={onOpenGameSelector}
              title="Pilih Permainan Lain"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-950 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] text-xs font-bold active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Pilih Game</span>
            </button>
          )}

          {/* Scoreboard Drawer */}
          {room && (
            <button
              onClick={onOpenScoreboard}
              title="Papan Skor Bersama"
              className="p-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
            >
              <Trophy className="w-4 h-4" />
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
            className="p-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-zinc-900" />
            ) : (
              <VolumeX className="w-4 h-4 text-zinc-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
