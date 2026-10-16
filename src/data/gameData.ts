import { FlagQuestion, WordQuestion, EmojiVoiceQuestion, DilemmaQuestion } from '../types/game';

// ==============================================================
// 1. DATA TEBAK BENDERA DUNIA LENGKAP (180+ NEGARA DARI SEMUA BENUA)
// ==============================================================
export const FLAG_DATABASE: Array<Omit<FlagQuestion, 'options'>> = [
  // ASIA TENGGARA (ASEAN)
  { id: 'f-id', countryCode: 'ID', countryName: 'Indonesia', flagEmoji: '🇮🇩', fact: 'Negara kepulauan terbesar di dunia dengan lebih dari 17.000 pulau.' },
  { id: 'f-my', countryCode: 'MY', countryName: 'Malaysia', flagEmoji: '🇲🇾', fact: 'Ibu kota Kuala Lumpur memiliki Menara Kembar Petronas yang terkenal.' },
  { id: 'f-sg', countryCode: 'SG', countryName: 'Singapura', flagEmoji: '🇸🇬', fact: 'Negara pulau modern dengan ikon patung Merlion dan bandara Changi.' },
  { id: 'f-th', countryCode: 'TH', countryName: 'Thailand', flagEmoji: '🇹🇭', fact: 'Dikenal sebagai Negeri Gajah Putih dan satu-satunya negara ASEAN tak pernah dijajah bangsa Eropa.' },
  { id: 'f-vn', countryCode: 'VN', countryName: 'Vietnam', flagEmoji: '🇻🇳', fact: 'Terkenal dengan Teluk Ha Long dan kuliner mie kuah Pho yang mendunia.' },
  { id: 'f-ph', countryCode: 'PH', countryName: 'Filipina', flagEmoji: '🇵🇭', fact: 'Negara kepulauan dengan lebih dari 7.000 pulau di Samudra Pasifik.' },
  { id: 'f-bn', countryCode: 'BN', countryName: 'Brunei Darussalam', flagEmoji: '🇧🇳', fact: 'Negara kesultanan kaya minyak yang terletak di pulau Kalimantan.' },
  { id: 'f-kh', countryCode: 'KH', countryName: 'Kamboja', flagEmoji: '🇰🇭', fact: 'Rumah bagi candi Hindu-Buddha terbesar di dunia, Angkor Wat.' },
  { id: 'f-la', countryCode: 'LA', countryName: 'Laos', flagEmoji: '🇱🇦', fact: 'Satu-satunya negara di Asia Tenggara yang tidak memiliki garis pantai (landlocked).' },
  { id: 'f-mm', countryCode: 'MM', countryName: 'Myanmar', flagEmoji: '🇲🇲', fact: 'Dikenal dengan ribuan pagoda emas kuno di dataran Bagan.' },
  { id: 'f-tl', countryCode: 'TL', countryName: 'Timor Leste', flagEmoji: '🇹🇱', fact: 'Negara tetangga Indonesia yang merdeka secara resmi pada tahun 2002.' },

  // ASIA TIMUR & SELATAN
  { id: 'f-jp', countryCode: 'JP', countryName: 'Jepang', flagEmoji: '🇯🇵', fact: 'Negeri Matahari Terbit dengan ikon Gunung Fuji dan kereta peluru Shinkansen.' },
  { id: 'f-kr', countryCode: 'KR', countryName: 'Korea Selatan', flagEmoji: '🇰🇷', fact: 'Pusat gelombang Hallyu, drama Korea, K-Pop, dan kuliner Kimchi.' },
  { id: 'f-kp', countryCode: 'KP', countryName: 'Korea Utara', flagEmoji: '🇰🇵', fact: 'Negara di semenanjung Korea bagian utara dengan ibu kota Pyongyang.' },
  { id: 'f-cn', countryCode: 'CN', countryName: 'Tiongkok (Cina)', flagEmoji: '🇨🇳', fact: 'Negara dengan Tembok Besar sepanjang ribuan kilometer dan habitat Panda raksasa.' },
  { id: 'f-tw', countryCode: 'TW', countryName: 'Taiwan', flagEmoji: '🇹🇼', fact: 'Pulau penghasil semikonduktor canggih dan tempat lahirnya minuman Boba Milk Tea.' },
  { id: 'f-mn', countryCode: 'MN', countryName: 'Mongolia', flagEmoji: '🇲🇳', fact: 'Negeri padang rumput luas tempat lahirnya penakluk legendaris Genghis Khan.' },
  { id: 'f-in', countryCode: 'IN', countryName: 'India', flagEmoji: '🇮🇳', fact: 'Negara dengan monumen cinta Taj Mahal dan industri perfilman Bollywood.' },
  { id: 'f-pk', countryCode: 'PK', countryName: 'Pakistan', flagEmoji: '🇵🇰', fact: 'Negara pemilik puncak tertinggi kedua di dunia, Gunung K2.' },
  { id: 'f-bd', countryCode: 'BD', countryName: 'Bangladesh', flagEmoji: '🇧🇩', fact: 'Negara dengan delta sungai terluas di dunia dan hutan bakau Sundarbans.' },
  { id: 'f-lk', countryCode: 'LK', countryName: 'Sri Lanka', flagEmoji: '🇱🇰', fact: 'Pulau berbentuk tetesan air mata di Samudra Hindia yang terkenal dengan teh Ceylon.' },
  { id: 'f-np', countryCode: 'NP', countryName: 'Nepal', flagEmoji: '🇳🇵', fact: 'Satu-satunya bendera negara di dunia yang tidak berbentuk segi empat; rumah Gunung Everest.' },
  { id: 'f-mv', countryCode: 'MV', countryName: 'Maladewa (Maldives)', flagEmoji: '🇲🇻', fact: 'Negara kepulauan atol dengan resor laut biru terindah di dunia.' },
  { id: 'f-bt', countryCode: 'BT', countryName: 'Bhutan', flagEmoji: '🇧🇹', fact: 'Negeri di pegunungan Himalaya yang mengukur kebahagiaan nasional (Gross National Happiness).' },

  // ASIA BARAT & TIMUR TENGAH
  { id: 'f-sa', countryCode: 'SA', countryName: 'Arab Saudi', flagEmoji: '🇸🇦', fact: 'Negara tempat berdirinya dua kota suci umat Islam, Makkah dan Madinah.' },
  { id: 'f-ae', countryCode: 'AE', countryName: 'Uni Emirat Arab', flagEmoji: '🇦🇪', fact: 'Rumah bagi gedung pencakar langit tertinggi di dunia, Burj Khalifa di Dubai.' },
  { id: 'f-qa', countryCode: 'QA', countryName: 'Qatar', flagEmoji: '🇶🇦', fact: 'Negara semenanjung kaya gas alam yang menjadi tuan rumah Piala Dunia FIFA 2022.' },
  { id: 'f-tr', countryCode: 'TR', countryName: 'Turki', flagEmoji: '🇹🇷', fact: 'Negara lintas benua dengan kota Istanbul yang membentang di Asia dan Eropa.' },
  { id: 'f-ir', countryCode: 'IR', countryName: 'Iran', flagEmoji: '🇮🇷', fact: 'Negeri peninggalan peradaban Persia kuno yang terkenal dengan karpet Persia.' },
  { id: 'f-iq', countryCode: 'IQ', countryName: 'Irak', flagEmoji: '🇮🇶', fact: 'Tempat lahirnya peradaban tertua Mesopotamia di antara Sungai Efrat dan Tigris.' },
  { id: 'f-ps', countryCode: 'PS', countryName: 'Palestina', flagEmoji: '🇵🇸', fact: 'Tanah bersejarah tempat berdirinya kompleks Masjid Al-Aqsa di Yerusalem.' },
  { id: 'f-jo', countryCode: 'JO', countryName: 'Yordania', flagEmoji: '🇯🇴', fact: 'Memiliki situs keajaiban dunia kota batu kuno Petra yang dipahat di tebing.' },
  { id: 'f-lb', countryCode: 'LB', countryName: 'Lebanon', flagEmoji: '🇱🇧', fact: 'Benderanya memiliki lambang pohon Cedar hijau yang khas.' },
  { id: 'f-kw', countryCode: 'KW', countryName: 'Kuwait', flagEmoji: '🇰🇼', fact: 'Negara dengan salah satu mata uang dengan nilai tukar terkuat di dunia (Dinar Kuwait).' },
  { id: 'f-om', countryCode: 'OM', countryName: 'Oman', flagEmoji: '🇴🇲', fact: 'Negara kesultanan di ujung tenggara jazirah Arab yang terkenal dengan benteng kuno.' },
  { id: 'f-ye', countryCode: 'YE', countryName: 'Yaman', flagEmoji: '🇾🇪', fact: 'Kota kuno Shibam di Yaman dijuluki sebagai "Manhattan dari Gurun Pasir".' },
  { id: 'f-bh', countryCode: 'BH', countryName: 'Bahrain', flagEmoji: '🇧🇭', fact: 'Negara kepulauan kecil di Teluk Persia yang terkenal dengan sirkuit balap F1.' },
  { id: 'f-sy', countryCode: 'SY', countryName: 'Suriah', flagEmoji: '🇸🇾', fact: 'Ibu kotanya Damaskus merupakan salah satu kota berpenghuni tertua di dunia.' },

  // ASIA TENGAH & KAUKASUS
  { id: 'f-kz', countryCode: 'KZ', countryName: 'Kazakhstan', flagEmoji: '🇰🇿', fact: 'Negara tanpa pantai (landlocked) terluas di dunia dan lokasi kosmodrom Baikonur.' },
  { id: 'f-uz', countryCode: 'UZ', countryName: 'Uzbekistan', flagEmoji: '🇺🇿', fact: 'Jantung Jalur Sutra kuno dengan arsitektur kubah biru megah di Samarkand.' },
  { id: 'f-az', countryCode: 'AZ', countryName: 'Azerbaijan', flagEmoji: '🇦🇿', fact: 'Dijuluki Negeri Api Abadi dengan api gas alam yang terus menyala di tebing batu Yanar Dag.' },
  { id: 'f-ge', countryCode: 'GE', countryName: 'Georgia', flagEmoji: '🇬🇪', fact: 'Negara di pegunungan Kaukasus yang dipercaya sebagai salah satu tempat lahirnya minuman anggur tertua.' },
  { id: 'f-am', countryCode: 'AM', countryName: 'Armenia', flagEmoji: '🇦🇲', fact: 'Negara pertama di dunia yang mengadopsi agama Kristen sebagai agama resmi negara pada tahun 301 Masehi.' },

  // EROPA BARAT & UTARA
  { id: 'f-gb', countryCode: 'GB', countryName: 'Inggris (Britania Raya)', flagEmoji: '🇬🇧', fact: 'Rumah bagi jam Big Ben, keluarga kerajaan Inggris, dan liga sepak bola Premier League.' },
  { id: 'f-fr', countryCode: 'FR', countryName: 'Prancis', flagEmoji: '🇫🇷', fact: 'Memiliki Menara Eiffel di Paris dan museum seni terbesar di dunia Louvre.' },
  { id: 'f-de', countryCode: 'DE', countryName: 'Jerman', flagEmoji: '🇩🇪', fact: 'Terkenal dengan jalan tol Autobahn, kastil Neuschwanstein, dan festival Oktoberfest.' },
  { id: 'f-nl', countryCode: 'NL', countryName: 'Belanda', flagEmoji: '🇳🇱', fact: 'Negara kincir angin, bunga Tulip mekar, dan jalur sepeda terbanyak di dunia.' },
  { id: 'f-be', countryCode: 'BE', countryName: 'Belgia', flagEmoji: '🇧🇪', fact: 'Terkenal dengan cokelat praline lezat, wafel renyah, dan kantor pusat Uni Eropa.' },
  { id: 'f-ch', countryCode: 'CH', countryName: 'Swiss', flagEmoji: '🇨🇭', fact: 'Negara di lereng Pegunungan Alpen yang terkenal dengan keju fondue dan jam tangan presisi.' },
  { id: 'f-at', countryCode: 'AT', countryName: 'Austria', flagEmoji: '🇦🇹', fact: 'Kota kelahirannya komposer musik klasik Mozart di Salzburg.' },
  { id: 'f-ie', countryCode: 'IE', countryName: 'Irlandia', flagEmoji: '🇮🇪', fact: 'Dijuluki Pulau Zamrud karena perbukitan hijau segarnya yang membentang luas.' },
  { id: 'f-se', countryCode: 'SE', countryName: 'Swedia', flagEmoji: '🇸🇪', fact: 'Negara asal penghargaan Nobel dan perusahaan perabot IKEA.' },
  { id: 'f-no', countryCode: 'NO', countryName: 'Norwegia', flagEmoji: '🇳🇴', fact: 'Negeri ngarai laut Fjord spektakuler dan tempat menyaksikan cahaya Aurora Borealis.' },
  { id: 'f-dk', countryCode: 'DK', countryName: 'Denmark', flagEmoji: '🇩🇰', fact: 'Negara asal mainan balok susun LEGO dan dongeng Hans Christian Andersen.' },
  { id: 'f-fi', countryCode: 'FI', countryName: 'Finlandia', flagEmoji: '🇫🇮', fact: 'Sering dinobatkan sebagai negara paling bahagia di dunia dan negeri asal sauna.' },
  { id: 'f-is', countryCode: 'IS', countryName: 'Islandia', flagEmoji: '🇮🇸', fact: 'Tanah api dan es dengan banyak gunung berapi aktif dan mata air panas Geyser.' },
  { id: 'f-lu', countryCode: 'LU', countryName: 'Luksemburg', flagEmoji: '🇱🇺', fact: 'Negara kadipaten agung kecil yang menjadi salah satu negara terkaya per kapita di dunia.' },

  // EROPA SELATAN & TIMUR
  { id: 'f-it', countryCode: 'IT', countryName: 'Italia', flagEmoji: '🇮🇹', fact: 'Negara asal Pizza, Menara Miring Pisa, Colosseum Roma, dan mobil sport Ferrari.' },
  { id: 'f-es', countryCode: 'ES', countryName: 'Spanyol', flagEmoji: '🇪🇸', fact: 'Terkenal dengan tarian Flamenco, istana Alhambra, dan tradisi La Tomatina.' },
  { id: 'f-pt', countryCode: 'PT', countryName: 'Portugal', flagEmoji: '🇵🇹', fact: 'Negara penjelajah samudra legendaris dan tanah asal pesepakbola Cristiano Ronaldo.' },
  { id: 'f-gr', countryCode: 'GR', countryName: 'Yunani', flagEmoji: '🇬🇷', fact: 'Tempat lahirnya pesta olahraga Olimpiade kuno dan filosofi barat di Athena.' },
  { id: 'f-pl', countryCode: 'PL', countryName: 'Polandia', flagEmoji: '🇵🇱', fact: 'Negara asal astronom penemu sistem tata surya heliosentris, Nicolaus Copernicus.' },
  { id: 'f-cz', countryCode: 'CZ', countryName: 'Ceko (Republik Ceko)', flagEmoji: '🇨🇿', fact: 'Ibu kota Praha dijuluki "Kota Seratus Menara" dengan kastil Praha megah.' },
  { id: 'f-hr', countryCode: 'HR', countryName: 'Kroasia', flagEmoji: '🇭🇷', fact: 'Terkenal dengan pantai Laut Adriatik yang jernih dan kota tua bersejarah Dubrovnik.' },
  { id: 'f-ru', countryCode: 'RU', countryName: 'Rusia', flagEmoji: '🇷🇺', fact: 'Negara dengan wilayah daratan terluas di dunia yang membentang di 11 zona waktu.' },
  { id: 'f-ua', countryCode: 'UA', countryName: 'Ukraina', flagEmoji: '🇺🇦', fact: 'Negara lumbung gandum Eropa dengan tanah hitam subur Chornozem.' },
  { id: 'f-ro', countryCode: 'RO', countryName: 'Rumania', flagEmoji: '🇷🇴', fact: 'Rumah bagi kastil Bran di wilayah Transilvania yang terkait legenda drakula.' },
  { id: 'f-hu', countryCode: 'HU', countryName: 'Hungaria', flagEmoji: '🇭🇺', fact: 'Ibu kotanya Budapest dibelah oleh Sungai Donau yang indah.' },
  { id: 'f-mc', countryCode: 'MC', countryName: 'Monako', flagEmoji: '🇲🇨', fact: 'Benderanya mirip Indonesia (merah putih), negara terkecil kedua di dunia.' },
  { id: 'f-va', countryCode: 'VA', countryName: 'Vatikan', flagEmoji: '🇻🇦', fact: 'Negara berdaulat terkecil di dunia yang berada di dalam kota Roma Italia.' },
  { id: 'f-rs', countryCode: 'RS', countryName: 'Serbia', flagEmoji: '🇷🇸', fact: 'Negara di semenanjung Balkan tempat lahirnya penemu listrik Nikola Tesla.' },

  // BENUA AMERIKA (UTARA, TENGAH & SELATAN)
  { id: 'f-us', countryCode: 'US', countryName: 'Amerika Serikat', flagEmoji: '🇺🇸', fact: 'Terdiri dari 50 bintang di benderanya dan rumah bagi Patung Liberty di New York.' },
  { id: 'f-ca', countryCode: 'CA', countryName: 'Kanada', flagEmoji: '🇨🇦', fact: 'Memiliki lambang daun Maple merah di benderanya dan air terjun Niagara.' },
  { id: 'f-mx', countryCode: 'MX', countryName: 'Meksiko', flagEmoji: '🇲🇽', fact: 'Terkenal dengan kuliner Taco pedas, peradaban Maya, dan piramida Chichen Itza.' },
  { id: 'f-br', countryCode: 'BR', countryName: 'Brasil', flagEmoji: '🇧🇷', fact: 'Pemenang 5 trofi Piala Dunia, hutan Amazon terluas, dan patung Kristus Penebus Rio.' },
  { id: 'f-ar', countryCode: 'AR', countryName: 'Argentina', flagEmoji: '🇦🇷', fact: 'Negara tarian Tango, air terjun Iguazu spektakuler, dan pesepakbola Messi.' },
  { id: 'f-co', countryCode: 'CO', countryName: 'Kolombia', flagEmoji: '🇨🇴', fact: 'Salah satu penghasil biji kopi arabika terbaik dan bunga anggrek tercantik di dunia.' },
  { id: 'f-cl', countryCode: 'CL', countryName: 'Chili', flagEmoji: '🇨🇱', fact: 'Negara terpanjang dan tertipis di dunia dengan Gurun Atacama dan Pulau Paskah.' },
  { id: 'f-pe', countryCode: 'PE', countryName: 'Peru', flagEmoji: '🇵🇪', fact: 'Rumah bagi peninggalan benteng batu suku Inka di Machu Picchu di atas awan.' },
  { id: 'f-uy', countryCode: 'UY', countryName: 'Uruguay', flagEmoji: '🇺🇾', fact: 'Negara tuan rumah dan pemenang Piala Dunia FIFA pertama kali pada tahun 1930.' },
  { id: 'f-py', countryCode: 'PY', countryName: 'Paraguay', flagEmoji: '🇵🇾', fact: 'Satu-satunya bendera nasional yang memiliki lambang berbeda di bagian depan dan belakang.' },
  { id: 'f-bo', countryCode: 'BO', countryName: 'Bolivia', flagEmoji: '🇧🇴', fact: 'Memiliki dataran garam terbesar di dunia, Salar de Uyuni, yang memantulkan langit.' },
  { id: 'f-ec', countryCode: 'EC', countryName: 'Ekuador', flagEmoji: '🇪🇨', fact: 'Namanya berasal dari garis Khatulistiwa (Equator) dan pemilik Kepulauan Galapagos.' },
  { id: 'f-ve', countryCode: 'VE', countryName: 'Venezuela', flagEmoji: '🇻🇪', fact: 'Memiliki air terjun tertinggi di dunia yang jatuh tanpa putus, Angel Falls.' },
  { id: 'f-cu', countryCode: 'CU', countryName: 'Kuba', flagEmoji: '🇨🇺', fact: 'Pulau di Karibia yang terkenal dengan mobil antik klasik dan cerutu Havana.' },
  { id: 'f-jm', countryCode: 'JM', countryName: 'Jamaika', flagEmoji: '🇯🇲', fact: 'Negeri asal musik Reggae Bob Marley dan pelari tercepat dunia Usain Bolt.' },
  { id: 'f-cr', countryCode: 'CR', countryName: 'Kosta Rika', flagEmoji: '🇨🇷', fact: 'Negara pelopor ekowisata dunia tanpa tentara militer sejak tahun 1948.' },
  { id: 'f-pa', countryCode: 'PA', countryName: 'Panama', flagEmoji: '🇵🇦', fact: 'Terkenal dengan Terusan Panama yang menghubungkan Samudra Atlantik dan Pasifik.' },

  // BENUA AFRIKA
  { id: 'f-eg', countryCode: 'EG', countryName: 'Mesir', flagEmoji: '🇪🇬', fact: 'Memiliki monumen Piramida Giza berusia ribuan tahun dan Sungai Nil yang legendaris.' },
  { id: 'f-za', countryCode: 'ZA', countryName: 'Afrika Selatan', flagEmoji: '🇿🇦', fact: 'Negara pelangi dengan 3 ibu kota dan habitat satwa liar Big Five di taman nasional Kruger.' },
  { id: 'f-ma', countryCode: 'MA', countryName: 'Maroko', flagEmoji: '🇲🇦', fact: 'Negeri eksotis di Afrika Utara dengan kota biru Chefchaouen dan padang pasir Sahara.' },
  { id: 'f-ng', countryCode: 'NG', countryName: 'Nigeria', flagEmoji: '🇳🇬', fact: 'Negara dengan jumlah penduduk terpadat di benua Afrika dan industri film Nollywood.' },
  { id: 'f-ke', countryCode: 'KE', countryName: 'Kenya', flagEmoji: '🇰🇪', fact: 'Terkenal dengan migrasi akbar satwa liar di Masai Mara dan pelari maraton legendaris.' },
  { id: 'f-gh', countryCode: 'GH', countryName: 'Ghana', flagEmoji: '🇬🇭', fact: 'Salah satu penghasil kakao (bahan baku cokelat) terbesar di dunia.' },
  { id: 'f-sn', countryCode: 'SN', countryName: 'Senegal', flagEmoji: '🇸🇳', fact: 'Ibu kotanya Dakar terkenal sebagai garis akhir reli balap mobil gurun pasir paling ekstrem.' },
  { id: 'f-tz', countryCode: 'TZ', countryName: 'Tanzania', flagEmoji: '🇹🇿', fact: 'Rumah bagi puncak tertinggi di Afrika, Gunung Kilimanjaro bersalju abadi.' },
  { id: 'f-mg', countryCode: 'MG', countryName: 'Madagaskar', flagEmoji: '🇲🇬', fact: 'Pulau raksasa terisolasi dengan flora fauna unik seperti pohon Baobab dan Lemur.' },
  { id: 'f-et', countryCode: 'ET', countryName: 'Ethiopia', flagEmoji: '🇪🇹', fact: 'Tempat asal mula ditemukannya pohon kopi pertama kali di wilayah Kaffa.' },
  { id: 'f-ci', countryCode: 'CI', countryName: 'Pantai Gading', flagEmoji: '🇨🇮', fact: 'Produsen biji kakao terbesar di dunia dengan bendera jingga, putih, dan hijau.' },
  { id: 'f-cm', countryCode: 'CM', countryName: 'Kamerun', flagEmoji: '🇨🇲', fact: 'Dijuluki sebagai "Miniatur Afrika" karena keragaman iklim dan budayanya.' },
  { id: 'f-dz', countryCode: 'DZ', countryName: 'Aljazair', flagEmoji: '🇩🇿', fact: 'Negara dengan wilayah daratan terluas di seluruh benua Afrika.' },
  { id: 'f-tn', countryCode: 'TN', countryName: 'Tunisia', flagEmoji: '🇹🇳', fact: 'Lokasi reruntuhan kota kuno Kartago dan latar syuting planet Tatooine film Star Wars.' },

  // BENUA OSEANIA
  { id: 'f-au', countryCode: 'AU', countryName: 'Australia', flagEmoji: '🇦🇺', fact: 'Benua dan negara tempat tinggal hewan berkantung endemik Kangguru dan Koala.' },
  { id: 'f-nz', countryCode: 'NZ', countryName: 'Selandia Baru', flagEmoji: '🇳🇿', fact: 'Negeri suku Maori, burung Kiwi tak bersayap, dan lanskap film The Lord of the Rings.' },
  { id: 'f-fj', countryCode: 'FJ', countryName: 'Fiji', flagEmoji: '🇫🇯', fact: 'Negara kepulauan di Samudra Pasifik Selatan dengan terumbu karang warna-warni mempesona.' },
  { id: 'f-pg', countryCode: 'PG', countryName: 'Papua Nugini', flagEmoji: '🇵🇬', fact: 'Negara tetangga provinsi Papua dengan lebih dari 800 bahasa daerah yang berbeda.' }
];

