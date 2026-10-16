import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../context/SocketContext';
import { GameType } from '../types/game';
import {
  Share2,
  Copy,
  Check,
  Play,
  Gamepad2,
  PhoneCall,
  Crown,
  Sparkles,
  Heart,
  Send,
  MessageSquare,
  Flame,
  Trophy,
  Zap,
  Target,
  Keyboard,
  Layers,
  Grid3X3,
  Flag,
  BookOpen,
  HeartHandshake,
  ThumbsUp,
  Users,
  Clock,
  ChevronRight,
  Smile,
  Info
} from 'lucide-react';

const AVATARS = ['🦁', '🦊', '🐼', '🐱', '🐯', '🐰', '🐸', '🦄', '⚡', '🚀', '👑', '🎯'];
const NICKNAME_PRESETS = ['Garuda', 'Kancil', 'Bintang', 'Panda', 'Kapten', 'Juara'];

export interface RobloxGameItem {
  type: GameType;
  title: string;
  category: 'all' | 'popular' | 'action' | 'board' | 'word' | 'casual';
  categoryLabel: string;
  badge: string;
  rating: string;
  players: string;
  timeEstimate: string;
  tags: string[];
  description: string;
  icon: React.ReactNode;
  gradient: string;
  pastelBg: string;
  borderColor: string;
  accentText: string;
}

