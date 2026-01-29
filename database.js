// database.js - TRIX MUSIK V4.5

const TRADUCTIONS = {
    fr: {
        nav_home: "Accueil", nav_hist: "Histoire", nav_genre: "Genres", nav_mao: "Trix M.A.O.", nav_quantum: "Trix Quantum", nav_contact: "Contact",
        hero_slogan: "Le site dédié à la musique", footer_title: "Soutenir le projet",
        btn_donate_paypal: "Faire un don PayPal", btn_donate_tipeee: "Me soutenir sur Tipeee", rights: "© 2026 - TRIX MUSIK",
        hist_title: "L'Histoire des genres musicaux", hist_sub: "Découvrez l'histoire des genres",
        genre_title: "Guides des genres musicaux", genre_sub: "Un petit voyage à travers les différents genres",
        mao_title: "Trix M.A.O.", mao_sub: "Tutoriels et Production.",
        contact_title: "Contactez-nous", contact_sub: "Envoyez-nous un message."
    },
    en: {
        nav_home: "Home", nav_hist: "History", nav_genre: "Genres", nav_mao: "Trix M.A.O.", nav_quantum: "Trix Quantum", nav_contact: "Contact",
        hero_slogan: "The website dedicated to music", footer_title: "Support the project",
        btn_donate_paypal: "Donate via PayPal", btn_donate_tipeee: "Support on Tipeee", rights: "© 2026 - TRIX MUSIK",
        hist_title: "History of Musical Genres", hist_sub: "Discover the history of genres",
        genre_title: "Musical Genre Guides", genre_sub: "A small journey through different genres",
        mao_title: "Trix M.A.O.", mao_sub: "Tutorials and Production.",
        contact_title: "Contact Us", contact_sub: "Send us a message."
    },
    es: {
        nav_home: "Inicio", nav_hist: "Historia", nav_genre: "Géneros", nav_mao: "Trix M.A.O.", nav_quantum: "Trix Quantum", nav_contact: "Contacto",
        hero_slogan: "El sitio dedicado a la música", footer_title: "Apoyar el proyecto",
        btn_donate_paypal: "Donar con PayPal", btn_donate_tipeee: "Apoyar en Tipeee", rights: "© 2026 - TRIX MUSIK",
        hist_title: "Historia de los géneros musicales", hist_sub: "Descubre la historia de los géneros",
        genre_title: "Guías de géneros musicales", genre_sub: "Un pequeño viaje a través de los diferentes géneros",
        mao_title: "Trix M.A.O.", mao_sub: "Tutoriales y Producción.",
        contact_title: "Contáctenos", contact_sub: "Envíenos un mensaje."
    },
    it: {
        nav_home: "Home", nav_hist: "Storia", nav_genre: "Generi", nav_mao: "Trix M.A.O.", nav_quantum: "Trix Quantum", nav_contact: "Contatto",
        hero_slogan: "Il sito dedicato alla musica", footer_title: "Sostieni il progetto",
        btn_donate_paypal: "Fai una donazione", btn_donate_tipeee: "Sostienimi su Tipeee", rights: "© 2026 - TRIX MUSIK",
        hist_title: "Storia dei generi musicali", hist_sub: "Scopri la storia dei generi",
        genre_title: "Guide ai generi musicali", genre_sub: "Un piccolo viaggio attraverso i diversi generi",
        mao_title: "Trix M.A.O.", mao_sub: "Tutorial e Produzione.",
        contact_title: "Contattaci", contact_sub: "Inviaci un messaggio."
    },
    de: {
        nav_home: "Startseite", nav_hist: "Geschichte", nav_genre: "Genres", nav_mao: "Trix M.A.O.", nav_quantum: "Trix Quantum", nav_contact: "Kontakt",
        hero_slogan: "Die Website für Musik", footer_title: "Projekt unterstützen",
        btn_donate_paypal: "Spenden mit PayPal", btn_donate_tipeee: "Unterstütze mich auf Tipeee", rights: "© 2026 - TRIX MUSIK",
        hist_title: "Geschichte der Musikgenres", hist_sub: "Entdecken Sie die Geschichte der Genres",
        genre_title: "Musikgenre-Guides", genre_sub: "Eine kleine Reise durch verschiedene Genres",
        mao_title: "Trix M.A.O.", mao_sub: "Tutorials und Produktion.",
        contact_title: "Kontaktieren Sie uns", contact_sub: "Senden Sie uns eine Nachricht."
    }
};

