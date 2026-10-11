import React from 'react';
import { useSocket } from '../context/SocketContext';
import { PhoneCall, Share2, Sparkles, X } from 'lucide-react';

interface VoiceCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceCallModal: React.FC<VoiceCallModalProps> = ({ isOpen, onClose }) => {
  const { room } = useSocket();

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const inviteText = encodeURIComponent(
    `Hai! Ayo main game 2-player DuoPlay bareng aku! 🎮\n\nKode Room: ${room?.roomId || ''}\nLink: ${currentUrl}\n\nGame ini seru banget dimainkan sambil Panggilan Suara (WhatsApp Call) 📞. Yuk join sekarang!`
  );

  const handleShareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${inviteText}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md bg-white border-2 border-zinc-900 rounded-3xl shadow-[6px_6px_0px_#18181b] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b-2 border-zinc-900 bg-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b]">
              <PhoneCall className="w-5 h-5 text-emerald-800" />
            </div>
            <div>
              <h3 className="text-base font-black text-zinc-900">Mode Panggilan Suara</h3>
              <p className="text-xs text-zinc-600 font-medium">WhatsApp Call / Discord Helper</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] text-zinc-800 hover:bg-zinc-100 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs bg-[#FAF8F5]">
          <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] text-zinc-800 leading-relaxed font-medium">
            <div className="flex items-center gap-1.5 font-black text-xs text-emerald-950 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Sinergi Panggilan Suara WhatsApp
            </div>
            Khususnya untuk game <strong className="text-zinc-950">Tebak Emoji Suara</strong>, satu pemain melihat emoji rahasia dan menjelaskan lewat obrolan suara tanpa menyebut kata terlarang!
          </div>

          <div className="space-y-2">
            <h4 className="font-black text-zinc-900 text-xs uppercase tracking-wider">Langkah Bermain:</h4>
            <div className="space-y-2 text-zinc-700">
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b]">
                <span className="w-5 h-5 rounded-md bg-purple-100 border border-zinc-900 text-purple-950 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">1</span>
                <span className="font-medium">Mulai panggilan suara atau video di WhatsApp dengan teman / pasanganmu.</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b]">
                <span className="w-5 h-5 rounded-md bg-purple-100 border border-zinc-900 text-purple-950 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">2</span>
                <span className="font-medium">Aktifkan mode <strong>Speaker</strong> atau earphone agar suara tetap jernih.</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b]">
                <span className="w-5 h-5 rounded-md bg-purple-100 border border-zinc-900 text-purple-950 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">3</span>
                <span className="font-medium">Buka game ini bersamaan di layar ponsel sambil tetap terhubung di telepon!</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleShareWhatsApp}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-200 hover:bg-emerald-300 text-zinc-900 font-black border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            <Share2 className="w-4 h-4" />
            Kirim Link Room ke WhatsApp
          </button>
        </div>

        <div className="p-3 border-t-2 border-zinc-900 bg-white flex justify-end">
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