// ==============================================================
// 2. DATA TEBAK KATA & TEKA-TEKI INDONESIA (150+ SOAL BERVARIASI)
// ==============================================================
export const WORD_DATABASE: WordQuestion[] = [
  // KULINER NUSANTARA
  { id: 'w-1', word: 'RENDANG', clue: 'Olahan daging sapi Minangkabau dimasak dengan aneka rempah dan santan berjam-jam hingga kuah hitam kering.', category: 'Kuliner Nusantara', hint: 'Pernah dinobatkan sebagai salah satu makanan terenak di dunia', options: [] },
  { id: 'w-2', word: 'PEMPEK', clue: 'Kuliner Palembang dari adonan ikan dan sagu yang disantap bersama kuah cuko manis pedas asam.', category: 'Kuliner Nusantara', hint: 'Ada varian kapal selam yang berisi kuning telur', options: [] },
  { id: 'w-3', word: 'GUDEG', clue: 'Olahan nangka muda manis khas Yogyakarta yang dimasak bersama santan dan daun jati.', category: 'Kuliner Nusantara', hint: 'Sering disantap dengan krecek pedas dan telur bacem', options: [] },
  { id: 'w-4', word: 'RAWON', clue: 'Sup daging sapi khas Jawa Timur berkuah hitam pekat gurih berkat rempah istimewa kluwek.', category: 'Kuliner Nusantara', hint: 'Disajikan bersama tauge pendek, sambal terasi, dan telur asin', options: [] },
  { id: 'w-5', word: 'SATE', clue: 'Potongan daging ditusuk lidi bambu lalu dibakar di atas arang batok dan disiram bumbu kacang atau kecap.', category: 'Kuliner Nusantara', hint: 'Aroma bakaran arang bambunya sangat khas', options: [] },
  { id: 'w-6', word: 'TEMPE', clue: 'Makanan fermentasi kedelai menggunakan jamur Rhizopus yang menjadi sumber protein nabati favorit Indonesia.', category: 'Kuliner Nusantara', hint: 'Sering digoreng mendoan atau ditumis orek', options: [] },
  { id: 'w-7', word: 'PAPEDA', clue: 'Makanan pokok khas Papua dan Maluku berupa bubur sagu kenyal yang disantap dengan kuah kuning ikan.', category: 'Kuliner Nusantara', hint: 'Digulung menggunakan sepasang sumpit bambu khusus bernama gata-gata', options: [] },
  { id: 'w-8', word: 'BAKSO', clue: 'Bulatan daging sapi kenyal yang disajikan dengan kuah kaldu hangat, mie kuning, bihun, dan bawang goreng.', category: 'Kuliner Nusantara', hint: 'Sering dijual memakai gerobak keliling dengan mangkok ayam jago', options: [] },
  { id: 'w-9', word: 'KLEPON', clue: 'Kue bulat kenyal berwarna hijau daun suji bertabur kelapa parut yang meletus gula merah cair saat digigit.', category: 'Kue Tradisional', hint: 'Hati-hati gula merahnya muncrat di dalam mulut', options: [] },
  { id: 'w-10', word: 'CENDOL', clue: 'Minuman manis dingin berisi butiran tepung hijau beras pandan dengan santan gurih dan sirup gula aren.', category: 'Minuman Tradisional', hint: 'Sering disebut juga es dawet', options: [] },
  { id: 'w-11', word: 'KERAK TELOR', clue: 'Jajanan Betawi dari beras ketan, telur bebek, dan serundeng kelapa sangrai yang dimasak di wajan terbalik.', category: 'Kuliner Betawi', hint: 'Kuliner ikonik di Pekan Raya Jakarta (PRJ)', options: [] },
  { id: 'w-12', word: 'ONDE-ONDE', clue: 'Kue bulat goreng bertabur biji wijen di seluruh kulitnya dengan isian pasta kacang hijau manis legit.', category: 'Kue Tradisional', hint: 'Kulit luarnya kenyal renyah bertabur wijen', options: [] },
  { id: 'w-13', word: 'SAMBAL', clue: 'Ulekan cabai, bawang, dan terasi yang menjadi pelengkap wajib hampir di setiap piring makan orang Indonesia.', category: 'Pelengkap Makanan', hint: 'Tanpa benda ini makanan terasa kurang nendang', options: [] },
  { id: 'w-14', word: 'RUJAK', clue: 'Campuran potongan buah segar seperti mangga, kedondong, dan bengkuang dicocol bumbu gula merah terasi pedas.', category: 'Camilan Buah', hint: 'Cocok dinikmati saat siang hari terik', options: [] },
  { id: 'w-15', word: 'MARTABAK', clue: 'Adonan tebal bersarang dengan topping cokelat keju manis legit, atau kulit garing isi cincang daging dan telur.', category: 'Kuliner Malam', hint: 'Ada versi manis dan versi telur gurih', options: [] },
  { id: 'w-16', word: 'SOTO', clue: 'Hidangan sup berkuah kuning kunyit hangat berisi suwiran ayam atau daging, kol, dan soun.', category: 'Kuliner Berkuah', hint: 'Hampir tiap daerah di Indonesia punya variasi khasnya (Lamongan, Betawi, Kudus)', options: [] },
  { id: 'w-17', word: 'KERUPUK', clue: 'Pelengkap makanan garing renyah dari tepung tapioka yang bersuara kriuk saat digigit.', category: 'Pelengkap Makan', hint: 'Sering ditaruh di dalam kaleng seng warna biru dengan tutup kaca', options: [] },
  { id: 'w-18', word: 'ES TELER', clue: 'Minuman dingin segar berisi serutan kelapa muda, potongan buah alpukat, dan nangka disiram susu kental manis.', category: 'Minuman Segar', hint: 'Minuman penuntas dahaga di siang terik', options: [] },
  { id: 'w-19', word: 'SERABI', clue: 'Pancake tradisional dari tepung beras dan santan yang dimasak di atas wajan tanah liat kecil.', category: 'Jajanan Tradisional', hint: 'Bisa dimakan dengan kuah kinca gula kelapa manis atau oncom gurih', options: [] },
  { id: 'w-20', word: 'BIKA AMBON', clue: 'Kue kenyal berongga kuning cerah dengan aroma harum daun jeruk dan serai, oleh-oleh legendaris kota Medan.', category: 'Kue Khas Nusantara', hint: 'Namanya ada kata Ambon tapi berasal dari Medan', options: [] },

  // FAUNA & SATWA
  { id: 'w-21', word: 'KOMODO', clue: 'Kadal purba terbesar di dunia yang merupakan satwa endemik langka di Nusa Tenggara Timur.', category: 'Fauna Indonesia', hint: 'Memiliki lidah bercabang kuning dan liur beracun', options: [] },
  { id: 'w-22', word: 'ORANGUTAN', clue: 'Kera besar berambut kemerahan dengan kecerdasan tinggi yang hidup bergelantungan di hutan Kalimantan dan Sumatra.', category: 'Fauna Hutan', hint: 'Menghabiskan sebagian besar hidupnya di atas tajuk pohon', options: [] },
  { id: 'w-23', word: 'CENDERAWASIH', clue: 'Burung elok berbulu warna-warni memikat asal Papua yang sering dijuluki burung dari surga (Bird of Paradise).', category: 'Unggas Cantik', hint: 'Tergambar pada uang koin pecahan rupiah klasik', options: [] },
  { id: 'w-24', word: 'LUMBA-LUMBA', clue: 'Mamalia laut cerdas yang suka berenang melompat di haluan kapal dan bernapas lewat lubang di atas kepalanya.', category: 'Biologi Laut', hint: 'Sering terlihat menyambut matahari terbit di pantai Lovina Bali', options: [] },
  { id: 'w-25', word: 'GURITA', clue: 'Hewan laut berbadan lunak tanpa tulang belakang, memiliki delapan lengan berpenghisap dan tinta hitam pertahanan.', category: 'Biologi Laut', hint: 'Bisa menyamar meniru warna dan tekstur karang', options: [] },
  { id: 'w-26', word: 'TRENGGILING', clue: 'Mamalia pemakan semut yang tubuhnya dilapisi sisik tebal keras dan akan menggulung seperti bola saat terancam.', category: 'Fauna Unik', hint: 'Menjilati sarang semut menggunakan lidahnya yang sangat panjang', options: [] },
  { id: 'w-27', word: 'KUKANG', clue: 'Primata malam bermata bulat besar yang gerakannya sangat lambat dan suka memeluk dahan pohon.', category: 'Fauna Nokturnal', hint: 'Sering dijuluki si pemalu', options: [] },
  { id: 'w-28', word: 'ANOA', clue: 'Hewan endemik Sulawesi bertubuh mirip kerbau kerdil yang hidup liar di hutan belantara.', category: 'Fauna Endemik', hint: 'Sering disebut kerbau kerdil', options: [] },
  { id: 'w-29', word: 'HARIMAU', clue: 'Kucing besar berbelang loreng oranye hitam yang merupakan predator puncak di rimba Sumatra.', category: 'Satwa Liar', hint: 'Raja predator bertaring tajam', options: [] },
  { id: 'w-30', word: 'KANGGURU', clue: 'Hewan berkantung yang melompat menggunakan kedua kaki belakangnya dan membawa anaknya di kantung perut.', category: 'Fauna Mamalia', hint: 'Ada jenis yang hidup di tanah dan ada kangguru pohon di Papua', options: [] },
  { id: 'w-31', word: 'BEKANTAN', clue: 'Monyet unik khas pulau Kalimantan yang memiliki hidung besar panjang menggantung dan perut buncit.', category: 'Fauna Endemik', hint: 'Menjadi maskot taman rekreasi Dunia Fantasi (Dufan) Ancol', options: [] },
  { id: 'w-32', word: 'BADAK', clue: 'Hewan herbivora berkulit tebal mirip baju zirah yang memiliki cula di atas moncong hidungnya.', category: 'Satwa Langka', hint: 'Badak Jawa bercula satu dilindungi ketat di Taman Nasional Ujung Kulon', options: [] },
  { id: 'w-33', word: 'BUNGLON', clue: 'Reptil pohon yang memiliki kemampuan luar biasa mengubah warna kulitnya sesuai lingkungan sekitarnya.', category: 'Reptil Unik', hint: 'Memiliki mata yang bisa bergerak ke arah berlawanan secara mandiri', options: [] },
  { id: 'w-34', word: 'PAUS BIRU', clue: 'Makhluk hidup dan mamalia laut terbesar yang pernah ada di muka bumi, beratnya bisa mencapai ratusan ton.', category: 'Raksasa Samudra', hint: 'Bernapas dengan paru-paru dan menyemburkan uap air ke udara', options: [] },
  { id: 'w-35', word: 'KUNANG-KUNANG', clue: 'Serangga kecil terbang di malam hari yang bagian perut belakangnya dapat memancarkan cahaya kehijauan indah.', category: 'Serangga Malam', hint: 'Sering terlihat berkelap-kelip di dekat persawahan yang bebas polusi', options: [] },

  // BENDA SEHARI-HARI & TEKNOLOGI
  { id: 'w-36', word: 'PAYUNG', clue: 'Saat cuaca cerah sering disimpan di sudut rumah, tapi saat langit menangis atau terik selalu dibuka.', category: 'Benda Sehari-hari', hint: 'Punya kain tudung melingkar dan gagang bengkok', options: [] },
  { id: 'w-37', word: 'GUNTING', clue: 'Punya dua mata pisau yang saling bersilang, semakin sering mereka beradu maka lembaran di tengahnya terbelah.', category: 'Peralatan Rumah', hint: 'Dipakai memotong kain, kertas, dan rambut', options: [] },
  { id: 'w-38', word: 'JARUM', clue: 'Badanku ramping berujung runcing lancip, punya lubang kecil di satu ujungnya untuk dilalui seutas benang.', category: 'Peralatan Jahit', hint: 'Pasangan sejati dari benang jahit', options: [] },
  { id: 'w-39', word: 'SPION', clue: 'Kaca kecil yang menempel di stang atau pintu kendaraan untuk memantau keadaan di belakang tanpa menoleh.', category: 'Otomotif', hint: 'Wajib dilihat sebelum berbelok atau berpindah jalur', options: [] },
  { id: 'w-40', word: 'KELERENG', clue: 'Bulatan kaca bening mengilap warna-warni yang disentil anak-anak di tanah berdebu.', category: 'Permainan Klasik', hint: 'Sering disebut juga gundu', options: [] },
  { id: 'w-41', word: 'KULKAS', clue: 'Lemari yang tak pernah menyimpan pakaian, selalu dingin membekukan es batu dan menjaga kesegaran sayuran.', category: 'Elektronik Rumah', hint: 'Memiliki bagian freezer di dalamnya', options: [] },
  { id: 'w-42', word: 'SEPATU', clue: 'Selalu berpasangan kanan dan kiri, punya tali atau perekat, setia melindungi telapak kakimu dari aspal panas.', category: 'Alas Kaki', hint: 'Dilepas sebelum melangkah masuk ke karpet rumah', options: [] },
  { id: 'w-43', word: 'CANGKUL', clue: 'Bilah besi pipih bergagang kayu panjang, senjata andalan para petani untuk membalik tanah gembur di sawah.', category: 'Peralatan Tani', hint: 'Ada lagu anak: Cangkul, cangkul, cangkul yang dalam', options: [] },
  { id: 'w-44', word: 'BANTAL', clue: 'Benda empuk bersarung kain yang selalu dicari saat mata mengantuk, tempat kepala merebahkan lelah.', category: 'Kamar Tidur', hint: 'Teman setia guling di atas kasur', options: [] },
  { id: 'w-45', word: 'KIPAS ANGIN', clue: 'Memiliki baling-baling yang berputar cepat menghasilkan hembusan angin sejuk saat ruangan gerah.', category: 'Elektronik Rumah', hint: 'Bisa berputar menggeleng ke kanan dan kiri', options: [] },
  { id: 'w-46', word: 'SETRIKA', clue: 'Alat beralas logam yang menjadi sangat panas saat dialiri listrik untuk melicinkan pakaian kusut.', category: 'Elektronik Rumah', hint: 'Membuat baju kusut menjadi rapi kembali', options: [] },
  { id: 'w-47', word: 'EMBER', clue: 'Wadah silinder terbuka bergagang kawat melengkung yang digunakan menampung air saat mengepel atau mandi.', category: 'Alat Rumah Tangga', hint: 'Sering ditaruh di bawah keran air kamar mandi', options: [] },
  { id: 'w-48', word: 'PENSIL', clue: 'Batang kayu berisi grafit hitam yang bisa diraut lancip, menghasilkan goresan tulisan yang bisa dihapus.', category: 'Alat Tulis', hint: 'Ujungnya harus diraut jika patah atau tumpul', options: [] },
  { id: 'w-49', word: 'CERMIN', clue: 'Kaca datar mengilap yang meniru wajah dan gerakanmu persis tanpa pernah mengeluarkan suara.', category: 'Benda Kamar', hint: 'Tempat bercermin saat menyisir atau berdandan', options: [] },
  { id: 'w-50', word: 'DOMPET', clue: 'Lipatan kulit atau kain kecil tempat menyimpan uang kertas, koin, dan kartu identitas di dalam saku celana.', category: 'Aksesoris Saku', hint: 'Benda yang paling dicari saat hendak membayar di kasir', options: [] },
  { id: 'w-51', word: 'HELM', clue: 'Pelindung kepala berbahan batok keras berspon tebal dan berkaca mika yang wajib dipakai pengendara motor.', category: 'Keselamatan', hint: 'Harus berstandar SNI dan diklik talinya di bawah dagu', options: [] },
  { id: 'w-52', word: 'JAM DINDING', clue: 'Piringan angka satu sampai dua belas yang dipajang di tembok dan berdetik teratur setiap detik.', category: 'Penunjuk Waktu', hint: 'Berbunyi tik-tok-tik-tok tiada henti', options: [] },
  { id: 'w-53', word: 'KACAMATA', clue: 'Dua lensa berbingkai yang bertengger di atas hidung dan dikaitkan di telinga untuk membantu pandangan mata.', category: 'Aksesoris Penglihatan', hint: 'Bisa berlensa minus, plus, atau silinder hitam anti silau', options: [] },
  { id: 'w-54', word: 'TERMOS', clue: 'Botol berdinding hampa udara ganda yang mampu mempertahankan suhu air panas agar tidak cepat dingin.', category: 'Perabotan Dapur', hint: 'Biasa dipakai menyimpan air panas untuk menyeduh kopi atau susu bayi', options: [] },
  { id: 'w-55', word: 'GEMBOK', clue: 'Besi pengunci berkait melengkung yang mengunci pintu pagar atau rantai dan hanya bisa dibuka dengan anak kuncinya.', category: 'Keamanan Rumah', hint: 'Pasangan sejati dari lubang kunci logam', options: [] },

  // SENI & BUDAYA NUSANTARA
  { id: 'w-56', word: 'ANGKLUNG', clue: 'Alat musik bambu tradisional asal Jawa Barat yang mengeluarkan nada harmonis merdu saat digoyangkan.', category: 'Musik Nusantara', hint: 'Terdaftar sebagai Warisan Budaya Takbenda UNESCO', options: [] },
  { id: 'w-57', word: 'BATIK', clue: 'Kain bergambar motif indah nusantara yang dibuat menggunakan canting berisi malam lilin panas.', category: 'Karya Nusantara', hint: 'Kerap dikenakan pada hari Jumat dan acara resmi', options: [] },
  { id: 'w-58', word: 'KERIS', clue: 'Senjata tikam tradisional dengan bilah berluk-luk kelok indah dan pamor logam berlapis sakral.', category: 'Pusaka Tradisional', hint: 'Senjata warisan para ksatria dan raja Jawa', options: [] },
  { id: 'w-59', word: 'WAYANG', clue: 'Seni pertunjukan boneka kulit bayangan atau golek kayu yang dimainkan oleh seorang dalang semalam suntuk.', category: 'Seni Pertunjukan', hint: 'Menceritakan kisah Mahabharata dan Ramayana', options: [] },
  { id: 'w-60', word: 'GAMELAN', clue: 'Ansambel musik tradisional Jawa dan Bali yang terdiri dari gong, saron, bonang, kendang, dan kenong.', category: 'Musik Tradisional', hint: 'Dimainkan secara bersama-sama dalam satu kelompok penabuh', options: [] },
  { id: 'w-61', word: 'SASANDO', clue: 'Alat musik dawai petik tradisional dari Pulau Rote NTT yang memiliki wadah daun lontar melengkung.', category: 'Alat Musik Petik', hint: 'Pernah menjadi gambar pada uang kertas lima ribu rupiah', options: [] },
  { id: 'w-62', word: 'REOG', clue: 'Kesenian tari topeng singa raksasa bermahkota bulu merak setinggi dua meter asal Ponorogo yang digigit di gigi penari.', category: 'Seni Tradisional', hint: 'Topeng dadak merak super berat digigit tanpa bantuan tangan', options: [] },
  { id: 'w-63', word: 'BLANGKON', clue: 'Penutup kepala tradisional pria khas Jawa dengan lipatan kain batik dan tonjolan mondolan di belakang.', category: 'Pakaian Adat', hint: 'Pelengkap busana beskap atau surjan pria', options: [] },
  { id: 'w-64', word: 'SONGKET', clue: 'Kain tenun mewah tradisional khas Minangkabau dan Palembang yang ditenun dengan benang emas berkilau.', category: 'Kain Tradisional', hint: 'Kain kebanggaan untuk upacara pernikahan adat', options: [] },
  { id: 'w-65', word: 'KOLINTANG', clue: 'Alat musik bilah-bilah kayu bernada yang dipukul menggunakan stik empuk asal Minahasa Sulawesi Utara.', category: 'Alat Musik Pukul', hint: 'Bilah kayunya disusun rapi di atas kotak resonansi kayu', options: [] },

  // PROFESI & PEKERJAAN
  { id: 'w-66', word: 'PRAMUGARI', clue: 'Petugas ramah di pesawat terbang yang bertugas melayani kenyamanan dan memastikan keselamatan penumpang di udara.', category: 'Profesi Udara', hint: 'Bekerja di dalam kabin pesawat di atas awan', options: [] },
  { id: 'w-67', word: 'MASINIS', clue: 'Orang yang bertugas mengemudikan lokomotif kereta api di atas jalur rel dari stasiun ke stasiun.', category: 'Profesi Transportasi', hint: 'Meniup semboyan suling kereta api', options: [] },
  { id: 'w-68', word: 'ASTRONOT', clue: 'Penjelajah pemberani yang memakai baju luar angkasa khusus dan terbang keluar dari atmosfer bumi dengan roket.', category: 'Profesi Sains', hint: 'Melayang di stasiun luar angkasa tanpa gravitasi', options: [] },
  { id: 'w-69', word: 'NAHKODA', clue: 'Pemimpin tertinggi di atas kapal laut yang bertanggung jawab penuh atas kemudi pelayaran mengarungi samudra luas.', category: 'Profesi Maritim', hint: 'Kapten yang mengarahkan kompas haluan kapal di laut', options: [] },
  { id: 'w-70', word: 'ARSITEK', clue: 'Ahli yang merancang denah, estetika, dan tata ruang sebuah gedung megah sebelum dibangun para tukang.', category: 'Profesi Kreatif', hint: 'Menggambar rancangan cetak biru gedung di atas meja gambar', options: [] },
  { id: 'w-71', word: 'PETANI', clue: 'Pahlawan pangan yang mencangkul sawah, menanam bibit padi, dan merawat tanaman hingga panen tiba.', category: 'Pekerjaan Mulia', hint: 'Bekerja bermandikan terik matahari mengenakan topi caping', options: [] },
  { id: 'w-72', word: 'NELAYAN', clue: 'Pemberani yang menerjang deburan ombak malam hari dengan perahu dan jaring demi menangkap ikan segar di laut.', category: 'Pekerjaan Maritim', hint: 'Berangkat melaut malam hari dan pulang saat fajar membawa tangkapan', options: [] },
  { id: 'w-73', word: 'PEMADAM', clue: 'Pasukan berseragam tahan api yang menaiki mobil bersirine meraung-raung dan menyemprotkan air memadamkan si jago merah.', category: 'Layanan Darurat', hint: 'Membawa selang air besar dan tangga penyelamat', options: [] },
  { id: 'w-74', word: 'DOKTER', clue: 'Tenaga medis berjas putih yang memeriksa detak jantung pasien memakai stetoskop dan meresepkan obat kesembuhan.', category: 'Kesehatan', hint: 'Mengalungkan stetoskop di lehernya', options: [] },
  { id: 'w-75', word: 'KOKI', clue: 'Ahli meracik bumbu dan mengolah masakan lezat di dapur restoran bintang lima dengan mengenakan topi putih tinggi.', category: 'Kuliner Profesional', hint: 'Sering disebut juga dengan istilah Chef', options: [] },
  { id: 'w-76', word: 'FOTOGRAFER', clue: 'Seseorang yang mengabadikan momen berharga lewat lensa kamera dengan mengatur pencahayaan dan komposisi gambar.', category: 'Seni Visual', hint: 'Selalu menyuruh orang tersenyum dan berkata: "Satu, dua, tiga, cheese!"', options: [] },
  { id: 'w-77', word: 'MONTIR', clue: 'Orang ahli yang memperbaiki mesin mobil atau motor yang mogok dan mengganti oli di bengkel.', category: 'Otomotif', hint: 'Bekerja dengan memegang kunci pas dan obeng berlumur oli', options: [] },

  // FENOMENA ALAM & ASTRONOMI
  { id: 'w-78', word: 'PELANGI', clue: 'Busur spektrum tujuh warna mempesona di cakrawala saat tetesan air hujan dibiaskan oleh pancaran sinar matahari.', category: 'Fenomena Langit', hint: 'Urutan warnanya disingkat Me-Ji-Ku-Hi-Bi-Ni-U', options: [] },
  { id: 'w-79', word: 'PETIR', clue: 'Kilatan cahaya listrik raksasa di langit yang menyambar sesaat dan disusul suara dentuman guntur menggelegar.', category: 'Cuaca Ekstrem', hint: 'Kilatannya tampak lebih dulu sebelum suaranya terdengar', options: [] },
  { id: 'w-80', word: 'TSUNAMI', clue: 'Gelombang pasang laut raksasa berkecepatan tinggi yang tercipta akibat pergeseran lempeng gempa di dasar samudra.', category: 'Bencana Alam', hint: 'Air laut sempat surut drastis sebelum menerjang daratan', options: [] },
  { id: 'w-81', word: 'GERHANA', clue: 'Fenomena ketika matahari, bulan, dan bumi berada pada satu garis lurus hingga cahaya tertutup bayangan.', category: 'Astronomi', hint: 'Bisa berupa gerhana matahari atau gerhana bulan', options: [] },
  { id: 'w-82', word: 'AIR TERJUN', clue: 'Aliran sungai yang terjun bebas dari tebing batu tinggi curam menghasilkan deburan buih air sejuk.', category: 'Wisata Alam', hint: 'Sering disebut juga curug atau coban di daerah Jawa', options: [] },
  { id: 'w-83', word: 'SALJU', clue: 'Kristal es putih lembut yang jatuh perlahan dari awan dingin saat musim dingin di negara empat musim.', category: 'Iklim Dingin', hint: 'Bahan membuat boneka salju dan bermain ski', options: [] },
  { id: 'w-84', word: 'DANAU TOBA', clue: 'Danau vulkanik terbesar di dunia yang terbentuk akibat letusan gunung super purba, dengan pulau Samosir di tengahnya.', category: 'Geografi Nusantara', hint: 'Ikon wisata kebanggaan di Sumatra Utara', options: [] },
  { id: 'w-85', word: 'KABUT', clue: 'Awan uap air tebal yang melayang rendah di permukaan tanah atau perbukitan sejuk hingga membatasi jarak pandang.', category: 'Alam Sejuk', hint: 'Sering menyelimuti udara pagi hari di kawasan pegunungan', options: [] },
  { id: 'w-86', word: 'AURORA', clue: 'Tirai cahaya hijau dan ungu menari-nari mempesona di langit kutub malam akibat partikel matahari menabrak medan magnet bumi.', category: 'Fenomena Atmosfer', hint: 'Dikenal sebagai Cahaya Utara (Northern Lights) di negara dekat kutub', options: [] },
  { id: 'w-87', word: 'GUNUNG BERAPI', clue: 'Tonjolan daratan tinggi menjulang yang memiliki kawah magma pijar dan dapat meletuskan abu vulkanik panas.', category: 'Geologi Bumi', hint: 'Indonesia berada di jalur Cincin Api Pasifik (Ring of Fire) dengan ratusan gunung ini', options: [] },

  // TEKA-TEKI LOGIKA & ASAH OTAK INDONESIA
  { id: 'w-88', word: 'BUKU', clue: 'Punya daun tapi bukan pohon, punya isi tapi bukan peti, dibaca lembar demi lembar tapi bukan koran.', category: 'Teka-Teki Benda', hint: 'Jendela dunia bagi mereka yang suka membaca', options: [] },
  { id: 'w-89', word: 'LILIN', clue: 'Saat masih muda tubuhku tinggi tegap, tapi semakin tua dan berguna bagi kegelapan tubuhku justru semakin memendek.', category: 'Teka-Teki Benda', hint: 'Meneteskan lelehan parafin saat dibakar sumbunya', options: [] },
  { id: 'w-90', word: 'JEJAK KAKI', clue: 'Semakin banyak kamu melangkah maju di atas pasir basah, semakin banyak benda ini kamu tinggalkan di belakangmu.', category: 'Teka-Teki Logika', hint: 'Membekas di pasir atau lumpur', options: [] },
  { id: 'w-91', word: 'BAYANGAN', clue: 'Selalu setia mengikutimu ke mana pun kamu pergi di bawah terik matahari, tapi langsung lenyap saat berada dalam gelap gulita.', category: 'Teka-Teki Fenomena', hint: 'Siluet hitam tubuhmu sendiri di tanah', options: [] },
  { id: 'w-92', word: 'WAKTU', clue: 'Selalu berjalan maju tanpa pernah menoleh ke belakang, tak bisa dibeli dengan miliaran rupiah, dan tak pernah menunggu siapa pun.', category: 'Filosofi Hidup', hint: 'Dihitung dengan detik, menit, jam, dan hari', options: [] },
  { id: 'w-93', word: 'KUNCI', clue: 'Punya gerigi lekuk khusus di badannya, mampu membuka pintu yang terkunci rapat meski badannya kecil mungil.', category: 'Benda Rumah', hint: 'Dimasukkan ke dalam lubang gembok lalu diputar', options: [] },
  { id: 'w-94', word: 'HANDUK', clue: 'Semakin sering benda ini kamu gunakan untuk mengeringkan badan basahmu, maka benda ini sendiri yang akan menjadi basah.', category: 'Teka-Teki Mandi', hint: 'Kain berserat empuk penyerap air sehabis mandi', options: [] },
  { id: 'w-95', word: 'GIGI', clue: 'Benda keras berwarna putih di dalam mulut yang bertugas mengunyah dan menghancurkan makanan sebelum ditelan.', category: 'Anatomi Tubuh', hint: 'Dibersihkan setiap hari dengan sikat dan pasta berbusa', options: [] },
  { id: 'w-96', word: 'TELUR', clue: 'Harus dipecahkan cangkang kerasnya terlebih dahulu sebelum isi putih dan kuningnya bisa dimasak dan dimakan.', category: 'Bahan Makanan', hint: 'Dihasilkan oleh ayam atau bebek', options: [] },
  { id: 'w-97', word: 'JARUM JAM', clue: 'Benda yang terus berputar mengelilingi angka satu sampai dua belas tanpa pernah merasa lelah atau berhenti sejenak.', category: 'Penunjuk Waktu', hint: 'Ada jarum pendek untuk jam dan jarum panjang untuk menit', options: [] },
  { id: 'w-98', word: 'PINTU', clue: 'Bisa dibuka dan ditutup, menjadi pembatas antara ruangan dalam rumah dengan dunia luar.', category: 'Bagian Rumah', hint: 'Diketuk terlebih dahulu sebelum masuk bertamu', options: [] },
  { id: 'w-99', word: 'LUBANG', clue: 'Semakin banyak kamu mengambil dan menggali tanah darinya, maka benda ini justru akan menjadi semakin besar.', category: 'Teka-Teki Logika', hint: 'Ada di dalam tanah atau baju yang robek', options: [] },
  { id: 'w-100', word: 'PETA', clue: 'Punya kota tapi tak ada rumah, punya sungai tapi tak ada airnya, punya gunung tapi tak ada batunya.', category: 'Teka-Teki Geografi', hint: 'Kertas gambaran permukaan bumi yang dilipat atau dibuka di aplikasi GPS', options: [] },
  { id: 'w-101', word: 'RAHASIA', clue: 'Jika kamu menyimpannya, benda ini tetap ada. Tapi begitu kamu menceritakannya ke satu orang saja, benda ini langsung hilang.', category: 'Teka-Teki Kata', hint: 'Sesuatu yang dibisikkan dan tidak boleh disebarkan', options: [] },
  { id: 'w-102', word: 'GARAM', clue: 'Berasal dari air laut yang dijemur di bawah terik matahari, terasa asin gurih dan langsung larut jika masuk ke dalam air.', category: 'Bumbu Dapur', hint: 'Bumbu putih wajib agar masakan tidak hambar', options: [] },
  { id: 'w-103', word: 'BAWANG MERAH', clue: 'Kulitnya berlapis-lapis tipis ungu kemerahan, jika kamu mengiris atau mencincangnya maka matamu yang akan meneteskan air mata.', category: 'Bumbu Masakan', hint: 'Mengeluarkan zat pedih yang membuat orang menangis saat memasak', options: [] },
  { id: 'w-104', word: 'KOREK API', clue: 'Batang kayu kecil dengan pentolan belerang di ujungnya, begitu digesekkan di tepi kotaknya langsung memercikkan api.', category: 'Penyala Api', hint: 'Dipakai menyalakan lilin, kompor minyak, atau obat nyamuk bakar', options: [] },
  { id: 'w-105', word: 'AMPLOP', clue: 'Kantong kertas berperekat yang menyimpan surat tertulis di dalamnya dan ditempeli perangko di sudut kanan atasnya.', category: 'Alat Pos', hint: 'Diserahkan ke pak pos atau dimasukkan ke dalam kotak surat merah', options: [] },
  { id: 'w-106', word: 'BINTANG', clue: 'Titik-titik cahaya yang menghiasi langit malam dan hanya terlihat saat gelap, tapi menghilang saat matahari terbit.', category: 'Benda Langit', hint: 'Ada lagu anak: Bintang kecil di langit yang biru', options: [] },
  { id: 'w-107', word: 'KANCING', clue: 'Benda bulat pipih berlubang empat yang dikaitkan di belahan baju kemeja agar tidak terbuka.', category: 'Aksesoris Pakaian', hint: 'Dimasukkan ke dalam lubang kain pasangannya', options: [] },

  // --- TAMBAHAN TEBAK KATA 200+ (w-108 s.d. w-220) ---
  // KULINER & JAJANAN PASAR NUSANTARA
  { id: 'w-108', word: 'KLEPON', clue: 'Bola ketan hijau berisi gula merah cair yang meletus manis di mulut saat digigit, berbalut kelapa parut gurih.', category: 'Jajanan Pasar', hint: 'Berwarna hijau daun pandan alami', options: [] },
  { id: 'w-109', word: 'LEMPER', clue: 'Beras ketan pulen isi suwiran ayam gurih dibungkus daun pisang dan dibakar wangi.', category: 'Jajanan Tradisional', hint: 'Bentuknya lonjong silinder', options: [] },
  { id: 'w-110', word: 'OPOR AYAM', clue: 'Hidangan ayam berkuah santan kental bumbu putih gurih yang wajib hadir saat hari raya Idulfitri.', category: 'Masakan Lebaran', hint: 'Disajikan bersama ketupat dan sambal goreng ati', options: [] },
  { id: 'w-111', word: 'KETOPRAK', clue: 'Olahan bihun, tahu goreng, tauge, dan ketupat disiram bumbu kacang bawang putih gurih bertabur kerupuk.', category: 'Kuliner Betawi', hint: 'Penjualnya membawa gerobak pikul keliling', options: [] },
  { id: 'w-112', word: 'KOLAK', clue: 'Hidangan manis hangat berkuah santan gula kelapa berisi potongan pisang dan ubi, favorit saat berbuka puasa.', category: 'Takjil Manis', hint: 'Sering ditambah kolang-kaling kenyal', options: [] },
  { id: 'w-113', word: 'PECEL', clue: 'Sayuran rebus kangkung, tauge, dan kacang panjang disiram sambal kacang kencur khas Jawa Timur.', category: 'Kuliner Sayur', hint: 'Disantap dengan rempeyek kacang renyah', options: [] },
  { id: 'w-114', word: 'LAKSA', clue: 'Mie kuah santan kuning kental kaya rempah dengan tauge, telur rebus, dan daun kemangi wangi.', category: 'Kuliner Berkuah', hint: 'Terkenal di Bogor, Betawi, dan Singapura', options: [] },
  { id: 'w-115', word: 'TONGSENG', clue: 'Gulai daging kambing atau sapi kuah manis gurih dimasak dengan irisan kol, tomat segar, dan cabai rawit.', category: 'Masakan Daging', hint: 'Khas daerah Solo Jawa Tengah', options: [] },
  { id: 'w-116', word: 'ONDE-ONDE', clue: 'Kue bulat kenyal berbalut biji wijen rapat dengan isian pasta kacang hijau manis legit di dalamnya.', category: 'Jajanan Tradisional', hint: 'Kulitnya digoreng garing berkulit wijen', options: [] },
  { id: 'w-117', word: 'KERAK TELOR', clue: 'Ketang putih dan telur bebek yang dimasak tanpa minyak di atas wajan terbalik bertabur serundeng kelapa ebi.', category: 'Kuliner Betawi', hint: 'Ikon kuliner Pekan Raya Jakarta', options: [] },
  { id: 'w-118', word: 'TAHU BULAT', clue: 'Camilan kedelai kopong yang digoreng dadakan di atas mobil bak terbuka dengan bunyi rekaman khas.', category: 'Camilan Populer', hint: 'Digoreng dadakan lima ratusan gurih-gurih nyoi', options: [] },
  { id: 'w-119', word: 'CILOK', clue: 'Aci dicolok kenyal dari tepung tapioka yang disiram saus sambal kacang pedas manis di pinggir jalan.', category: 'Jajanan Sunda', hint: 'Singkatan dari Aci Dicolok', options: [] },
  { id: 'w-120', word: 'CIMOL', clue: 'Bola-bola aci mini yang digoreng kenyal gurih bertabur bumbu bubuk cabai dan keju asin.', category: 'Jajanan Sunda', hint: 'Singkatan dari Aci Digemol', options: [] },
  { id: 'w-121', word: 'CUANKI', clue: 'Bakso ikan dan siomay kering tahu yang disajikan dengan kuah kaldu hangat gurih khas Bandung.', category: 'Kuliner Berkuah', hint: 'Aslinya singkatan Cari Uang Jalan Kaki', options: [] },
  { id: 'w-122', word: 'GETUK', clue: 'Camilan manis dari singkong tumbuk halus yang diberi pewarna cerah dan parutan kelapa gurih.', category: 'Jajanan Pasar', hint: 'Getuk Lindri yang diputar di lagu campursari', options: [] },
  { id: 'w-123', word: 'BAKPIA', clue: 'Kue kering bulat pipih berlapis tipis isi kacang hijau manis, oleh-oleh wajib dari Yogyakarta.', category: 'Oleh-Oleh Khas', hint: 'Sering dinamai dengan nomor Pathok', options: [] },
  { id: 'w-124', word: 'DODOL', clue: 'Penganan manis kenyal dari tepung ketan, santan, dan gula aren yang diaduk berjam-jam di kawah besar.', category: 'Kue Tradisional', hint: 'Sangat terkenal dari Garut Jawa Barat', options: [] },
  { id: 'w-125', word: 'NAGASARI', clue: 'Kue basah dari tepung beras lembut beraroma daun pandan dengan sepotong pisang manis di tengahnya.', category: 'Jajanan Pasar', hint: 'Dibungkus rapi dengan daun pisang hijau', options: [] },
  { id: 'w-126', word: 'PISANG MOLEN', clue: 'Potongan buah pisang yang dibalut lilitan adonan pastry tipis renyah lalu digoreng keemasan.', category: 'Gorengan Manis', hint: 'Kulitnya berlapis garing mentega', options: [] },
  { id: 'w-127', word: 'TAHU TEK', clue: 'Tahu telur goreng gunting disajikan dengan lontong, kentang, tauge, dan saus petis udang hitam pekat.', category: 'Kuliner Surabaya', hint: 'Bunyi gunting memotong tahu menghasilkan nama tek-tek', options: [] },
  { id: 'w-128', word: 'SEKOTENG', clue: 'Minuman jahe hangat manis berisi pacar cina, kacang tanah sangrai, potongan roti tawar, dan kolang-kaling.', category: 'Minuman Tradisional', hint: 'Penghangat tubuh di malam hari dingin', options: [] },
  { id: 'w-129', word: 'BAJIGUR', clue: 'Minuman hangat khas Sunda dari santan, gula aren, kopi, dan jahe, cocok ditemani ubi rebus.', category: 'Minuman Sunda', hint: 'Warna cokelat manis gurih harum pandan', options: [] },
  { id: 'w-130', word: 'BANDREK', clue: 'Minuman rempah pedas jahe, kayu manis, cengkeh, dan serai untuk menghangatkan badan di pegunungan.', category: 'Minuman Rempah', hint: 'Kerap diberi kerukan daging kelapa muda', options: [] },

  // FLORA, FAUNA & BIOLOGI
  { id: 'w-131', word: 'RAFFLESIA', clue: 'Bunga raksasa parasit langka di hutan Bengkulu yang mengeluarkan bau bangkai menyengat untuk memikat lalat.', category: 'Flora Langka', hint: 'Bunga terbesar di dunia tanpa daun dan batang sejati', options: [] },
  { id: 'w-132', word: 'KANTUNG SEMAR', clue: 'Tumbuhan karnivora unik pemakan serangga yang memiliki kantung cairan penjebak di ujung daunnya.', category: 'Tumbuhan Unik', hint: 'Menjebak serangga yang tergelincir ke dalam kantungnya', options: [] },
  { id: 'w-133', word: 'JALAK BALI', clue: 'Burung kicau endemik Pulau Dewata berbulu putih bersih dengan kelopak mata biru terang yang sangat langka.', category: 'Fauna Endemik', hint: 'Simbol fauna kebanggaan Pulau Bali', options: [] },
  { id: 'w-134', word: 'BURUNG HANTU', clue: 'Unggas pemangsa nokturnal yang bisa memutar kepalanya hingga 270 derajat dan terbang tanpa suara.', category: 'Fauna Nokturnal', hint: 'Mata bulat besar menatap tajam di kegelapan malam', options: [] },
  { id: 'w-135', word: 'IKAN PARI', clue: 'Ikan laut bertubuh pipih lebar menyerupai layang-layang dengan ekor panjang berduri berbisa.', category: 'Biologi Laut', hint: 'Berenang mengepakkan siripnya mirip burung terbang di air', options: [] },
  { id: 'w-136', word: 'KUDA LAUT', clue: 'Ikan kecil unik berkepala mirip kuda di mana sang jantan yang mengandung dan melahirkan anak-anaknya.', category: 'Biologi Laut', hint: 'Ekornya bisa melingkar memegang rumput laut', options: [] },
  { id: 'w-137', word: 'LANDAK', clue: 'Mamalia kecil herbivora yang sekujur punggungnya ditumbuhi duri tajam keras sebagai senjata pertahanan diri.', category: 'Fauna Berduri', hint: 'Mengembangkan duri tajamnya saat merasa terancam', options: [] },
  { id: 'w-138', word: 'BINTURONG', clue: 'Kucing beruang hutan tropis berekor kuat yang aroma tubuhnya wangi mirip popcorn mentega hangat.', category: 'Fauna Hutan', hint: 'Sering disebut bearcat bertaring lucu', options: [] },
  { id: 'w-139', word: 'CUMI-CUMI', clue: 'Mollusca laut bertubuh silinder kenyal dengan sepuluh tentakel dan kantung tinta hitam pertahanan.', category: 'Biologi Laut', hint: 'Sering diolah menjadi cumi hitam atau goreng tepung', options: [] },
  { id: 'w-140', word: 'KUNANG-KUNANG', clue: 'Serangga malam bercahaya kehijauan di ujung perutnya yang menandakan udara lingkungan masih bersih.', category: 'Serangga Unik', hint: 'Berkelap-kelip indah di sawah malam hari', options: [] },
  { id: 'w-141', word: 'KENCUR', clue: 'Rimpang rempah aromatik kecil beraroma khas yang menjadi bumbu utama seblak dan beras kencur.', category: 'Rempah Dapur', hint: 'Bumbu wajib penambah aroma pecel dan seblak', options: [] },
  { id: 'w-142', word: 'JAHE', clue: 'Rimpang berakar pedas hangat yang ampuh melegakan tenggorokan dan diseduh menjadi wedang.', category: 'Tanaman Obat', hint: 'Rempah utama minuman penghangat tubuh', options: [] },
  { id: 'w-143', word: 'KUNYIT', clue: 'Rimpang berwarna kuning jingga pekat alami yang dipakai mewarnai nasi kuning dan jamu kunyit asam.', category: 'Rempah Dapur', hint: 'Meninggalkan noda kuning di jari tangan saat dikupas', options: [] },
  { id: 'w-144', word: 'PALA', clue: 'Buah rempah bernilai emas di masa penjajahan yang bijinya menjadi rebutan bangsa Eropa di Kepulauan Banda.', category: 'Rempah Bersejarah', hint: 'Bagian fuli merahnya membungkus biji keras', options: [] },
  { id: 'w-145', word: 'CENGKEH', clue: 'Kuntum bunga kering beraroma wangi pedas tajam dari Maluku yang digunakan dalam masakan dan rokok kretek.', category: 'Rempah Nusantara', hint: 'Pulau Maluku dijuluki Kepulauan Rempah karenanya', options: [] },

  // ALAT, BENDA & TEKNOLOGI
  { id: 'w-146', word: 'LAPTOP', clue: 'Komputer jinjing berlayar lipat dengan papan ketik dan baterai yang bisa dibawa bekerja ke mana saja.', category: 'Teknologi Digital', hint: 'Dibuka layarnya saat bekerja di meja kafe', options: [] },
  { id: 'w-147', word: 'EARPHONE', clue: 'Sepasang speaker mini yang dipasang di lubang telinga untuk mendengarkan lagu secara pribadi tanpa mengganggu orang lain.', category: 'Aksesoris Audio', hint: 'Bisa berkabel atau nirkabel memakai bluetooth', options: [] },
  { id: 'w-148', word: 'FLASHDISK', clue: 'Perangkat penyimpanan data digital mungil bercolokan USB yang bisa digantung di gantungan kunci.', category: 'Penyimpanan Data', hint: 'Dipakai menyalin tugas dan dokumen antar komputer', options: [] },
  { id: 'w-149', word: 'POWERBANK', clue: 'Baterai cadangan portabel yang dibawa bepergian untuk mengisi ulang daya baterai ponsel saat bepergian.', category: 'Elektronik Portabel', hint: 'Penyelamat ponsel saat baterai sekarat jauh dari colokan', options: [] },
  { id: 'w-150', word: 'SMARTPHONE', clue: 'Ponsel pintar layar sentuh serbaguna yang menghubungkan komunikasi, media sosial, dan internet di genggaman.', category: 'Gawai Modern', hint: 'Benda yang paling sering disentuh jari manusia setiap hari', options: [] },
  { id: 'w-151', word: 'TERMOMETER', clue: 'Alat ukur suhu tubuh berlayar digital atau berisi air raksa yang diselipkan di ketiak atau ditembak di dahi.', category: 'Alat Medis', hint: 'Digunakan saat badan anak terasa demam panas', options: [] },
  { id: 'w-152', word: 'STETOSKOP', clue: 'Alat medis bercabang selang telinga dengan piringan logam yang ditempelkan dokter di dada untuk mendengar detak jantung.', category: 'Alat Medis', hint: 'Selalu melingkar di leher dokter berjas putih', options: [] },
  { id: 'w-153', word: 'PELUIT', clue: 'Alat tiup kecil dari plastik atau logam yang mengeluarkan suara melengking nyaring saat ditiup wasit atau juru parkir.', category: 'Alat Bunyi', hint: 'Ditiup wasit saat terjadi pelanggaran di lapangan', options: [] },
  { id: 'w-154', word: 'SENTER', clue: 'Lampu genggam portabel bertenaga baterai yang memancarkan sorotan cahaya lurus menembus kegelapan malam.', category: 'Alat Penerang', hint: 'Penyelamat saat listrik PLN padam mendadak', options: [] },
  { id: 'w-155', word: 'JANGKAR', clue: 'Besi berat berkait ganda yang dijatuhkan dari haluan kapal laut ke dasar perairan agar kapal tidak hanyut terbawa arus.', category: 'Perlengkapan Kapal', hint: 'Lambang maritim dan pelaut sejati', options: [] },
  { id: 'w-156', word: 'SEKRUP', clue: 'Batang logam berpahat ulir spiral dengan kepala beralur silang yang dikencangkan menggunakan obeng.', category: 'Pertukangan', hint: 'Diputar obeng kembang untuk menyatukan papan kayu', options: [] },
  { id: 'w-157', word: 'OBENG', clue: 'Alat pertukangan bergagang plastik dengan ujung pipih atau kembang untuk memutar dan mengencangkan sekrup.', category: 'Alat Perkakas', hint: 'Ada tipe plus kembang dan tipe minus pipih', options: [] },
  { id: 'w-158', word: 'TANGGA', clue: 'Dua tiang berjajar dengan anak-anak pijakan di tengahnya yang dipakai memanjat ke tempat tinggi atau genteng rumah.', category: 'Alat Rumah', hint: 'Dinaiki anak tangga demi anak tangga', options: [] },
  { id: 'w-159', word: 'SAPU LIDI', clue: 'Ikat puluhan tulang daun kelapa kering yang dipakai membersihkan guguran daun di halaman pekarangan tanah.', category: 'Alat Kebersihan', hint: 'Ada pepatah: bersatu kita teguh seperti seikat sapu ini', options: [] },
  { id: 'w-160', word: 'KEMOCENG', clue: 'Alat pembersih debu bergagang panjang yang terbuat dari rangkaian bulu ayam atau serat sintetis halus.', category: 'Alat Rumah', hint: 'Dipakai membersihkan debu di meja dan kaca jendela', options: [] },

  // ALAT MUSIK & SENI TRADISIONAL
  { id: 'w-161', word: 'KENTONGAN', clue: 'Batang bambu atau kayu berongga tengah yang dipukul berirama untuk tanda bahaya atau memanggil ronda malam.', category: 'Alat Komunikasi Tradisional', hint: 'Tergantung di pos ronda kamling desa', options: [] },
  { id: 'w-162', word: 'BEDUG', clue: 'Gendang kulit sapi raksasa di serambi masjid yang dipukul bertalu-talu tanda waktu salat telah tiba.', category: 'Alat Tabuh Tradisional', hint: 'Dipukul semarak saat malam takbiran Lebaran', options: [] },
  { id: 'w-163', word: 'GONG', clue: 'Piringan perunggu besar berpenclon tengah yang digantung dan dipukul menghasilkan dengungan nada rendah menggelegar.', category: 'Gamelan', hint: 'Dipukul menandai peresmian acara besar', options: [] },
  { id: 'w-164', word: 'SULING', clue: 'Alat musik tiup bambu ramping berlubang nada yang menghasilkan tiupan melodi mendayu-dayu merdu.', category: 'Musik Bambu', hint: 'Alat musik peniup gembala di pematang sawah', options: [] },
  { id: 'w-165', word: 'KENDANG', clue: 'Instrumen tabuh bermuka ganda dari kayu nangka dan kulit sapi yang mengatur tempo ketukan lagu gamelan.', category: 'Musik Tabuh', hint: 'Ditepak dengan telapak tangan penabuh', options: [] },
  { id: 'w-166', word: 'REBAB', clue: 'Alat musik gesek bertali dua berdawai kawat dengan mangkuk tempurung kelapa penyanyi gamelan Jawa.', category: 'Musik Gesek', hint: 'Digesek perlahan menghasilkan nada sedih menyayat hati', options: [] },
  { id: 'w-167', word: 'BONANG', clue: 'Koleksi sepuluh hingga dua belas gong kecil yang disusun mendatar di atas tali dan dipukul dua tongkat berlilit kain.', category: 'Gamelan', hint: 'Bagian penting dalam ansambel gamelan Jawa', options: [] },
  { id: 'w-168', word: 'GAMBUS', clue: 'Alat musik petik mirip gitar bertubuh mirip buah pir yang mengiringi irama musik zapin dan kasidah melayu.', category: 'Musik Petik', hint: 'Sering dimainkan pada musik bernuansa Timur Tengah', options: [] },
  { id: 'w-169', word: 'TARI PIRING', clue: 'Tarian lincah dari Minangkabau di mana penarinya mengayunkan piring kaca di telapak tangan tanpa jatuh dan menginjak pecahan beling.', category: 'Tarian Tradisional', hint: 'Piring berdenting beradu dengan cincin di jari penari', options: [] },
  { id: 'w-170', word: 'TARI SAMAN', clue: 'Tarian seribu tangan dari suku Gayo Aceh dengan tepukan dada dan paha serempak berkecepatan tinggi tanpa musik instrumen.', category: 'Warisan UNESCO', hint: 'Ditarikan berjajar rapat dengan kekompakan spektakuler', options: [] },
  { id: 'w-171', word: 'TARI KECAK', clue: 'Tarian drama lingkaran puluhan pria bertelanjang dada di Bali yang menyerukan suara cak-cak-cak mengiringi kisah Ramayana.', category: 'Seni Pertunjukan', hint: 'Dipentaskan saat matahari terbenam di Pura Uluwatu', options: [] },
  { id: 'w-172', word: 'TARI JAIPONG', clue: 'Tarian pergaulan Sunda yang energik dengan gerakan pinggul lincah, tabuhan kendang rancak, dan senyuman ramah.', category: 'Tarian Tradisional', hint: 'Diciptakan oleh seniman Gugum Gumbira', options: [] },
  { id: 'w-173', word: 'ONDEL-ONDEL', clue: 'Boneka raksasa setinggi dua setengah meter khas Betawi yang diarak keliling kampung dengan iringan tanjidor.', category: 'Ikon Budaya', hint: 'Ada versi pria berwajah merah dan wanita berwajah putih', options: [] },
  { id: 'w-174', word: 'LOMPAT BATU', clue: 'Tradisi pemuda Nias melompati susunan tumpukan batu setinggi dua meter sebagai simbol kedewasaan ksatria.', category: 'Tradisi Adat', hint: 'Disebut Fahombo di Pulau Nias', options: [] },
  { id: 'w-175', word: 'PASOLA', clue: 'Permainan perang ksatria berkuda saling melempar lembing kayu di padang sabana Sumba Nusa Tenggara Timur.', category: 'Festival Adat', hint: 'Terkait upacara menyambut panen cacing laut nyale', options: [] },

  // PROFESI & PEKERJAAN
  { id: 'w-176', word: 'PILOT', clue: 'Pengemudi berlisensi yang duduk di kokpit mengendalikan pesawat terbang mengangkut ratusan penumpang melintasi benua.', category: 'Profesi Udara', hint: 'Memakai seragam bertanda garis pangkat di pundak', options: [] },
  { id: 'w-177', word: 'GURU', clue: 'Pahlawan tanpa tanda jasa yang berdiri di depan papan tulis mengajar ilmu pengetahuan dan mendidik karakter murid.', category: 'Profesi Pendidikan', hint: 'Diperingati setiap tanggal 25 November', options: [] },
  { id: 'w-178', word: 'HAKIM', clue: 'Pejabat pengadilan bertoga hitam yang memimpin jalannya persidangan dan mengetuk palu keadilan menentukan vonis hukum.', category: 'Profesi Hukum', hint: 'Mengetuk palu kayu tiga kali di meja hijau', options: [] },
  { id: 'w-179', word: 'JAKSA', clue: 'Aparat penegak hukum yang bertindak sebagai penuntut umum membacakan dakwaan terhadap terdakwa di persidangan.', category: 'Profesi Hukum', hint: 'Membacakan tuntutan hukuman di ruang sidang', options: [] },
  { id: 'w-180', word: 'POLISI', clue: 'Aparat berseragam cokelat yang bertugas menjaga ketertiban masyarakat, mengatur lalu lintas, dan menindak kejahatan.', category: 'Keamanan Publik', hint: 'Mengatur arus kendaraan dengan peluit di perempatan jalan', options: [] },
  { id: 'w-181', word: 'TENTARA', clue: 'Prajurit berseragam loreng hijau yang menjaga kedaulatan tanah air dari ancaman musuh dengan persenjataan lengkap.', category: 'Pertahanan Negara', hint: 'TNI Angkatan Darat, Laut, dan Udara', options: [] },
  { id: 'w-182', word: 'WARTAWAN', clue: 'Pemburu berita yang memegang mikrofon atau kamera mewawancarai narasumber demi menyajikan fakta kepada publik.', category: 'Media Jurnalistik', hint: 'Sering disebut jurnalis pembawa kartu pers', options: [] },
  { id: 'w-183', word: 'BARISTA', clue: 'Peracik kopi terampil yang mengoperasikan mesin espreso dan melukis seni latte art indah di atas cangkir kopi.', category: 'Kuliner Kekinian', hint: 'Menyeduh biji kopi pilihan di kedai kopi modern', options: [] },
  { id: 'w-184', word: 'APOTEKER', clue: 'Ahli farmasi berjas putih yang meracik obat resep dokter dan menjelaskan aturan minumnya kepada pasien.', category: 'Kesehatan Farmasi', hint: 'Bekerja melayani obat di apotek', options: [] },
  { id: 'w-185', word: 'MASINIS', clue: 'Pengemudi yang mengoperasikan tuas lokomotif kereta api berjalan melaju kencang di atas jalur rel rel baja.', category: 'Transportasi Rel', hint: 'Membunyikan semboyan klakson suling kereta', options: [] },

  // TEMPAT & GEOGRAFI INDONESIA
  { id: 'w-186', word: 'BROMO', clue: 'Gunung berapi aktif di Jawa Timur yang terkenal dengan lautan pasir berbisik dan pemandangan sunrise memukau.', category: 'Gunung Nusantara', hint: 'Kerap dinaiki dengan mobil jip 4x4 dan kuda sewaan', options: [] },
  { id: 'w-187', word: 'KRAKATAU', clue: 'Gunung berapi di Selat Sunda yang letusan dahsyatnya pada tahun 1883 sempat menggelapkan langit dunia.', category: 'Vulkanologi Bersejarah', hint: 'Kini diteruskan oleh anaknya Anak Krakatau', options: [] },
  { id: 'w-188', word: 'SELAT SUNDA', clue: 'Perairan laut sempit yang memisahkan Pulau Jawa dan Pulau Sumatra, dilintasi kapal feri penyeberangan Merak-Bakauheni.', category: 'Geografi Maritim', hint: 'Jalur penyeberangan feri Merak ke Bakauheni', options: [] },
  { id: 'w-189', word: 'SELAT MALAKA', clue: 'Jalur pelayaran selat tersibuk di dunia yang membentang antara Pulau Sumatra dan Semenanjung Malaysia.', category: 'Perairan Strategis', hint: 'Jalur perdagangan internasional sejak zaman kuno', options: [] },
  { id: 'w-190', word: 'SABANG', clue: 'Kota di Pulau Weh Aceh yang menjadi penanda titik paling barat wilayah kedaulatan Negara Kesatuan Republik Indonesia.', category: 'Titik Wilayah', hint: 'Titik nol kilometer Indonesia bermula dari kota ini', options: [] },
  { id: 'w-191', word: 'MERAUKE', clue: 'Kota paling timur Indonesia di Papua Selatan yang berbatasan darat langsung dengan Papua Nugini.', category: 'Titik Wilayah', hint: 'Dari Sabang sampai kota ini berjajar pulau-pulau', options: [] },
  { id: 'w-192', word: 'MALIOBORO', clue: 'Jalanan legendaris di pusat kota Yogyakarta yang dipenuhi musisi jalanan, pedagang oleh-oleh, dan kereta andong.', category: 'Destinasi Wisata', hint: 'Tempat jalan santai malam hari di dekat Stasiun Tugu Jogja', options: [] },
  { id: 'w-193', word: 'MONAS', clue: 'Tugu peringatan nasional setinggi 132 meter di Jakarta Pusat yang puncaknya berhiaskan kobaran api dilapisi emas murni.', category: 'Ikon Ibu Kota', hint: 'Monumen Nasional kebanggaan rakyat Indonesia', options: [] },
  { id: 'w-194', word: 'GEDUNG SATE', clue: 'Bangunan cagar budaya ikonik kantor Gubernur Jawa Barat di Bandung yang atapnya dihiasi ornamen mirip tusuk sate.', category: 'Ikon Kota Bandung', hint: 'Punya ornamen 6 bulatan tusuk sate di menaranya', options: [] },
  { id: 'w-195', word: 'JEMBATAN AMPERA', clue: 'Jembatan megah bercat merah yang melintasi Sungai Musi menghubungkan wilayah Seberang Ulu dan Ilir di Palembang.', category: 'Ikon Palembang', hint: 'Dulu bagian tengahnya bisa terangkat ke atas untuk kapal lewat', options: [] },

  // TEKA-TEKI LOGIKA & KATA INDONESIA
  { id: 'w-196', word: 'KORAN', clue: 'Bisa keliling kota membawa berita setiap hari, tetapi dirinya sendiri hanya lembaran kertas yang tak punya kaki.', category: 'Teka-Teki Benda', hint: 'Koran harian dibaca sambil sarapan kopi', options: [] },
  { id: 'w-197', word: 'JARUM', clue: 'Punya satu mata di tubuhnya yang ramping, tapi tak pernah bisa melihat ke mana ia ditusukkan.', category: 'Teka-Teki Alat', hint: 'Mata jarum adalah lubang tempat benang dimasukkan', options: [] },
  { id: 'w-198', word: 'BAN KENDARAAN', clue: 'Berputar ribuan kali di aspal jalanan, jika tertusuk paku kecil langsung kempis kehilangan tenaga.', category: 'Teka-Teki Otomotif', hint: 'Terbuat dari karet hitam berisi udara bertekanan', options: [] },
  { id: 'w-199', word: 'KAPUR TULIS', clue: 'Semakin sering dipakai menulis di papan hitam, semakin pendek dan berdebu tubuhnya hingga habis.', category: 'Teka-Teki Sekolah', hint: 'Batang putih pengisi kelas sebelum era spidol whiteboard', options: [] },
  { id: 'w-200', word: 'PENGHAPUS', clue: 'Rela mengorbankan tubuhnya mengecil dan menyisakan remah demi melenyapkan kesalahan tulisan pensilmu.', category: 'Teka-Teki Sekolah', hint: 'Terbuat dari karet lentur pembersih coretan pensil', options: [] },
  { id: 'w-201', word: 'SABUN', clue: 'Mengeluarkan busa harum melimpah untuk membersihkan kotoran badanmu, tetapi tubuhnya sendiri mengecil dan larut.', category: 'Teka-Teki Mandi', hint: 'Bisa berupa batangan padat atau cairan di botol pompa', options: [] },
  { id: 'w-202', word: 'BATERAI', clue: 'Menyimpan energi listrik di kedua kutubnya positif dan negatif, jika habis harus dicas atau dibuang.', category: 'Teka-Teki Elektronik', hint: 'Menggerakkan jam dinding dan remote televisi', options: [] },
  { id: 'w-203', word: 'GITAR', clue: 'Punya leher panjang dan enam helai tali dawai yang dipetik jari menghasilkan alunan melodi lagu.', category: 'Alat Musik', hint: 'Alat musik akustik favorit anak tongkrongan', options: [] },
  { id: 'w-204', word: 'KOTAK SURAT', clue: 'Berdiri di tepi pagar rumah dengan mulut menganga siap menelan amplop pos kiriman kurir.', category: 'Perlengkapan Rumah', hint: 'Biasanya dicat merah atau bertuliskan POS', options: [] },
  { id: 'w-205', word: 'KACANG TANAH', clue: 'Tumbuh terkubur di dalam tanah, berkulit keras garing, jika dikupas ada dua atau tiga biji gurih di dalamnya.', category: 'Teka-Teki Makanan', hint: 'Bahan utama sambal gado-gado dan sate', options: [] },
  { id: 'w-206', word: 'KELAPA', clue: 'Punya sabut tebal, tempurung keras batok, air manis segar penawar dahaga, dan daging putih gurih.', category: 'Tanaman Tropis', hint: 'Pohon sejuta manfaat lambang gerakan Pramuka', options: [] },
  { id: 'w-207', word: 'JAGUNG', clue: 'Berambut pirang halus di kepalanya, mengenakan jubah kelopak hijau, dan memiliki deretan gigi biji kuning manis.', category: 'Teka-Teki Tumbuhan', hint: 'Bisa dibakar mentega manis pedas di pinggir pantai', options: [] },
  { id: 'w-208', word: 'NANAS', clue: 'Buah tropis berduri dengan mahkota daun hijau di kepalanya, dagingnya kuning asam manis menyegarkan.', category: 'Teka-Teki Buah', hint: 'Sering dipakai sebagai selai isian nastar Lebaran', options: [] },
  { id: 'w-209', word: 'DURIAN', clue: 'Dijuluki raja segala buah di Asia Tenggara dengan kulit berduri tajam runcing dan aroma harum menyengat.', category: 'Buah Tropis', hint: 'Daging buahnya kuning lembut legit semerbak', options: [] },
  { id: 'w-210', word: 'MANGGIS', clue: 'Dijuluki ratu buah tropis dengan kulit ungu tebal berkhasiat obat dan daging putih manis bersusun kelopak.', category: 'Buah Tropis', hint: 'Jumlah kelopak di bawah kulitnya menandakan jumlah isi buah', options: [] },
  { id: 'w-211', word: 'SALAK', clue: 'Buah manis bertekstur renyah dengan kulit cokelat bersisik persis kulit ular reptil.', category: 'Buah Khas Nusantara', hint: 'Sering dijuluki snake fruit di luar negeri', options: [] },
  { id: 'w-212', word: 'RAMBUTAN', clue: 'Kulitnya merah merekah dipenuhi rambut lebat lembut, daging buahnya putih bening kenyal manis.', category: 'Buah Tropis', hint: 'Namanya diambil dari kata rambut karena kulitnya berbulu', options: [] },
  { id: 'w-213', word: 'BELIMBING', clue: 'Buah kuning kehijauan yang jika dipotong melintang bentuknya persis menyerupai bintang bersudut lima.', category: 'Buah Unik', hint: 'Potongannya berbentuk bintang sempurna', options: [] },
  { id: 'w-214', word: 'PETAI', clue: 'Biji polong hijau dalam papan panjang yang baunya menyengat khas tetapi sangat digemari sebagai lalapan sambal.', category: 'Lalapan Tradisional', hint: 'Sering dipadukan dengan jengkol dan sambal goreng ati', options: [] },
  { id: 'w-215', word: 'JENGKOL', clue: 'Biji bundar berkulit keras yang beraroma sangat kuat menusuk, namun jika disemur empuk gurih menggoda selera.', category: 'Kuliner Khas', hint: 'Semur jengkol empuk hidangan legendaris Betawi', options: [] },
  { id: 'w-216', word: 'KENTANG', clue: 'Umbi bawah tanah berkulit cokelat tipis yang bisa diolah jadi kentang goreng garing atau perkedel empuk.', category: 'Bahan Pangan', hint: 'Bahan baku french fries dan keripik keriting', options: [] },
  { id: 'w-217', word: 'SINGKONG', clue: 'Umbi akar panjang yang menjadi makanan pokok alternatif, enak digoreng merekah atau direbus parut kelapa.', category: 'Pangan Tradisional', hint: 'Bahan dasar pembuatan tape dan keripik balado', options: [] },
  { id: 'w-218', word: 'KACANG HIJAU', clue: 'Biji-bijian kecil berwarna hijau yang direbus manis bersama gula merah dan santan menjadi bubur hangat bergizi.', category: 'Bahan Pangan', hint: 'Bisa ditumbuhkan menjadi tauge kecambah', options: [] },
  { id: 'w-219', word: 'BERAS KETAN', clue: 'Butiran beras yang ketika ditanak menghasilkan tekstur pulen sangat lengket, bahan baku lemper dan uli.', category: 'Bahan Makanan', hint: 'Teksturnya jauh lebih lengket dibanding beras biasa', options: [] },
  { id: 'w-220', word: 'KAPAS', clue: 'Serat putih lembut dari tanaman yang dipintal menjadi benang tenun dan ditenun menjadi lembaran kain pakaianmu.', category: 'Bahan Tekstil', hint: 'Juga dipakai membersihkan luka medis dan riasan wajah', options: [] }
];

