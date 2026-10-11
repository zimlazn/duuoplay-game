import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { Smile, Send } from 'lucide-react';

const POPULAR_EMOJIS = ['😂', '🔥', '❤️', '👏', '😱', '🎉', '🤯', '💀'];
const QUICK_PHRASES = ['Wkwkwk! 😂', 'GG Keren! 🔥', 'Hampir banget! 😱', 'Gas ronde berikutnya! 🚀', 'Sefrekuensi nih! ❤️'];

export const ReactionPicker: React.FC = () => {
  const { sendReaction, sendChatMessage } = useSocket();
  const [showPicker, setShowPicker] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const handleSendEmoji = (emoji: string) => {
    sendReaction(emoji);
  };

  const handleSendPhrase = (phrase: string) => {
    sendChatMessage(phrase);
    setShowPicker(false);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customMsg.trim()) {
      sendChatMessage(customMsg.trim());
      setCustomMsg('');
      setShowPicker(false);
    }
  };

  return (
    <div className="fixed bottom-3 left-0 right-0 z-40 px-3 flex justify-center pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-2 p-2 rounded-2xl bg-white border-2 border-zinc-900 shadow-[4px_4px_0px_#18181b] max-w-md w-full justify-between">
        {/* Quick Emoji Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {POPULAR_EMOJIS.slice(0, 5).map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleSendEmoji(emoji)}
              className="w-9 h-9 flex items-center justify-center text-xl rounded-xl bg-zinc-50 hover:bg-amber-100 border border-zinc-900 active:scale-110 transition-all cursor-pointer"
              title={`Kirim ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* More Reactions / Chat Button */}
        <div className="relative">
          <button
            onClick={() => setShowPicker(!showPicker)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 border-2 border-zinc-900 text-purple-950 text-xs font-black shadow-[2px_2px_0px_#18181b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
          >
            <Smile className="w-4 h-4" />
            <span className="hidden sm:inline">Pesan</span>
          </button>

          {showPicker && (
            <div className="absolute bottom-12 right-0 w-72 p-3 bg-white border-2 border-zinc-900 rounded-2xl shadow-[5px_5px_0px_#18181b] flex flex-col gap-2.5 z-50 animate-fade-in">
              <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-2">
                <span className="text-xs font-black text-zinc-900">Reaksi & Stiker Cepat</span>
                <button
                  onClick={() => setShowPicker(false)}
                  className="text-xs text-zinc-500 hover:text-black font-black"
                >
                  ✕
                </button>
              </div>

              {/* All Emojis */}
              <div className="grid grid-cols-4 gap-1.5">
                {POPULAR_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleSendEmoji(emoji)}
                    className="p-2 text-2xl rounded-xl bg-zinc-50 hover:bg-amber-100 border border-zinc-900 text-center active:scale-110 transition cursor-pointer"
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              {/* Quick phrases */}
              <div className="flex flex-col gap-1 border-t-2 border-zinc-900 pt-2">
                <span className="text-[10px] text-zinc-600 font-black uppercase">Pesan Cepat:</span>
                <div className="flex flex-wrap gap-1">
                  {QUICK_PHRASES.map((phrase) => (
                    <button
                      key={phrase}
                      onClick={() => handleSendPhrase(phrase)}
                      className="text-xs px-2 py-1 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-950 border border-zinc-900 font-bold transition cursor-pointer"
                    >
                      {phrase}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Input */}
              <form onSubmit={handleSendCustom} className="flex gap-1.5 pt-1">
                <input
                  type="text"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder="Ketik pesan..."
                  className="flex-1 bg-zinc-50 border-2 border-zinc-900 rounded-xl px-2.5 py-1.5 text-xs text-zinc-900 font-bold placeholder-zinc-400 focus:outline-none focus:bg-white"
                  maxLength={40}
                />
                <button
                  type="submit"
                  className="p-2 bg-emerald-200 hover:bg-emerald-300 text-zinc-900 border-2 border-zinc-900 rounded-xl shadow-[2px_2px_0px_#18181b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
