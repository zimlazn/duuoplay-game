import { FlagQuestion, WordQuestion, EmojiVoiceQuestion, DilemmaQuestion } from '../types/game';

// 1. DATA TEBAK BENDERA (Daftar bendera dunia lengkap & akurat)
export const FLAG_DATABASE: Array<Omit<FlagQuestion, 'options'>> = [
  { id: 'f-id', countryCode: 'ID', countryName: 'Indonesia', flagEmoji: '🇮🇩', fact: 'Negara kepulauan terbesar di dunia dengan lebih dari 17.000 pulau!' },
  { id: 'f-jp', countryCode: 'JP', countryName: 'Jepang', flagEmoji: '🇯🇵', fact: 'Dikenal sebagai Negeri Matahari Terbit dengan teknologi kereta Shinkansen.' },
  { id: 'f-kr', countryCode: 'KR', countryName: 'Korea Selatan', flagEmoji: '🇰🇷', fact: 'Negara asal K-Pop, drama Korea, dan kuliner Kimchi yang mendunia.' },
  { id: 'f-br', countryCode: 'BR', countryName: 'Brasil', flagEmoji: '🇧🇷', fact: 'Negara pemilik hutan Amazon terbesar dan pemenang 5 Piala Dunia FIFA.' },
  { id: 'f-de', countryCode: 'DE', countryName: 'Jerman', flagEmoji: '🇩🇪', fact: 'Dikenal dengan jalan tol tanpa batas kecepatan Autobahn dan festival Oktoberfest.' },
  { id: 'f-fr', countryCode: 'FR', countryName: 'Prancis', flagEmoji: '🇫🇷', fact: 'Rumah bagi Menara Eiffel dan Museum Louvre di kota Paris.' },
  { id: 'f-it', countryCode: 'IT', countryName: 'Italia', flagEmoji: '🇮🇹', fact: 'Negara asal Pizza, Pasta, Colosseum, dan mobil sport Ferrari.' },
  { id: 'f-es', countryCode: 'ES', countryName: 'Spanyol', flagEmoji: '🇪🇸', fact: 'Terkenal dengan tarian Flamenco, tradisi Matador, dan klub sepak bola Barcelona & Real Madrid.' },
  { id: 'f-gb', countryCode: 'GB', countryName: 'Inggris (Britania Raya)', flagEmoji: '🇬🇧', fact: 'Rumah bagi jam legendaris Big Ben dan Premier League.' },
  { id: 'f-ca', countryCode: 'CA', countryName: 'Kanada', flagEmoji: '🇨🇦', fact: 'Negara dengan daun Maple di benderanya dan penghasil sirup maple terbesar.' },
  { id: 'f-ar', countryCode: 'AR', countryName: 'Argentina', flagEmoji: '🇦🇷', fact: 'Negara asal tarian Tango dan legenda sepak bola Maradona & Messi.' },
  { id: 'f-eg', countryCode: 'EG', countryName: 'Mesir', flagEmoji: '🇪🇬', fact: 'Negara dengan Piramida Giza kuno dan Sungai Nil yang panjang.' },
  { id: 'f-sa', countryCode: 'SA', countryName: 'Arab Saudi', flagEmoji: '🇸🇦', fact: 'Negara tempat berdirinya dua kota suci Makkah dan Madinah.' },
  { id: 'f-tr', countryCode: 'TR', countryName: 'Turki', flagEmoji: '🇹🇷', fact: 'Negara yang membentang di dua benua sekaligus: Asia dan Eropa.' },
  { id: 'f-th', countryCode: 'TH', countryName: 'Thailand', flagEmoji: '🇹🇭', fact: 'Dikenal sebagai Negeri Gajah Putih dan surga kuliner Tom Yum.' },
  { id: 'f-my', countryCode: 'MY', countryName: 'Malaysia', flagEmoji: '🇲🇾', fact: 'Negara tetangga dengan ikon Menara Kembar Petronas di Kuala Lumpur.' },
  { id: 'f-sg', countryCode: 'SG', countryName: 'Singapura', flagEmoji: '🇸🇬', fact: 'Negara pulau modern dengan patung Merlion dan bandara Changi.' },
  { id: 'f-au', countryCode: 'AU', countryName: 'Australia', flagEmoji: '🇦🇺', fact: 'Benua dan negara tempat tinggal hewan endemik Kangguru dan Koala.' },
  { id: 'f-mx', countryCode: 'MX', countryName: 'Meksiko', flagEmoji: '🇲🇽', fact: 'Terkenal dengan topi Sombrero, kuliner Taco, dan peradaban Maya.' },
  { id: 'f-nl', countryCode: 'NL', countryName: 'Belanda', flagEmoji: '🇳🇱', fact: 'Negara kincir angin, bunga Tulip, dan kota sepeda Amsterdam.' },
  { id: 'f-ch', countryCode: 'CH', countryName: 'Swiss', flagEmoji: '🇨🇭', fact: 'Terkenal dengan Pegunungan Alpen, cokelat lezat, dan jam tangan mewah.' },
  { id: 'f-in', countryCode: 'IN', countryName: 'India', flagEmoji: '🇮🇳', fact: 'Rumah bagi Taj Mahal megah dan industri perfilman Bollywood.' },
  { id: 'f-ps', countryCode: 'PS', countryName: 'Palestina', flagEmoji: '🇵🇸', fact: 'Tanah bersejarah tempat berdirinya Masjid Al-Aqsa.' },
  { id: 'f-za', countryCode: 'ZA', countryName: 'Afrika Selatan', flagEmoji: '🇿🇦', fact: 'Negara pelangi dengan 3 ibu kota dan habitat satwa liar Safari.' },
  { id: 'f-gr', countryCode: 'GR', countryName: 'Yunani', flagEmoji: '🇬🇷', fact: 'Tempat lahirnya pesta olahraga Olimpiade dan mitologi dewa-dewi Olympus.' },
  { id: 'f-pt', countryCode: 'PT', countryName: 'Portugal', flagEmoji: '🇵🇹', fact: 'Negara pelaut penjelajah samudra dan asal pesepakbola Cristiano Ronaldo.' }
];

