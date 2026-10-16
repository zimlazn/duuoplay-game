import React from 'react';
import { useSocket } from '../context/SocketContext';
import { PhoneCall, Share2, Sparkles, X } from 'lucide-react';

interface VoiceCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceCallModal: React.FC<VoiceCallModalProps> = ({ isOpen, onClose }) => {
  const { room } = useSocket();

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const inviteText = encodeURIComponent(
    `Hai! Ayo main game 2-player DuoPlay bareng aku! 🎮\n\nKode Room: ${room?.roomId || ''}\nLink: ${currentUrl}\n\nGame ini seru banget dimainkan sambil Panggilan Suara (WhatsApp Call) 📞. Yuk join sekarang!`
  );

  const handleShareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${inviteText}`, '_blank');
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-700 rounded-3xl shadow-[6px_6px_0px_#18181b] overflow-hidden flex flex-col cursor-default"
      >
        {/* Header */}
        <div className="p-4 border-b-2 border-zinc-900 dark:border-zinc-700 bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white dark:bg-zinc-800 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b]">
              <PhoneCall className="w-5 h-5 text-emerald-800 dark:text-emerald-300" />
            </div>
            <div>
              <h3 className="text-base font-black text-zinc-900 dark:text-white">Mode Panggilan Suara</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">WhatsApp Call / Discord Helper</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white dark:bg-zinc-800 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-zinc-800 border-2 border-zinc-900 dark:border-zinc-700 shadow-[2px_2px_0px_#18181b] flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-zinc-900 dark:text-white block font-black mb-0.5">Kenapa Sambil Voice Call?</strong>
              DuoPlay dirancang khusus untuk dimainkan berdampingan dengan panggilan suara (WhatsApp, Discord, Telepon Biasa). Terutama mode <em>Tebak Emoji Panggilan Suara</em> dan <em>UNO</em>!
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-black text-zinc-900 dark:text-white text-xs uppercase tracking-wider">Langkah Rekomendasi:</h4>
            <ol className="list-decimal pl-4 space-y-1.5 text-zinc-600 dark:text-zinc-300 font-bold">
              <li>Mulai panggilan suara WhatsApp dengan teman / pasanganmu.</li>
              <li>Buka link game DuoPlay ini di browser masing-masing.</li>
              <li>Aktifkan speaker HP atau pakai headset agar suara jernih.</li>
              <li>Mainkan game bersama dan rasakan keseruannya!</li>
            </ol>
          </div>

          <button
            onClick={handleShareWhatsApp}
            className="w-full py-3 px-4 rounded-2xl bg-emerald-300 dark:bg-emerald-600 hover:bg-emerald-400 dark:hover:bg-emerald-500 text-zinc-950 dark:text-white border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] font-black text-xs flex items-center justify-center gap-2 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Kirim Ajakan Main ke WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
