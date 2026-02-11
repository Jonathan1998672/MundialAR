// Al cargar la página, detectamos el dispositivo
window.onload = function() {
    const cameraEntity = document.getElementById('main-camera');
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (!isMobile) {
        // Si es PC, quitamos los controles de movimiento para que sea un fondo normal
        cameraEntity.removeAttribute('look-controls');
        console.log("Modo PC: Fondo estático.");
    } else {
        console.log("Modo Celular: Movimiento 360 activado.");
    }
};

// Lógica del botón de escaneo
document.getElementById('scan-button').addEventListener('click', function() {
    const preview = document.getElementById('camera-preview');
    const frame = document.getElementById('scanner-frame');
    const button = document.getElementById('scan-button');
    
    // Pedir acceso a la cámara trasera
    navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
    })
    .then(function(stream) {
        if (preview.querySelector('video')) return;

        // 1. Mostrar el marco cuadrado y OCULTAR el botón
        frame.style.display = "block";
        button.style.display = "none";

        // 2. Crear el elemento de video
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