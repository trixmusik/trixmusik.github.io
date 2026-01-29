// script.js - TRIX MUSIK V4.5

document.addEventListener("DOMContentLoaded", function() {
    let currentLang = localStorage.getItem('trix_lang') || 'fr';
    const pageID = document.body.getAttribute("data-page");

    // 1. Générer le Header
    genererHeader(pageID, currentLang);
    
    // 2. Générer le Footer
    genererFooter(currentLang);
    
    // 3. Traduire les textes statiques
    traduirePage(pageID, currentLang);

    // 4. Générer les Vidéos
    const gridContainer = document.querySelector(".grid");
    if (gridContainer && typeof VIDEOS_DATA !== 'undefined') {
        renderVideos(pageID, currentLang);
    }
    
    // 5. Compteur
    const namespace = "trixmusik_live_v4"; 
    fetch(`https://api.counterapi.dev/v1/${namespace}/${pageID || 'autre'}/up`).catch(e => {});
});

function genererHeader(activePage, lang) {
    const header = document.querySelector("header");
    if (!header) return;
    const t = TRADUCTIONS[lang] || TRADUCTIONS['fr']; 
    
    let flag = "🇫🇷";
    if(lang === 'en') flag = "🇬🇧";
    if(lang === 'es') flag = "🇪🇸";
    if(lang === 'it') flag = "🇮🇹";
    if(lang === 'de') flag = "🇩🇪";

    header.innerHTML = `
        <nav>
            <ul>
                <li><a href="index.html" class="${activePage === 'accueil' ? 'active' : ''}">${t.nav_home}</a></li>
                <li><a href="histoire.html" class="${activePage === 'histoire' ? 'active' : ''}">${t.nav_hist}</a></li>
                <li><a href="genres.html" class="${activePage === 'genres' ? 'active' : ''}">${t.nav_genre}</a></li>
                <li><a href="mao.html" class="${activePage === 'mao' ? 'active' : ''}">${t.nav_mao}</a></li>
                
                <!-- BOUTON QUANTUM AJOUTÉ ICI -->
                <li><a href="quantum.html" class="${activePage === 'quantum' ? 'active' : ''}" style="color:#02a6cf;">${t.nav_quantum}</a></li>
                
                <li><a href="contact.html" class="${activePage === 'contact' ? 'active' : ''}">${t.nav_contact}</a></li>
                <li><button class="lang-btn" onclick="cycleLang()" title="Changer de langue">${flag}</button></li>
            </ul>
        </nav>
    `;
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
        if(pageID === 'contact') { title.innerText = t.contact_title; sub.innerText = t.contact_sub; }
    }
}

function renderVideos(category, lang) {
    const container = document.querySelector(".grid");
    const videos = VIDEOS_DATA.filter(v => v.category === category);
    
    if(videos.length === 0) {
        container.innerHTML = "<p style='text-align:center; width:100%; opacity:0.6; padding:20px;'>Aucune vidéo disponible.</p>";
        return;
    }

    let html = "";
    videos.forEach(v => {
        let titre = (lang === 'fr') ? v.titre_fr : v.titre_en;
        let sub = (lang === 'fr') ? v.sous_titre_fr : v.sous_titre_en;
        if(!titre) titre = v.titre_fr;
        if(!sub) sub = v.sous_titre_fr;

        html += `
            <div class="card">
                <h3>${titre}</h3>
                <p style="font-size:0.9rem; color:#666; margin-bottom:10px;">${sub}</p>
                <div class="video-wrapper" onclick="this.innerHTML='<iframe src=\\'https://www.youtube.com/embed/${v.id}?autoplay=1\\' frameborder=\\'0\\' allowfullscreen></iframe>'">
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
    if(current === 'fr') next = 'en';
    else if(current === 'en') next = 'es';
    else if(current === 'es') next = 'it';
    else if(current === 'it') next = 'de';
    else if(current === 'de') next = 'fr';
    localStorage.setItem('trix_lang', next);
    location.reload();
}