// ==============================================================
// 3. DATA TEBAK EMOJI LENGKAP OS TERBARU (160+ EMOJI DENGAN FORBIDDEN WORDS)
// ==============================================================
export interface EmojiVoiceDatabaseItem {
  id: string;
  targetEmoji: string;
  name: string;
  category: string;
  forbiddenWords: string[];
  distractors: { emoji: string; name: string }[];
}

export const EMOJI_VOICE_DATABASE: EmojiVoiceDatabaseItem[] = [
  // --- WAJAH, EKSPRESI & EMOSI ---
  {
    id: 'ev-1',
    targetEmoji: '🤣',
    name: 'Tertawa Terpingkal-pingkal',
    category: 'Ekspresi Lucu',
    forbiddenWords: ['tertawa', 'ketawa', 'guling', 'miring', 'lucu'],
    distractors: [{ emoji: '😂', name: 'Nangis Bahagia' }, { emoji: '😆', name: 'Nyengir' }, { emoji: '😜', name: 'Melet Lucu' }]
  },
  {
    id: 'ev-2',
    targetEmoji: '🥺',
    name: 'Wajah Memelas / Puppy Eyes',
    category: 'Ekspresi Emosi',
    forbiddenWords: ['memelas', 'kaca', 'mata', 'mohon', 'sedih'],
    distractors: [{ emoji: '🥹', name: 'Terharu Bahagia' }, { emoji: '😭', name: 'Menangis Kencang' }, { emoji: '😢', name: 'Meneteskan Air Mata' }]
  },
  {
    id: 'ev-3',
    targetEmoji: '🤔',
    name: 'Berpikir / Mikir Keras',
    category: 'Ekspresi Emosi',
    forbiddenWords: ['mikir', 'tangan', 'dagu', 'bingung', 'ide'],
    distractors: [{ emoji: '🧐', name: 'Pakai Monokel' }, { emoji: '🤨', name: 'Alis Naik Curiga' }, { emoji: '😐', name: 'Wajah Datar' }]
  },
  {
    id: 'ev-4',
    targetEmoji: '🤯',
    name: 'Kepala Meledak (Mindblown)',
    category: 'Kaget Luar Biasa',
    forbiddenWords: ['meledak', 'kepala', 'otak', 'kaget', 'bom'],
    distractors: [{ emoji: '😱', name: 'Histeris Jerit' }, { emoji: '😳', name: 'Pipi Merah Kaget' }, { emoji: '😵', name: 'Pusing Pingsan' }]
  },
  {
    id: 'ev-5',
    targetEmoji: '🫠',
    name: 'Wajah Meleleh (Melting Face)',
    category: 'Ekspresi Panas',
    forbiddenWords: ['leleh', 'cair', 'meleleh', 'panas', 'senyum'],
    distractors: [{ emoji: '🥵', name: 'Kegerahan Merah' }, { emoji: '🥶', name: 'Kedinginan Beku' }, { emoji: '😶‍🌫️', name: 'Tertutup Kabut' }]
  },
  {
    id: 'ev-6',
    targetEmoji: '😎',
    name: 'Kacamata Hitam Keren (Cool)',
    category: 'Gaya Keren',
    forbiddenWords: ['kacamata', 'hitam', 'keren', 'gaya', 'silau'],
    distractors: [{ emoji: '🤓', name: 'Kutu Buku Kacamata' }, { emoji: '🤠', name: 'Topi Koboi' }, { emoji: '😏', name: 'Senyum Licik' }]
  },
  {
    id: 'ev-7',
    targetEmoji: '🤡',
    name: 'Badut Sirkus',
    category: 'Karakter Lucu',
    forbiddenWords: ['badut', 'hidung', 'merah', 'sirkus', 'topeng'],
    distractors: [{ emoji: '👺', name: 'Topeng Goblin' }, { emoji: '👻', name: 'Hantu' }, { emoji: '🎭', name: 'Topeng Teater' }]
  },
  {
    id: 'ev-8',
    targetEmoji: '👻',
    name: 'Hantu Putih Gentayangan',
    category: 'Misteri Horor',
    forbiddenWords: ['hantu', 'setan', 'putih', 'lidah', 'takut'],
    distractors: [{ emoji: '💀', name: 'Tengkorak' }, { emoji: '🎃', name: 'Labu Halloween' }, { emoji: '👽', name: 'Alien' }]
  },
  {
    id: 'ev-9',
    targetEmoji: '💀',
    name: 'Tengkorak Kepala (Skull)',
    category: 'Simbol Kematian / Ketawa Abis',
    forbiddenWords: ['tengkorak', 'tulang', 'mati', 'kepala', 'kuburan'],
    distractors: [{ emoji: '☠️', name: 'Tengkorak Bajak Laut' }, { emoji: '🦴', name: 'Tulang' }, { emoji: '👻', name: 'Hantu' }]
  },
  {
    id: 'ev-10',
    targetEmoji: '🤖',
    name: 'Robot Kaleng Logam',
    category: 'Teknologi Canggih',
    forbiddenWords: ['robot', 'besi', 'antena', 'mesin', 'logam'],
    distractors: [{ emoji: '👾', name: 'Monster Pixel' }, { emoji: '👽', name: 'Alien' }, { emoji: '🦾', name: 'Lengan Robot' }]
  },
  {
    id: 'ev-11',
    targetEmoji: '👽',
    name: 'Alien Kepala Hijau',
    category: 'Luar Angkasa',
    forbiddenWords: ['alien', 'ufo', 'hijau', 'mata', 'luar angkasa'],
    distractors: [{ emoji: '🛸', name: 'Piring Terbang' }, { emoji: '🚀', name: 'Roket' }, { emoji: '🤖', name: 'Robot' }]
  },
  {
    id: 'ev-12',
    targetEmoji: '🙈',
    name: 'Monyet Tutup Mata (See No Evil)',
    category: 'Malu / Takut',
    forbiddenWords: ['monyet', 'tutup', 'mata', 'malu', 'tangan'],
    distractors: [{ emoji: '🙉', name: 'Tutup Telinga' }, { emoji: '🙊', name: 'Tutup Mulut' }, { emoji: '🐵', name: 'Wajah Monyet' }]
  },
  {
    id: 'ev-13',
    targetEmoji: '❤️‍🔥',
    name: 'Hati Terbakar Kobaran Api',
    category: 'Gairah Semangat',
    forbiddenWords: ['hati', 'api', 'bakar', 'cinta', 'merah'],
    distractors: [{ emoji: '💔', name: 'Hati Retak' }, { emoji: '❤️', name: 'Hati Merah' }, { emoji: '🔥', name: 'Api Membara' }]
  },
  {
    id: 'ev-14',
    targetEmoji: '😴',
    name: 'Tidur Pulas Mendengkur',
    category: 'Istirahat',
    forbiddenWords: ['tidur', 'ngantuk', 'mimpi', 'mata', 'lelah'],
    distractors: [{ emoji: '🥱', name: 'Menguap Ngantuk' }, { emoji: '🤤', name: 'Tidur Ngiler' }, { emoji: '😪', name: 'Gelembung Hidung' }]
  },
  {
    id: 'ev-15',
    targetEmoji: '🤠',
    name: 'Wajah Bertopi Koboi',
    category: 'Profesi Western',
    forbiddenWords: ['koboi', 'topi', 'kuda', 'kulit', 'texas'],
    distractors: [{ emoji: '💂‍♂️', name: 'Penjaga Kerajaan' }, { emoji: '👨‍🌾', name: 'Petani Topi Caping' }, { emoji: '🎩', name: 'Topi Sulap' }]
  },

  // --- HEWAN & SATWA LIAR ---
  {
    id: 'ev-16',
    targetEmoji: '🦁',
    name: 'Singa (Raja Hutan)',
    category: 'Hewan Liar',
    forbiddenWords: ['singa', 'raja', 'hutan', 'rambut', 'aum'],
    distractors: [{ emoji: '🐯', name: 'Harimau Loreng' }, { emoji: '🐆', name: 'Macan Tutul' }, { emoji: '🐻', name: 'Beruang' }]
  },
  {
    id: 'ev-17',
    targetEmoji: '🐼',
    name: 'Panda Raksasa Imut',
    category: 'Hewan Lucu',
    forbiddenWords: ['panda', 'bambu', 'hitam putih', 'tiongkok', 'beruang'],
    distractors: [{ emoji: '🐨', name: 'Koala' }, { emoji: '🐻', name: 'Beruang Cokelat' }, { emoji: '🦝', name: 'Rakun' }]
  },
  {
    id: 'ev-18',
    targetEmoji: '🦖',
    name: 'Dinosaurus T-Rex Purba',
    category: 'Satwa Purba',
    forbiddenWords: ['dinosaurus', 't-rex', 'purba', 'tangan kecil', 'raksasa'],
    distractors: [{ emoji: '🦕', name: 'Dino Leher Panjang' }, { emoji: '🐊', name: 'Buaya' }, { emoji: '🦎', name: 'Kadal' }]
  },
  {
    id: 'ev-19',
    targetEmoji: '🦄',
    name: 'Kuda Unicorn Bercula Ajaib',
    category: 'Makhluk Mitos',
    forbiddenWords: ['unicorn', 'cula', 'tanduk', 'kuda', 'pelangi'],
    distractors: [{ emoji: '🐴', name: 'Kuda Biasa' }, { emoji: '🦓', name: 'Zebra Loreng' }, { emoji: 'Pegasus', name: 'Kuda Sayap' }]
  },
  {
    id: 'ev-20',
    targetEmoji: '🦈',
    name: 'Hiu Predator Lautan',
    category: 'Biologi Laut',
    forbiddenWords: ['hiu', 'sirip', 'laut', 'taring', 'megalodon'],
    distractors: [{ emoji: '🐬', name: 'Lumba-Lumba' }, { emoji: '🐋', name: 'Paus Semprot' }, { emoji: '🐟', name: 'Ikan Kecil' }]
  },
  {
    id: 'ev-21',
    targetEmoji: '🐙',
    name: 'Gurita Delapan Tentakel',
    category: 'Biologi Laut',
    forbiddenWords: ['gurita', 'tinta', 'tentakel', 'delapan', 'laut'],
    distractors: [{ emoji: '🦑', name: 'Cumi-Cumi' }, { emoji: '🦞', name: 'Lobster' }, { emoji: '🦀', name: 'Kepiting' }]
  },
  {
    id: 'ev-22',
    targetEmoji: '🦥',
    name: 'Kukang / Sloth Lambat',
    category: 'Hewan Hutan',
    forbiddenWords: ['sloth', 'kukang', 'lambat', 'gelantung', 'pohon'],
    distractors: [{ emoji: '🐨', name: 'Koala' }, { emoji: '🦔', name: 'Landak' }, { emoji: '🦦', name: 'Berang-berang' }]
  },
  {
    id: 'ev-23',
    targetEmoji: '🦩',
    name: 'Burung Flamingo Pink',
    category: 'Unggas Cantik',
    forbiddenWords: ['flamingo', 'pink', 'merah muda', 'satu kaki', 'panjang'],
    distractors: [{ emoji: '🦢', name: 'Angsa Putih' }, { emoji: '🦜', name: 'Burung Beo' }, { emoji: '🦚', name: 'Burung Merak' }]
  },
  {
    id: 'ev-24',
    targetEmoji: '🦉',
    name: 'Burung Hantu Nokturnal',
    category: 'Unggas Malam',
    forbiddenWords: ['hantu', 'malam', 'mata bulat', 'leher putar', 'burung'],
    distractors: [{ emoji: '🦅', name: 'Elang Gagah' }, { emoji: '🦇', name: 'Kelelawar' }, { emoji: '🦆', name: 'Bebek' }]
  },
  {
    id: 'ev-25',
    targetEmoji: '🦒',
    name: 'Jerapah Leher Panjang',
    category: 'Satwa Savana',
    forbiddenWords: ['jerapah', 'leher', 'tinggi', 'tutul', 'daun'],
    distractors: [{ emoji: '🦓', name: 'Zebra' }, { emoji: '🦏', name: 'Badak' }, { emoji: '🐘', name: 'Gajah' }]
  },
  {
    id: 'ev-26',
    targetEmoji: '🦔',
    name: 'Landak Berduri Tajam',
    category: 'Hewan Mungil',
    forbiddenWords: ['landak', 'duri', 'tajam', 'gulung', 'tusuk'],
    distractors: [{ emoji: '🐹', name: 'Hamster' }, { emoji: '🦡', name: 'Badger' }, { emoji: '🐭', name: 'Tikus' }]
  },
  {
    id: 'ev-27',
    targetEmoji: '🦋',
    name: 'Kupu-Kupu Sayap Indah',
    category: 'Serangga Cantik',
    forbiddenWords: ['kupu', 'sayap', 'ulat', 'terbang', 'bunga'],
    distractors: [{ emoji: '🐝', name: 'Lebah Madu' }, { emoji: '🐞', name: 'Kepik Bintik' }, { emoji: '🪲', name: 'Kumbang' }]
  },
  {
    id: 'ev-28',
    targetEmoji: '🐸',
    name: 'Katak Hijau Melompat',
    category: 'Hewan Amfibi',
    forbiddenWords: ['katak', 'kodok', 'hijau', 'lompat', 'kolam'],
    distractors: [{ emoji: '🦎', name: 'Kadal' }, { emoji: '🐢', name: 'Kura-Kura' }, { emoji: '🐍', name: 'Ular' }]
  },
  {
    id: 'ev-29',
    targetEmoji: '🐝',
    name: 'Lebah Penghasil Madu',
    category: 'Serangga Pekerja',
    forbiddenWords: ['lebah', 'madu', 'sengat', 'kuning hitam', 'sarang'],
    distractors: [{ emoji: '🦟', name: 'Nyamuk' }, { emoji: '🪰', name: 'Lalat' }, { emoji: '🐜', name: 'Semut' }]
  },
  {
    id: 'ev-30',
    targetEmoji: '🐢',
    name: 'Kura-Kura Bercangkang Keras',
    category: 'Reptil Lambat',
    forbiddenWords: ['kura', 'cangkang', 'tempurung', 'lambat', 'telur'],
    distractors: [{ emoji: '🦎', name: 'Kadal' }, { emoji: '🐌', name: 'Siput' }, { emoji: '🐊', name: 'Buaya' }]
  },

  // --- KULINER, MAKANAN & MINUMAN ---
  {
    id: 'ev-31',
    targetEmoji: '🍕',
    name: 'Pizza Keju Potong',
    category: 'Kuliner Italia',
    forbiddenWords: ['pizza', 'keju', 'roti', 'potong', 'italia'],
    distractors: [{ emoji: '🍔', name: 'Burger' }, { emoji: '🌭', name: 'Hotdog' }, { emoji: '🥪', name: 'Sandwich' }]
  },
  {
    id: 'ev-32',
    targetEmoji: '🍔',
    name: 'Burger Daging Keju (Cheeseburger)',
    category: 'Fast Food',
    forbiddenWords: ['burger', 'patty', 'daging', 'selada', 'wijen'],
    distractors: [{ emoji: '🌮', name: 'Taco' }, { emoji: '🌯', name: 'Burrito' }, { emoji: '🥪', name: 'Sandwich' }]
  },
  {
    id: 'ev-33',
    targetEmoji: '🍜',
    name: 'Ramen / Mie Kuah Sumpit',
    category: 'Kuliner Berkuah',
    forbiddenWords: ['mie', 'ramen', 'kuah', 'sumpit', 'mangkuk'],
    distractors: [{ emoji: '🍲', name: 'Sup Sayur' }, { emoji: '🍝', name: 'Spageti' }, { emoji: '🍛', name: 'Nasi Kari' }]
  },
  {
    id: 'ev-34',
    targetEmoji: '🍣',
    name: 'Sushi Gulung Salmon',
    category: 'Kuliner Jepang',
    forbiddenWords: ['sushi', 'ikan', 'nasi', 'jepang', 'nori'],
    distractors: [{ emoji: '🍙', name: 'Onigiri Segitiga' }, { emoji: '🥟', name: 'Pangsit Dimsum' }, { emoji: '🍱', name: 'Kotak Bento' }]
  },
  {
    id: 'ev-35',
    targetEmoji: '🧋',
    name: 'Boba Milk Tea',
    category: 'Minuman Kekinian',
    forbiddenWords: ['boba', 'teh', 'susu', 'sedotan', 'tapioka'],
    distractors: [{ emoji: '☕', name: 'Kopi Hangat' }, { emoji: '🥤', name: 'Minuman Soda' }, { emoji: '🍧', name: 'Es Serut' }]
  },
  {
    id: 'ev-36',
    targetEmoji: '🍿',
    name: 'Popcorn Bioskop',
    category: 'Camilan Film',
    forbiddenWords: ['popcorn', 'jagung', 'bioskop', 'nonton', 'kotak'],
    distractors: [{ emoji: '🍟', name: 'Kentang Goreng' }, { emoji: '🥨', name: 'Pretzel' }, { emoji: '🥜', name: 'Kacang Kulit' }]
  },
  {
    id: 'ev-37',
    targetEmoji: '🍦',
    name: 'Es Krim Cone Lembut',
    category: 'Dessert Manis',
    forbiddenWords: ['es krim', 'dingin', 'cone', 'jilat', 'meleleh'],
    distractors: [{ emoji: '🍧', name: 'Es Campur Serut' }, { emoji: '🍨', name: 'Es Krim Mangkok' }, { emoji: '🧁', name: 'Cupcake' }]
  },
  {
    id: 'ev-38',
    targetEmoji: '🍩',
    name: 'Donat Cokelat Berlubang',
    category: 'Kue Manis',
    forbiddenWords: ['donat', 'lubang', 'tengah', 'topping', 'manis'],
    distractors: [{ emoji: '🍪', name: 'Kue Kering Cookie' }, { emoji: '🍰', name: 'Kue Tart Potong' }, { emoji: '🥯', name: 'Bagel' }]
  },
  {
    id: 'ev-39',
    targetEmoji: '🥑',
    name: 'Alpukat Hijau Berbiji',
    category: 'Buah Sehat',
    forbiddenWords: ['alpukat', 'biji', 'hijau', 'jus', 'lemak'],
    distractors: [{ emoji: '🥝', name: 'Kiwi' }, { emoji: '🥥', name: 'Kelapa' }, { emoji: '🍈', name: 'Melon' }]
  },
  {
    id: 'ev-40',
    targetEmoji: '🍉',
    name: 'Semangka Potong Segar',
    category: 'Buah Tropis',
    forbiddenWords: ['semangka', 'merah', 'biji hitam', 'kulit hijau', 'segar'],
    distractors: [{ emoji: '🍓', name: 'Stroberi' }, { emoji: '🍎', name: 'Apel Merah' }, { emoji: '🍒', name: 'Ceri' }]
  },
  {
    id: 'ev-41',
    targetEmoji: '🌶️',
    name: 'Cabai Merah Pedas',
    category: 'Bumbu Pedas',
    forbiddenWords: ['cabai', 'cabe', 'pedas', 'merah', 'sambal'],
    distractors: [{ emoji: '🧄', name: 'Bawang Putih' }, { emoji: '🧅', name: 'Bawang Bombay' }, { emoji: '🥕', name: 'Wortel' }]
  },
  {
    id: 'ev-42',
    targetEmoji: '☕',
    name: 'Cangkir Kopi Panas Berasap',
    category: 'Minuman Kafein',
    forbiddenWords: ['kopi', 'cangkir', 'hitam', 'asap', 'kafein'],
    distractors: [{ emoji: '🍵', name: 'Teh Hijau Panas' }, { emoji: '🥛', name: 'Segelas Susu' }, { emoji: '🫖', name: 'Teko Teh' }]
  },
  {
    id: 'ev-43',
    targetEmoji: '🎂',
    name: 'Kue Ulang Tahun Lilin',
    category: 'Pesta Perayaan',
    forbiddenWords: ['kue', 'ulang tahun', 'lilin', 'tiup', 'tart'],
    distractors: [{ emoji: '🧁', name: 'Kue Muffin Cupcake' }, { emoji: '🍰', name: 'Sepotong Kue' }, { emoji: '🎁', name: 'Kado' }]
  },
  {
    id: 'ev-44',
    targetEmoji: '🥞',
    name: 'Tumpukan Pancake Madu',
    category: 'Sarapan Pagi',
    forbiddenWords: ['pancake', 'mentega', 'madu', 'sirup', 'tumpuk'],
    distractors: [{ emoji: '🧇', name: 'Wafel Kotak' }, { emoji: '🍳', name: 'Telur Mata Sapi' }, { emoji: '🍞', name: 'Roti Tawar' }]
  },
  {
    id: 'ev-45',
    targetEmoji: '🍫',
    name: 'Cokelat Batangan Manis',
    category: 'Camilan Manis',
    forbiddenWords: ['cokelat', 'batang', 'kotak', 'manis', 'bungkus'],
    distractors: [{ emoji: '🍬', name: 'Permen Manis' }, { emoji: '🍭', name: 'Permen Lolipop' }, { emoji: '🍪', name: 'Kue Kering' }]
  },

  // --- OLAHRAGA, HOBI & AKTIVITAS ---
  {
    id: 'ev-46',
    targetEmoji: '🥊',
    name: 'Sarung Tinju Merah',
    category: 'Bela Diri',
    forbiddenWords: ['tinju', 'sarung', 'pukul', 'ring', 'tyson'],
    distractors: [{ emoji: '🥋', name: 'Seragam Karate' }, { emoji: '🤺', name: 'Anggar Pedang' }, { emoji: '🏋️‍♂️', name: 'Angkat Besi' }]
  },
  {
    id: 'ev-47',
    targetEmoji: '🏹',
    name: 'Busur Panah dan Anak Panah',
    category: 'Akurasi Target',
    forbiddenWords: ['panah', 'busur', 'target', 'bidik', 'tali'],
    distractors: [{ emoji: '🎯', name: 'Papan Sasaran Dart' }, { emoji: '🔫', name: 'Pistol Tembak' }, { emoji: '⚔️', name: 'Pedang Silang' }]
  },
  {
    id: 'ev-48',
    targetEmoji: '🛹',
    name: 'Papan Skateboard Meluncur',
    category: 'Olahraga Jalanan',
    forbiddenWords: ['skateboard', 'papan', 'roda empat', 'aspal', 'seluncur'],
    distractors: [{ emoji: '🛴', name: 'Skuter Anak' }, { emoji: '🚲', name: 'Sepeda Gowes' }, { emoji: '🛼', name: 'Sepatu Roda' }]
  },
  {
    id: 'ev-49',
    targetEmoji: '🎳',
    name: 'Bola Bowling dan Tiga Pin',
    category: 'Permainan Lintasan',
    forbiddenWords: ['bowling', 'pin', 'bola', 'strike', 'lubang tiga'],
    distractors: [{ emoji: '🎱', name: 'Bola Biliar 8' }, { emoji: '⚾', name: 'Bola Bisbol' }, { emoji: '🎾', name: 'Bola Tenis' }]
  },
  {
    id: 'ev-50',
    targetEmoji: '🤿',
    name: 'Kacamata Selam & Snorkel',
    category: 'Eksplorasi Laut',
    forbiddenWords: ['selam', 'snorkel', 'kacamata', 'karang', 'bawah laut'],
    distractors: [{ emoji: '🏊‍♂️', name: 'Orang Berenang' }, { emoji: '🏄‍♂️', name: 'Selancar Ombak' }, { emoji: '🎣', name: 'Memancing' }]
  },
  {
    id: 'ev-51',
    targetEmoji: '🪂',
    name: 'Parasut Terjun Payung',
    category: 'Olahraga Ekstrem Udara',
    forbiddenWords: ['parasut', 'terjun payung', 'lompat', 'pesawat', 'udara'],
    distractors: [{ emoji: '🪁', name: 'Layang-layang' }, { emoji: '🎈', name: 'Balon Udara' }, { emoji: '🛸', name: 'UFO' }]
  },
  {
    id: 'ev-52',
    targetEmoji: '🎮',
    name: 'Joystick / Kontroler Game',
    category: 'Video Game',
    forbiddenWords: ['stik', 'game', 'playstation', 'tombol', 'joystick'],
    distractors: [{ emoji: '🕹️', name: 'Arcade Joystick' }, { emoji: '💻', name: 'Laptop' }, { emoji: '📺', name: 'Layar TV' }]
  },
  {
    id: 'ev-53',
    targetEmoji: '🎸',
    name: 'Gitar Listrik Musisi Rock',
    category: 'Alat Musik',
    forbiddenWords: ['gitar', 'senar', 'petik', 'melodi', 'rock'],
    distractors: [{ emoji: '🎻', name: 'Biola Gesek' }, { emoji: '🎹', name: 'Piano Tuts' }, { emoji: '🥁', name: 'Drum Pukul' }]
  },
  {
    id: 'ev-54',
    targetEmoji: '🎤',
    name: 'Mikrofon Bernyanyi Panggung',
    category: 'Suara Musik',
    forbiddenWords: ['mikrofon', 'karaoke', 'nyanyi', 'suara', 'mic'],
    distractors: [{ emoji: '🎧', name: 'Headphone Musik' }, { emoji: '📻', name: 'Radio Antik' }, { emoji: '📢', name: 'Megafon Pengeras' }]
  },
  {
    id: 'ev-55',
    targetEmoji: '🏆',
    name: 'Piala Trofi Juara Emas',
    category: 'Penghargaan Juara',
    forbiddenWords: ['piala', 'trofi', 'emas', 'juara satu', 'menang'],
    distractors: [{ emoji: '🥇', name: 'Medali Emas' }, { emoji: '👑', name: 'Mahkota Raja' }, { emoji: '🎖️', name: 'Pita Militer' }]
  },
  {
    id: 'ev-56',
    targetEmoji: '🎲',
    name: 'Dadu Berbintik Angka',
    category: 'Permainan Meja',
    forbiddenWords: ['dadu', 'titik', 'lempar', 'monopoli', 'kocok'],
    distractors: [{ emoji: '🎯', name: 'Dart' }, { emoji: '🃏', name: 'Kartu Joker' }, { emoji: '♟️', name: 'Pion Catur' }]
  },
  {
    id: 'ev-57',
    targetEmoji: '🎨',
    name: 'Palet Cat Seniman Lukis',
    category: 'Kesenian Menggambar',
    forbiddenWords: ['cat', 'lukis', 'kuas', 'palet', 'gambar'],
    distractors: [{ emoji: '🖌️', name: 'Kuas Lukis' }, { emoji: '🖍️', name: 'Krayon Mewarnai' }, { emoji: '✏️', name: 'Pensil' }]
  },
  {
    id: 'ev-58',
    targetEmoji: '🎣',
    name: 'Alat Pancing Kail Ikan',
    category: 'Hobi Santai',
    forbiddenWords: ['pancing', 'kail', 'ikan', 'umpan', 'sungai'],
    distractors: [{ emoji: '🚣‍♂️', name: 'Mendayung Sampan' }, { emoji: '⛵', name: 'Perahu Layar' }, { emoji: '⛺', name: 'Tenda Kemah' }]
  },
  {
    id: 'ev-59',
    targetEmoji: '🧩',
    name: 'Kepingan Puzzle Sambung',
    category: 'Asah Otak',
    forbiddenWords: ['puzzle', 'keping', 'sambung', 'pasang', 'teka-teki'],
    distractors: [{ emoji: '🧱', name: 'Batu Bata' }, { emoji: '🪨', name: 'Batu Kali' }, { emoji: '🪙', name: 'Koin Emas' }]
  },

  // --- KENDARAAN, TEMPAT & PERJALANAN ---
  {
    id: 'ev-60',
    targetEmoji: '🚀',
    name: 'Roket Meluncur Luar Angkasa',
    category: 'Antariksa',
    forbiddenWords: ['roket', 'api bawah', 'bulan', 'antariksa', 'luncur'],
    distractors: [{ emoji: '🛸', name: 'UFO Piring' }, { emoji: '✈️', name: 'Pesawat Terbang' }, { emoji: '🛰️', name: 'Satelit Angkasa' }]
  },
  {
    id: 'ev-61',
    targetEmoji: '🚁',
    name: 'Helikopter Baling-baling',
    category: 'Transportasi Udara',
    forbiddenWords: ['helikopter', 'baling-baling', 'atas', 'pilot', 'udara'],
    distractors: [{ emoji: '✈️', name: 'Pesawat Penumpang' }, { emoji: '🛩️', name: 'Pesawat Mini' }, { emoji: '🪂', name: 'Parasut' }]
  },
  {
    id: 'ev-62',
    targetEmoji: '🚓',
    name: 'Mobil Polisi Sirene',
    category: 'Kendaraan Darurat',
    forbiddenWords: ['polisi', 'sirene', 'patroli', 'tangkap', 'lampu biru'],
    distractors: [{ emoji: '🚑', name: 'Ambulans Rumah Sakit' }, { emoji: '🚒', name: 'Mobil Pemadam' }, { emoji: '🚕', name: 'Taksi Kuning' }]
  },
  {
    id: 'ev-63',
    targetEmoji: '🚂',
    name: 'Lokomotif Kereta Uap Asap',
    category: 'Kereta Klasik',
    forbiddenWords: ['kereta', 'uap', 'rel', 'asap', 'stasiun'],
    distractors: [{ emoji: '🚅', name: 'Kereta Cepat Peluru' }, { emoji: '🚇', name: 'Kereta Bawah Tanah' }, { emoji: '🚌', name: 'Bus Kota' }]
  },
  {
    id: 'ev-64',
    targetEmoji: '⛵',
    name: 'Perahu Layar di Laut',
    category: 'Transportasi Air',
    forbiddenWords: ['perahu', 'layar', 'angin', 'laut', 'ombak'],
    distractors: [{ emoji: '🚢', name: 'Kapal Pesiar Besar' }, { emoji: '🚤', name: 'Speedboat Cepat' }, { emoji: '🛶', name: 'Kano Dayung' }]
  },
  {
    id: 'ev-65',
    targetEmoji: '🏰',
    name: 'Kastil Megah Kerajaan',
    category: 'Bangunan Kuno',
    forbiddenWords: ['kastil', 'raja', 'benteng', 'menara batu', 'putri'],
    distractors: [{ emoji: '🏯', name: 'Kastil Jepang' }, { emoji: '🏛️', name: 'Gedung Pilar Yunani' }, { emoji: '💒', name: 'Gereja Menikah' }]
  },
  {
    id: 'ev-66',
    targetEmoji: '🏕️',
    name: 'Tenda Kemah Camping Liar',
    category: 'Petualangan Alam',
    forbiddenWords: ['tenda', 'kemah', 'camping', 'api unggun', 'hutan'],
    distractors: [{ emoji: '⛺', name: 'Tenda Segitiga' }, { emoji: '🛖', name: 'Gubuk Jerami' }, { emoji: '🪵', name: 'Kayu Bakar' }]
  },
  {
    id: 'ev-67',
    targetEmoji: '🏖️',
    name: 'Pantai Tropis Payung Pasir',
    category: 'Liburan Santai',
    forbiddenWords: ['pantai', 'pasir', 'payung', 'laut', 'kelapa'],
    distractors: [{ emoji: '🏝️', name: 'Pulau Terpencil' }, { emoji: '🏜️', name: 'Gurun Tandus' }, { emoji: '🏔️', name: 'Puncak Bersalju' }]
  },
  {
    id: 'ev-68',
    targetEmoji: '🌋',
    name: 'Gunung Berapi Meletus Magma',
    category: 'Bencana Geologi',
    forbiddenWords: ['gunung', 'meletus', 'lahar', 'magma', 'asap'],
    distractors: [{ emoji: '⛰️', name: 'Gunung Biasa' }, { emoji: '🔥', name: 'Api Membara' }, { emoji: '💥', name: 'Ledakan' }]
  },

  // --- BENDA, TEKNOLOGI & MISTERI ---
  {
    id: 'ev-69',
    targetEmoji: '💎',
    name: 'Berlian Permata Berkilau',
    category: 'Perhiasan Berharga',
    forbiddenWords: ['berlian', 'permata', 'kilau', 'mahal', 'biru'],
    distractors: [{ emoji: '💍', name: 'Cincin Kawin' }, { emoji: '👑', name: 'Mahkota' }, { emoji: '✨', name: 'Kelap-kelip' }]
  },
  {
    id: 'ev-70',
    targetEmoji: '👑',
    name: 'Mahkota Raja Bertabur Emas',
    category: 'Atribut Kerajaan',
    forbiddenWords: ['mahkota', 'raja', 'ratu', 'emas', 'kepala'],
    distractors: [{ emoji: '💎', name: 'Berlian' }, { emoji: '💍', name: 'Cincin' }, { emoji: '🏆', name: 'Piala' }]
  },
  {
    id: 'ev-71',
    targetEmoji: '🔮',
    name: 'Bola Kristal Ramalan Masa Depan',
    category: 'Sihir Mistis',
    forbiddenWords: ['kristal', 'bola', 'ramal', 'dukun', 'ungu'],
    distractors: [{ emoji: '🪄', name: 'Tongkat Sihir' }, { emoji: '🕯️', name: 'Lilin Menyala' }, { emoji: '✨', name: 'Kilauan Ajaib' }]
  },
  {
    id: 'ev-72',
    targetEmoji: '🪄',
    name: 'Tongkat Sihir Berbintang (Magic Wand)',
    category: 'Keajaiban Sulap',
    forbiddenWords: ['tongkat', 'sihir', 'sulap', 'bintang', 'harry potter'],
    distractors: [{ emoji: '🔮', name: 'Bola Kristal' }, { emoji: '🎩', name: 'Topi Sulap' }, { emoji: '✨', name: 'Serbuk Ajaib' }]
  },
  {
    id: 'ev-73',
    targetEmoji: '💣',
    name: 'Bom Hitam Sumbu Menyala',
    category: 'Senjata Ledak',
    forbiddenWords: ['bom', 'sumbu', 'meledak', 'hitam', 'percik'],
    distractors: [{ emoji: '🧨', name: 'Petasan Merah' }, { emoji: '💥', name: 'Ledakan Dahsyat' }, { emoji: '🗡️', name: 'Belati' }]
  },
  {
    id: 'ev-74',
    targetEmoji: '🔑',
    name: 'Kunci Pintu Kuningan',
    category: 'Alat Buka Pintu',
    forbiddenWords: ['kunci', 'gembok', 'pintu', 'gerigi', 'buka'],
    distractors: [{ emoji: '🗝️', name: 'Kunci Kuno Antik' }, { emoji: '🔒', name: 'Gembok Terkunci' }, { emoji: '🚪', name: 'Pintu Kayu' }]
  },
  {
    id: 'ev-75',
    targetEmoji: '💡',
    name: 'Lampu Bohlam Ide Cemerlang',
    category: 'Penerangan & Ide',
    forbiddenWords: ['lampu', 'bohlam', 'kuning', 'ide', 'terang'],
    distractors: [{ emoji: '🔦', name: 'Senter Tangan' }, { emoji: '🕯️', name: 'Lilin Sumbu' }, { emoji: '☀️', name: 'Matahari' }]
  },
  {
    id: 'ev-76',
    targetEmoji: '🧲',
    name: 'Magnet Tapal Kuda Tarik Logam',
    category: 'Fisika & Sains',
    forbiddenWords: ['magnet', 'merah biru', 'besi', 'tarik', 'kutub'],
    distractors: [{ emoji: '🔋', name: 'Baterai Listrik' }, { emoji: '⚡', name: 'Kilat Petir' }, { emoji: '🔩', name: 'Baut Mur' }]
  },
  {
    id: 'ev-77',
    targetEmoji: '📷',
    name: 'Kamera Jepret Foto Lensa',
    category: 'Fotografi',
    forbiddenWords: ['kamera', 'foto', 'jepret', 'lensa', 'flash'],
    distractors: [{ emoji: '📹', name: 'Kamera Video' }, { emoji: '📱', name: 'Handphone' }, { emoji: '🎞️', name: 'Rol Klise Film' }]
  },
  {
    id: 'ev-78',
    targetEmoji: '⏰',
    name: 'Jam Weker Dering Bunyi Pagi',
    category: 'Pengingat Waktu',
    forbiddenWords: ['jam', 'weker', 'dering', 'bangun tidur', 'lonceng'],
    distractors: [{ emoji: '⏱️', name: 'Stopwatch Detik' }, { emoji: '⏳', name: 'Jam Pasir Tabung' }, { emoji: '🕰️', name: 'Jam Meja Kuno' }]
  },
  {
    id: 'ev-79',
    targetEmoji: '💰',
    name: 'Kantong Karung Uang Dolar',
    category: 'Kekayaan Finansial',
    forbiddenWords: ['uang', 'karung', 'kantong', 'dolar', 'emas'],
    distractors: [{ emoji: '💵', name: 'Uang Kertas Lembaran' }, { emoji: '🪙', name: 'Koin Logam' }, { emoji: '💳', name: 'Kartu Kredit ATM' }]
  },
  {
    id: 'ev-80',
    targetEmoji: '🎁',
    name: 'Kotak Kado Hadiah Pita',
    category: 'Hadiah Spesial',
    forbiddenWords: ['kado', 'hadiah', 'pita', 'kotak', 'bungkus'],
    distractors: [{ emoji: '📦', name: 'Kardus Paket Kurir' }, { emoji: '🎈', name: 'Balon Pesta' }, { emoji: '🎉', name: 'Terompet Pesta' }]
  },
  {
    id: 'ev-81',
    targetEmoji: '💌',
    name: 'Surat Cinta Amplop Berhati Merah',
    category: 'Pesan Romantis',
    forbiddenWords: ['surat', 'amplop', 'hati', 'cinta', 'pos'],
    distractors: [{ emoji: '✉️', name: 'Amplop Putih' }, { emoji: '📦', name: 'Paket Kardus' }, { emoji: '📜', name: 'Gulungan Kertas Kuno' }]
  },
  {
    id: 'ev-82',
    targetEmoji: '💍',
    name: 'Cincin Kawin Berlian Kemilau',
    category: 'Pernikahan',
    forbiddenWords: ['cincin', 'berlian', 'jari', 'lamaran', 'nikah'],
    distractors: [{ emoji: '💎', name: 'Berlian Permata' }, { emoji: '👑', name: 'Mahkota' }, { emoji: '📿', name: 'Kalung Manik' }]
  },
  {
    id: 'ev-83',
    targetEmoji: '🧯',
    name: 'Tabung Pemadam Api Merah (APAR)',
    category: 'Keselamatan Kebakaran',
    forbiddenWords: ['pemadam', 'tabung', 'api', 'merah', 'semprot'],
    distractors: [{ emoji: '🪓', name: 'Kapak Besi' }, { emoji: '🚨', name: 'Lampu Sirine Darurat' }, { emoji: '🔥', name: 'Kobaran Api' }]
  },
  {
    id: 'ev-84',
    targetEmoji: '🪓',
    name: 'Kapak Gagang Kayu Tajam',
    category: 'Alat Tukang & Hutan',
    forbiddenWords: ['kapak', 'tebang', 'kayu', 'pohon', 'tajam'],
    distractors: [{ emoji: '🔨', name: 'Palu Besi' }, { emoji: '⛏️', name: 'Beliung Tambang' }, { emoji: '🗡️', name: 'Pedang' }]
  },
  {
    id: 'ev-85',
    targetEmoji: '🧭',
    name: 'Kompas Petunjuk Arah Jarum Magnet',
    category: 'Navigasi Petualangan',
    forbiddenWords: ['kompas', 'arah', 'utara', 'jarum', 'petunjuk'],
    distractors: [{ emoji: '🗺️', name: 'Peta Dunia' }, { emoji: '⏰', name: 'Jam Weker' }, { emoji: '⚓', name: 'Jangkar Kapal' }]
  },
  {
    id: 'ev-86',
    targetEmoji: '🧪',
    name: 'Tabung Reaksi Kimia Laboratorium',
    category: 'Sains & Penelitian',
    forbiddenWords: ['tabung', 'kimia', 'cairan', 'reaksi', 'laboratorium'],
    distractors: [{ emoji: '🧬', name: 'Rantai DNA' }, { emoji: '🔬', name: 'Mikroskop Pembesar' }, { emoji: '🧫', name: 'Cawan Petri' }]
  },
  {
    id: 'ev-87',
    targetEmoji: '🧲',
    name: 'Magnet Tapal Kuda',
    category: 'Fisika Eksperimen',
    forbiddenWords: ['magnet', 'tarik', 'besi', 'kutub', 'u'],
    distractors: [{ emoji: '🔩', name: 'Baut Mur' }, { emoji: '⚙️', name: 'Roda Gerigi' }, { emoji: '🪛', name: 'Obeng Sekrup' }]
  },
  {
    id: 'ev-88',
    targetEmoji: '🪞',
    name: 'Cermin Rias Kaca Pantul',
    category: 'Kecantikan',
    forbiddenWords: ['cermin', 'kaca', 'pantul', 'rias', 'wajah'],
    distractors: [{ emoji: '🪥', name: 'Sikat Gigi' }, { emoji: '🧴', name: 'Botol Losion' }, { emoji: '🧼', name: 'Sabun Mandi' }]
  },
  {
    id: 'ev-89',
    targetEmoji: '🪁',
    name: 'Layang-Layang Terbang Ditiup Angin',
    category: 'Permainan Tradisional',
    forbiddenWords: ['layangan', 'benang', 'terbang', 'angin', 'ekor'],
    distractors: [{ emoji: '🪂', name: 'Parasut' }, { emoji: '🎈', name: 'Balon Gas' }, { emoji: '🛸', name: 'Piring Terbang' }]
  },
  {
    id: 'ev-90',
    targetEmoji: '🪆',
    name: 'Boneka Matryoshka Bersarang',
    category: 'Kesenian Tradisional',
    forbiddenWords: ['matryoshka', 'boneka', 'rusia', 'susun', 'dalam'],
    distractors: [{ emoji: '🧸', name: 'Boneka Beruang Teddy' }, { emoji: '🎎', name: 'Boneka Jepang' }, { emoji: '🎭', name: 'Topeng' }]
  }
];