// 2. DATA TEBAK KATA (Bahasa Indonesia: Teka-Teki & Clue Cerdas)
export const WORD_DATABASE: Array<Omit<WordQuestion, 'options'>> = [
  {
    id: 'w-1',
    word: 'RENDANG',
    clue: 'Makanan khas Minangkabau dari olahan daging sapi berbumbu rempah pekat yang dinobatkan sebagai salah satu makanan terlezat di dunia.',
    category: 'Kuliner Nusantara',
    hint: 'Dimasak berjam-jam hingga kuahnya kering kehitaman'
  },
  {
    id: 'w-2',
    word: 'ANGKLUNG',
    clue: 'Alat musik tradisional berbahan bambu dari Jawa Barat yang menghasilkan bunyi harmonis saat digoyangkan.',
    category: 'Seni & Budaya',
    hint: 'Terdaftar sebagai Warisan Budaya Takbenda UNESCO'
  },
  {
    id: 'w-3',
    word: 'KOMODO',
    clue: 'Spesies kadal terbesar di dunia yang merupakan satwa endemik purba di Nusa Tenggara Timur Indonesia.',
    category: 'Fauna',
    hint: 'Memiliki air liur beracun dan lidah bercabang'
  },
  {
    id: 'w-4',
    word: 'PAYUNG',
    clue: 'Saat cuaca cerah aku sering disimpan di sudut rumah, tapi saat langit menangis atau matahari sangat terik aku selalu dibuka.',
    category: 'Benda Sehari-hari',
    hint: 'Punya kain pelindung dan gagang melengkung'
  },
  {
    id: 'w-5',
    word: 'GUNTING',
    clue: 'Punya dua mata tajam yang saling bersilang, semakin sering mereka beradu maka benda di tengahnya akan terbelah.',
    category: 'Peralatan',
    hint: 'Sering dipakai penjahit dan pemangkas rambut'
  },
  {
    id: 'w-6',
    word: 'PELANGI',
    clue: 'Aku melengkung indah di cakrawala dengan tujuh warna ajaib, biasanya muncul saat tetes hujan bertemu sinar mentari.',
    category: 'Fenomena Alam',
    hint: 'Me-Ji-Ku-Hi-Bi-Ni-U'
  },
  {
    id: 'w-7',
    word: 'JARUM',
    clue: 'Badanku ramping berujung lancip, punya lubang kecil di satu ujungnya tapi bukan untuk bernapas melainkan dilalui benang.',
    category: 'Benda Rumah',
    hint: 'Pasangan sejati dari benang jahit'
  },
  {
    id: 'w-8',
    word: 'GURITA',
    clue: 'Hewan laut berbadan lunak tanpa tulang belakang, memiliki delapan lengan berpenghisap dan bisa menyemprotkan tinta hitam.',
    category: 'Biologi Laut',
    hint: 'Mampu menyamar meniru warna terumbu karang'
  },
  {
    id: 'w-9',
    word: 'SPION',
    clue: 'Kaca kecil yang menempel di kanan kiri kendaraan untuk melihat hal yang sudah tertinggal di belakang tanpa perlu menoleh.',
    category: 'Otomotif',
    hint: 'Penting dipantau sebelum berbelok atau menyalip'
  },
  {
    id: 'w-10',
    word: 'KELERENG',
    clue: 'Bulatan kaca bening mengilap warna-warni yang sering disentil anak-anak di atas tanah berdebu.',
    category: 'Permainan Tradisional',
    hint: 'Sering disebut juga gundu'
  },
  {
    id: 'w-11',
    word: 'KULKAS',
    clue: 'Lemari yang tak pernah menyimpan pakaian, namun selalu dingin membekukan sayuran, susu, dan es batu.',
    category: 'Elektronik Rumah',
    hint: 'Punya freezer di bagian dalamnya'
  },
  {
    id: 'w-12',
    word: 'SEPATU',
    clue: 'Selalu berpasangan kanan dan kiri, punya tali atau perekat, setia menginjak aspal dan tanah demi melindungi telapak kakimu.',
    category: 'Aksesoris & Pakaian',
    hint: 'Dilepas sebelum masuk ke rumah ibadah atau karpet'
  },
  {
    id: 'w-13',
    word: 'CANGKUL',
    clue: 'Bilah besi pipih bergagang kayu panjang, senjata andalan para petani untuk membalik tanah gembur di sawah.',
    category: 'Alat Tradisional',
    hint: 'Ada lagu anak-anak: "Cangkul, cangkul, cangkul yang dalam..."'
  },
  {
    id: 'w-14',
    word: 'BANTAL',
    clue: 'Benda empuk bersarung kain yang selalu dicari saat mata mengantuk, tempat kepala merebahkan lelah setelah seharian beraktivitas.',
    category: 'Perlengkapan Tidur',
    hint: 'Temannya guling di atas kasur'
  },
  {
    id: 'w-15',
    word: 'PRAMUGARI',
    clue: 'Profesi yang bertugas melayani keselamatan dan kenyamanan penumpang di ketinggian ribuan kaki di atas awan.',
    category: 'Profesi',
    hint: 'Bekerja di dalam kabin pesawat terbang'
  }
];

