/* script.js - CORRIGÉ */

document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. COMPTEUR ---
    let pageID = document.body.getAttribute("data-page");
    if (!pageID) pageID = "autre"; 
    const namespace = "trixmusik_live_v1"; 

    // On incrémente le compteur via l'API
    fetch(`https://api.counterapi.dev/v1/${namespace}/${pageID}/up`)
        .then(response => response.json())
        .then(data => {
            verifierEtAfficherGlobal(namespace);
        })
        .catch(err => console.log("Compteur silencieux (Erreur réseau ou bloqueur de pub)"));

    // --- 2. GENERATION DES VIDEOS ---
    const container = document.querySelector(".grid");
    if (container) {
        const videos = [
          { id: "KCxpb2f837g", titre: "HISTOIRE DE L'EURODANCE #7", sous_titre: "Le groove originel", pages: ["accueil", "histoire"] },
          { id: "MnrdVWSZuxU", titre: "HISTOIRE DE L'EURODANCE #6", sous_titre: "Le groove originel", pages: ["accueil", "histoire"] },
          { id: "JA1UhFn8KkA", titre: "HISTOIRE DE L'EURODANCE #5", sous_titre: "Le groove originel", pages: ["accueil", "histoire"] },
          { id: "sA6OknupuHM", titre: "Ultimate guide of HOUSE", sous_titre: "Le groove originel", pages: ["accueil", "genres"] },
          { id: "1_eU_aHu13Q", titre: "HISTOIRE DE L'EURODANCE #4", sous_titre: "Le groove originel", pages: ["accueil", "histoire"] }, 
          { id: "JnAFWie69i8", titre: "HISTOIRE DE L'EURODANCE #3", sous_titre: "Le groove originel", pages: ["accueil", "histoire"] }, 
          { id: "FPNY-cPU7HM", titre: "Ultimate guide of PSYTRANCE", sous_titre: "Le groove originel", pages: ["accueil", "genres"] },
          { id: "S9tCCe9N4jU", titre: "HISTOIRE DE L'EURODANCE #2", sous_titre: "Le groove originel", pages: ["accueil", "histoire"] },
          { id: "u-ASIruTZmk", titre: "HISTOIRE DE L'EURODANCE #1", sous_titre: "L'apogée du rythme", pages: ["accueil", "histoire"] },
          { id: "4UcRVUCjp9k", titre: "Ultimate guide of TRANCE", sous_titre: "Mélodies et émotions", pages: ["accueil", "genres"] },
          { id: "VHPihNBaso0", titre: "Mini guide of RAP", sous_titre: "On the street", pages: ["accueil", "genres"] }
        ];

        let contenuFinal = "";
        videos.forEach(video => {
            if (video.pages.includes(pageID)) {
                // CORRECTION ICI : L'URL de l'image était cassée
                contenuFinal += `
                    <div class="card">
                        <h3>${video.titre}</h3>
                        <p class="subtitle">${video.sous_titre}</p>
                        <div class="video-wrapper" onclick="chargerVideo(this, '${video.id}')">
                            <img src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg" alt="${video.titre}" class="thumbnail">
                            <div class="play-button"></div>
                        </div>
                    </div>
                `;
            }
        });
        container.innerHTML = contenuFinal;
    }
});

// --- FONCTIONS ---

function chargerVideo(wrapper, videoId) {
    // CORRECTION ICI : L'URL src manquait dans l'iframe
    wrapper.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
        title="Lecteur vidéo" frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen></iframe>
    `;
}

function verifierEtAfficherGlobal(namespace) {
    // Vérifie si "?admin=trix" est dans l'URL
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.has('admin') && urlParams.get('admin') === 'trix') {
        const boite = document.getElementById('compteur-secret');
        if (!boite) return;
        
        boite.style.display = "block";
        boite.innerHTML = "Chargement des données...";
        
        const pagesList = ["accueil", "histoire", "genres", "contact"];
        
        // Récupère les stats de toutes les pages
        const requetes = pagesList.map(page => 
            fetch(`https://api.counterapi.dev/v1/${namespace}/${page}`)
                .then(res => res.json())
                .then(data => ({ page: page, count: data.count }))
                .catch(() => ({ page: page, count: 0 }))
        );

        Promise.all(requetes).then(resultats => {
            let totalGlobal = 0;
            let html = `<div style="text-align:left;"><strong>ADMIN DASHBOARD</strong><hr style="border-color:#00ff00;">`;
            resultats.forEach(item => {
                html += `${item.page.toUpperCase()} : <strong>${item.count}</strong><br>`;
                totalGlobal += item.count;
            });
            html += `<hr style="border-color:#00ff00;">TOTAL SITE : <strong>${totalGlobal}</strong></div>`;
            boite.innerHTML = html;
        });
    }
}