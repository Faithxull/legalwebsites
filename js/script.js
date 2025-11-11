document.addEventListener('DOMContentLoaded', () => {

  // Get DOM elements
  const cardsContainer = document.getElementById('cards');
  const categoryTitle = document.getElementById('category-title');
  const categories = document.querySelectorAll('.categories li');
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');

  // If critical elements are missing, abort and log to console
  if (!cardsContainer || !categoryTitle || !sidebar || !hamburger) {
    console.warn('One or more UI elements are missing (cards, category-title, sidebar, hamburger). Check your HTML IDs/classes.');
    return;
  }

  const websites = {
    "Movies & Shows": [
      { name: "1Shows", url: "https://www.1shows.ru/" },
      { name: "Flicky Stream", url: "https://flickystream.ru/" },
      { name: "RG Shows", url: "https://www.rgshows.ru/" },
      { name: "Rivestream", url: "https://rivestream.org/" },
      { name: "Spenflix", url: "https://watch.spencerdevs.xyz/" },
      { name: "Myflixer", url: "https://myflixerz.to/" },
      { name: "Netnaija", url: "https://netnaija.video/" },
      { name: "Cineby", url: "https://cineby.app/" },
      { name: "Filmcave", url: "https://filmcave.net/" },
      { name: "Fmovies", url: "https://fmovies-hd.to/" },
      { name: "Cinema Deck", url: "https://cinemadeck.com/" },
      { name: "Vexo.to", url: "https://vexo.to/" },
      { name: "Xprime", url: "https://xprime.tv/" },
      { name: "Hexa", url: "https://hexa.watch/" },
      { name: "Smashystream", url: "https://smashystream.xyz/" },
      { name: "Lordflix.cc", url: "https://lordflix.club/" },
      { name: "P-stream", url: "https://pstream.mov/" },
      { name: "Rar.to Nepu", url: "https://nepu.to" },
      { name: "Willow", url: "https://willow.arlen.icu/" }
    ],

    "Anime": [
      { name: "Miruro", url: "https://miruro.to/" },
      { name: "T Anime", url: "https://tanime.tv/" },
      { name: "Hianime", url: "https://hianime.to/" },
      { name: "Enma", url: "https://enma.lol/" },
      { name: "Animetsu", url: "https://animetsu.cc/" },
      { name: "Aniwatch", url: "https://aniwatchtv.to/" },
      { name: "Kaido", url: "https://kaido.to/" },
      { name: "Anicrush", url: "https://anicrush.to/" },
      { name: "Kaa", url: "https://kaa.to/" },
      { name: "Animekai", url: "https://animekai.to/" },
    ],

    "K-Drama": [
      { name: "KissAsianTV", url:"https://kissasiantv.xin/"},
      { name: "Asiaflix", url: "https://asiaflix.net/home"},
      { name: "KissAsian", url: "https://ww13.kissasian.com.lv/"},
      { name: "KissKH", url: "https://kisskh.ws/"},
      { name: "Dramafull", url: "https://dramafull.cc/"},
      { name: "Asianc", url: "https://asianctv.net/"},
    ],

    "Manga": [
      { name: "MangaDex", url: "https://mangadex.org/" },
      { name: "Comick", url: "https://comick.io/" },
      { name: "MangaReader.to", url: "https://mangareader.to/" },
      { name: "Bato.to", url: "https://bato.to/" },
      { name: "Mangago", url: "https://mangago.com/" },
      { name: "MangaFire.to", url: "https://mangafire.to/" },
      { name: "All Manga", url: "https://allmanga.to/" },
      { name: "MangaKakalot", url: "https://mangakakalot.gg/" },
      { name: "AsuraComic", url: "https://asuracomic.net/" },
      { name: "MangaHub", url: "https://mangahub.io/" },
      { name: "MangaPark", url: "https://mangapark.io/" },
      { name: "Weeb Central", url: "https://weebcentral.com/" },
      { name: "Manga Katana", url: "https://mangakatana.com/" },
      { name: "Vexo.to", url: "https://vexo.to/" }
    ],
    
    "Books": [
      { name: "LibGen", url: "https://libgen.li/" },
      { name: "Anna's Archive", url: "https://annas-archive.org/" },
      { name: "Z-Library", url: "https://z-library.co/" }
    ],

    "Games": [
      { name: "SteamRip", url: "https://steamrip.com/" },
      { name: "FitGirl Repacks", url: "https://fitgirl-repacks.site/" },
      { name: "Dodi Repacks", url: "https://dodi-repacks.site/" },
      { name: "Free GOG PC Games", url: "https://freegogpcgames.com/" },
      { name: "GOG Games", url: "https://gog-games.to/" },
      { name: "AnkerGames", url: "https://ankergames.net/" },
      { name: "OVA Games", url: "https://www.ovagames.com/" },
      { name: "GamesDrive", url: "https://gamesdrive.net/" },
      { name: "R-ROMs", url: "https://r-roms.github.io/" }
    ],

    "Live TV": [
      { name: "TheTVApp", url: "https://thetvapp.to/" },
      { name: "TV247", url: "https://tv247.us/" },
      { name: "DaddyLiveHD", url: "https://dlhd.click" },
      { name: "NTV", url: "https://ntvstream.cx/" },
      { name: "PublicIPTV", url: "https://publiciptv.com/" },
      { name: "SportPlus", url: "https://en12.sportplus.live/" },
      { name: "StreamEast", url: "https://the.streameast.app/v86" },
      { name: "SportsSurge", url: "https://v2.sportsurge.net/home5/" },
      { name: "TVGarden", url: "https://tv.garden" },
      { name: "ToTV", url: "https://totv.org/" },
      { name: "1Shows", url: "https://www.1shows.ru/livetv" },
      { name: "GTV", url: "https://globetv.app/" }
    ]
  };

  // Card rendering
  function renderCards(category) {
    if (!websites[category]) {
      cardsContainer.innerHTML = '<p style="text-align:center;opacity:.6">No sites found for this category.</p>';
      return;
    }

    cardsContainer.innerHTML = '';
    websites[category].forEach(site => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.textContent = site.name;
      card.addEventListener('click', () => {
        window.open(site.url, '_blank');
      });
      cardsContainer.appendChild(card);
    });
  }

  // Initial render
  renderCards("Movies & Shows");

  // Category click handling
  categories.forEach(cat => {
    cat.addEventListener('click', () => {
      categories.forEach(c => c.classList.remove('active'));
      cat.classList.add('active');
      categoryTitle.textContent = cat.textContent;
      renderCards(cat.textContent);

      if (window.innerWidth <= 768) {
        sidebar.classList.remove('open');
      }
    });
  });

  // Sidebar responsive behavior
  function setSidebarForScreen() {
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('open');
    } else {
      sidebar.classList.add('open');
    }
  }

  // Initial check and resize
  setSidebarForScreen();
  window.addEventListener('resize', setSidebarForScreen);

  // toggle sidebar
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
      if (!sidebar.contains(e.target) && e.target !== hamburger) {
        sidebar.classList.remove('open');
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && window.innerWidth <= 768 && sidebar.classList.contains('open')) {
      sidebar.classList.remove('open');
    }
  });

});
