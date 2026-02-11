document.getElementById('scan-button').addEventListener('click', function() {
    const preview = document.getElementById('camera-preview');
    
    // Pedimos la cámara
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(function(stream) {
            // Si ya hay un video, no creamos otro
            if (preview.querySelector('video')) return;

            let video = document.createElement('video');
            video.srcObject = stream;
            video.setAttribute("playsinline", true); 
            video.play();
            
            preview.appendChild(video);
            console.log("Escáner activado");
        })
        .catch(function(err) {
            alert("Error al acceder a la cámara. Revisa los permisos.");
        });
});