// 3. DATA TEBAK EMOJI PANGGILAN SUARA (WhatsApp Call Synergy Game)
// Satu pemain melihat emoji target + kata terlarang, lalu menjelaskan lewat suara (WhatsApp call)
// Pasangannya harus menebak emoji mana yang dimaksud dari deretan pilihan di layar!
export const EMOJI_VOICE_DATABASE: Array<{
  id: string;
  targetEmoji: string;
  name: string;
  category: string;
  forbiddenWords: string[];
  distractors: { emoji: string; name: string }[];
}> = [
  {
    id: 'ev-1',
    targetEmoji: '🧗‍♂️',
    name: 'Panjat Tebing',
    category: 'Olahraga Ekstrem',
    forbiddenWords: ['gunung', 'panjat', 'tebing', 'tali', 'batu'],
    distractors: [
      { emoji: '🏄‍♂️', name: 'Selancar Ombak' },
      { emoji: '⛷️', name: 'Main Ski' },
      { emoji: '🤸‍♂️', name: 'Senam Akrobat' },
      { emoji: '🏊‍♂️', name: 'Berenang' },
      { emoji: '🚴‍♂️', name: 'Sepeda Gunung' }
    ]
  },
  {
    id: 'ev-2',
    targetEmoji: '🍕',
    name: 'Pizza Keju',
    category: 'Makanan',
    forbiddenWords: ['pizza', 'roti', 'keju', 'italia', 'potong'],
    distractors: [
      { emoji: '🍔', name: 'Burger' },
      { emoji: '🌭', name: 'Hotdog' },
      { emoji: '🌮', name: 'Taco' },
      { emoji: '🥪', name: 'Sandwich' },
      { emoji: '🍟', name: 'Kentang Goreng' }
    ]
  },
  {
    id: 'ev-3',
    targetEmoji: '🦁',
    name: 'Singa (Raja Hutan)',
    category: 'Hewan Liar',
    forbiddenWords: ['singa', 'raja', 'hutan', 'rambut', 'mengaum'],
    distractors: [
      { emoji: '🐯', name: 'Harimau' },
      { emoji: '🐻', name: 'Beruang' },
      { emoji: '🐺', name: 'Serigala' },
      { emoji: '🦊', name: 'Rubah' },
      { emoji: '🐆', name: 'Macan Tutul' }
    ]
  },
  {
    id: 'ev-4',
    targetEmoji: '🚀',
    name: 'Roket Luar Angkasa',
    category: 'Teknologi & Transportasi',
    forbiddenWords: ['roket', 'angkasa', 'bulan', 'antariksa', 'nasa'],
    distractors: [
      { emoji: '✈️', name: 'Pesawat' },
      { emoji: '🚁', name: 'Helikopter' },
      { emoji: '🛸', name: 'Piring Terbang UFO' },
      { emoji: '🛰️', name: 'Satelit' },
      { emoji: '🏎️', name: 'Mobil Balap' }
    ]
  },
  {
    id: 'ev-5',
    targetEmoji: '🧛‍♂️',
    name: 'Vampir Drakula',
    category: 'Karakter & Cerita',
    forbiddenWords: ['vampir', 'drakula', 'darah', 'taring', 'kelelawar'],
    distractors: [
      { emoji: '🧟‍♂️', name: 'Zombi' },
      { emoji: '🧙‍♂️', name: 'Penyihir' },
      { emoji: '🥷', name: 'Ninja' },
      { emoji: '🦸‍♂️', name: 'Pahlawan Super' },
      { emoji: '👻', name: 'Hantu' }
    ]
  },
  {
    id: 'ev-6',
    targetEmoji: '🎣',
    name: 'Memancing Ikan',
    category: 'Hobi & Rekreasi',
    forbiddenWords: ['pancing', 'ikan', 'umpan', 'sungai', 'kail'],
    distractors: [
      { emoji: '🚣‍♂️', name: 'Mendayung Perahu' },
      { emoji: '🏹', name: 'Memanah' },
      { emoji: '⛺', name: 'Kemah / Tenda' },
      { emoji: '🏊‍♂️', name: 'Berenang' },
      { emoji: '⛵', name: 'Berlayar' }
    ]
  },
  {
    id: 'ev-7',
    targetEmoji: '🦥',
    name: 'Kukang / Sloth',
    category: 'Hewan Unik',
    forbiddenWords: ['sloth', 'kukang', 'lambat', 'pohon', 'tidur'],
    distractors: [
      { emoji: '🐨', name: 'Koala' },
      { emoji: '🦔', name: 'Landak' },
      { emoji: '🦘', name: 'Kangguru' },
      { emoji: '🦦', name: 'Berang-berang' },
      { emoji: '🐼', name: 'Panda' }
    ]
  },
  {
    id: 'ev-8',
    targetEmoji: '🌋',
    name: 'Gunung Berapi / Erupsi',
    category: 'Alam & Bencana',
    forbiddenWords: ['gunung', 'api', 'lahar', 'meletus', 'lava'],
    distractors: [
      { emoji: '🌪️', name: 'Angin Puting Beliung' },
      { emoji: '🌊', name: 'Tsunami Ombak' },
      { emoji: '⚡', name: 'Petir Menyambar' },
      { emoji: '🔥', name: 'Api Membara' },
      { emoji: '🏔️', name: 'Gunung Salju' }
    ]
  },
  {
    id: 'ev-9',
    targetEmoji: '🎬',
    name: 'Papan Sutradara Film (Clapperboard)',
    category: 'Sinema & Hiburan',
    forbiddenWords: ['film', 'sutradara', 'action', 'syuting', 'kamera'],
    distractors: [
      { emoji: '🍿', name: 'Popcorn Bioskop' },
      { emoji: '🎟️', name: 'Tiket Nonton' },
      { emoji: '🎭', name: 'Topeng Teater' },
      { emoji: '🎙️', name: 'Mikrofon Studio' },
      { emoji: '📺', name: 'Televisi' }
    ]
  },
  {
    id: 'ev-10',
    targetEmoji: '🪂',
    name: 'Terjun Payung (Skydiving)',
    category: 'Olahraga Ekstrem',
    forbiddenWords: ['terjun', 'payung', 'parasut', 'lompat', 'pesawat'],
    distractors: [
      { emoji: '🪁', name: 'Layang-layang' },
      { emoji: '🎈', name: 'Balon Udara' },
      { emoji: '⛷️', name: 'Main Ski' },
      { emoji: '🏄‍♂️', name: 'Selancar' },
      { emoji: '🚁', name: 'Helikopter' }
    ]
  }
];

