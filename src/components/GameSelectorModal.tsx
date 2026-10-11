import React from 'react';
import { useSocket } from '../context/SocketContext';
import { GameType } from '../types/game';
import { X, Sparkles, PhoneCall, Zap, Flag, BookOpen, HeartHandshake } from 'lucide-react';

interface GameSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GameOption {
  type: GameType;
  title: string;
  badge: string;
  icon: React.ReactNode;
  description: string;
  recommendedFor: string;
  pastelBg: string;
}

export const GameSelectorModal: React.FC<GameSelectorModalProps> = ({ isOpen, onClose }) => {
  const { room, selectGameType, playerId } = useSocket();

  if (!isOpen || !room) return null;

  const currentGameType = room.gameState.gameType;
  const isHost = room.hostId === playerId;

  const games: GameOption[] = [
    {
      type: 'flag',
      title: 'Tebak Bendera Dunia',
      badge: 'Geografi & Kecepatan',
      icon: <Flag className="w-5 h-5 text-amber-900" />,
      description: 'Tebak nama negara dari benderanya dengan 4 pilihan cepat. Siapa tercepat mendapat poin bonus!',
      recommendedFor: 'Asah pengetahuan & kecepatan',
      pastelBg: 'bg-amber-100'
    },
    {
      type: 'word',
      title: 'Tebak Kata Indonesia',
      badge: 'Teka-Teki Cerdas',
      icon: <BookOpen className="w-5 h-5 text-indigo-900" />,
      description: 'Pecahkan teka-teki logika kata bahasa Indonesia dari petunjuk dan kategori benda, kuliner, hewan.',
      recommendedFor: 'Pecinta teka-teki kata nusantara',
      pastelBg: 'bg-purple-100'
    },
    {
      type: 'emoji_voice',
      title: 'Tebak Emoji Panggilan Suara',
      badge: 'Spesial WhatsApp Call 📞',
      icon: <PhoneCall className="w-5 h-5 text-emerald-900" />,
      description: 'Satu pemain melihat emoji & kata terlarang, jelaskan lewat suara telepon! Pasangan menebak dari pilihan di layarnya.',
      recommendedFor: 'Main sambil teleponan / LDR / Teman akrab',
      pastelBg: 'bg-emerald-100'
    },
    {
      type: 'dilemma',
      title: 'Uji Kecocokan (Dilema Telepati)',
      badge: 'Chemistry Match 💖',
      icon: <HeartHandshake className="w-5 h-5 text-pink-900" />,
      description: 'Pilih dilema harian (misal bubur diaduk vs tidak). Reveal bersamaan untuk melihat kecocokan kalian!',
      recommendedFor: 'Pasangan & Bestie yang ingin tahu seberapa sefrekuensi',
      pastelBg: 'bg-pink-100'
    },
    {
      type: 'reflex',
      title: 'Refleks Kilat (Buzzer Duel)',
      badge: 'Refleks Milidetik ⚡',
      icon: <Zap className="w-5 h-5 text-yellow-950" />,
      description: 'Tahan jarimu... Begitu tombol berubah HIJAU, tekan secepat mungkin! Yang duluan menang babak.',
      recommendedFor: 'Adu adrenalin & kecepatan jari',
      pastelBg: 'bg-yellow-100'
    }
  ];

  const handleSelect = (type: GameType) => {
    selectGameType(type, 5);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg bg-white border-2 border-zinc-900 rounded-3xl shadow-[6px_6px_0px_#18181b] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 border-b-2 border-zinc-900 bg-sky-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b]">
              <Sparkles className="w-5 h-5 text-sky-900" />
            </div>
            <div>
              <h3 className="text-base font-black text-zinc-900">Pilih Permainan</h3>
              <p className="text-xs text-zinc-600 font-medium">Ganti mode permainan kapan saja</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] text-zinc-800 hover:bg-zinc-100 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Game list */}
        <div className="p-5 overflow-y-auto space-y-3 bg-[#FAF8F5]">
          {games.map((game) => {
            const isCurrent = currentGameType === game.type;

            return (
              <button
                key={game.type}
                onClick={() => handleSelect(game.type)}
                className={`w-full text-left p-4 rounded-2xl border-2 border-zinc-900 transition-all ${
                  isCurrent
                    ? `${game.pastelBg} shadow-[4px_4px_0px_#18181b] ring-2 ring-zinc-900`
                    : 'bg-white hover:bg-zinc-50 shadow-[2px_2px_0px_#18181b]'
                } active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl border-2 border-zinc-900 ${game.pastelBg} shrink-0 shadow-[2px_2px_0px_#18181b]`}>
                    {game.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-zinc-900 text-sm">
                        {game.title}
                      </span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-white border border-zinc-900 text-zinc-800">
                        {game.badge}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-200 border border-zinc-900 text-emerald-950">
                          Sedang Aktif
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-600 mt-1 leading-relaxed font-medium">
                      {game.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 border-t-2 border-zinc-900 bg-white flex items-center justify-between text-xs text-zinc-600">
          <span className="font-bold">{isHost ? '👑 Kamu adalah Host' : 'Semua pemain dapat mengganti game'}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-black text-xs shadow-[2px_2px_0px_#18181b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
