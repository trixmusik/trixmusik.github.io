// script.js - TRIX MUSIK V5.5 (Menu Accueil Limité)

document.addEventListener("DOMContentLoaded", function() {
    let currentLang = localStorage.getItem('trix_lang') || 'fr';
    const pageID = document.body.getAttribute("data-page");

    // 1. Générer le Header
    genererHeader(pageID, currentLang);
    
    // 2. Générer le Footer
    genererFooter(currentLang);
    
    // 3. Traduire
    traduirePage(pageID, currentLang);

    // 4. Vidéos (Seulement si grid existe)
    const gridContainer = document.querySelector(".grid");
    if (gridContainer && typeof VIDEOS_DATA !== 'undefined') {
        renderVideos(pageID, currentLang);
    }
});

function genererHeader(activePage, lang) {
    const header = document.querySelector("header");
    if (!header) return;
    const t = TRADUCTIONS[lang] || TRADUCTIONS['fr']; 
    
    let flag = "🇫🇷";
    if(lang === 'en') flag = "🇬🇧"; if(lang === 'es') flag = "🇪🇸";
    if(lang === 'it') flag = "🇮🇹"; if(lang === 'de') flag = "🇩🇪";

    // MENU SPÉCIAL ACCUEIL (Juste le drapeau)
    if (activePage === 'accueil') {
        header.innerHTML = `
            <nav>
                <ul>
                    <!-- Menu vide, juste le drapeau -->
                    <li><button class="lang-btn" onclick="cycleLang()" title="Langue">${flag}</button></li>
                </ul>
            </nav>
        `;
    } else {
        // MENU COMPLET (Pour les autres pages)
        header.innerHTML = `
            <nav>
                <ul>
                    <li><a href="index.html">${t.nav_home}</a></li>
                    <li><a href="trix-musik.html" class="${activePage === 'trix-musik' ? 'active' : ''}" style="color:#02a6cf;">${t.nav_musik}</a></li>
                    <li><a href="mao.html" class="${activePage === 'mao' ? 'active' : ''}">${t.nav_mao}</a></li>
                    <li><a href="quantum.html" class="${activePage === 'quantum' ? 'active' : ''}">${t.nav_quantum}</a></li>
                    <li><a href="contact.html" class="${activePage === 'contact' ? 'active' : ''}">${t.nav_contact}</a></li>
                    <li><button class="lang-btn" onclick="cycleLang()" title="Changer de langue">${flag}</button></li>
                </ul>
            </nav>
        `;
    }
}

function genererFooter(lang) {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const t = TRADUCTIONS[lang] || TRADUCTIONS['fr'];
    footer.innerHTML = `
        <div class="donation-section">
            <h3>${t.footer_title}</h3>
            <a href="#" class="btn-donate btn-paypal" target="_blank">${t.btn_donate_paypal}</a>
            <a href="#" class="btn-donate btn-tipeee" target="_blank">${t.btn_donate_tipeee}</a>
        </div>
        <p style="opacity:0.6; font-size:0.8rem; margin-top:20px;">${t.rights}</p>
    `;
}

function traduirePage(pageID, lang) {
    const t = TRADUCTIONS[lang] || TRADUCTIONS['fr'];
    const heroP = document.querySelector(".hero p");
    if(heroP) heroP.innerText = t.hero_slogan;
    const title = document.querySelector(".section-header h2");
    const sub = document.querySelector(".section-header p");
    
    if(title && sub) {
        if(pageID === 'histoire') { title.innerText = t.hist_title; sub.innerText = t.hist_sub; }
        if(pageID === 'genres') { title.innerText = t.genre_title; sub.innerText = t.genre_sub; }
        if(pageID === 'mao') { title.innerText = t.mao_title; sub.innerText = t.mao_sub; }
        if(pageID === 'trix-musik') { title.innerText = t.musik_title; sub.innerText = t.musik_sub; }
        if(pageID === 'contact') { title.innerText = t.contact_title; sub.innerText = t.contact_sub; }
    }
}

function renderVideos(category, lang) {
    const container = document.querySelector(".grid");
    // On ignore ces pages pour le rendu automatique classique
    if(category === 'trix-musik' || category === 'quantum' || category === 'contact' || category === 'accueil') return;
    
    // Si on est sur une page "Docu" spécifique (ex: eurodance), on charge les archives correspondantes
    // Note: Pour simplifier, la page docu-eurodance utilise la catégorie 'histoire'
    let filterCat = category;
    if(category === 'docu-eurodance') filterCat = 'histoire'; 

    const videos = VIDEOS_DATA.filter(v => v.category === filterCat);
    
    if(videos.length === 0) {
        container.innerHTML = "<p style='opacity:0.6; padding:20px;'>Bientôt disponible.</p>";
        return;
    }

    let html = "";
    videos.forEach(v => {
        let titre = (lang === 'fr') ? v.titre_fr : v.titre_en;
        let sub = (lang === 'fr') ? v.sous_titre_fr : v.sous_titre_en;
        html += `
            <div class="card">
                <h3>${titre}</h3>
                <p style="font-size:0.9rem; color:#666; margin-bottom:10px;">${sub}</p>
                <div class="video-wrapper" onclick="this.innerHTML='<iframe src=\\'https://www.youtube.com/embed/${v.id}?autoplay=1\\' frameborder=\\'0\\' allow=\\'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\\' allowfullscreen></iframe>'">
                    <img src="https://img.youtube.com/vi/${v.id}/hqdefault.jpg" alt="video thumbnail">
                    <div class="play-button"></div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function cycleLang() {
    let current = localStorage.getItem('trix_lang') || 'fr';
    let next = 'fr';
    if(current === 'fr') next = 'en'; else if(current === 'en') next = 'es';
    else if(current === 'es') next = 'it'; else if(current === 'it') next = 'de';
    else if(current === 'de') next = 'fr';
    localStorage.setItem('trix_lang', next);
    location.reload();
}