import React from 'react';
import { useSocket } from '../context/SocketContext';
import { Trophy, Award, CheckCircle2, X } from 'lucide-react';

interface ScoreboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScoreboardModal: React.FC<ScoreboardModalProps> = ({ isOpen, onClose }) => {
  const { room, playerId } = useSocket();

  if (!isOpen || !room) return null;

  const playerIds = Object.keys(room.players);
  const p1 = playerIds[0] ? room.players[playerIds[0]] : null;
  const p2 = playerIds[1] ? room.players[playerIds[1]] : null;

  const p1IsLeader = p1 && p2 && p1.score > p2.score;
  const p2IsLeader = p1 && p2 && p2.score > p1.score;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg bg-white border-2 border-zinc-900 rounded-3xl shadow-[6px_6px_0px_#18181b] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 border-b-2 border-zinc-900 flex items-center justify-between bg-amber-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b]">
              <Trophy className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h2 className="text-base font-black text-zinc-900 flex items-center gap-2">
                Papan Skor Bersama
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-200 border border-zinc-900 text-emerald-950">
                  Live
                </span>
              </h2>
              <p className="text-xs text-zinc-600 font-medium">Skor dan riwayat babak terkini</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] text-zinc-800 hover:bg-zinc-100 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 bg-[#FAF8F5]">
          {/* Head to Head Duel Cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* Player 1 Card (Lilac Pastel) */}
            {p1 && (
              <div
                className={`p-4 rounded-2xl border-2 border-zinc-900 transition ${
                  p1IsLeader
                    ? 'bg-purple-100 shadow-[3px_3px_0px_#18181b]'
                    : 'bg-white shadow-[2px_2px_0px_#18181b]'
                }`}
              >
                {p1IsLeader && (
                  <div className="inline-block bg-amber-200 border border-zinc-900 text-amber-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-md mb-2">
                    Memimpin ⭐
                  </div>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{p1.avatar}</span>
                  <div className="truncate">
                    <p className="text-xs font-black text-zinc-900 truncate">
                      {p1.nickname} {p1.id === playerId ? '(Kamu)' : ''}
                    </p>
                    <p className="text-[10px] text-zinc-600 font-bold flex items-center gap-1">
                      <Award className="w-3 h-3 text-amber-600" /> {p1.totalWins} Trofi
                    </p>
                  </div>
                </div>
                <div className="mt-2 text-center py-2 bg-white rounded-xl border-2 border-zinc-900">
                  <span className="text-2xl font-black text-purple-900 font-mono">{p1.score}</span>
                  <span className="text-[10px] text-zinc-500 ml-1 font-bold">poin</span>
                </div>
              </div>
            )}

            {/* Player 2 Card (Mint Pastel) */}
            {p2 ? (
              <div
                className={`p-4 rounded-2xl border-2 border-zinc-900 transition ${
                  p2IsLeader
                    ? 'bg-emerald-100 shadow-[3px_3px_0px_#18181b]'
                    : 'bg-white shadow-[2px_2px_0px_#18181b]'
                }`}
              >
                {p2IsLeader && (
                  <div className="inline-block bg-amber-200 border border-zinc-900 text-amber-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-md mb-2">
                    Memimpin ⭐
                  </div>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{p2.avatar}</span>
                  <div className="truncate">
                    <p className="text-xs font-black text-zinc-900 truncate">
                      {p2.nickname} {p2.id === playerId ? '(Kamu)' : ''}
                    </p>
                    <p className="text-[10px] text-zinc-600 font-bold flex items-center gap-1">
                      <Award className="w-3 h-3 text-amber-600" /> {p2.totalWins} Trofi
                    </p>
                  </div>
                </div>
                <div className="mt-2 text-center py-2 bg-white rounded-xl border-2 border-zinc-900">
                  <span className="text-2xl font-black text-emerald-900 font-mono">{p2.score}</span>
                  <span className="text-[10px] text-zinc-500 ml-1 font-bold">poin</span>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl border-2 border-dashed border-zinc-300 bg-white flex flex-col items-center justify-center text-center">
                <span className="text-2xl opacity-40">⏳</span>
                <p className="text-xs text-zinc-500 font-bold mt-1">Menunggu Lawan...</p>
              </div>
            )}
          </div>

          {/* History of Rounds */}
          <div>
            <h3 className="text-xs font-black text-zinc-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-zinc-800" />
              Riwayat Babak ({room.roundHistory.length} Babak)
            </h3>

            {room.roundHistory.length === 0 ? (
              <div className="p-4 rounded-2xl bg-white border-2 border-zinc-200 text-center text-xs text-zinc-500 font-medium">
                Belum ada babak yang selesai. Mulai bermain untuk mencatat skor!
              </div>
            ) : (
              <div className="space-y-2">
                {room.roundHistory.map((rh) => (
                  <div
                    key={rh.roundNumber}
                    className="p-3 rounded-2xl bg-white border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] flex flex-col gap-1 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-zinc-900 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-md bg-purple-100 text-purple-950 border border-zinc-900 flex items-center justify-center text-[11px] font-black">
                          {rh.roundNumber}
                        </span>
                        Babak {rh.roundNumber}
                      </span>
                      <span
                        className={`font-black px-2 py-0.5 rounded-lg border border-zinc-900 text-[10px] ${
                          rh.winnerPlayerId === 'draw'
                            ? 'bg-amber-100 text-amber-950'
                            : 'bg-emerald-100 text-emerald-950'
                        }`}
                      >
                        {rh.winnerPlayerId === 'draw' ? 'Seri' : `Pemenang: ${rh.winnerName}`}
                      </span>
                    </div>
                    {rh.details && (
                      <p className="text-[11px] text-zinc-600 mt-0.5 leading-relaxed font-medium">
                        {rh.details}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t-2 border-zinc-900 bg-white flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-black text-xs shadow-[2px_2px_0px_#18181b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
