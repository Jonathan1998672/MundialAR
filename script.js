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
    const button = document.getElementById('scan-button');
    navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
    })

    .then(function(stream) {
        if (preview.querySelector('video')) return;
        frame.style.display = "block";
        button.style.display = "none";
        let video = document.createElement('video');
        video.srcObject = stream;
        video.setAttribute("playsinline", true);
        video.play();
        preview.appendChild(video);
        console.log("Escáner activado correctamente");
    })

    .catch(function(err) {
        console.error("Error de cámara: ", err);
        alert("No se pudo acceder a la cámara. Asegúrate de dar permisos o usar HTTPS.");
    });
});