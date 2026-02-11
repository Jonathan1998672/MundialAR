window.onload = function() {
    const cameraEntity = document.getElementById('main-camera');
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (!isMobile) {
        cameraEntity.removeAttribute('look-controls');
        console.log("Modo PC: Fondo estático.");
    } else {
        console.log("Modo Celular: Movimiento 360 activado.");
    }
};

document.getElementById('scan-button').addEventListener('click', function() {
    const preview = document.getElementById('camera-preview');
    const frame = document.getElementById('scanner-frame');
    const startBtn = document.getElementById('scan-button');
    const reScanBtn = document.getElementById('re-scan-btn');
    const bar = document.getElementById('action-bar');

    navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
    })
    .then(function(stream) {
        frame.style.display = "block";
        startBtn.style.display = "none";

        let video = document.createElement('video');
        video.srcObject = stream;
        video.setAttribute("playsinline", true);
        video.play();
        preview.appendChild(video);

        // Simulamos que tras 2 segundos de escanear, el cuadro desaparece 
        // y se activan los botones de interacción
        setTimeout(() => {
            frame.style.display = "none";
            reScanBtn.style.display = "flex";
            bar.style.display = "flex";
        }, 2500);
    })
    .catch(function(err) {
        alert("Error de cámara: " + err);
    });
});

// El botón de arriba derecha reinicia el flujo
document.getElementById('re-scan-btn').addEventListener('click', function() {
    location.reload();
});