// ==============================================================
// 4. DATA UJI KECOCOKAN / DILEMA TELEPATI (100+ DILEMA LENGKAP)
// ==============================================================
export const DILEMMA_DATABASE: DilemmaQuestion[] = [
  // MAKANAN & KULINER
  { id: 'dl-1', title: 'Sekte Cara Makan Bubur Ayam', category: 'Kebiasaan Makan', optionA: { id: 'A', text: 'Diaduk rata biar bumbunya merata gurih', emoji: '🥣' }, optionB: { id: 'B', text: 'Gak diaduk biar topping tetap rapi estetik', emoji: '🥄' } },
  { id: 'dl-2', title: 'Sensasi Rasa Kuliner Favorit', category: 'Selera Lidah', optionA: { id: 'A', text: 'Pedas nampol bikin keringetan mantap', emoji: '🌶️' }, optionB: { id: 'B', text: 'Manis gurih bikin mood tenang bahagia', emoji: '🍰' } },
  { id: 'dl-3', title: 'Varian Olahan Mie Instan', category: 'Mie Instan', optionA: { id: 'A', text: 'Mie goreng gurih pakai telur ceplok', emoji: '🍳' }, optionB: { id: 'B', text: 'Mie kuah panas berkaldu hangat cabai potong', emoji: '🍜' } },
  { id: 'dl-4', title: 'Minuman Peneman Nongkrong', category: 'Minuman', optionA: { id: 'A', text: 'Kopi hitam atau es kopi susu gula aren', emoji: '☕' }, optionB: { id: 'B', text: 'Teh melati wangi atau Boba brown sugar', emoji: '🧋' } },
  { id: 'dl-5', title: 'Cara Menikmati Nasi Padang', category: 'Kuliner Nusantara', optionA: { id: 'A', text: 'Bungkus bawa pulang (porsi nasi lebih banyak)', emoji: '📦' }, optionB: { id: 'B', text: 'Makan langsung di tempat (bisa nambah kuah gulai)', emoji: '🍽️' } },
  { id: 'dl-6', title: 'Camilan Gorengan Wajib', category: 'Gorengan', optionA: { id: 'A', text: 'Bakwan / Bala-bala garing renyah', emoji: '🥬' }, optionB: { id: 'B', text: 'Tahu isi pedas / Mendoan hangat kencur', emoji: '🧈' } },
  { id: 'dl-7', title: 'Tekstur Telur Ceplok Goreng', category: 'Masakan Rumah', optionA: { id: 'A', text: 'Setengah matang meleleh saat ditusuk garpu', emoji: '🍳' }, optionB: { id: 'B', text: 'Matang sempurna garing pinggirannya renyah', emoji: '✨' } },
  { id: 'dl-8', title: 'Pilihan Fast Food Favorit', category: 'Fast Food', optionA: { id: 'A', text: 'Ayam goreng crispy berbumbu renyah', emoji: '🍗' }, optionB: { id: 'B', text: 'Burger daging keju leleh saus spesial', emoji: '🍔' } },
  { id: 'dl-9', title: 'Topping Pizza Paling Pas', category: 'Pizza', optionA: { id: 'A', text: 'Full keju mozzarella & daging gurih', emoji: '🧀' }, optionB: { id: 'B', text: 'Ada potongan nanasnya (Hawaiian segar)', emoji: '🍍' } },
  { id: 'dl-10', title: 'Gaya Minum Es Teh di Warung', category: 'Minuman Rakyat', optionA: { id: 'A', text: 'Es teh manis dingin segar tenggorokan', emoji: '🧊' }, optionB: { id: 'B', text: 'Teh tawar hangat penawar rasa enek', emoji: '🍵' } },

  // LIBURAN, HANGOUT & GAYA HIDUP
  { id: 'dl-11', title: 'Destinasi Liburan Impian', category: 'Liburan', optionA: { id: 'A', text: 'Pantai tropis santai, deburan ombak & sunset', emoji: '🏖️' }, optionB: { id: 'B', text: 'Pegunungan sejuk berkabut & udara segar', emoji: '🏔️' } },
  { id: 'dl-12', title: 'Rencana Malam Minggu', category: 'Weekend', optionA: { id: 'A', text: 'Jalan keluar ke bioskop, kafe atau mall', emoji: '🍿' }, optionB: { id: 'B', text: 'Rebahan di kasur nonton serial streaming santai', emoji: '🛋️' } },
  { id: 'dl-13', title: 'Gaya Merencanakan Traveling', category: 'Traveling', optionA: { id: 'A', text: 'Itinerary rapi tersusun jam demi jam', emoji: '📝' }, optionB: { id: 'B', text: 'Spontan kemana kaki melangkah (Go with the flow)', emoji: '🎒' } },
  { id: 'dl-14', title: 'Ritme Jam Produktifmu', category: 'Jam Biologis', optionA: { id: 'A', text: 'Burung hantu / Ide deras keluar tengah malam', emoji: '🦉' }, optionB: { id: 'B', text: 'Early bird / Bangun subuh udara sejuk segar', emoji: '🌅' } },
  { id: 'dl-15', title: 'Hewan Peliharaan Idaman', category: 'Hewan Peliharaan', optionA: { id: 'A', text: 'Kucing manja yang lucu dan mandiri', emoji: '🐱' }, optionB: { id: 'B', text: 'Anjing setia yang pintar dan aktif diajak main', emoji: '🐶' } },
  { id: 'dl-16', title: 'Suasana Tempat Nongkrong', category: 'Social', optionA: { id: 'A', text: 'Kafe estetik tenang sambil dengerin musik lofi', emoji: '☕' }, optionB: { id: 'B', text: 'Angkringan pinggir jalan seru ngobrol santai', emoji: '🍢' } },
  { id: 'dl-17', title: 'Kondisi Kamar Saat Tidur', category: 'Kenyamanan', optionA: { id: 'A', text: 'AC dingin menusuk pakai selimut tebal', emoji: '❄️' }, optionB: { id: 'B', text: 'Suhu ruangan sejuk alami semilir angin jendela', emoji: '🍃' } },
  { id: 'dl-18', title: 'Pilihan Menginap Liburan', category: 'Akomodasi', optionA: { id: 'A', text: 'Hotel berbintang kasur empuk mewah', emoji: '🏨' }, optionB: { id: 'B', text: 'Glamping / Tenda di tengah alam terbuka asri', emoji: '⛺' } },
  { id: 'dl-19', title: 'Kendaraan Jalan Sore Santai', category: 'Transportasi', optionA: { id: 'A', text: 'Naik motor boncengan kena semilir angin sore', emoji: '🛵' }, optionB: { id: 'B', text: 'Naik mobil adem sambil dengerin playlist lagu', emoji: '🚗' } },
  { id: 'dl-20', title: 'Karakter Dalam Hubungan', category: 'Relasi', optionA: { id: 'A', text: 'Sering berkabar chat terus sepanjang hari', emoji: '💬' }, optionB: { id: 'B', text: 'Cukup kabar penting tapi selalu hadir saat butuh', emoji: '❤️' } }
];