// 4. DATA UJI KECOCOKAN / TELEPATI PILIHAN (Dilema Seru Jarak Jauh)
export const DILEMMA_DATABASE: DilemmaQuestion[] = [
  {
    id: 'dl-1',
    title: 'Sekte Cara Makan Bubur Ayam',
    category: 'Kebiasaan Makan',
    optionA: { id: 'A', text: 'Diaduk rata biar bumbu merata', emoji: '🥣' },
    optionB: { id: 'B', text: 'Gak diaduk biar topping tetap rapi', emoji: '🥄' }
  },
  {
    id: 'dl-2',
    title: 'Destinasi Liburan Impian',
    category: 'Gaya Hidup',
    optionA: { id: 'A', text: 'Pantai tropis santai & sunset', emoji: '🏖️' },
    optionB: { id: 'B', text: 'Pegunungan sejuk & udara segar', emoji: '🏔️' }
  },
  {
    id: 'dl-3',
    title: 'Nonton Film Pas Malam Minggu',
    category: 'Hiburan',
    optionA: { id: 'A', text: 'Pergi ke bioskop beli popcorn', emoji: '🍿' },
    optionB: { id: 'B', text: 'Rebahan di kasur nonton streaming', emoji: '🛋️' }
  },
  {
    id: 'dl-4',
    title: 'Selera Rasa Makanan',
    category: 'Kuliner',
    optionA: { id: 'A', text: 'Pedas gila & gurih nendang', emoji: '🌶️' },
    optionB: { id: 'B', text: 'Manis legit bikin mood naik', emoji: '🍰' }
  },
  {
    id: 'dl-5',
    title: 'Pola Waktu Beraktivitas',
    category: 'Kebiasaan',
    optionA: { id: 'A', text: 'Burung hantu / Melek tengah malam', emoji: '🦉' },
    optionB: { id: 'B', text: 'Early bird / Bangun subuh pagi hari', emoji: '🌅' }
  },
  {
    id: 'dl-6',
    title: 'Hewan Peliharaan Favorit',
    category: 'Hewan',
    optionA: { id: 'A', text: 'Kucing manja & menggemaskan', emoji: '🐱' },
    optionB: { id: 'B', text: 'Anjing cerdas & sangat setia', emoji: '🐶' }
  },
  {
    id: 'dl-7',
    title: 'Gaya Membalas Pesan Chat',
    category: 'Komunikasi',
    optionA: { id: 'A', text: 'Fast response langsung balas kilat', emoji: '⚡' },
    optionB: { id: 'B', text: 'Santai, baru balas kalau senggang', emoji: '🐢' }
  },
  {
    id: 'dl-8',
    title: 'Minuman Peneman Nongkrong',
    category: 'Kuliner',
    optionA: { id: 'A', text: 'Kopi aromatik penahan kantuk', emoji: '☕' },
    optionB: { id: 'B', text: 'Teh harum atau Boba manis', emoji: '🧋' }
  },
  {
    id: 'dl-9',
    title: 'Prioritas Uang Gajian / Tabungan',
    category: 'Finansial & Fun',
    optionA: { id: 'A', text: 'Langsung simpan & invest ketat', emoji: '💰' },
    optionB: { id: 'B', text: 'Self-reward kuliner & belanja dulu', emoji: '🛍️' }
  },
  {
    id: 'dl-10',
    title: 'Tipe Pasangan / Sahabat Ideal',
    category: 'Hubungan',
    optionA: { id: 'A', text: 'Humoris receh bikin ketawa terus', emoji: '😂' },
    optionB: { id: 'B', text: 'Pendengar yang hangat & dewasa', emoji: '🥰' }
  }
];

