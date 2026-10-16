import React, { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import {
  Trophy,
  Volume2,
  VolumeX,
  PhoneCall,
  Copy,
  Check,
  Gamepad2,
  Moon,
  Sun,
  LogOut,
  Menu,
  X,
  Sparkles,
  Smartphone
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
  const { room, soundEnabled, toggleSound, leaveRoom } = useSocket();
  const [copied, setCopied] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showIosInstallModal, setShowIosInstallModal] = useState(false);

  // STRICT DEFAULT: Light Theme (false)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('duoplay_theme_mode');
      return saved === 'dark';
    }
    return false;
  });

  const isPinkTheme = room?.roomId === 'ACAA' || room?.isSpecialTheme;

  // Apply theme classes
  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (isPinkTheme) {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      document.body.classList.add('theme-pink');
      return;
    }

    document.body.classList.remove('theme-pink');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('duoplay_theme_mode', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('duoplay_theme_mode', 'light');
    }
  }, [isDarkMode, isPinkTheme]);

  // Close dropdown on room change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [room?.roomId]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

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
    <>
      <header
        className={`sticky top-0 z-30 w-full border-b-2 shadow-xs transition-colors duration-300 ${
          isPinkTheme
            ? 'bg-pink-100/95 border-pink-400 backdrop-blur-xs text-pink-950'
            : 'bg-white dark:bg-zinc-900 border-zinc-900 dark:border-zinc-700'
        }`}
      >
        <div className="max-w-4xl mx-auto px-2 sm:px-3 py-2 sm:py-2.5 flex items-center justify-between gap-1 sm:gap-2">
          {/* Brand & Room Code */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="flex items-center gap-1.5 font-black text-sm tracking-tight text-zinc-900 dark:text-white">
              <span
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl border-2 flex items-center justify-center text-xs sm:text-sm font-black ${
                  isPinkTheme
                    ? 'bg-pink-300 border-pink-600 shadow-[2px_2px_0px_#db2777]'
                    : 'bg-amber-200 dark:bg-amber-500 border-zinc-900 shadow-[2px_2px_0px_#18181b]'
                }`}
              >
                {isPinkTheme ? '💖' : '🎮'}
              </span>
              <span
                className={`font-black text-sm sm:text-base tracking-tight hidden xs:inline ${
                  isPinkTheme ? 'text-pink-950 font-black' : ''
                }`}
              >
                {isPinkTheme ? 'DuoPlay • Acaa' : 'DuoPlay'}
              </span>
            </div>

            {room && (
              <button
                onClick={handleCopyCode}
                title="Salin Kode Room"
                className={`flex items-center gap-1 px-1.5 sm:px-2.5 py-1 rounded-xl border-2 text-[11px] sm:text-xs font-mono font-black active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer ${
                  isPinkTheme
                    ? 'bg-pink-200 hover:bg-pink-300 text-pink-950 border-pink-600 shadow-[2px_2px_0px_#db2777]'
                    : 'bg-purple-100 dark:bg-purple-950 hover:bg-purple-200 text-purple-950 dark:text-purple-200 border-zinc-900 shadow-[2px_2px_0px_#18181b]'
                }`}
              >
                <span>{room.roomId}</span>
                {isPinkTheme && <span className="text-[10px]">🌸</span>}
                {copied ? (
                  <Check
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                      isPinkTheme ? 'text-pink-700' : 'text-emerald-700 dark:text-emerald-400'
                    }`}
                  />
                ) : (
                  <Copy
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                      isPinkTheme ? 'text-pink-800' : 'text-zinc-700 dark:text-zinc-300'
                    }`}
                  />
                )}
              </button>
            )}
          </div>

          {/* Live Scores Banner (Centered & Compact, visible when in room) */}
          {room && (
            <div
              className={`flex items-center gap-1.5 sm:gap-2 border-2 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-xl shrink-0 ${
                isPinkTheme
                  ? 'bg-white/95 border-pink-400 shadow-[2px_2px_0px_#f472b6]'
                  : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-900 dark:border-zinc-700 shadow-[2px_2px_0px_#18181b]'
              }`}
            >
              <div className="flex items-center gap-1 text-[11px] sm:text-xs">
                <span className="text-xs sm:text-sm">{p1?.avatar || '🦁'}</span>
                <span
                  className={`font-black font-mono ${
                    isPinkTheme ? 'text-pink-700' : 'text-purple-700 dark:text-purple-400'
                  }`}
                >
                  {p1?.score ?? 0}
                </span>
              </div>
              <span className="text-zinc-400 text-[10px] sm:text-xs font-bold">:</span>
              <div className="flex items-center gap-1 text-[11px] sm:text-xs">
                <span
                  className={`font-black font-mono ${
                    isPinkTheme ? 'text-rose-600' : 'text-emerald-700 dark:text-emerald-400'
                  }`}
                >
                  {p2?.score ?? 0}
                </span>
                <span className="text-xs sm:text-sm">{p2?.avatar || '🦊'}</span>
              </div>
            </div>
          )}

          {/* DESKTOP VIEW ACTIONS (md:flex) */}
          <div className="hidden md:flex items-center gap-1.5 shrink-0">
            {/* Tombol Keluar Room */}
            {room && (
              <button
                onClick={() => setShowLeaveModal(true)}
                title="Keluar dari Room"
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border-2 text-xs font-black active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer ${
                  isPinkTheme
                    ? 'bg-rose-200 hover:bg-rose-300 text-rose-950 border-rose-500 shadow-[2px_2px_0px_#fb7185]'
                    : 'bg-rose-100 hover:bg-rose-200 text-rose-950 dark:bg-rose-950/80 dark:text-rose-200 border-zinc-900 dark:border-rose-700 shadow-[2px_2px_0px_#18181b]'
                }`}
              >
                <LogOut className="w-3.5 h-3.5 text-rose-700 dark:text-rose-400" />
                <span>Keluar</span>
              </button>
            )}

            {/* Switch Game Button */}
            {room && (
              <button
                onClick={onOpenGameSelector}
                title="Pilih Permainan Lain"
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border-2 text-xs font-bold active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer ${
                  isPinkTheme
                    ? 'bg-pink-300 hover:bg-pink-400 text-pink-950 border-pink-600 shadow-[2px_2px_0px_#db2777]'
                    : 'bg-sky-100 dark:bg-sky-950/80 hover:bg-sky-200 text-sky-950 dark:text-sky-200 border-zinc-900 dark:border-sky-700 shadow-[2px_2px_0px_#18181b]'
                }`}
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Pilih Game</span>
              </button>
            )}

            {/* WhatsApp Call Guide Button */}
            <button
              onClick={onOpenVoiceCallModal}
              title="Panduan Panggilan Suara WhatsApp"
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border-2 text-xs font-bold active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer ${
                isPinkTheme
                  ? 'bg-rose-100 hover:bg-rose-200 text-rose-950 border-rose-400 shadow-[2px_2px_0px_#fb7185]'
                  : 'bg-emerald-100 dark:bg-emerald-950/80 hover:bg-emerald-200 text-emerald-950 dark:text-emerald-200 border-zinc-900 dark:border-emerald-700 shadow-[2px_2px_0px_#18181b]'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Voice Call WA</span>
            </button>

            {/* Install iPhone App (.mobileconfig) Button */}
            <button
              onClick={() => setShowIosInstallModal(true)}
              title="Install App for iPhone (.mobileconfig)"
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border-2 text-xs font-bold active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer ${
                isPinkTheme
                  ? 'bg-purple-200 hover:bg-purple-300 text-purple-950 border-purple-400 shadow-[2px_2px_0px_#c084fc]'
                  : 'bg-indigo-100 dark:bg-indigo-950/80 hover:bg-indigo-200 text-indigo-950 dark:text-indigo-200 border-zinc-900 dark:border-indigo-700 shadow-[2px_2px_0px_#18181b]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-indigo-700 dark:text-indigo-300" />
              <span>Install iPhone</span>
            </button>

            {/* Scoreboard Drawer */}
            {room && (
              <button
                onClick={onOpenScoreboard}
                title="Papan Skor Bersama"
                className={`p-1.5 rounded-xl border-2 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer ${
                  isPinkTheme
                    ? 'bg-amber-200 hover:bg-amber-300 text-amber-950 border-amber-500 shadow-[2px_2px_0px_#f59e0b]'
                    : 'bg-amber-100 dark:bg-amber-950/80 hover:bg-amber-200 text-amber-950 dark:text-amber-200 border-zinc-900 dark:border-amber-700 shadow-[2px_2px_0px_#18181b]'
                }`}
              >
                <Trophy className="w-4 h-4" />
              </button>
            )}

            {/* Dark Mode Toggle */}
            {!isPinkTheme ? (
              <button
                onClick={toggleDarkMode}
                title={isDarkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
                className="p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border-2 border-zinc-900 dark:border-zinc-700 shadow-[2px_2px_0px_#18181b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer flex items-center justify-center"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />
                )}
              </button>
            ) : (
              <div
                title="Tema Spesial Pink Imut Acaa Aktif"
                className="px-2 py-1 rounded-xl bg-pink-200 border-2 border-pink-500 shadow-[2px_2px_0px_#f472b6] text-pink-950 text-xs font-black flex items-center gap-1 cursor-default select-none animate-pulse"
              >
                <span className="text-xs">🌸</span>
                <span className="text-[10px] font-extrabold">Acaa</span>
              </div>
            )}

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
              className={`p-1.5 rounded-xl border-2 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer ${
                isPinkTheme
                  ? 'bg-white hover:bg-pink-50 text-pink-950 border-pink-400 shadow-[2px_2px_0px_#f472b6]'
                  : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-900 dark:text-zinc-100 border-zinc-900 dark:border-zinc-700 shadow-[2px_2px_0px_#18181b]'
              }`}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
              ) : (
                <VolumeX className="w-4 h-4 text-zinc-400" />
              )}
            </button>
          </div>

          {/* MOBILE VIEW ACTIONS: ONLY ESSENTIAL BUTTONS + 3-LINE (GARIS 3) HAMBURGER DROPDOWN */}
          <div className="flex md:hidden items-center gap-1 shrink-0 relative">
            {/* Tombol Penting: Keluar Room (Jika di dalam room) */}
            {room && (
              <button
                onClick={() => setShowLeaveModal(true)}
                title="Keluar dari Room"
                className={`p-1.5 rounded-xl border-2 text-xs font-black active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer flex items-center justify-center ${
                  isPinkTheme
                    ? 'bg-rose-200 hover:bg-rose-300 text-rose-950 border-rose-500 shadow-[2px_2px_0px_#fb7185]'
                    : 'bg-rose-100 hover:bg-rose-200 text-rose-950 dark:bg-rose-950/80 dark:text-rose-200 border-zinc-900 dark:border-rose-700 shadow-[2px_2px_0px_#18181b]'
                }`}
              >
                <LogOut className="w-4 h-4 text-rose-700 dark:text-rose-400" />
              </button>
            )}

            {/* Tombol Garis 3 Hamburger Dropdown (Menu) */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              title="Menu Opsi Tambahan"
              className={`p-1.5 rounded-xl border-2 text-xs font-black active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer flex items-center justify-center ${
                isMobileMenuOpen
                  ? 'bg-amber-300 border-zinc-900 shadow-none'
                  : isPinkTheme
                  ? 'bg-pink-200 hover:bg-pink-300 text-pink-950 border-pink-500 shadow-[2px_2px_0px_#f472b6]'
                  : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border-zinc-900 dark:border-zinc-700 shadow-[2px_2px_0px_#18181b]'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 text-zinc-900" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE HAMBURGER DROPDOWN POPOVER MENU */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop Tap to Close */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/25 backdrop-blur-2xs md:hidden animate-fade-in"
          />

          {/* Dropdown Card */}
          <div
            className={`fixed right-3 top-13 z-50 w-60 p-2 rounded-2xl border-2 border-zinc-900 shadow-[4px_4px_0px_#18181b] flex flex-col gap-1 md:hidden animate-scale-up ${
              isPinkTheme
                ? 'bg-pink-50 text-pink-950 border-pink-500 shadow-[4px_4px_0px_#f472b6]'
                : 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100'
            }`}
          >
            {room && (
              <>
                {/* Ganti Game */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenGameSelector();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-950/50 text-xs font-bold text-left transition-colors cursor-pointer"
                >
                  <span className="p-1.5 rounded-lg bg-sky-100 dark:bg-sky-900/60 text-sky-700 dark:text-sky-300 border border-zinc-900">
                    <Gamepad2 className="w-3.5 h-3.5" />
                  </span>
                  <span>Pilih Permainan Lain</span>
                </button>

                {/* Scoreboard */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenScoreboard();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/50 text-xs font-bold text-left transition-colors cursor-pointer"
                >
                  <span className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 border border-zinc-900">
                    <Trophy className="w-3.5 h-3.5" />
                  </span>
                  <span>Papan Skor Bersama</span>
                </button>

                <div className="my-1 border-t border-zinc-200 dark:border-zinc-800" />
              </>
            )}

            {/* WA Call Guide */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenVoiceCallModal();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/50 text-xs font-bold text-left transition-colors cursor-pointer"
            >
              <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-zinc-900">
                <PhoneCall className="w-3.5 h-3.5" />
              </span>
              <span>Voice Call WhatsApp</span>
            </button>

            {/* Install iPhone (.mobileconfig) */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setShowIosInstallModal(true);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-xs font-bold text-left transition-colors cursor-pointer"
            >
              <span className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-zinc-900">
                <Smartphone className="w-3.5 h-3.5" />
              </span>
              <span>Install App for iPhone</span>
            </button>

            {/* Dark Mode Toggle */}
            {!isPinkTheme ? (
              <button
                onClick={() => {
                  toggleDarkMode();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-bold text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-900">
                    {isDarkMode ? (
                      <Sun className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ) : (
                      <Moon className="w-3.5 h-3.5" />
                    )}
                  </span>
                  <span>Mode Gelap</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-200 dark:bg-zinc-700">
                  {isDarkMode ? 'Aktif' : 'Mati'}
                </span>
              </button>
            ) : (
              <div className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-pink-950 select-none">
                <span className="p-1.5 rounded-lg bg-pink-200 border border-pink-500">
                  🌸
                </span>
                <span>Tema Spesial Pink Acaa</span>
              </div>
            )}

            {/* Sound Toggle */}
            <button
              onClick={() => {
                toggleSound();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-bold text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-900">
                  {soundEnabled ? (
                    <Volume2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                  )}
                </span>
                <span>Efek Suara</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-200 dark:bg-zinc-700">
                {soundEnabled ? 'Aktif' : 'Mati'}
              </span>
            </button>

            {/* Tombol Keluar Room di Dropdown */}
            {room && (
              <>
                <div className="my-1 border-t border-zinc-200 dark:border-zinc-800" />
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setShowLeaveModal(true);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/50 text-xs font-bold text-rose-600 dark:text-rose-400 text-left transition-colors cursor-pointer"
                >
                  <span className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-900/60 text-rose-600 border border-zinc-900">
                    <LogOut className="w-3.5 h-3.5" />
                  </span>
                  <span>Keluar dari Room</span>
                </button>
              </>
            )}
          </div>
        </>
      )}

      {/* MODAL KONFIRMASI KELUAR ROOM */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div
            className={`max-w-xs w-full p-5 rounded-3xl border-3 border-zinc-900 shadow-[6px_6px_0px_#18181b] animate-scale-up ${
              isPinkTheme
                ? 'bg-pink-50 text-pink-950'
                : 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100'
            }`}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span className="p-2 rounded-2xl bg-rose-100 text-rose-600 border-2 border-zinc-900 shadow-xs">
                <LogOut className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-black text-base leading-tight">Keluar Room?</h3>
                <span className="text-[11px] font-mono font-bold text-rose-600">
                  Room: {room?.roomId}
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-5 leading-relaxed">
              Apakah kamu yakin ingin meninggalkan room ini dan kembali ke menu lobi utama?
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setShowLeaveModal(false)}
                className="px-3 py-2 rounded-xl border-2 border-zinc-900 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold text-xs hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer active:translate-y-0.5 transition-all"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setShowLeaveModal(false);
                  leaveRoom();
                }}
                className="px-3 py-2 rounded-xl border-2 border-zinc-900 bg-rose-500 hover:bg-rose-600 text-white font-black text-xs shadow-[2px_2px_0px_#18181b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer flex items-center justify-center gap-1.5 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Ya, Keluar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL INSTALL IPHONE (.mobileconfig) */}
      {showIosInstallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div
            className={`max-w-md w-full p-6 rounded-3xl border-3 border-zinc-900 shadow-[6px_6px_0px_#18181b] animate-scale-up ${
              isPinkTheme
                ? 'bg-pink-50 text-pink-950'
                : 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <span className="p-2.5 rounded-2xl bg-indigo-100 text-indigo-700 border-2 border-zinc-900 shadow-xs">
                  <Smartphone className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="font-black text-lg leading-tight">Install DuoPlay di iPhone</h3>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    via iOS Web Clip Profile (.mobileconfig)
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowIosInstallModal(false)}
                className="p-1.5 rounded-xl border-2 border-zinc-900 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-zinc-700 dark:text-zinc-300 mb-5 leading-relaxed bg-zinc-50 dark:bg-zinc-800/60 p-3.5 rounded-2xl border-2 border-zinc-900/10">
              <p className="font-bold">
                Folder <code className="font-mono text-indigo-600">/ios-profile</code> telah dibuat di proyek ini berisi templat <code className="font-mono">DuoPlay.mobileconfig</code>.
              </p>
              <ol className="list-decimal list-inside space-y-1.5 font-medium">
                <li>Buka folder <code className="font-mono">/ios-profile</code> di repositori Anda.</li>
                <li>Unduh atau kirim file <code className="font-mono">DuoPlay.mobileconfig</code> ke iPhone Anda via AirDrop / Email.</li>
                <li>Di iPhone, buka menu <strong className="text-zinc-900 dark:text-white">Settings (Pengaturan)</strong> &gt; <strong className="text-zinc-900 dark:text-white">Profile Downloaded (Profil Diunduh)</strong>.</li>
                <li>Ketuk <strong className="text-zinc-900 dark:text-white">Install (Pasang)</strong> untuk memasang Web Clip layar penuh ke Home Screen iPhone Anda.</li>
              </ol>
            </div>

            <div className="flex gap-2">
              <a
                href="/ios-profile/DuoPlay.mobileconfig"
                download="DuoPlay.mobileconfig"
                className="flex-1 px-4 py-2.5 rounded-2xl border-2 border-zinc-900 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-[2px_2px_0px_#18181b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer flex items-center justify-center gap-2 transition-all text-center"
              >
                <Smartphone className="w-4 h-4" />
                <span>Unduh DuoPlay.mobileconfig</span>
              </a>
              <button
                onClick={() => setShowIosInstallModal(false)}
                className="px-4 py-2.5 rounded-2xl border-2 border-zinc-900 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-800 dark:text-zinc-200 font-bold text-xs cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