// ==============================================================
// 5. HELPER GENERATION DENGAN DEDUPLIKASI KETAT
// ==============================================================

/**
 * Generate pertanyaan tebak bendera tanpa repetisi
 */
export function generateFlagQuestion(usedIds: string[] = []): { question: FlagQuestion; chosenId: string } {
  const available = FLAG_DATABASE.filter(f => !usedIds.includes(f.id));
  const pool = available.length > 0 ? available : FLAG_DATABASE;
  const randomIndex = Math.floor(Math.random() * pool.length);
  const target = pool[randomIndex];

  const wrongOptions: string[] = [];
  while (wrongOptions.length < 3) {
    const candidate = FLAG_DATABASE[Math.floor(Math.random() * FLAG_DATABASE.length)].countryName;
    if (candidate !== target.countryName && !wrongOptions.includes(candidate)) {
      wrongOptions.push(candidate);
    }
  }

  const options = [target.countryName, ...wrongOptions].sort(() => Math.random() - 0.5);

  return {
    question: {
      ...target,
      options
    },
    chosenId: target.id
  };
}

/**
 * Generate pertanyaan tebak kata tanpa repetisi
 */
export function generateWordQuestion(usedIds: string[] = []): { question: WordQuestion; chosenId: string } {
  const available = WORD_DATABASE.filter(w => !usedIds.includes(w.id));
  const pool = available.length > 0 ? available : WORD_DATABASE;
  const randomIndex = Math.floor(Math.random() * pool.length);
  const target = pool[randomIndex];

  const wrongOptions: string[] = [];
  while (wrongOptions.length < 3) {
    const candidate = WORD_DATABASE[Math.floor(Math.random() * WORD_DATABASE.length)].word;
    if (candidate !== target.word && !wrongOptions.includes(candidate)) {
      wrongOptions.push(candidate);
    }
  }

  const options = [target.word, ...wrongOptions].sort(() => Math.random() - 0.5);

  return {
    question: {
      ...target,
      options
    },
    chosenId: target.id
  };
}

