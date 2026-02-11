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
scanBtn.addEventListener('click', function() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
        scanBtn.style.display = "none";
        frame.style.display = "block"; // Aparece el cuadro cuadrado

        let video = document.createElement('video');
        video.srcObject = stream;
        video.setAttribute("playsinline", true);
        video.play();
        preview.innerHTML = ""; // Limpiar antes de agregar
        preview.appendChild(video);
    })
    .catch(err => alert("Error de cámara: " + err));
});

// 2. Al presionar el cuadro con la cámara, este desaparece y sale la barra
frame.addEventListener('click', function() {
    frame.style.display = "none";      // Desaparece el cuadro
    reScanBtn.style.display = "flex";  // Aparece botón arriba derecha
    actionBar.style.display = "flex";  // Aparece barra inferior
});

// 3. Reiniciar flujo
reScanBtn.addEventListener('click', function() {
    location.reload();
});