export const ROBLOX_GAMES: RobloxGameItem[] = [
  {
    type: 'find_and_mark',
    title: 'Find & Mark (Cari & Coret)',
    category: 'action',
    categoryLabel: 'Aksi & Kecepatan',
    badge: 'Baru 🎯⚡',
    rating: '99%',
    players: '2 Pemain',
    timeEstimate: '25s / giliran',
    tags: ['Real-Time', 'Duel 7x7', 'Angka Rahasia'],
    description: 'Bergiliran cari angka target dalam 25 detik di tumpukan angka! Lawan mencoret papan 7x7 (1x = /, 2x = X). Siapa boardnya penuh duluan menang!',
    icon: <Target className="w-8 h-8 text-rose-950 dark:text-rose-100" />,
    gradient: 'from-rose-500 to-pink-600',
    pastelBg: 'bg-rose-100 dark:bg-rose-950/60',
    borderColor: 'border-rose-900 dark:border-rose-500',
    accentText: 'text-rose-950 dark:text-rose-200'
  },
  {
    type: 'speed_typing',
    title: 'Ngetik Cepat (Speed Typing)',
    category: 'action',
    categoryLabel: 'Aksi & Kecepatan',
    badge: '200+ Soal ⌨️⚡',
    rating: '98%',
    players: '2 Pemain',
    timeEstimate: '1-2 menit',
    tags: ['WPM Race', 'Bahasa Indo', 'Live Avatar'],
    description: 'Balapan ketik cepat kalimat dan peribahasa nusantara! Pantau posisi avatar di race track, WPM, CPM, dan akurasi jemari secara live.',
    icon: <Keyboard className="w-8 h-8 text-emerald-950 dark:text-emerald-100" />,
    gradient: 'from-emerald-500 to-teal-600',
    pastelBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    borderColor: 'border-emerald-900 dark:border-emerald-500',
    accentText: 'text-emerald-950 dark:text-emerald-200'
  },
  {
    type: 'uno',
    title: 'Permainan Kartu UNO',
    category: 'board',
    categoryLabel: 'Kartu & Papan',
    badge: 'Aturan Resmi 🃏🔥',
    rating: '99%',
    players: '2 Pemain',
    timeEstimate: '3-5 menit',
    tags: ['Kartu Resmi', 'Draw 4', 'Tombol UNO!'],
    description: 'Game kartu UNO lengkap! Kartu 0-9, Skip, Reverse, Draw 2 (+2), Wild, Wild Draw 4 (+4), dan tombol teriak UNO!',
    icon: <Layers className="w-8 h-8 text-red-950 dark:text-red-100" />,
    gradient: 'from-red-500 to-amber-600',
    pastelBg: 'bg-red-100 dark:bg-red-950/60',
    borderColor: 'border-red-900 dark:border-red-500',
    accentText: 'text-red-950 dark:text-red-200'
  },
  {
    type: 'ludo',
    title: 'LUDO 2 Player',
    category: 'board',
    categoryLabel: 'Kartu & Papan',
    badge: 'Papan Resmi 🎲🏆',
    rating: '97%',
    players: '2 Pemain',
    timeEstimate: '5-10 menit',
    tags: ['4 Pion 3D', 'Dadu Hoki', 'Home Segitiga'],
    description: 'Papan Ludo 4 pion resmi! Lempar dadu, masuki arena saat dapat 6, makan pion lawan, dan bawa semua pion ke Home segitiga.',
    icon: <Trophy className="w-8 h-8 text-amber-950 dark:text-amber-100" />,
    gradient: 'from-amber-500 to-orange-600',
    pastelBg: 'bg-amber-100 dark:bg-amber-950/60',
    borderColor: 'border-amber-900 dark:border-amber-500',
    accentText: 'text-amber-950 dark:text-amber-200'
  },
  {
    type: 'tictactoe',
    title: 'Tic Tac Toe',
    category: 'board',
    categoryLabel: 'Kartu & Papan',
    badge: 'Duel Klasik ⭕❌',
    rating: '95%',
    players: '2 Pemain',
    timeEstimate: '30 detik',
    tags: ['Garis 3', 'Asah Taktik', 'Santai'],
    description: 'Duel 3x3 klasik! Bergantian menempatkan simbol X dan O untuk membentuk 3 garis lurus sebelum lawan mengunci petak.',
    icon: <Grid3X3 className="w-8 h-8 text-sky-950 dark:text-sky-100" />,
    gradient: 'from-sky-500 to-blue-600',
    pastelBg: 'bg-sky-100 dark:bg-sky-950/60',
    borderColor: 'border-sky-900 dark:border-sky-500',
    accentText: 'text-sky-950 dark:text-sky-200'
  },
  {
    type: 'flag',
    title: 'Tebak Bendera Dunia',
    category: 'word',
    categoryLabel: 'Kata & Trivia',
    badge: '120+ Bendera 🌍',
    rating: '96%',
    players: '2 Pemain',
    timeEstimate: '1-2 menit',
    tags: ['Geografi', '120+ Negara', 'Bonus Kilat'],
    description: 'Tebak nama negara dari benderanya dengan 4 pilihan cepat. Siapa paling kilat dan tepat mendapat poin ekstra!',
    icon: <Flag className="w-8 h-8 text-blue-950 dark:text-blue-100" />,
    gradient: 'from-blue-500 to-indigo-600',
    pastelBg: 'bg-blue-100 dark:bg-blue-950/60',
    borderColor: 'border-blue-900 dark:border-blue-500',
    accentText: 'text-blue-950 dark:text-blue-200'
  },
  {
    type: 'word',
    title: 'Tebak Kata Indonesia',
    category: 'word',
    categoryLabel: 'Kata & Trivia',
    badge: '200+ Soal 📚',
    rating: '97%',
    players: '2 Pemain',
    timeEstimate: '2-3 menit',
    tags: ['200+ Soal', 'Bahasa Indo', 'Logika Kata'],
    description: 'Pecahkan teka-teki logika kata bahasa Indonesia dari petunjuk benda, kuliner nusantara, hewan, profesi, dan alam.',
    icon: <BookOpen className="w-8 h-8 text-purple-950 dark:text-purple-100" />,
    gradient: 'from-purple-500 to-indigo-600',
    pastelBg: 'bg-purple-100 dark:bg-purple-950/60',
    borderColor: 'border-purple-900 dark:border-purple-500',
    accentText: 'text-purple-950 dark:text-purple-200'
  },
  {
    type: 'emoji_voice',
    title: 'Tebak Emoji Suara WA',
    category: 'casual',
    categoryLabel: 'Santai & Bestie',
    badge: '100+ Emoji WA 📞',
    rating: '98%',
    players: '2 Pemain',
    timeEstimate: '2-3 menit',
    tags: ['Teleponan', 'Kata Terlarang', 'Tawa Seru'],
    description: 'Satu pemain melihat emoji & kata terlarang, jelaskan lewat suara telepon WhatsApp! Lawan menebak dari layarnya.',
    icon: <PhoneCall className="w-8 h-8 text-emerald-950 dark:text-emerald-100" />,
    gradient: 'from-emerald-500 to-teal-600',
    pastelBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    borderColor: 'border-emerald-900 dark:border-emerald-500',
    accentText: 'text-emerald-950 dark:text-emerald-200'
  },
  {
    type: 'dilemma',
    title: 'Uji Kecocokan (Dilema Telepati)',
    category: 'casual',
    categoryLabel: 'Santai & Bestie',
    badge: '100+ Dilema 💖',
    rating: '99%',
    players: '2 Pemain',
    timeEstimate: '2 menit',
    tags: ['Bestie & Pasangan', 'Telepati', 'Sefrekuensi'],
    description: 'Pilih dilema harian (bubur diaduk vs tidak, kopi vs teh). Reveal bersamaan untuk melihat seberapa sefrekuensi kalian!',
    icon: <HeartHandshake className="w-8 h-8 text-pink-950 dark:text-pink-100" />,
    gradient: 'from-pink-500 to-rose-600',
    pastelBg: 'bg-pink-100 dark:bg-pink-950/60',
    borderColor: 'border-pink-900 dark:border-pink-500',
    accentText: 'text-pink-950 dark:text-pink-200'
  },
  {
    type: 'reflex',
    title: 'Refleks Kilat (Buzzer Duel)',
    category: 'action',
    categoryLabel: 'Aksi & Kecepatan',
    badge: 'Refleks Kilat ⚡',
    rating: '96%',
    players: '2 Pemain',
    timeEstimate: '15 detik',
    tags: ['Adrenalin', 'Buzzer', 'Milidetik'],
    description: 'Tahan jarimu di layar... Begitu tombol berubah HIJAU, lepaskan secepat kilat! Siapa cepat dia dapat babak.',
    icon: <Zap className="w-8 h-8 text-yellow-950 dark:text-yellow-100" />,
    gradient: 'from-yellow-500 to-amber-600',
    pastelBg: 'bg-yellow-100 dark:bg-yellow-950/60',
    borderColor: 'border-yellow-900 dark:border-yellow-500',
    accentText: 'text-yellow-950 dark:text-yellow-200'
  }
];