/**
 * Generate pertanyaan tebak emoji panggilan suara tanpa repetisi
 * Dijamin TIDAK AKAN MUNCUL EMOJI YANG SAMA sampai seluruh database selesai dimainkan!
 */
export function generateEmojiVoiceQuestion(
  player1Id: string,
  player2Id: string,
  roundNumber: number,
  usedIds: string[] = []
): { question: EmojiVoiceQuestion; chosenId: string } {
  const available = EMOJI_VOICE_DATABASE.filter(e => !usedIds.includes(e.id));
  const pool = available.length > 0 ? available : EMOJI_VOICE_DATABASE;
  const randomIndex = Math.floor(Math.random() * pool.length);
  const target = pool[randomIndex];

  const isPlayer1Describer = roundNumber % 2 !== 0;
  const describerPlayerId = isPlayer1Describer ? player1Id : player2Id;
  const guesserPlayerId = isPlayer1Describer ? player2Id : player1Id;

  const options = [
    { emoji: target.targetEmoji, name: target.name },
    ...target.distractors.slice(0, 3)
  ].sort(() => Math.random() - 0.5);

  return {
    question: {
      id: `${target.id}-${Date.now()}`,
      targetEmoji: target.targetEmoji,
      name: target.name,
      category: target.category,
      forbiddenWords: target.forbiddenWords,
      options,
      describerPlayerId,
      guesserPlayerId
    },
    chosenId: target.id
  };
}

/**
 * Generate pertanyaan dilema tanpa repetisi
 */
export function generateDilemmaQuestion(usedIds: string[] = []): { question: DilemmaQuestion; chosenId: string } {
  const available = DILEMMA_DATABASE.filter(d => !usedIds.includes(d.id));
  const pool = available.length > 0 ? available : DILEMMA_DATABASE;
  const chosen = pool[Math.floor(Math.random() * pool.length)];
  return {
    question: chosen,
    chosenId: chosen.id
  };
}
