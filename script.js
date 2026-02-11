window.onload = function() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const cameraEntity = document.getElementById('main-camera');

    if (!isMobile) {
        cameraEntity.removeAttribute('look-controls');
    }
};

const scanBtn = document.getElementById('scan-button');
const frame = document.getElementById('scanner-frame');
const reScanBtn = document.getElementById('re-scan-btn');
const actionBar = document.getElementById('action-bar');
const preview = document.getElementById('camera-preview');
const btnStats = document.getElementById("btn-stats");
const statsPanel = document.getElementById("stats-panel");
const statsContent = document.getElementById("stats-content");


scanBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
        scanBtn.style.setProperty("display", "none", "important");
        frame.style.display = "block";

        let video = document.createElement('video');
        video.srcObject = stream;
        video.setAttribute("playsinline", true);
        video.play();
        preview.innerHTML = ""; 
        preview.appendChild(video);
    })
    .catch(err => alert("Error de cámara: " + err));
});

frame.addEventListener('click', function(e) {
    e.stopPropagation();
    
    frame.style.display = "none"; 
    reScanBtn.style.setProperty("display", "flex", "important");
    actionBar.style.setProperty("display", "flex", "important");
});

reScanBtn.addEventListener('click', function() {
    location.reload();
});

const mexicoData = {
  "team": {
    "name": "Selección Nacional de México",
    "short_name": "México",
    "nickname": "El Tri",
    "country": "México",
    "confederation": "Concacaf",
    "founded": 1927,
    "fifa_code": "MEX",
    "stadium_home": "Estadio Azteca",
    "coach": "Jaime Lozano",
    "captain": "Guillermo Ochoa",
    "fifa_world_cup_appearances": 17,
    "best_world_cup_finish": "Cuartos de Final (1970 y 1986)",
    "concacaf_titles": 12,
    "official_colors": ["Verde", "Blanco", "Rojo"],
    "description": "La Selección Mexicana es una de las potencias históricas de la Concacaf..."
  },
  "confirmed_matches_in_mexico": {
    "friendly_before_world_cup": {
      "match": {
        "home_team": "México",
        "away_team": "Islandia",
        "date": "2026-02-25",
        "day": "Miércoles",
        "time_local": "20:00",
        "stadium": {
          "name": "Estadio La Corregidora",
          "city": "Querétaro",
          "google_maps_link": "https://maps.google.com/?q=Estadio+La+Corregidora+Querétaro"
        }
      }
    },
    "world_cup_2026": {
      "group_stage_matches": [
        {
          "home_team": "México",
          "away_team": "Sudáfrica",
          "date": "2026-06-11",
          "day": "Jueves",
          "time_local": "13:00",
          "stadium": {
            "name": "Estadio Azteca",
            "city": "Ciudad de México",
            "google_maps_link": "https://maps.google.com/?q=Estadio+Azteca+Ciudad+de+Mexico"
          }
        }
      ]
    }
  }
};

btnStats.addEventListener("click", function() {

    const team = mexicoData.team;

    statsContent.innerHTML = `
        <h2>${team.name}</h2>
        <p><strong>Apodo:</strong> ${team.nickname}</p>
        <p><strong>DT:</strong> ${team.coach}</p>
        <p><strong>Capitán:</strong> ${team.captain}</p>
        <p><strong>Fundación:</strong> ${team.founded}</p>
        <p>${team.description}</p>

        <button id="ver-partidos">Ver Partidos en México ⚽</button>
        <br><br>
        <button onclick="cerrarStats()">Cerrar</button>
    `;

    statsPanel.style.display = "block";

    document.getElementById("ver-partidos").addEventListener("click", mostrarPartidos);
});

function mostrarPartidos() {

    let html = `<h2>Partidos en México</h2>`;

    const friendly = mexicoData.confirmed_matches_in_mexico.friendly_before_world_cup.match;

    html += `
        <p><strong>${friendly.home_team} vs ${friendly.away_team}</strong></p>
        <p>${friendly.day} ${friendly.date} - ${friendly.time_local}</p>
        <a href="${friendly.stadium.google_maps_link}" target="_blank">Ver Estadio</a>
        <hr>
    `;

    mexicoData.confirmed_matches_in_mexico.world_cup_2026.group_stage_matches.forEach(match => {
        html += `
            <p><strong>${match.home_team} vs ${match.away_team}</strong></p>
            <p>${match.day} ${match.date} - ${match.time_local}</p>
            <a href="${match.stadium.google_maps_link}" target="_blank">Ver Estadio</a>
            <hr>
        `;
    });

    html += `<button onclick="cerrarStats()">Cerrar</button>`;

    statsContent.innerHTML = html;
}

function cerrarStats() {
    statsPanel.style.display = "none";
}

