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

// 1. Activar la cámara dentro del cuadro
scanBtn.addEventListener('click', function(e) {
    e.stopPropagation(); // Evita que el clic se propague a otros elementos
    
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
        scanBtn.style.setProperty("display", "none", "important");
        frame.style.display = "block"; // Solo mostramos el cuadro

        let video = document.createElement('video');
        video.srcObject = stream;
        video.setAttribute("playsinline", true);
        video.play();
        preview.innerHTML = ""; 
        preview.appendChild(video);
    })
    .catch(err => alert("Error de cámara: " + err));
});

// 2. Al presionar el cuadro con la cámara, este desaparece y sale la barra
frame.addEventListener('click', function(e) {
    e.stopPropagation();
    
    frame.style.display = "none"; 
    // Usamos setProperty para sobreescribir el !important del CSS
    reScanBtn.style.setProperty("display", "flex", "important");
    actionBar.style.setProperty("display", "flex", "important");
});

// 3. Reiniciar flujo
reScanBtn.addEventListener('click', function() {
    location.reload();
});