const VIDEOS_DATA = [
    // --- HISTOIRE (Eurodance Saga) ---
    { id: "KCxpb2f837g", titre_fr: "HISTOIRE DE L'EURODANCE #7", titre_en: "HISTORY OF EURODANCE #7", sous_titre_fr: "La réincarnation", sous_titre_en: "Reincarnation", category: "histoire" },
    { id: "MnrdVWSZuxU", titre_fr: "HISTOIRE DE L'EURODANCE #6", titre_en: "HISTORY OF EURODANCE #6", sous_titre_fr: "Vers l'Eurotrance", sous_titre_en: "Towards Eurotrance", category: "histoire" },
    { id: "JA1UhFn8KkA", titre_fr: "HISTOIRE DE L'EURODANCE #5", titre_en: "HISTORY OF EURODANCE #5", sous_titre_fr: "La mort de l'Eurodance", sous_titre_en: "Death of Eurodance", category: "histoire" },
    { id: "1_eU_aHu13Q", titre_fr: "HISTOIRE DE L'EURODANCE #4", titre_en: "HISTORY OF EURODANCE #4", sous_titre_fr: "L'odyssée suit son court", sous_titre_en: "The odyssey continues", category: "histoire" },
    { id: "JnAFWie69i8", titre_fr: "HISTOIRE DE L'EURODANCE #3", titre_en: "HISTORY OF EURODANCE #3", sous_titre_fr: "L'explosion", sous_titre_en: "The explosion", category: "histoire" },
    { id: "wJzFqW7_qS0", titre_fr: "HISTOIRE DE L'EURODANCE #2", titre_en: "HISTORY OF EURODANCE #2", sous_titre_fr: "Le début de l'age d'or", sous_titre_en: "Start of Golden Age", category: "histoire" },
    { id: "8v_4O6XkI6M", titre_fr: "HISTOIRE DE L'EURODANCE #1", titre_en: "HISTORY OF EURODANCE #1", sous_titre_fr: "Les origines", sous_titre_en: "Origins", category: "histoire" },
    
    // --- GENRES ---
    { id: "sA6OknupuHM", titre_fr: "Guide HOUSE", titre_en: "HOUSE Guide", sous_titre_fr: "Découvrez tous les genres House", sous_titre_en: "Discover all House genres", category: "genres" },
    { id: "FPNY-cPU7HM", titre_fr: "Guide PSYTRANCE", titre_en: "PSYTRANCE Guide", sous_titre_fr: "Voyagez à travers les sous-genres", sous_titre_en: "Journey through subgenres", category: "genres" },
    { id: "4UcRVUCjp9k", titre_fr: "Guide TRANCE", titre_en: "TRANCE Guide", sous_titre_fr: "Voyagez à travers les genres Trance", sous_titre_en: "Journey through Trance", category: "genres" },
    { id: "VHPihNBaso0", titre_fr: "Guide RAP", titre_en: "RAP Guide", sous_titre_fr: "Les dernières évolution du Rap", sous_titre_en: "Latest Rap evolution", category: "genres" },

    // --- TRIX M.A.O. ---
    { id: "weKrklMTYjI", titre_fr: "Tutoriel Trix MAO", titre_en: "Trix MAO Tutorial", sous_titre_fr: "Techniques de prod", sous_titre_en: "Production tips", category: "mao" },
    { id: "r2ZeEuMVbVc", titre_fr: "Tutoriel Trix MAO", titre_en: "Trix MAO Tutorial", sous_titre_fr: "Techniques de prod", sous_titre_en: "Production tips", category: "mao" },
    { id: "Lthtsr7u6HI", titre_fr: "Tutoriel Trix MAO", titre_en: "Trix MAO Tutorial", sous_titre_fr: "Techniques de prod", sous_titre_en: "Production tips", category: "mao" },
    { id: "VAX3CX64Uxs", titre_fr: "Tutoriel Trix MAO", titre_en: "Trix MAO Tutorial", sous_titre_fr: "Techniques de prod", sous_titre_en: "Production tips", category: "mao" },
    { id: "-hyF6wlsYqg", titre_fr: "Tutoriel Trix MAO", titre_en: "Trix MAO Tutorial", sous_titre_fr: "Techniques de prod", sous_titre_en: "Production tips", category: "mao" },
    { id: "f57DKwC_LRU", titre_fr: "Tutoriel Trix MAO", titre_en: "Trix MAO Tutorial", sous_titre_fr: "Techniques de prod", sous_titre_en: "Production tips", category: "mao" },
    { id: "u3oJMWpdenA", titre_fr: "Tutoriel Trix MAO", titre_en: "Trix MAO Tutorial", sous_titre_fr: "Techniques de prod", sous_titre_en: "Production tips", category: "mao" },
    { id: "vqCzkrOCS9g", titre_fr: "Tutoriel Trix MAO", titre_en: "Trix MAO Tutorial", sous_titre_fr: "Techniques de prod", sous_titre_en: "Production tips", category: "mao" },
    { id: "dB3ZdHFdtLs", titre_fr: "Tutoriel Trix MAO", titre_en: "Trix MAO Tutorial", sous_titre_fr: "Techniques de prod", sous_titre_en: "Production tips", category: "mao" },
    { id: "kEZDDfaHKh0", titre_fr: "Tutoriel Trix MAO", titre_en: "Trix MAO Tutorial", sous_titre_fr: "Techniques de prod", sous_titre_en: "Production tips", category: "mao" },
    { id: "V2cAkJJMSOo", titre_fr: "Tutoriel Trix MAO", titre_en: "Trix MAO Tutorial", sous_titre_fr: "Techniques de prod", sous_titre_en: "Production tips", category: "mao" },
    { id: "ui5_QM_240I", titre_fr: "Tutoriel Trix MAO", titre_en: "Trix MAO Tutorial", sous_titre_fr: "Techniques de prod", sous_titre_en: "Production tips", category: "mao" },
    { id: "dREwBVSQ1tQ", titre_fr: "Tutoriel Trix MAO", titre_en: "Trix MAO Tutorial", sous_titre_fr: "Techniques de prod", sous_titre_en: "Production tips", category: "mao" },
    { id: "I9cpzmgWgms", titre_fr: "Tutoriel Trix MAO", titre_en: "Trix MAO Tutorial", sous_titre_fr: "Techniques de prod", sous_titre_en: "Production tips", category: "mao" },
    { id: "zRjfloH3CKY", titre_fr: "Tutoriel Trix MAO", titre_en: "Trix MAO Tutorial", sous_titre_fr: "Techniques de prod", sous_titre_en: "Production tips", category: "mao" },
    { id: "yk0CvLXKVwE", titre_fr: "Tutoriel Trix MAO", titre_en: "Trix MAO Tutorial", sous_titre_fr: "Techniques de prod", sous_titre_en: "Production tips", category: "mao" }
];