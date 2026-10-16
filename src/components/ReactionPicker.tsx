import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { Smile, Send } from 'lucide-react';

const POPULAR_EMOJIS = ['😂', '🔥', '❤️', '👏', '😱', '🎉', '🤯', '💀'];
const QUICK_PHRASES = ['Wkwkwk! 😂', 'GG Keren! 🔥', 'Hampir banget! 😱', 'Gas ronde berikutnya! 🚀', 'Sefrekuensi nih! ❤️'];

export const ReactionPicker: React.FC = () => {
  const { room, sendReaction, sendChatMessage } = useSocket();
  const [showPicker, setShowPicker] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const isPinkTheme = room?.roomId === 'ACAA' || room?.isSpecialTheme;

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
      <div
        className={`pointer-events-auto flex items-center gap-2 p-2 rounded-2xl border-2 max-w-md w-full justify-between transition-all ${
          isPinkTheme
            ? 'bg-white/95 border-pink-400 shadow-[4px_4px_0px_#f472b6]'
            : 'bg-white dark:bg-zinc-900 border-zinc-900 dark:border-zinc-700 shadow-[4px_4px_0px_#18181b]'
        }`}
      >
        {/* Quick Emoji Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {POPULAR_EMOJIS.slice(0, 5).map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleSendEmoji(emoji)}
              className={`w-9 h-9 flex items-center justify-center text-xl rounded-xl border active:scale-110 transition-all cursor-pointer ${
                isPinkTheme
                  ? 'bg-pink-50 hover:bg-pink-100 border-pink-300'
                  : 'bg-zinc-50 dark:bg-zinc-800 hover:bg-amber-100 dark:hover:bg-zinc-700 border-zinc-900'
              }`}
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
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 text-xs font-black active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer ${
              isPinkTheme
                ? 'bg-pink-200 hover:bg-pink-300 text-pink-950 border-pink-500 shadow-[2px_2px_0px_#f472b6]'
                : 'bg-purple-100 dark:bg-purple-950 hover:bg-purple-200 text-purple-950 dark:text-purple-200 border-zinc-900 shadow-[2px_2px_0px_#18181b]'
            }`}
          >
            <Smile className="w-4 h-4" />
            <span className="hidden sm:inline">Pesan</span>
          </button>

          {showPicker && (
            <div
              className={`absolute bottom-12 right-0 w-72 p-3 border-2 rounded-2xl flex flex-col gap-2.5 z-50 animate-fade-in ${
                isPinkTheme
                  ? 'bg-white border-pink-400 shadow-[5px_5px_0px_#f472b6]'
                  : 'bg-white dark:bg-zinc-900 border-zinc-900 dark:border-zinc-700 shadow-[5px_5px_0px_#18181b]'
              }`}
            >
              <div
                className={`flex items-center justify-between border-b-2 pb-2 ${
                  isPinkTheme ? 'border-pink-200 text-pink-900' : 'border-zinc-900 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200'
                }`}
              >
                <span className="text-xs font-black uppercase">Reaksi Cepat</span>
                <button
                  onClick={() => setShowPicker(false)}
                  className="text-xs font-bold text-zinc-500 hover:text-black dark:hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* All Popular Emojis */}
              <div className="grid grid-cols-4 gap-1.5">
                {POPULAR_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      handleSendEmoji(emoji);
                      setShowPicker(false);
                    }}
                    className={`p-2 text-xl rounded-xl border flex items-center justify-center transition ${
                      isPinkTheme
                        ? 'bg-pink-50 hover:bg-pink-100 border-pink-300'
                        : 'bg-zinc-50 dark:bg-zinc-800 hover:bg-amber-100 dark:hover:bg-zinc-700 border-zinc-900'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              {/* Quick Phrases */}
              <div className="space-y-1 pt-1 border-t border-zinc-200 dark:border-zinc-800">
                <span className="text-[10px] font-black uppercase text-zinc-500 dark:text-zinc-400">Pesan Kilat:</span>
                <div className="flex flex-col gap-1 max-h-24 overflow-y-auto no-scrollbar">
                  {QUICK_PHRASES.map((phrase) => (
                    <button
                      key={phrase}
                      onClick={() => handleSendPhrase(phrase)}
                      className={`text-left px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                        isPinkTheme
                          ? 'bg-pink-50 hover:bg-pink-100 text-pink-900'
                          : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-purple-100 dark:hover:bg-purple-900 text-zinc-800 dark:text-zinc-200'
                      }`}
                    >
                      {phrase}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Short Message Input */}
              <form onSubmit={handleSendCustom} className="flex gap-1.5 pt-1 border-t border-zinc-200 dark:border-zinc-800">
                <input
                  type="text"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder="Ketik pesan..."
                  maxLength={40}
                  className={`flex-1 px-2.5 py-1 text-xs font-bold border rounded-lg focus:outline-none ${
                    isPinkTheme
                      ? 'bg-pink-50 text-pink-950 border-pink-400'
                      : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-900'
                  }`}
                />
                <button
                  type="submit"
                  disabled={!customMsg.trim()}
                  className={`p-1.5 rounded-lg border disabled:opacity-50 cursor-pointer ${
                    isPinkTheme
                      ? 'bg-pink-400 hover:bg-pink-500 text-white border-pink-600'
                      : 'bg-emerald-400 dark:bg-emerald-600 text-zinc-900 dark:text-white border-zinc-900'
                  }`}
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