// Helper functions for randomized rounds
export function generateFlagQuestion(): FlagQuestion {
  const randomIndex = Math.floor(Math.random() * FLAG_DATABASE.length);
  const target = FLAG_DATABASE[randomIndex];

  // Pick 3 random wrong options
  const wrongOptions: string[] = [];
  while (wrongOptions.length < 3) {
    const candidate = FLAG_DATABASE[Math.floor(Math.random() * FLAG_DATABASE.length)].countryName;
    if (candidate !== target.countryName && !wrongOptions.includes(candidate)) {
      wrongOptions.push(candidate);
    }
  }

  // Shuffle options
  const options = [target.countryName, ...wrongOptions].sort(() => Math.random() - 0.5);

  return {
    ...target,
    options
  };
}

export function generateWordQuestion(): WordQuestion {
  const randomIndex = Math.floor(Math.random() * WORD_DATABASE.length);
  const target = WORD_DATABASE[randomIndex];

  // Pick 3 random wrong words from database
  const wrongOptions: string[] = [];
  while (wrongOptions.length < 3) {
    const candidate = WORD_DATABASE[Math.floor(Math.random() * WORD_DATABASE.length)].word;
    if (candidate !== target.word && !wrongOptions.includes(candidate)) {
      wrongOptions.push(candidate);
    }
  }

  const options = [target.word, ...wrongOptions].sort(() => Math.random() - 0.5);

  return {
    ...target,
    options
  };
}