const CATEGORY_TABS = [
  { id: 'all', label: '🌟 Semua Game' },
  { id: 'popular', label: '🔥 Paling Populer' },
  { id: 'action', label: '⚡ Aksi & Kecepatan' },
  { id: 'board', label: '🃏 Kartu & Papan' },
  { id: 'word', label: '🧠 Kata & Trivia' },
  { id: 'casual', label: '💖 Santai & Pasangan' }
];

const CHAT_PRESETS = [
  'Siap main! 🚀',
  'Ganti Ludo yuk! 🎲',
  'UNO seru nih! 🃏',
  'Sebentar yaa ⏳',
  'Gas sekarang! 🔥',
  'Teleponan yuk! 📞'
];

interface LobbyProps {
  onOpenGameSelector?: () => void;
  onOpenVoiceCallModal: () => void;
}

export const Lobby: React.FC<LobbyProps> = ({ onOpenVoiceCallModal }) => {
  const {
    room,
    playerId,
    createRoom,
    joinRoom,
    startGame,
    selectGameType,
    setTotalRounds,
    sendChatMessage,
    chatMessages,
    error,
    clearError
  } = useSocket();

  // Local state for pre-room lobby
  const [nickname, setNickname] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🦁');
  const [inputRoomCode, setInputRoomCode] = useState('');

  // Local state for in-room Roblox hub
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewGameType, setPreviewGameType] = useState<GameType | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [isChatExpanded, setIsChatExpanded] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlRoom = params.get('room');
      if (urlRoom) {
        setInputRoomCode(urlRoom.toUpperCase());
      }
    }
  }, []);

  // Auto-scroll chat to bottom on new message
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createRoom(nickname.trim(), selectedAvatar);
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRoomCode.trim()) return;
    joinRoom(inputRoomCode.trim().toUpperCase(), nickname.trim(), selectedAvatar);
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
      `Hai! Ayo mabar 2-player DuoPlay bareng aku! 🎮\nKode Room: ${room.roomId}\nLangsung klik link: ${url}\n\nKita bisa sambil teleponan di WhatsApp yaa! 📞`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleSendChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;
    sendChatMessage(chatInput.trim());
    setChatInput('');
  };

  const handleQuickChat = (preset: string) => {
    sendChatMessage(preset);
  };

  // -------------------------------------------------------------
  // 1. PRE-JOIN LOBBY (When not yet inside a room)
  // -------------------------------------------------------------
  if (!room) {
    return (
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-6 px-2 py-4">
        {/* Hero Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-purple-100 dark:bg-purple-950/80 border-2 border-zinc-900 dark:border-purple-600 shadow-[2px_2px_0px_#18181b] text-purple-950 dark:text-purple-200 text-xs font-black">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Game Aam Buat Untuk Acaa</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
            DuoPlay
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto font-medium">
            Am buat biar bisa main gem sama aca karna hp aam gakuan main emel!
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="w-full max-w-md p-3 rounded-2xl bg-pink-100 dark:bg-pink-950/80 border-2 border-zinc-900 dark:border-pink-600 shadow-[3px_3px_0px_#18181b] text-pink-950 dark:text-pink-200 text-xs font-bold flex items-center justify-between">
            <span>{error}</span>
            <button onClick={clearError} className="text-zinc-600 hover:text-black dark:text-zinc-300 font-bold">
              ✕
            </button>
          </div>
        )}

        {/* Profile Card & Room Options */}
        <div className="w-full max-w-md p-5 bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-700 rounded-3xl shadow-[4px_4px_0px_#18181b] space-y-4">
          <div>
            <label className="block text-xs font-black text-zinc-800 dark:text-zinc-200 uppercase tracking-wider mb-2">
              Pilih Karakter Avatar
            </label>
            <div className="grid grid-cols-6 gap-2">
              {AVATARS.map((av) => (
                <button
                  key={av}
                  type="button"
                  onClick={() => setSelectedAvatar(av)}
                  className={`aspect-square text-2xl rounded-2xl border-2 border-zinc-900 flex items-center justify-center transition-all ${
                    selectedAvatar === av
                      ? 'bg-amber-200 dark:bg-amber-500 shadow-[2px_2px_0px_#18181b] scale-105'
                      : 'bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-zinc-800 dark:text-zinc-200 uppercase tracking-wider mb-2">
              Nama Pemain
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Ketik nama kamu..."
              maxLength={15}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-900 dark:border-zinc-700 text-sm font-bold text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:bg-white dark:focus:bg-zinc-750 focus:shadow-[2px_2px_0px_#18181b] transition"
            />
            {/* Quick Presets */}
            <div className="flex gap-1.5 mt-2 overflow-x-auto no-scrollbar">
              {NICKNAME_PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setNickname(p)}
                  className="px-2.5 py-1 text-[11px] font-bold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg border border-zinc-900 shrink-0 transition"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Action Tabs: Buat Room / Masuk Room */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {/* Create Room Button */}
            <button
              onClick={handleCreate}
              className="w-full p-4 rounded-3xl bg-amber-200 dark:bg-amber-500 hover:bg-amber-300 dark:hover:bg-amber-400 text-zinc-900 border-2 border-zinc-900 shadow-[4px_4px_0px_#18181b] flex flex-col items-center justify-center gap-1.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer font-black"
            >
              <span className="text-2xl">🎮</span>
              <span className="text-sm">Buat Room</span>
              <span className="text-[10px] text-zinc-700 dark:text-zinc-900 font-bold">Host & Pilih Game</span>
            </button>

            {/* Join Room Form */}
            <form
              onSubmit={handleJoin}
              className="w-full p-4 rounded-3xl bg-emerald-100 dark:bg-emerald-950/80 border-2 border-zinc-900 dark:border-emerald-700 shadow-[4px_4px_0px_#18181b] flex flex-col items-center justify-between gap-2"
            >
              <div className="w-full text-center">
                <span className="text-[11px] font-black uppercase text-emerald-950 dark:text-emerald-200 tracking-wider">
                  Gabung Room Teman
                </span>
                <input
                  type="text"
                  value={inputRoomCode}
                  onChange={(e) => setInputRoomCode(e.target.value.toUpperCase())}
                  placeholder="KODE"
                  maxLength={4}
                  className="w-full mt-1.5 px-3 py-1.5 text-center font-mono font-black text-lg uppercase tracking-widest bg-white dark:bg-zinc-900 border-2 border-zinc-900 rounded-xl placeholder-zinc-300 dark:placeholder-zinc-600 text-zinc-900 dark:text-white focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={!inputRoomCode.trim()}
                className="w-full py-2 rounded-xl bg-emerald-400 hover:bg-emerald-500 text-emerald-950 border-2 border-zinc-900 font-black text-xs shadow-[2px_2px_0px_#18181b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all disabled:opacity-50 cursor-pointer"
              >
                Masuk Room ➔
              </button>
            </form>
          </div>
        </div>

        {/* Roblox Experiences Showcase Carousel Teaser */}
        <div className="w-full mt-4">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-500" />
              <h2 className="text-base font-black text-zinc-900 dark:text-white">
                Game Siap Dimainkan (10 Pengalaman)
              </h2>
            </div>
            <span className="text-xs font-bold text-zinc-500">2 Player Real-Time</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {ROBLOX_GAMES.slice(0, 5).map((game) => (
              <div
                key={game.type}
                className="p-3 bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-700 rounded-2xl shadow-[3px_3px_0px_#18181b] flex flex-col justify-between space-y-2"
              >
                <div className={`w-full aspect-video rounded-xl ${game.pastelBg} border border-zinc-900/20 flex items-center justify-center text-xl`}>
                  {game.icon}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-zinc-400 block truncate">
                    {game.categoryLabel}
                  </span>
                  <h3 className="text-xs font-black text-zinc-900 dark:text-white truncate">
                    {game.title}
                  </h3>
                </div>
                <div className="flex items-center justify-between text-[10px] font-bold text-zinc-500">
                  <span>👍 {game.rating}</span>
                  <span>👥 2P</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. IN-ROOM ROBLOX-STYLE GAME HUB
  // -------------------------------------------------------------
  const isPinkTheme = room.roomId === 'ACAA' || room.isSpecialTheme;
  const isHost = room.hostId === playerId;
  const playerIds = Object.keys(room.players);
  const p1 = playerIds[0] ? room.players[playerIds[0]] : null;
  const p2 = playerIds[1] ? room.players[playerIds[1]] : null;
  const bothConnected = playerIds.length >= 2;

  // Currently active room game
  const activeGameType = room.gameState.gameType;
  // Hero spotlight game: either previewed or the room's current active game
  const heroGameType = previewGameType || activeGameType;
  const heroGame = ROBLOX_GAMES.find((g) => g.type === heroGameType) || ROBLOX_GAMES[0];
  const isHeroActive = activeGameType === heroGame.type;

  // Filtered games based on category
  const filteredGames = ROBLOX_GAMES.filter((game) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'popular') {
      return ['find_and_mark', 'speed_typing', 'uno', 'ludo'].includes(game.type);
    }
    return game.category === selectedCategory;
  });

  const handleSelectGame = (type: GameType) => {
    setPreviewGameType(type);
    if (isHost) {
      selectGameType(type, room.gameState.totalRounds || 5, false);
    }
  };

  const handleApplyHeroGame = () => {
    if (isHost && heroGame) {
      selectGameType(heroGame.type, room.gameState.totalRounds || 5, false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 px-1 sm:px-2 py-2">
      {/* Special Theme Indicator */}
      {isPinkTheme && (
        <div className="w-full py-2 px-3 rounded-2xl bg-white/95 border-2 border-pink-400 shadow-[3px_3px_0px_#f472b6] flex items-center justify-center gap-2 text-pink-900 text-xs font-black">
          <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
          <span>Room Spesial Khusus Main Sama Acaa 💖</span>
          <Sparkles className="w-4 h-4 text-pink-500" />
        </div>
      )}

      {/* Main Grid: Left 8 cols = Roblox Game Discovery, Right 4 cols = Players & Social Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ========================================================= */}
        {/* LEFT COLUMN: ROBLOX GAME HUB (DISCOVERY & HERO SPOTLIGHT) */}
        {/* ========================================================= */}
        <div className="lg:col-span-8 space-y-4">
          {/* ROBLOX HERO EXPERIENCE SPOTLIGHT */}
          <div
            className={`w-full rounded-3xl border-3 p-4 sm:p-6 transition-all duration-300 relative overflow-hidden ${
              isPinkTheme
                ? 'bg-gradient-to-br from-pink-50 via-white to-pink-100 border-pink-500 shadow-[5px_5px_0px_#f472b6]'
                : `${heroGame.pastelBg} border-zinc-900 dark:border-zinc-700 shadow-[5px_5px_0px_#18181b]`
            }`}
          >
            {/* Background Decorative Graphic */}
            <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none transform rotate-12 scale-150">
              {heroGame.icon}
            </div>

            <div className="relative z-10 flex flex-col gap-4">
              {/* Header Badges & Category */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-zinc-900 text-white text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow-[2px_2px_0px_#3f3f46]">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>Pengalaman Unggulan</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-xl bg-white/90 dark:bg-zinc-900/90 border border-zinc-900/30 text-[11px] font-black text-zinc-800 dark:text-zinc-200">
                    {heroGame.badge}
                  </span>
                </div>

                {isHeroActive ? (
                  <span className="px-3 py-1 rounded-xl bg-emerald-400 border-2 border-zinc-900 text-emerald-950 text-xs font-black flex items-center gap-1 shadow-[2px_2px_0px_#18181b]">
                    <Check className="w-3.5 h-3.5" />
                    <span>SEDANG DIPILIH</span>
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-xl bg-amber-300 border-2 border-zinc-900 text-amber-950 text-xs font-black">
                    Pratinjau Game
                  </span>
                )}
              </div>

              {/* Title & Stats */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-700 shadow-[3px_3px_0px_#18181b] flex items-center justify-center shrink-0">
                  {heroGame.icon}
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                    {heroGame.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{heroGame.rating} Suka</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-blue-600" />
                      <span>{heroGame.players}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{heroGame.timeEstimate}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 font-medium leading-relaxed max-w-2xl">
                {heroGame.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {heroGame.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-lg bg-white/80 dark:bg-zinc-800/80 border border-zinc-900/20 text-[11px] font-bold text-zinc-700 dark:text-zinc-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Round Selector & Primary Play CTA */}
              <div className="pt-2 border-t-2 border-zinc-900/10 dark:border-zinc-700/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Round Settings */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-zinc-700 dark:text-zinc-300">
                    Jumlah Babak:
                  </span>
                  <div className="flex items-center gap-1 bg-white dark:bg-zinc-900 p-1 rounded-xl border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b]">
                    {[3, 5, 7, 10].map((rounds) => (
                      <button
                        key={rounds}
                        disabled={!isHost}
                        onClick={() => setTotalRounds(rounds)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                          room.gameState.totalRounds === rounds
                            ? 'bg-amber-300 dark:bg-amber-500 text-zinc-900 shadow-xs'
                            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
                        }`}
                      >
                        {rounds}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Big Roblox Play / Select Button */}
                {isHeroActive ? (
                  bothConnected ? (
                    isHost ? (
                      <button
                        onClick={startGame}
                        className="py-3 px-6 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 border-3 border-zinc-900 font-black text-sm shadow-[4px_4px_0px_#18181b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer animate-pulse"
                      >
                        <Play className="w-5 h-5 fill-current" />
                        <span>MULAI MAIN SEKARANG!</span>
                      </button>
                    ) : (
                      <div className="py-2.5 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-900 text-xs font-bold text-zinc-600 dark:text-zinc-300 flex items-center justify-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>Menunggu Host Memulai...</span>
                      </div>
                    )
                  ) : (
                    <div className="py-2.5 px-4 rounded-xl bg-white dark:bg-zinc-800 border-2 border-dashed border-zinc-900 text-xs font-bold text-zinc-600 dark:text-zinc-300 text-center">
                      Menunggu pemain ke-2 bergabung...
                    </div>
                  )
                ) : (
                  <button
                    onClick={handleApplyHeroGame}
                    disabled={!isHost}
                    className="py-3 px-6 rounded-2xl bg-amber-300 hover:bg-amber-400 text-zinc-900 border-3 border-zinc-900 font-black text-sm shadow-[4px_4px_0px_#18181b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Check className="w-4 h-4" />
                    <span>{isHost ? 'PILIH GAME INI ➔' : 'Direkomendasikan ke Host'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ROBLOX CATEGORY FILTER TABS */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 rounded-xl border-2 text-xs font-black whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-zinc-900 text-white border-zinc-900 shadow-[2px_2px_0px_#18181b] scale-102'
                    : 'bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-900 dark:border-zinc-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ROBLOX EXPERIENCES GRID (CARDS) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-wider">
                Daftar Pengalaman Game ({filteredGames.length})
              </h3>
              <span className="text-[11px] font-bold text-zinc-500">Klik kartu untuk memilih</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {filteredGames.map((game) => {
                const isSelected = activeGameType === game.type;
                const isPreview = heroGameType === game.type;

                return (
                  <div
                    key={game.type}
                    onClick={() => handleSelectGame(game.type)}
                    className={`group p-3 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between gap-2.5 relative ${
                      isSelected
                        ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 shadow-[4px_4px_0px_#f59e0b] ring-2 ring-amber-400'
                        : isPreview
                        ? 'bg-white dark:bg-zinc-900 border-zinc-900 dark:border-zinc-700 shadow-[4px_4px_0px_#18181b] scale-[1.02]'
                        : 'bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-850 border-zinc-900 dark:border-zinc-700 shadow-[3px_3px_0px_#18181b] hover:translate-y-[-2px]'
                    }`}
                  >
                    {/* Active Selected Badge */}
                    {isSelected && (
                      <span className="absolute -top-2.5 right-2 px-2 py-0.5 rounded-md bg-amber-400 border border-zinc-900 text-zinc-950 text-[10px] font-black shadow-[1px_1px_0px_#18181b]">
                        SEDANG DIPILIH ✓
                      </span>
                    )}

                    {/* Thumbnail Artwork Area */}
                    <div
                      className={`w-full aspect-16/9 rounded-xl ${game.pastelBg} border border-zinc-900/20 flex flex-col items-center justify-center p-2 relative overflow-hidden group-hover:scale-102 transition-transform`}
                    >
                      <div className="text-3xl">{game.icon}</div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mt-1">
                        {game.categoryLabel}
                      </span>
                    </div>

                    {/* Game Metadata */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs font-black text-zinc-900 dark:text-white truncate">
                          {game.title}
                        </h4>
                        <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 shrink-0">
                          👍 {game.rating}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium line-clamp-2 leading-snug">
                        {game.description}
                      </p>
                    </div>

                    {/* Card Footer Button */}
                    <div className="pt-1.5 border-t border-zinc-900/10 dark:border-zinc-700/50 flex items-center justify-between text-[11px] font-bold">
                      <span className="text-zinc-500">{game.players}</span>
                      <span
                        className={`font-black flex items-center gap-0.5 ${
                          isSelected ? 'text-amber-600 dark:text-amber-400' : 'text-zinc-900 dark:text-white group-hover:underline'
                        }`}
                      >
                        {isSelected ? 'Aktif' : 'Pilih'}
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: KOTAK PLAYER, MENU SHARE LINK & MENU CHAT  */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 space-y-4">
          {/* 1. KOTAK PLAYER (PLAYER CARDS & STATUS) */}
          <div
            className={`p-4 rounded-3xl border-2 space-y-3 ${
              isPinkTheme
                ? 'bg-white/95 border-pink-400 shadow-[4px_4px_0px_#f472b6]'
                : 'bg-white dark:bg-zinc-900 border-zinc-900 dark:border-zinc-700 shadow-[4px_4px_0px_#18181b]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Pemain di Room ({playerIds.length}/2)
              </span>
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  bothConnected ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'
                }`}
                title={bothConnected ? 'Lengkap' : 'Menunggu pemain ke-2'}
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Player 1 Slot (Host) */}
              <div
                className={`p-3 rounded-2xl border-2 flex flex-col items-center text-center relative ${
                  isPinkTheme
                    ? 'bg-pink-50 border-pink-400 shadow-[2px_2px_0px_#f472b6]'
                    : 'bg-amber-50 dark:bg-amber-950/40 border-zinc-900 dark:border-zinc-700 shadow-[2px_2px_0px_#18181b]'
                }`}
              >
                {p1?.isHost && (
                  <span className="absolute top-1.5 right-1.5 text-amber-500" title="Room Host">
                    <Crown className="w-4 h-4 fill-amber-400" />
                  </span>
                )}
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center text-2xl mb-1.5 shadow-[1px_1px_0px_#18181b]">
                  {p1 ? p1.avatar : '👤'}
                </div>
                <span className="text-xs font-black truncate max-w-full text-zinc-900 dark:text-white">
                  {p1 ? p1.nickname : 'Menunggu...'}
                </span>
                <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">
                  {p1?.id === playerId ? 'Kamu (Host)' : 'Host'}
                </span>
              </div>

              {/* Player 2 Slot */}
              <div
                className={`p-3 rounded-2xl border-2 flex flex-col items-center text-center relative ${
                  isPinkTheme
                    ? 'bg-rose-50 border-rose-400 shadow-[2px_2px_0px_#fb7185]'
                    : p2
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-zinc-900 dark:border-zinc-700 shadow-[2px_2px_0px_#18181b]'
                    : 'bg-zinc-100 dark:bg-zinc-800/60 border-dashed border-zinc-400 dark:border-zinc-600'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center text-2xl mb-1.5 shadow-[1px_1px_0px_#18181b]">
                  {p2 ? p2.avatar : '⏳'}
                </div>
                <span className="text-xs font-black truncate max-w-full text-zinc-900 dark:text-white">
                  {p2 ? p2.nickname : 'Menunggu Lawan...'}
                </span>
                <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">
                  {p2 ? (p2.id === playerId ? 'Kamu' : 'Pemain 2') : 'Slot Kosong'}
                </span>
              </div>
            </div>
          </div>

          {/* 2. MENU SHARE LINK (KODE ROOM, SALIN LINK, WHATSAPP) */}
          <div
            className={`p-4 rounded-3xl border-2 space-y-3 ${
              isPinkTheme
                ? 'bg-white/95 border-pink-400 shadow-[4px_4px_0px_#f472b6]'
                : 'bg-white dark:bg-zinc-900 border-zinc-900 dark:border-zinc-700 shadow-[4px_4px_0px_#18181b]'
            }`}
          >
            <span className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Ajak Teman Bermain
            </span>

            {/* Room Code Showcase */}
            <div className="flex items-center gap-2">
              <div
                className={`flex-1 py-2 px-3 rounded-2xl border-2 font-mono text-2xl font-black text-center tracking-widest ${
                  isPinkTheme
                    ? 'bg-pink-100 border-pink-500 text-pink-900 shadow-[2px_2px_0px_#f472b6]'
                    : 'bg-amber-100 dark:bg-amber-950/80 border-zinc-900 dark:border-amber-500 text-zinc-900 dark:text-amber-200 shadow-[2px_2px_0px_#18181b]'
                }`}
              >
                {room.roomId}
              </div>
              <button
                onClick={handleCopyCode}
                title="Salin Kode Room"
                className={`p-3 rounded-2xl border-2 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer ${
                  isPinkTheme
                    ? 'bg-pink-50 hover:bg-pink-100 border-pink-500 text-pink-900 shadow-[2px_2px_0px_#f472b6]'
                    : 'bg-white dark:bg-zinc-800 hover:bg-zinc-100 border-zinc-900 shadow-[2px_2px_0px_#18181b] text-zinc-800 dark:text-zinc-200'
                }`}
              >
                {copiedCode ? (
                  <Check className={`w-5 h-5 ${isPinkTheme ? 'text-pink-600' : 'text-emerald-600'}`} />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Share Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleCopyLink}
                className={`py-2 px-2.5 rounded-xl border-2 text-xs font-black flex items-center justify-center gap-1.5 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer ${
                  isPinkTheme
                    ? 'bg-pink-100 hover:bg-pink-200 text-pink-950 border-pink-500 shadow-[2px_2px_0px_#f472b6]'
                    : 'bg-purple-100 dark:bg-purple-950/80 hover:bg-purple-200 text-purple-950 dark:text-purple-200 border-zinc-900 shadow-[2px_2px_0px_#18181b]'
                }`}
              >
                {copiedLink ? (
                  <Check className={`w-3.5 h-3.5 ${isPinkTheme ? 'text-pink-700' : 'text-emerald-700'}`} />
                ) : (
                  <Share2 className="w-3.5 h-3.5" />
                )}
                <span>{copiedLink ? 'Link Tersalin!' : 'Salin Link'}</span>
              </button>

              <button
                onClick={handleShareWhatsApp}
                className={`py-2 px-2.5 rounded-xl border-2 text-xs font-black flex items-center justify-center gap-1.5 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer ${
                  isPinkTheme
                    ? 'bg-rose-100 hover:bg-rose-200 text-rose-950 border-rose-400 shadow-[2px_2px_0px_#fb7185]'
                    : 'bg-emerald-100 dark:bg-emerald-950/80 hover:bg-emerald-200 text-emerald-950 dark:text-emerald-200 border-zinc-900 shadow-[2px_2px_0px_#18181b]'
                }`}
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Kirim WA</span>
              </button>
            </div>
          </div>

          {/* 3. MENU CHAT (ROBLOX LIVE CHAT BOX) */}
          <div
            className={`p-4 rounded-3xl border-2 space-y-3 ${
              isPinkTheme
                ? 'bg-white/95 border-pink-400 shadow-[4px_4px_0px_#f472b6]'
                : 'bg-white dark:bg-zinc-900 border-zinc-900 dark:border-zinc-700 shadow-[4px_4px_0px_#18181b]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                <MessageSquare className="w-4 h-4 text-purple-600" />
                <span>Chat Room ({chatMessages.length})</span>
              </div>
              <button
                onClick={() => setIsChatExpanded(!isChatExpanded)}
                className="text-[11px] font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white underline cursor-pointer"
              >
                {isChatExpanded ? 'Sembunyikan' : 'Buka Chat'}
              </button>
            </div>

            {isChatExpanded && (
              <>
                {/* Chat Message Stream */}
                <div
                  ref={chatScrollRef}
                  className="w-full h-44 overflow-y-auto space-y-2 p-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border-2 border-zinc-900/20 text-xs font-medium"
                >
                  {chatMessages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-zinc-400 text-xs">
                      <span>Belum ada chat.</span>
                      <span className="text-[10px]">Ketik pesan atau pilih stiker di bawah!</span>
                    </div>
                  ) : (
                    chatMessages.map((msg, index) => {
                      const isMe = msg.senderId === playerId;
                      return (
                        <div
                          key={index}
                          className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                        >
                          <div className="flex items-center gap-1 mb-0.5 text-[10px] text-zinc-500 font-bold">
                            <span>{msg.senderAvatar}</span>
                            <span>{msg.senderName}</span>
                          </div>
                          <div
                            className={`px-3 py-1.5 rounded-2xl max-w-[85%] break-words border font-bold ${
                              isMe
                                ? 'bg-amber-300 text-zinc-950 border-zinc-900 shadow-[1px_1px_0px_#18181b]'
                                : 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white border-zinc-300 dark:border-zinc-600'
                            }`}
                          >
                            {msg.message}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Quick Chat Presets */}
                <div className="flex gap-1 overflow-x-auto no-scrollbar py-0.5">
                  {CHAT_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => handleQuickChat(preset)}
                      className="px-2 py-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-[10px] font-bold text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 shrink-0 cursor-pointer"
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                {/* Chat Input Field */}
                <form onSubmit={handleSendChat} className="flex gap-1.5">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ketik pesan chat..."
                    maxLength={100}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-900 text-xs font-bold text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:bg-white"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim()}
                    className="p-2 rounded-xl bg-purple-400 hover:bg-purple-500 disabled:opacity-40 text-purple-950 border-2 border-zinc-900 font-bold shadow-[2px_2px_0px_#18181b] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </>
            )}
          </div>

          {/* VOICE CALL WA SHORTCUT */}
          <button
            onClick={onOpenVoiceCallModal}
            className="w-full py-2.5 px-3 rounded-2xl bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/70 border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] flex items-center justify-between text-emerald-950 dark:text-emerald-200 text-xs font-black cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
          >
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Voice Call WhatsApp</span>
            </div>
            <span className="text-[10px] bg-emerald-300 dark:bg-emerald-800 px-2 py-0.5 rounded-md border border-emerald-950 font-bold">
              Teleponan Bebas
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
