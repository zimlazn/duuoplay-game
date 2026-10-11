import React, { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import {
  Share2,
  Copy,
  Check,
  Play,
  Gamepad2,
  PhoneCall,
  Crown
} from 'lucide-react';

const AVATARS = ['🦁', '🦊', '🐼', '🐱', '🐯', '🐰', '🐸', '🦄', '⚡', '🚀', '👑', '🎯'];
const NICKNAME_PRESETS = ['Garuda', 'Kancil', 'Bintang', 'Panda', 'Kapten', 'Juara'];

interface LobbyProps {
  onOpenGameSelector: () => void;
  onOpenVoiceCallModal: () => void;
}

export const Lobby: React.FC<LobbyProps> = ({ onOpenGameSelector, onOpenVoiceCallModal }) => {
  const {
    room,
    playerId,
    createRoom,
    joinRoom,
    startGame,
    error,
    clearError
  } = useSocket();

  const [nickname, setNickname] = useState('Player');
  const [selectedAvatar, setSelectedAvatar] = useState('🦁');
  const [inputRoomCode, setInputRoomCode] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlRoom = params.get('room');
      if (urlRoom) {
        setInputRoomCode(urlRoom.toUpperCase());
      }
    }
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createRoom(nickname.trim() || 'Player 1', selectedAvatar);
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRoomCode.trim()) return;
    joinRoom(inputRoomCode.trim().toUpperCase(), nickname.trim() || 'Player 2', selectedAvatar);
  };

  const handleCopyCode = () => {
    if (room?.roomId) {
      navigator.clipboard.writeText(room.roomId);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleCopyLink = () => {
    if (room?.roomId && typeof window !== 'undefined') {
      const url = `${window.location.origin}?room=${room.roomId}`;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleShareWhatsApp = () => {
    if (!room?.roomId) return;
    const url = typeof window !== 'undefined' ? `${window.location.origin}?room=${room.roomId}` : '';
    const text = encodeURIComponent(
      `Hai! Ayo main game 2-player DuoPlay bareng aku! 🎮\nKode Room: ${room.roomId}\nLangsung klik link: ${url}\n\nKita bisa sambil teleponan di WhatsApp yaa! 📞`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // Pre-join Lobby
  if (!room) {
    return (
      <div className="w-full max-w-md mx-auto flex flex-col items-center gap-5 px-2 py-4">
        {/* Hero Branding */}
        <div className="text-center space-y-1.5">
          <div className="inline-block px-3 py-1 rounded-xl bg-purple-100 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] text-purple-950 text-xs font-black">
            Game 2 Player Real-Time
          </div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight">
            DuoPlay
          </h1>
          <p className="text-xs text-zinc-600 max-w-xs mx-auto font-medium">
            Tebak Bendera, Tebak Kata, Tebak Emoji WhatsApp Call, Uji Kecocokan & Refleks!
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="w-full p-3 rounded-2xl bg-pink-100 border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] text-pink-950 text-xs font-bold flex items-center justify-between">
            <span>{error}</span>
            <button onClick={clearError} className="text-zinc-600 hover:text-black font-bold">
              ✕
            </button>
          </div>
        )}

        {/* Profile Card */}
        <div className="w-full p-5 bg-white border-2 border-zinc-900 rounded-3xl shadow-[4px_4px_0px_#18181b] space-y-4">
          <div>
            <label className="block text-xs font-black text-zinc-800 uppercase tracking-wider mb-2">
              Pilih Avatar
            </label>
            <div className="grid grid-cols-6 gap-2">
              {AVATARS.map((av) => (
                <button
                  key={av}
                  type="button"
                  onClick={() => setSelectedAvatar(av)}
                  className={`aspect-square text-2xl rounded-2xl border-2 border-zinc-900 flex items-center justify-center transition-all ${
                    selectedAvatar === av
                      ? 'bg-amber-200 shadow-[2px_2px_0px_#18181b] scale-105'
                      : 'bg-zinc-50 hover:bg-zinc-100'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-zinc-800 uppercase tracking-wider mb-2">
              Nama Pemain
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Ketik namamu..."
              maxLength={15}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border-2 border-zinc-900 text-sm font-bold text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-white focus:shadow-[2px_2px_0px_#18181b] transition"
            />
            {/* Quick Presets */}
            <div className="flex gap-1.5 mt-2 overflow-x-auto no-scrollbar">
              {NICKNAME_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setNickname(preset)}
                  className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-950 border border-zinc-900 transition"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons: Create or Join */}
        <div className="w-full space-y-3">
          <button
            onClick={handleCreate}
            className="w-full py-3.5 px-4 rounded-2xl bg-amber-200 hover:bg-amber-300 text-zinc-900 border-2 border-zinc-900 shadow-[4px_4px_0px_#18181b] font-black text-sm flex items-center justify-center gap-2 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            <Crown className="w-4 h-4 text-zinc-900" />
            Buat Room Baru (Host)
          </button>

          <div className="flex items-center gap-2 text-xs text-zinc-400 font-bold uppercase">
            <div className="flex-1 h-0.5 bg-zinc-200" />
            <span>atau gabung teman</span>
            <div className="flex-1 h-0.5 bg-zinc-200" />
          </div>

          <form onSubmit={handleJoin} className="flex gap-2">
            <input
              type="text"
              value={inputRoomCode}
              onChange={(e) => setInputRoomCode(e.target.value.toUpperCase())}
              placeholder="KODE ROOM (Misal: 7K2M)"
              maxLength={6}
              className="flex-1 px-3.5 py-3 rounded-2xl bg-white border-2 border-zinc-900 text-sm font-mono font-black tracking-widest text-center text-zinc-900 placeholder-zinc-400 uppercase focus:outline-none focus:shadow-[2px_2px_0px_#18181b]"
            />
            <button
              type="submit"
              disabled={!inputRoomCode.trim()}
              className="px-5 py-3 rounded-2xl bg-sky-200 hover:bg-sky-300 disabled:opacity-50 text-zinc-900 font-black text-sm border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              Gabung
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Inside Room Lobby
  const playerIds = Object.keys(room.players);
  const p1 = playerIds[0] ? room.players[playerIds[0]] : null;
  const p2 = playerIds[1] ? room.players[playerIds[1]] : null;
  const bothConnected = p1 && p2 && p1.isConnected && p2.isConnected;

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-4 px-2 py-4">
      {/* Room Code Card */}
      <div className="w-full p-5 bg-white border-2 border-zinc-900 rounded-3xl shadow-[4px_4px_0px_#18181b] flex flex-col items-center text-center">
        <span className="text-[11px] font-black text-zinc-500 uppercase tracking-wider">
          Kode Room Kamu
        </span>
        <div className="flex items-center gap-3 my-2">
          <span className="text-4xl font-mono font-black tracking-widest text-zinc-900">
            {room.roomId}
          </span>
          <button
            onClick={handleCopyCode}
            title="Salin Kode"
            className="p-2.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-950 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          >
            {copiedCode ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Share buttons */}
        <div className="flex items-center gap-2 mt-2 w-full">
          <button
            onClick={handleShareWhatsApp}
            className="flex-1 py-2 px-3 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] text-xs font-black flex items-center justify-center gap-1.5 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            Kirim ke WhatsApp
          </button>
          <button
            onClick={handleCopyLink}
            className="py-2 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] text-xs font-black flex items-center justify-center gap-1.5 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
            Salin Link
          </button>
        </div>
      </div>

      {/* Players Duel Box */}
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between text-xs text-zinc-600 px-1 font-bold">
          <span>Pemain ({playerIds.length}/2)</span>
          <span className="text-emerald-700 font-bold">Live Sync</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {p1 && (
            <div className="p-4 rounded-2xl bg-purple-50 border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] flex flex-col items-center text-center relative">
              <span className="absolute top-2 right-2 text-[10px] font-black text-amber-900 bg-amber-200 px-1.5 py-0.5 rounded-md border border-zinc-900">
                Host
              </span>
              <span className="text-4xl my-1">{p1.avatar}</span>
              <span className="text-xs font-black text-zinc-900 truncate max-w-full">
                {p1.nickname} {p1.id === playerId ? '(Kamu)' : ''}
              </span>
              <span className="text-[10px] text-emerald-700 font-bold mt-1">
                Tersambung
              </span>
            </div>
          )}

          {p2 ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] flex flex-col items-center text-center relative">
              <span className="text-4xl my-1">{p2.avatar}</span>
              <span className="text-xs font-black text-zinc-900 truncate max-w-full">
                {p2.nickname} {p2.id === playerId ? '(Kamu)' : ''}
              </span>
              <span className="text-[10px] text-emerald-700 font-bold mt-1">
                Tersambung
              </span>
            </div>
          ) : (
            <div className="p-4 rounded-2xl border-2 border-dashed border-zinc-400 bg-white flex flex-col items-center justify-center text-center">
              <span className="text-3xl opacity-40">👥</span>
              <span className="text-xs text-zinc-500 font-bold mt-1">
                Menunggu Teman...
              </span>
              <span className="text-[10px] text-zinc-400 font-medium">
                Bagikan kode di atas!
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Selected Game Banner */}
      <div className="w-full p-3.5 rounded-2xl bg-white border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-100 border border-zinc-900 text-zinc-900">
            <Gamepad2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-black text-zinc-400">Mode Dipilih:</span>
            <p className="text-xs font-black text-zinc-900">
              {room.gameState.gameType === 'flag' && '🎌 Tebak Bendera'}
              {room.gameState.gameType === 'word' && '🧩 Tebak Kata'}
              {room.gameState.gameType === 'emoji_voice' && '📞 Tebak Emoji Suara'}
              {room.gameState.gameType === 'dilemma' && '💖 Uji Kecocokan'}
              {room.gameState.gameType === 'reflex' && '⚡ Refleks Kilat'}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenGameSelector}
          className="px-3 py-1.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-950 font-black text-xs border border-zinc-900 shadow-[2px_2px_0px_#18181b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
        >
          Ganti
        </button>
      </div>

      {/* WhatsApp Call Recommendation */}
      <button
        onClick={onOpenVoiceCallModal}
        className="w-full p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] flex items-center justify-between text-xs text-left active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
      >
        <div className="flex items-center gap-2">
          <PhoneCall className="w-4 h-4 text-emerald-800 shrink-0" />
          <span className="text-zinc-800 font-bold">
            Tips: Nyalakan WhatsApp Call agar makin seru!
          </span>
        </div>
        <span className="text-[10px] text-emerald-800 font-black shrink-0">Panduan →</span>
      </button>

      {/* Start Button */}
      <div className="w-full pt-1">
        {bothConnected ? (
          <button
            onClick={startGame}
            className="w-full py-4 px-6 rounded-2xl bg-emerald-300 hover:bg-emerald-400 text-zinc-900 font-black text-base border-2 border-zinc-900 shadow-[4px_4px_0px_#18181b] flex items-center justify-center gap-2 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            <Play className="w-5 h-5 fill-zinc-900" />
            MULAI SEKARANG!
          </button>
        ) : (
          <div className="w-full py-3.5 px-4 rounded-2xl bg-zinc-100 border-2 border-dashed border-zinc-300 text-center text-xs text-zinc-500 font-bold">
            Menunggu Pemain 2 untuk mulai...
          </div>
        )}
      </div>
    </div>
  );
};