export function generateEmojiVoiceQuestion(player1Id: string, player2Id: string, roundNumber: number): EmojiVoiceQuestion {
  const randomIndex = Math.floor(Math.random() * EMOJI_VOICE_DATABASE.length);
  const target = EMOJI_VOICE_DATABASE[randomIndex];

  // Alternate describer and guesser per round!
  const isPlayer1Describer = roundNumber % 2 !== 0;
  const describerPlayerId = isPlayer1Describer ? player1Id : player2Id;
  const guesserPlayerId = isPlayer1Describer ? player2Id : player1Id;

  // Options include target + 3 distractors
  const options = [
    { emoji: target.targetEmoji, name: target.name },
    ...target.distractors.slice(0, 3)
  ].sort(() => Math.random() - 0.5);

  return {
    id: target.id,
    targetEmoji: target.targetEmoji,
    name: target.name,
    category: target.category,
    forbiddenWords: target.forbiddenWords,
    options,
    describerPlayerId,
    guesserPlayerId
  };
}

export function generateDilemmaQuestion(usedIds: string[] = []): DilemmaQuestion {
  const available = DILEMMA_DATABASE.filter(d => !usedIds.includes(d.id));
  const pool = available.length > 0 ? available : DILEMMA_DATABASE;
  return pool[Math.floor(Math.random() * pool.length)];
}
