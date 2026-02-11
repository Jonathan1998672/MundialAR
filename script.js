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
const filterBtn = document.getElementById('btn-filters');
const filterPanel = document.getElementById('filter-panel');
const closeFilters = document.getElementById('close-filters');
const mainVideo = document.getElementById('world-cup-video');

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

statsBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    statsPanel.style.display = "flex";
});

closeStats.addEventListener('click', function() {
    statsPanel.style.display = "none";
});

btnMatches.addEventListener('click', function() {
    matchesContainer.style.display = "block";
});

filterBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    filterPanel.style.display = "flex";
    mainVideo.play();
});

closeFilters.addEventListener('click', function() {
    filterPanel.style.display = "none";
    mainVideo.pause();
});

function applyFilter(type) {
    mainVideo.className = "";
    
    if (type === 'blur') mainVideo.classList.add('f-blur');
    if (type === 'pixel') mainVideo.classList.add('f-pixel');
    if (type === 'thermal') mainVideo.classList.add('f-thermal');
    if (type === 'saturate') mainVideo.classList.add('f-saturate');
    
    console.log("Filtro aplicado: " + type);
}