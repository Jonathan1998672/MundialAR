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

const statsBtn = document.getElementById('btn-stats');
const statsPanel = document.getElementById('stats-panel');
const closeStats = document.getElementById('close-stats');
const btnMatches = document.getElementById('btn-matches');
const matchesContainer = document.getElementById('matches-container');

// Abrir panel
statsBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    statsPanel.style.display = "flex";
});

// Cerrar panel
closeStats.addEventListener('click', function() {
    statsPanel.style.display = "none";
});

// Mostrar partidos
btnMatches.addEventListener('click', function() {
    matchesContainer.style.display = "block";
});
