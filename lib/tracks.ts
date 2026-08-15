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
  film: string,
  videoId: string = ""
): Track {
  return {
    id,
    title,
    artist,
    film,
    year: null,
    duration: 0,
    videoId,
  };
}

const garvitPriyansh: Track[] = [
  t("gp-01", "Kaahe Mose", "Garvit & Priyansh", "Single", "zx_3gmcskZo"),
  t("gp-02", "Theher Ja", "Garvit & Priyansh", "Single", "fXuZ9337dD8"),
  t("gp-03", "Rang", "Garvit & Priyansh", "Single", "x3njQe0dKrU"),
  t("gp-04", "Kagaz", "Garvit & Priyansh", "Single", "KurLNA6ZId4"),
  t("gp-05", "Saawan Bhi Tehra", "Garvit & Priyansh", "Single", "KurLNA6ZId4"),
  t("gp-06", "Manva Mera", "Garvit & Priyansh", "Single", "IlepIWvNHeo"),
  t("gp-07", "Mere Ranjhana", "Garvit & Priyansh", "Single", "oTfmkuWHE0g"),
  t("gp-08", "Aasan Nahi", "Garvit & Priyansh", "Single", "pw4OzEfvh-Q"),
  t("gp-09", "Aitbaar", "Garvit & Priyansh", "Single", "4ypwxjpyjTo"),
  t("gp-10", "Naam Ram Ka", "Garvit & Priyansh", "Single", "1E2bmeWM8ws"),
  t("gp-11", "Savera", "Garvit & Priyansh", "Single", "CS3oSzxMnYI"),
  t("gp-12", "Tera Rahoon", "Garvit & Priyansh", "Single", "8Ue6ZzIt9o8"),
  t("gp-13", "Barkha Badariya", "Garvit & Priyansh", "Single", "BrVBjqWOEvQ"),
  t("gp-14", "Raaziyan", "Garvit & Priyansh", "Single", "xNN8B3KqDAM"),
  t("gp-15", "Aao Zara", "Garvit & Priyansh", "Single", "cEtXFCkHh1Y"),
  t("gp-16", "Tu Aazma", "Garvit & Priyansh", "Single", "k5HqPyCWLek"),
  t("gp-17", "Khwabon Ke Rang", "Garvit & Priyansh", "Single", "8WslL9nVBF8"),
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
  t("kv-01", "Chand Taray", "Kaavish", "Album", "rn9aNVsABvc"),
  t("kv-02", "Chaltay Rahein", "Kaavish", "Album", "0jrikeZ7a5k"),
  t("kv-03", "Sun Zara", "Kaavish", "Album", "VsFjP58j5i8"),
  t("kv-04", "Bachpan", "Kaavish", "Album", "YMz4y8rQ4kU"),
  t("kv-05", "Tere Pyar Main", "Kaavish", "Album", "bYCz5ak_52Q"),
  t("kv-06", "Miya Daikho", "Kaavish", "Album", "eo15zjtbZLo"),
  t("kv-07", "Moray Saiyaan", "Kaavish", "Album", "vlM0AnQUzKs"),
  t("kv-08", "Daikho", "Kaavish", "Album", "-Ot2QrjWCzg"),
  t("kv-09", "Dil Main Moray", "Kaavish", "Album", "YE2Q5T4hap8"),
  t("kv-10", "Koi Hai to Saheee", "Kaavish", "Album", "pU5xSm335pE"),
  t("kv-11", "Saahar Milay Gee", "Kaavish", "Album", "2fVGYj1dWG8"),
  t("kv-12", "Jhoot Hoga", "Kaavish", "Album", "W9jc_7KjO04"),
  t("kv-13", "Mujhay Maaf Karna", "Kaavish", "Album"),
  t("kv-14", "Mainay Chunaa Hai", "Kaavish", "Album", "yYjm4BCIN9w"),
  t("kv-15", "Tairay Dum Say Hee", "Kaavish", "Album", "JqLFnz7C_Io"),
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
  t("mc-01", "Kaafi Hai Na", "Musafir Cafe", "Single", "cBJWmHOnBUo"),
  t("mc-02", "Tera Hua Sahibaa", "Musafir Cafe", "Single", "7eBlZElwBIk"),
  t("mc-03", "Toota Rahunga", "Musafir Cafe", "Single", "Gigpglm3XNw"),
  t("mc-04", "Darmiyaan", "Musafir Cafe", "Single", "R_qOxcqUYSw"),
  t("mc-05", "Musafir", "Musafir Cafe", "Single", "4tSiwIEQA9U"),
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