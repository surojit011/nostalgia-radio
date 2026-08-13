export type Track = {
  id: string;
  title: string;
  artist: string;
  film: string;
  year: number | null;
  duration: number;
  videoId: string;
};

export type Playlist = {
  id: string;
  name: string;
  tracks: Track[];
};

function t(
  id: string,
  title: string,
  artist: string,
  film: string
): Track {
  return {
    id,
    title,
    artist,
    film,
    year: null,
    duration: 0,
    videoId: "",
  };
}

const garvitPriyansh: Track[] = [
  t("gp-01", "Kaahe Mose", "Garvit & Priyansh", "Single"),
  t("gp-02", "Theher Ja", "Garvit & Priyansh", "Single"),
  t("gp-03", "Rang", "Garvit & Priyansh", "Single"),
  t("gp-04", "Kagaz", "Garvit & Priyansh", "Single"),
  t("gp-05", "Saawan Bhi Tehra", "Garvit & Priyansh", "Single"),
  t("gp-06", "Manva Mera", "Garvit & Priyansh", "Single"),
  t("gp-07", "Mere Ranjhana", "Garvit & Priyansh", "Single"),
  t("gp-08", "Aasan Nahi", "Garvit & Priyansh", "Single"),
  t("gp-09", "Aitbaar", "Garvit & Priyansh", "Single"),
  t("gp-10", "Naam Ram Ka", "Garvit & Priyansh", "Single"),
  t("gp-11", "Savera", "Garvit & Priyansh", "Single"),
  t("gp-12", "Tera Rahoon", "Garvit & Priyansh", "Single"),
  t("gp-13", "Barkha Badariya", "Garvit & Priyansh", "Single"),
  t("gp-14", "Raaziyan", "Garvit & Priyansh", "Single"),
  t("gp-15", "Aao Zara", "Garvit & Priyansh", "Single"),
  t("gp-16", "Tu Aazma", "Garvit & Priyansh", "Single"),
  t("gp-17", "Khwabon Ke Rang", "Garvit & Priyansh", "Single"),
  t("gp-18", "Raahguzar", "Garvit & Priyansh", "Single"),
  t("gp-19", "Chal Bhool Ja", "Garvit & Priyansh", "Single"),
  t("gp-20", "Uska Pata", "Garvit & Priyansh", "Single"),
  t("gp-21", "Sanware", "Garvit & Priyansh", "Single"),
  t("gp-22", "Liya Mera", "Garvit & Priyansh", "Single"),
  t("gp-23", "Rasta", "Garvit & Priyansh", "Single"),
  t("gp-24", "Baaton Hi Baaton", "Garvit & Priyansh", "Single"),
  t("gp-25", "Keh Do Na", "Garvit & Priyansh", "Single"),
];

const kaavish: Track[] = [
  t("kv-01", "Chand Taray", "Kaavish", "Album"),
  t("kv-02", "Chaltay Rahein", "Kaavish", "Album"),
  t("kv-03", "Sun Zara", "Kaavish", "Album"),
  t("kv-04", "Bachpan", "Kaavish", "Album"),
  t("kv-05", "Tere Pyar Main", "Kaavish", "Album"),
  t("kv-06", "Miya Daikho", "Kaavish", "Album"),
  t("kv-07", "Moray Saiyaan", "Kaavish", "Album"),
  t("kv-08", "Daikho", "Kaavish", "Album"),
  t("kv-09", "Dil Main Moray", "Kaavish", "Album"),
  t("kv-10", "Koi Hai to Saheee", "Kaavish", "Album"),
  t("kv-11", "Saahar Milay Gee", "Kaavish", "Album"),
  t("kv-12", "Jhoot Hoga", "Kaavish", "Album"),
  t("kv-13", "Mujhay Maaf Karna", "Kaavish", "Album"),
  t("kv-14", "Mainay Chunaa Hai", "Kaavish", "Album"),
  t("kv-15", "Tairay Dum Say Hee", "Kaavish", "Album"),
  t("kv-16", "Nindiyan Re", "Kaavish", "Album"),
  t("kv-17", "Dareecha", "Kaavish", "Album"),
  t("kv-18", "Neun La Leya", "Kaavish", "Album"),
  t("kv-19", "Faasle", "Kaavish", "Album"),
  t("kv-20", "Baat Unkahii", "Kaavish", "Album"),
  t("kv-21", "Tere Pyaar Main", "Kaavish", "Album"),
  t("kv-22", "Tairay Naam", "Kaavish", "Album"),
  t("kv-23", "O Yaaraa", "Kaavish", "Album"),
  t("kv-24", "Rung", "Kaavish", "Album"),
  t("kv-25", "Intezaar", "Kaavish", "Album"),
];

const musafirCafe: Track[] = [
  t("mc-01", "Kaafi Hai Na", "Musafir Cafe", "Single"),
  t("mc-02", "Tera Hua Sahibaa", "Musafir Cafe", "Single"),
  t("mc-03", "Toota Rahunga", "Musafir Cafe", "Single"),
  t("mc-04", "Darmiyaan", "Musafir Cafe", "Single"),
  t("mc-05", "Musafir", "Musafir Cafe", "Single"),
];

export const playlists: Playlist[] = [
  {
    id: "garvit-priyansh",
    name: "Garvit • Priyansh",
    tracks: garvitPriyansh,
  },
  {
    id: "kaavish",
    name: "Kaavish",
    tracks: kaavish,
  },
  {
    id: "musafir-cafe",
    name: "Musafir Cafe",
    tracks: musafirCafe,
  },
];
